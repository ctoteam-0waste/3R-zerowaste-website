import "server-only";
import type { CalendarEvent } from "@/content/events";

/**
 * Live sustainability calendar, fetched from Wikidata (no hardcoded dates):
 *  - international observances (Wikidata class Q2558684) whose name matches a sustainability topic,
 *    with their recurring date ("April 22", "first Monday in October") rolled forward to the next occurrence;
 *  - UN Climate Change Conferences (COPs, Q7888355) once their exact dates are published.
 * Each Wikidata response is cached for 6 hours (only successful responses are cached).
 */

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT = "3RZeroWasteWebsite/1.0 (https://www.3rzerowaste.com; contact@karmaverse.earth)";

/** Observances whose English name matches one of these are shown. */
const TOPICS =
  /\b(environment(al)?|earth day|climate|zero waste|e-waste|recycling|ozone|soil|forests?|wetlands?|oceans?|seagrass|desertification|biodiversity|wildlife|clean air|clean energy|food loss|sustainab\w*|cities|habitat|water|mountains?|bicycle)\b/i;
const EXCLUDE = /\b(disease|earthquake|federation|constitution|war|seafarer)\b|^bicycle day$/i;

const OBSERVANCES = `
SELECT ?item ?itemLabel ?dayLabel ?site ?article WHERE {
  ?item wdt:P31 wd:Q2558684 ; wdt:P837 ?day .
  OPTIONAL { ?item wdt:P856 ?site }
  OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`;

const CONFERENCES = `
SELECT ?item ?itemLabel ?short ?start ?end ?placeLabel ?countryLabel ?site WHERE {
  ?item wdt:P31 wd:Q7888355 ; p:P580/psv:P580 [ wikibase:timeValue ?start ; wikibase:timePrecision 11 ] .
  OPTIONAL { ?item wdt:P582 ?end }
  OPTIONAL { ?item wdt:P1813 ?short FILTER(LANG(?short) = "en") }
  OPTIONAL { ?item wdt:P276 ?place }
  OPTIONAL { ?item wdt:P17 ?country }
  OPTIONAL { ?item wdt:P856 ?site }
  FILTER(?start > NOW() - "P60D"^^xsd:duration)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`;

type Row = Record<string, { value: string } | undefined>;

async function sparql(query: string): Promise<Row[]> {
  const res = await fetch(`${ENDPOINT}?query=${encodeURIComponent(query)}`, {
    headers: { Accept: "application/sparql-results+json", "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(15_000),
    next: { revalidate: 21600 },
  });
  if (!res.ok) throw new Error(`Wikidata responded ${res.status}`);
  const json = (await res.json()) as { results: { bindings: Row[] } };
  return json.results.bindings;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const ORDINALS: Record<string, number> = { first: 1, second: 2, third: 3, fourth: 4, last: -1 };

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

/** Resolve a Wikidata "day in year" label to a date in `year`, or null if the format isn't understood. */
function resolveDay(label: string, year: number): string | null {
  const l = label.toLowerCase().trim();
  let m = l.match(/^([a-z]+) (\d{1,2})$/) ?? null;
  if (m && MONTHS.includes(m[1])) return iso(year, MONTHS.indexOf(m[1]), Number(m[2]));
  m = l.match(/^(\d{1,2}) ([a-z]+)$/);
  if (m && MONTHS.includes(m[2])) return iso(year, MONTHS.indexOf(m[2]), Number(m[1]));
  m = l.match(/^(first|second|third|fourth|last) ([a-z]+) (?:in|of) ([a-z]+)$/);
  if (m && MONTHS.includes(m[3])) {
    const month = MONTHS.indexOf(m[3]);
    const n = ORDINALS[m[1]];
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    if (m[2] === "day") return iso(year, month, n === -1 ? daysInMonth : n);
    const wd = WEEKDAYS.indexOf(m[2]);
    if (wd < 0) return null;
    if (n === -1) {
      const last = new Date(Date.UTC(year, month, daysInMonth)).getUTCDay();
      return iso(year, month, daysInMonth - ((last - wd + 7) % 7));
    }
    const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
    return iso(year, month, 1 + ((wd - first + 7) % 7) + (n - 1) * 7);
  }
  return null;
}

/** UN pages are sometimes linked in Spanish/French — prefer the English version. */
function englishUrl(url: string) {
  return url.replace(/un\.org\/(es|fr|ar|ru|zh)\/observances/, "un.org/en/observances");
}

const FOREIGN_PATH = /\/(es|fr|ar|ru|zh|zh-hans|pt|pt-br|de|tr)(\/|$)/i;

/** Pick the best official link: an English page if there is one, else any non-translated page. */
function pickUrl(sites: string[]) {
  const urls = sites.map(englishUrl);
  return urls.find((u) => /\/en(\/|$)/.test(u)) ?? urls.find((u) => !FOREIGN_PATH.test(new URL(u).pathname)) ?? urls[0];
}

function todayIST() {
  return new Date(Date.now() + 5.5 * 36e5).toISOString().slice(0, 10);
}

async function fetchObservances(): Promise<CalendarEvent[]> {
  const rows = await sparql(OBSERVANCES);
  const today = todayIST();
  const thisYear = Number(today.slice(0, 4));

  // One entry per Wikidata item; a weekday rule ("first Monday…") beats a fixed date when both exist.
  const byItem = new Map<string, { name: string; days: string[]; sites: string[]; article?: string }>();
  for (const r of rows) {
    const id = r.item!.value;
    const name = r.itemLabel?.value ?? "";
    if (!TOPICS.test(name) || EXCLUDE.test(name) || /^Q\d+$/.test(name)) continue;
    const entry = byItem.get(id) ?? { name, days: [], sites: [] };
    const day = r.dayLabel?.value;
    if (day && !entry.days.includes(day)) entry.days.push(day);
    if (r.site?.value && !entry.sites.includes(r.site.value)) entry.sites.push(r.site.value);
    entry.article ??= r.article?.value;
    byItem.set(id, entry);
  }

  const events: CalendarEvent[] = [];
  for (const [id, { name, days, sites, article }] of byItem) {
    // Official site → English Wikipedia → the Wikidata item itself.
    const url = sites.length ? pickUrl(sites) : (article ?? id.replace("http://www.wikidata.org/entity/", "https://www.wikidata.org/wiki/"));
    const rule = days.find((d) => /^(first|second|third|fourth|last) /i.test(d)) ?? days[0];
    let date: string | null = null;
    for (const y of [thisYear, thisYear + 1]) {
      const d = resolveDay(rule, y);
      if (d && d >= today) {
        date = d;
        break;
      }
    }
    if (!date) continue;
    events.push({
      name,
      kind: url.includes("un.org") ? "UN observance" : "Global observance",
      place: "Worldwide",
      start: date,
      end: date,
      url,
    });
  }

  // "Earth Day" and "International Mother Earth Day" are the same day — keep the longer, official name.
  return events.filter((e) => !events.some((o) => o !== e && o.start === e.start && o.name.length > e.name.length && o.name.endsWith(e.name)));
}

async function fetchConferences(): Promise<CalendarEvent[]> {
  const rows = await sparql(CONFERENCES);
  const seen = new Map<string, CalendarEvent>();
  for (const r of rows) {
    const id = r.item!.value;
    if (seen.has(id)) continue;
    const start = r.start!.value.slice(0, 10);
    const end = r.end?.value.slice(0, 10) ?? start;
    const short = r.short?.value;
    const place = [r.placeLabel?.value, r.countryLabel?.value].filter(Boolean).join(", ") || "To be announced";
    seen.set(id, {
      name: short ? `${short} — UN Climate Change Conference` : r.itemLabel?.value ?? "UN Climate Change Conference",
      kind: "Global summit · UNFCCC",
      place,
      start,
      end,
      url: r.site?.value ?? "https://unfccc.int/cop",
    });
  }
  return [...seen.values()];
}

/** All upcoming calendar entries, soonest first. Throws only if every source fails. */
export async function fetchSustainabilityCalendar(): Promise<CalendarEvent[]> {
  const results = await Promise.allSettled([fetchObservances(), fetchConferences()]);
  const ok = results.filter((r): r is PromiseFulfilledResult<CalendarEvent[]> => r.status === "fulfilled");
  if (ok.length === 0) throw (results[0] as PromiseRejectedResult).reason;
  const today = todayIST();
  return ok
    .flatMap((r) => r.value)
    .filter((e) => e.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start));
}

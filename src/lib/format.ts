const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Parse YYYY-MM-DD at noon UTC so the calendar day never shifts with the server's timezone. */
function parse(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "2026-10-14" → "14 Oct 2026". Non-ISO strings (e.g. "[Date]") pass through unchanged. */
export function formatDate(iso: string) {
  const d = parse(iso);
  return d ? `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}` : iso;
}

/** "2026-11-09" + "2026-11-12" → "9–12 Nov 2026" */
export function formatRange(start: string, end: string) {
  const s = parse(start);
  const e = parse(end);
  if (!s || !e || start === end) return formatDate(start);
  if (s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear()) {
    return `${s.getUTCDate()}–${e.getUTCDate()} ${MONTHS[e.getUTCMonth()]} ${e.getUTCFullYear()}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/** Day + short month for date badges. */
export function dateBadge(iso: string) {
  const d = parse(iso);
  return d ? { day: String(d.getUTCDate()).padStart(2, "0"), month: MONTHS[d.getUTCMonth()] } : { day: "--", month: "---" };
}

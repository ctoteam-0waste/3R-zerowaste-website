/**
 * Live sustainability calendar entry — global observances & summits, fetched from Wikidata
 * by `src/lib/liveCalendar.ts` (served at /api/calendar). Dates are ISO (YYYY-MM-DD), evaluated in IST.
 */
export type CalendarEvent = {
  name: string;
  kind: string;
  place: string;
  start: string;
  end: string;
  url: string;
};


/**
 * 3R & KarmaVerse's own events. Each event is a Markdown file in `content/events/`
 * (project root). Events move from "Upcoming" to "Past" automatically once their date passes.
 */
export type CompanyEvent = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** ISO date for multi-day events; defaults to `date` */
  endDate: string;
  time?: string;
  venue: string;
  registerUrl?: string;
  image?: string;
};

export type CompanyEventWithBody = CompanyEvent & { html: string };

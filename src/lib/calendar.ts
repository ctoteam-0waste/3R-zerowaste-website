import type { CalendarEvent } from "@/content/events";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const IST = "+05:30";

export type CalendarStatus = CalendarEvent & {
  startMs: number;
  endMs: number;
  live: boolean;
  dates: string;
  dd: string;
  mon: string;
  rel: string;
  soon: boolean;
};

/** Resolve each calendar entry's status relative to `now`; drops ended events. */
export function resolveCalendar(events: CalendarEvent[], now: number): CalendarStatus[] {
  return events
    .map((e) => {
      const startMs = Date.parse(`${e.start}T00:00:00${IST}`);
      const endMs = Date.parse(`${e.end}T23:59:59${IST}`);
      const s = new Date(`${e.start}T12:00:00Z`);
      const en = new Date(`${e.end}T12:00:00Z`);
      const dates =
        e.start === e.end
          ? `${s.getUTCDate()} ${MONTHS[s.getUTCMonth()]} ${s.getUTCFullYear()}`
          : `${s.getUTCDate()}–${en.getUTCDate()} ${MONTHS[en.getUTCMonth()]} ${en.getUTCFullYear()}`;
      const live = now >= startMs && now <= endMs;
      const days = Math.ceil((startMs - now) / 864e5);
      const rel = live ? "Live now" : days <= 1 ? "Tomorrow" : `In ${days} days`;
      return {
        ...e,
        startMs,
        endMs,
        live,
        dates,
        dd: String(s.getUTCDate()).padStart(2, "0"),
        mon: MONTHS[s.getUTCMonth()],
        rel,
        soon: !live && days <= 14,
      };
    })
    .filter((e) => e.endMs >= now)
    .sort((a, b) => a.startMs - b.startMs);
}

export function splitDuration(ms: number) {
  let d = Math.max(0, ms);
  const days = Math.floor(d / 864e5);
  d -= days * 864e5;
  const hrs = Math.floor(d / 36e5);
  d -= hrs * 36e5;
  const min = Math.floor(d / 6e4);
  d -= min * 6e4;
  const sec = Math.floor(d / 1e3);
  const p = (n: number) => String(n).padStart(2, "0");
  return { days: String(days), hrs: p(hrs), min: p(min), sec: p(sec) };
}

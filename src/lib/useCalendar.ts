"use client";

import { useEffect, useState } from "react";
import type { CalendarEvent } from "@/content/events";

type CalendarState = { events: CalendarEvent[]; status: "loading" | "ready" | "error"; fetchedAt?: string };

// One request per page load, shared by the hero pill and the calendar section.
let request: Promise<CalendarState> | null = null;

function load(): Promise<CalendarState> {
  request ??= fetch("/api/calendar")
    .then(async (r) => {
      const data = (await r.json()) as { events?: CalendarEvent[]; fetchedAt?: string };
      if (!r.ok || !data.events?.length) throw new Error("empty");
      return { events: data.events, status: "ready" as const, fetchedAt: data.fetchedAt };
    })
    .catch(() => {
      request = null; // allow a retry on the next mount
      return { events: [], status: "error" as const };
    });
  return request;
}

/** Live sustainability calendar from /api/calendar (Wikidata-backed). */
export function useCalendar() {
  const [state, setState] = useState<CalendarState>({ events: [], status: "loading" });
  useEffect(() => {
    let alive = true;
    load().then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

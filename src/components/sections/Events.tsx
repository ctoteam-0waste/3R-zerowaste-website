"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import type { CompanyEvent } from "@/content/events";
import { dateBadge } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveCalendar } from "./LiveCalendar";

function EventRow({ e, past }: { e: CompanyEvent; past?: boolean }) {
  const { day, month } = dateBadge(e.date);
  const where = [e.venue, e.time].filter(Boolean).join(" · ");
  return (
    <article className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-7 gap-y-4 border-t border-white/10 py-[26px] transition-all duration-500 hover:bg-[linear-gradient(90deg,rgba(200,242,106,.06),transparent_70%)] md:grid-cols-[96px_minmax(0,1fr)_auto] md:hover:pl-4">
      <div className={clsx("flex h-[72px] w-[72px] flex-col items-center justify-center gap-0.5 rounded-[20px] border border-white/[0.14] bg-white/[0.03] md:h-24 md:w-24", past && "opacity-70")}>
        <span className="font-display text-[30px] font-semibold leading-none">{day}</span>
        <span className={clsx("mono-label text-[10px]", past ? "text-text-dim" : "text-lime-brand")}>{month}</span>
      </div>
      <div className="flex min-w-0 flex-col gap-2.5">
        <span className={clsx("mono-label inline-flex self-start rounded-[7px] px-2.5 py-1 text-[10px] tracking-[0.12em]", past ? "bg-white/[0.08] text-[#C3D1CA]" : "bg-cyan-brand/[0.12] text-cyan-brand")}>{e.type}</span>
        <h3 className="font-medium" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
          {e.title}
        </h3>
        <span className="text-sm text-text-dim">{where}</span>
      </div>
      <div className="col-span-2 md:col-span-1">
        <Button href={`/events/${e.slug}`} variant="ghost" arrow className="w-full justify-center md:w-auto">
          {past ? "View recap" : "Details & register"}
        </Button>
      </div>
    </article>
  );
}

export function Events({ upcoming, past, heading = true }: { upcoming: CompanyEvent[]; past: CompanyEvent[]; heading?: boolean }) {
  const [tab, setTab] = useState<"up" | "past">("up");
  const list = tab === "up" ? upcoming : past;
  const hasEvents = upcoming.length + past.length > 0;

  return (
    <section id="events" aria-labelledby={heading ? "ev-h" : "events-title"} className="section-pad relative overflow-hidden bg-ink-2 text-[#F2F6F3]">
      <div aria-hidden className="absolute -bottom-60 -left-60 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(200,242,106,.12),transparent_65%)]" />
      <div className="container-site relative flex flex-col gap-12">
        {heading && (
        <SectionHeading
          id="ev-h"
          tone="dark"
          eyebrow="12 — Events"
          title={
            <>
              Show up. <span className="grad-text">Make it count.</span>
            </>
          }
          aside={
            <p className="max-w-[420px] text-[17px] leading-[1.7] text-[#A9BBB2]">
              Drives, workshops and conversations with the 3R and KarmaVerse community — on the ground and online.
            </p>
          }
        />
        )}

        <LiveCalendar />
        <p className="mono-label -mt-6 text-[10px] text-[#6F8279]">Global observances &amp; UN climate summits — fetched live from Wikidata. {hasEvents && "3R & KarmaVerse events below."}</p>

        {/* list appears automatically once a real event file exists in /content/events */}
        {hasEvents && (
        <div className="flex flex-col gap-6">
          <div role="tablist" aria-label="Event timeframe" className="inline-flex gap-1 self-start rounded-full border border-white/10 bg-white/[0.06] p-[5px]">
            {(
              [
                ["up", "Upcoming"],
                ["past", "Past"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={clsx("relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors", tab === k ? "text-text" : "text-[#C3D1CA] hover:text-white")}
              >
                {tab === k && <motion.span layoutId="ev-tab" className="absolute inset-0 -z-0 rounded-full bg-lime-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col border-b border-white/10"
            >
              {list.map((e) => (
                <EventRow key={e.slug} e={e} past={tab === "past"} />
              ))}
              {list.length === 0 && (
                <p className="border-t border-white/10 py-[26px] text-[#A9BBB2]">
                  {tab === "up" ? "New events are coming soon — check back shortly." : "No past events yet."}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        )}
      </div>
    </section>
  );
}

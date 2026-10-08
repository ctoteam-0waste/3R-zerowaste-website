"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { resolveCalendar, splitDuration } from "@/lib/calendar";
import { useNow } from "@/lib/useNow";
import { useCalendar } from "@/lib/useCalendar";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

function Pulse() {
  return <span className="h-2 w-2 animate-pulseRing rounded-full bg-emerald-brand shadow-[0_0_0_0_rgba(43,208,139,.6)]" />;
}

/** "LIVE · COP31 in 33 days" pill for the hero. */
export function LiveHeroPill() {
  const now = useNow(60_000);
  const { events } = useCalendar();
  const next = now ? resolveCalendar(events, now)[0] : undefined;
  const label = next ? `${next.name.split(" — ")[0]} ${next.live ? "is happening now" : next.rel.toLowerCase()}` : "Sustainability calendar";
  return (
    <Link
      href="/#events"
      className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-lime-brand/30 bg-white/[0.06] py-0 pl-3 pr-4 text-sm font-semibold text-[#E8F0EC] backdrop-blur-md transition-colors hover:border-lime-brand hover:bg-lime-brand/[0.12] hover:text-white"
    >
      <Pulse />
      <span className="mono-label text-[10px] text-lime-brand">Live</span>
      <span>{label}</span>
      <ArrowRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}

/** Live sustainability calendar: countdown to the next event + upcoming list. Auto-updates. */
export function LiveCalendar() {
  const now = useNow(1000);
  const calendar = useCalendar();
  const events = now ? resolveCalendar(calendar.events, now) : [];
  const next = events[0];
  const cd = next && now ? splitDuration((next.live ? next.endMs : next.startMs) - now) : null;
  const updated = now ? new Date(now).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }) : "—";

  return (
    <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-4">
      <div className="relative flex flex-col gap-[18px] overflow-hidden rounded-[28px] border border-lime-brand/25 bg-[linear-gradient(160deg,rgba(43,208,139,.16),rgba(255,255,255,.02)_60%)] p-8">
        <span aria-hidden className="absolute -right-20 -top-20 h-60 w-60 animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-lime-brand/30" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="mono-label inline-flex items-center gap-2 rounded-full bg-emerald-brand/[0.16] px-3 py-1.5 text-[11px] text-lime-brand">
            <Pulse /> {next?.live ? "Live now" : "Next up"}
          </span>
          <span className="mono-label text-[10px] text-[#8EA198]">Live sustainability calendar</span>
        </div>
        <span className="mono-label text-[11px] text-cyan-brand">{next?.kind ?? " "}</span>
        <h3 className="font-semibold leading-[1.04] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
          {next?.name ?? (calendar.status === "error" ? "Calendar temporarily unavailable" : "Loading live calendar…")}
        </h3>
        <p className="text-[15px] text-[#B9C8C0]">{next ? `${next.place} · ${next.dates}` : " "}</p>
        <div className="flex flex-col gap-2.5">
          <span className="mono-label text-[10px] text-[#8EA198]">{next?.live ? "Ends in" : "Starts in"}</span>
          <div className="grid max-w-[440px] grid-cols-4 gap-2.5" role="timer" aria-live="off">
            {(["days", "hrs", "min", "sec"] as const).map((k) => (
              <div key={k} className="flex flex-col items-center gap-1 rounded-2xl border border-white/[0.08] bg-ink/60 px-1.5 py-3.5">
                <span className="font-display font-semibold tabular-nums leading-none text-paper" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                  {cd ? cd[k] : "--"}
                </span>
                <span className="mono-label text-[9px] text-[#8EA198]">{k}</span>
              </div>
            ))}
          </div>
        </div>
        {next && (
          <div>
            <Button href={next.url} arrow external>
              Official page
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col rounded-[28px] border border-white/[0.09] bg-white/[0.03] p-[18px]">
        <div className="flex items-center justify-between px-1 pb-3.5 pt-1">
          <span className="mono-label text-[10px] text-[#8EA198]">Coming up</span>
          <span className="mono-label text-[10px] text-[#8EA198]">Live · {updated}</span>
        </div>
        {events.slice(1, 7).map((e) => (
          <a
            key={e.name}
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-lime-brand/[0.06]"
          >
            <span className="flex h-[54px] w-[54px] flex-none flex-col items-center justify-center gap-0.5 rounded-[14px] border border-white/[0.12] text-[#F2F6F3]">
              <span className="font-display text-xl font-semibold leading-none">{e.dd}</span>
              <span className="mono-label text-[9px] text-lime-brand">{e.mon}</span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-[15px] font-semibold text-[#F2F6F3]">{e.name}</span>
              <span className="text-[12.5px] text-[#8EA198]">{e.place}</span>
            </span>
            <span
              className={clsx(
                "mono-label flex-none whitespace-nowrap rounded-full px-2.5 py-1 text-[10px]",
                e.live ? "bg-lime-brand text-text" : e.soon ? "bg-cyan-brand/15 text-cyan-brand" : "bg-white/[0.07] text-[#C3D1CA]",
              )}
            >
              {e.rel}
            </span>
          </a>
        ))}
      </div>
    </Reveal>
  );
}

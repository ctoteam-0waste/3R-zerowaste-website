"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { visionForces } from "@/content/home";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/** What each force contributes — shown on its card. */
const forceNotes: Record<string, string> = {
  Technology: "Platforms that make sustainable action easy to take and track.",
  Data: "One reliable record of waste, resources and emissions.",
  AI: "Insight and prediction that turn records into decisions.",
  Sustainability: "Circular, low-carbon outcomes as the goal of every system.",
  "Human Behaviour": "Incentives and design that make good habits stick.",
};

const statement: { w: string; accent?: "green" | "mark" }[] = [
  ..."It's an opportunity to build".split(" ").map((w) => ({ w })),
  { w: "smarter", accent: "green" },
  { w: "businesses,", accent: "green" },
  { w: "stronger", accent: "green" },
  { w: "communities", accent: "green" },
  { w: "and" },
  { w: "a" },
  { w: "healthier", accent: "mark" },
  { w: "planet.", accent: "mark" },
];

/** A word that brightens from faint to full as the statement scrolls through the viewport. */
function Word({ w, accent, progress, range }: { w: string; accent?: "green" | "mark"; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={`relative z-0 inline-block ${accent === "green" ? "text-emerald-deep" : ""}`}>
      {w}
      {accent === "mark" && <span aria-hidden className="absolute inset-x-0 bottom-[0.06em] -z-10 h-[0.14em] bg-lime-brand" />}
    </motion.span>
  );
}

export function Vision() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });

  return (
    <section id="vision" aria-labelledby="vision-h" className="section-pad relative overflow-hidden bg-paper text-text">
      <span aria-hidden className="absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,242,106,.35),transparent_65%)]" />
      <div className="container-site relative flex flex-col gap-[clamp(56px,7vw,96px)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div className="flex flex-col gap-7">
            <Reveal>
              <p className="eyebrow text-emerald-deep">01 — The 3R Vision</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="vision-h" className="font-medium tracking-[-0.01em] text-text-muted" style={{ fontSize: "clamp(22px, 2vw, 28px)" }}>
                Sustainability is no longer just an obligation.
              </h2>
            </Reveal>
            <p
              ref={ref}
              aria-label="It's an opportunity to build smarter businesses, stronger communities and a healthier planet."
              className="flex flex-wrap gap-x-[0.24em] font-display font-medium leading-[1.06] tracking-[-0.035em]"
              style={{ fontSize: "clamp(34px, 4.6vw, 68px)" }}
            >
              {statement.map((s, i) =>
                reduce ? (
                  <span key={i} aria-hidden className={`relative z-0 ${s.accent === "green" ? "text-emerald-deep" : ""}`}>
                    {s.w}
                    {s.accent === "mark" && <span className="absolute inset-x-0 bottom-[0.06em] -z-10 h-[0.14em] bg-lime-brand" />}
                  </span>
                ) : (
                  <span key={i} aria-hidden className="contents">
                    <Word w={s.w} accent={s.accent} progress={scrollYProgress} range={[i / statement.length, (i + 1) / statement.length]} />
                  </span>
                ),
              )}
            </p>
          </div>
          <Reveal delay={0.15}>
            <p className="text-lg leading-[1.7] text-[#33413B]">
              3R connects five forces that are usually managed in silos. When they work as one system, sustainable intent becomes verified action — and verified action becomes impact you can measure and report.
            </p>
          </Reveal>
        </div>

        {/* The equation: five forces + … = measurable impact */}
        <div className="flex flex-col gap-4">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {visionForces.map((f, i) => (
              <Reveal
                as="li"
                key={f.label}
                delay={i * 0.08}
                className={`group relative flex min-h-[230px] flex-col justify-between gap-6 rounded-[26px] p-6 transition-shadow duration-500 ${
                  f.highlight
                    ? "bg-lime-brand text-text shadow-[0_30px_60px_-30px_rgba(120,170,30,.7)]"
                    : "bg-white shadow-[0_24px_60px_-40px_rgba(11,23,18,.45)] hover:shadow-[0_30px_60px_-30px_rgba(43,208,139,.45)]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-500 ${
                      f.highlight ? "bg-text text-lime-brand" : "bg-text/[0.06] text-text group-hover:bg-lime-brand"
                    }`}
                  >
                    <Icon name={f.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <span className="font-mono text-xs text-text-muted">0{i + 1}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">{f.label}</h3>
                  <p className={`text-[14.5px] leading-relaxed ${f.highlight ? "text-[#24331F]" : "text-text-muted"}`}>{forceNotes[f.label]}</p>
                </div>
                {i > 0 && (
                  <span
                    aria-hidden
                    className="absolute -left-[26px] top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border-4 border-paper bg-text font-display text-lg font-bold text-lime-brand lg:grid"
                  >
                    +
                  </span>
                )}
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.45}>
            <div className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[26px] bg-text px-[clamp(24px,3.5vw,44px)] py-7 text-[#F2F6F3]">
              <span aria-hidden className="absolute -left-20 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,208,139,.35),transparent_70%)]" />
              <div className="relative flex items-center gap-5">
                <span className="font-display text-[42px] font-bold leading-none text-lime-brand">=</span>
                <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-lime-brand font-display text-xl font-bold tracking-[-0.04em] text-text shadow-[0_0_0_8px_rgba(200,242,106,.12)]">
                  3R
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-[clamp(24px,2.6vw,34px)] font-semibold leading-tight tracking-[-0.02em]">Measurable impact</span>
                  <span className="text-[15px] text-[#A9BBB2]">Verified, reportable outcomes for people and the planet.</span>
                </div>
              </div>
              <span className="mono-label relative rounded-full border border-lime-brand/40 px-4 py-2 text-[11px] text-lime-brand">
                Philosophy — {site.philosophy}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

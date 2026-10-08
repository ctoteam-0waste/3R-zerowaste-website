"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { LiveHeroPill } from "@/components/sections/LiveCalendar";

// WebGL globe is client-only and loaded after first paint; the CSS planet shows until it is ready.
const Earth = dynamic(() => import("@/components/ui/Earth").then((m) => m.Earth), { ssr: false });

const motes = [
  [8, 2, 14, 4], [18, 7, 18, 3], [27, 4, 12, 5], [36, 10, 20, 3], [44, 1, 16, 4], [52, 6, 13, 3],
  [61, 9, 19, 5], [70, 3, 15, 3], [79, 11, 17, 4], [88, 5, 14, 3], [94, 8, 21, 5], [14, 12, 16, 3],
];
const chipPos = [
  { right: "30%", top: "24%", delay: 0 },
  { right: "8%", top: "30%", delay: -2 },
  { right: "34%", top: "66%", delay: -4 },
  { right: "10%", top: "72%", delay: -1 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { video } = site.hero;
  const hasVideo = Boolean(video.mp4 || video.webm);
  const [earthReady, setEarthReady] = useState(false);

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      aria-label="Introduction"
      className="relative isolate -mt-[76px] min-h-[760px] overflow-hidden bg-ink pt-[76px] text-[#F2F6F3] md:min-h-[880px]"
    >
      {/* Background: optional video (desktop, motion allowed) over an animated planet fallback */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <div className="stars" />
        <div className="absolute inset-0 overflow-hidden">
          {motes.map(([l, d, du, sz], i) => (
            <span key={i} className="mote" style={{ left: `${l}%`, animationDelay: `-${d}s`, animationDuration: `${du}s`, width: sz, height: sz }} />
          ))}
        </div>
        <div className="planet-stage">
          <div className="planet-atmo transition-opacity duration-1000" style={{ opacity: earthReady ? 0 : undefined }} />
          <div className="planet transition-opacity duration-1000" style={{ opacity: earthReady ? 0 : undefined }}>
            <div className="planet-grid" />
            <div className="planet-lat" />
            <div className="planet-term" />
          </div>
          <Earth className="absolute inset-0" onReady={() => setEarthReady(true)} />
          <div className="orbit orbit-a"><span className="sat" /></div>
          <div className="orbit orbit-b"><span className="sat" /></div>
        </div>
        {hasVideo && !reduce && (
          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={video.poster || undefined}
          >
            {video.webm && <source src={video.webm} type="video/webm" />}
            {video.mp4 && <source src={video.mp4} type="video/mp4" />}
          </video>
        )}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,16,12,.4)_0%,rgba(5,16,12,.7)_45%,#05100C_100%)] md:bg-[linear-gradient(90deg,rgba(5,16,12,.96)_0%,rgba(5,16,12,.78)_38%,rgba(5,16,12,.15)_70%,rgba(5,16,12,.35)_100%),linear-gradient(180deg,rgba(5,16,12,.5)_0%,rgba(5,16,12,0)_30%,rgba(5,16,12,0)_70%,#05100C_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_circle_at_var(--mx,70%)_var(--my,40%),rgba(200,242,106,.10),transparent_60%)]" />

      {site.hero.signals.map((s, i) => (
        <div
          key={s.label}
          aria-hidden
          className="glass absolute hidden animate-float items-center gap-2.5 rounded-[14px] py-2.5 pl-3 pr-3.5 font-mono text-[13px] tracking-[0.06em] text-[#E8F0EC] shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] md:flex"
          style={{ right: chipPos[i].right, top: chipPos[i].top, animationDelay: `${chipPos[i].delay}s` }}
        >
          <span className={`h-2 w-2 rounded-full ${s.dir === "down" ? "bg-cyan-brand shadow-[0_0_12px_#6FE3D6]" : "bg-lime-brand shadow-[0_0_12px_#C8F26A]"}`} />
          {s.label} <span className={s.dir === "down" ? "text-cyan-brand" : "text-lime-brand"}>{s.dir === "down" ? "↓" : "↑"}</span>
        </div>
      ))}

      <div className="container-site relative flex min-h-[684px] flex-col justify-center gap-9 pb-[120px] pt-[60px] md:min-h-[804px]">
        <FadeUp delay={0.05}>
          <LiveHeroPill />
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="eyebrow text-lime-brand">3R ZeroWaste · Climate-tech &amp; Circular Economy</p>
        </FadeUp>
        <h1 className="max-w-[1180px] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}>
          {site.hero.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={i === 2 ? "grad-text inline-block" : "inline-block"}
                initial={reduce ? false : { y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <FadeUp delay={0.7}>
          <p className="max-w-[560px] leading-relaxed text-[#C3D1CA]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            {site.description}
          </p>
        </FadeUp>
        <FadeUp delay={0.85} className="flex flex-wrap gap-3.5">
          <Button href="/solutions" arrow>
            Explore Solutions
          </Button>
          <Button href="/impact" variant="ghost">
            See Our Impact
          </Button>
        </FadeUp>
      </div>

      <Link href="/#vision" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-text-dim">
        <span className="mono-label text-[10px]">Scroll to explore ↓</span>
        <span aria-hidden className="scroll-rail" />
        <span className="sr-only">Skip to the vision section</span>
      </Link>
    </section>
  );
}

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}



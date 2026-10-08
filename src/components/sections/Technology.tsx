import Image from "next/image";
import { techLayers, techNodes } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const hex = [
  [50, 8],
  [86.4, 29],
  [86.4, 71],
  [50, 92],
  [13.6, 71],
  [13.6, 29],
];

export function Technology() {
  return (
    <section id="technology" aria-labelledby="tech-h" className="section-pad relative overflow-hidden bg-ink text-[#F2F6F3]">
      <div className="container-site flex flex-wrap items-center gap-[clamp(48px,6vw,96px)]">
        <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-7">
          <SectionHeading
            id="tech-h"
            tone="dark"
            eyebrow="06 — Technology"
            title={
              <>
                Powered by technology.
                <br />
                <span className="text-text-dim">Designed for impact.</span>
              </>
            }
          />
          <Reveal>
            <p className="max-w-[480px] text-[17px] leading-[1.7] text-[#A9BBB2]">
              Technology isn&apos;t a department at 3R — it&apos;s the engine that makes sustainability measurable, scalable and engaging.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <dl className="border-b border-white/10">
              {techLayers.map((l) => (
                <div key={l.k} className="flex gap-[18px] border-t border-white/10 py-[22px]">
                  <dt className="mono-label w-24 flex-none pt-1 text-[11px] text-cyan-brand">{l.k}</dt>
                  <dd className="text-[15px] leading-relaxed text-[#C3D1CA]">{l.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0 flex-[1_1_460px]">
          <div
            role="img"
            aria-label="Technology ecosystem: AI, Data, Analytics, Cloud, Automation and Digital Engagement connected to the 3R core: measure, engage, act, reward, impact"
            className="relative mx-auto aspect-square w-full max-w-[600px]"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="0.2" />
              <g stroke="#6FE3D6" strokeWidth="0.25" fill="none" className="dash-anim" opacity="0.7">
                {hex.map(([x, y]) => (
                  <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} />
                ))}
              </g>
              <polygon points={hex.map((p) => p.join(",")).join(" ")} fill="none" stroke="rgba(111,227,214,.18)" strokeWidth="0.2" />
            </svg>
            <div className="core-rings absolute left-1/2 top-1/2 grid aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-lime-brand/35 bg-[radial-gradient(circle_at_40%_35%,rgba(43,208,139,.35),rgba(10,28,21,.95)_70%)] text-center shadow-[0_0_80px_-10px_rgba(43,208,139,.45),inset_0_0_40px_rgba(200,242,106,.08)]">
              {/* Rotating ring of the 3R loop around the logo */}
              <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-[4%] h-[92%] w-[92%] animate-[spin_36s_linear_infinite]">
                <defs>
                  <path id="core-ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
                </defs>
                <text className="fill-lime-brand font-mono text-[11.5px] uppercase tracking-[0.32em]">
                  <textPath href="#core-ring">Measure · Engage · Act · Reward · Impact ·</textPath>
                </text>
              </svg>
              <div className="relative grid h-[58%] w-[58%] place-items-center rounded-full bg-white p-[9%] shadow-[0_0_0_6px_rgba(200,242,106,.15),0_20px_50px_-15px_rgba(0,0,0,.7)] transition-transform duration-500 hover:scale-105">
                <Image quality={90} src="/images/brand/logo-mark.png" alt="3R ZeroWaste" width={146} height={146} sizes="140px" className="h-full w-full object-contain" />
              </div>
            </div>
            {techNodes.map((n, i) => (
              <div
                key={n}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 whitespace-nowrap rounded-[14px] border border-white/[0.12] bg-white/[0.04] px-2.5 py-2 font-display text-[12px] sm:px-4 sm:py-3 sm:text-[15px] font-medium text-[#E8F0EC] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-brand hover:bg-cyan-brand/[0.08]"
                style={{ left: `${hex[i][0]}%`, top: `${hex[i][1]}%` }}
              >
                <i className={`h-2 w-2 rounded-full ${i === 5 ? "bg-lime-brand shadow-[0_0_12px_#C8F26A]" : "bg-cyan-brand shadow-[0_0_12px_#6FE3D6]"}`} />
                {n}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

    </section>
  );
}

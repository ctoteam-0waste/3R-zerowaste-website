import Image from "next/image";
import { impactGallery, metrics } from "@/content/home";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GrowBar } from "@/components/ui/GrowBar";

export function ImpactDashboard() {
  return (
    <section id="impact" aria-labelledby="impact-h" className="section-pad relative overflow-hidden bg-ink text-[#F2F6F3]">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_30%,#000_0%,transparent_70%)]"
      />
      <div className="container-site relative flex flex-col gap-14">
        <SectionHeading
          id="impact-h"
          tone="dark"
          eyebrow="02 — Impact at a glance"
          title={
            <>
              Impact you can count.
              <br />
              <span className="text-text-dim">Not just claim.</span>
            </>
          }
          aside={
            <p className="max-w-[380px] text-base leading-[1.7] text-text-dim">
              Every number on this console is drawn from verified engagements across businesses, industries, residential communities and schools.
            </p>
          }
        />

        <Reveal className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015))] shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_40px_120px_-40px_rgba(0,0,0,.8)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-7 py-[18px]">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulseRing rounded-full bg-emerald-brand" />
              <span className="mono-label text-[11px] text-[#C3D1CA]">3R Impact Console</span>
            </div>
            <div aria-hidden className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-brand" />
            </div>
          </div>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))]">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={0.15 + i * 0.1} y={24} className="flex flex-col gap-[22px] border-b border-white/[0.07] px-7 pb-7 pt-8 transition-colors hover:bg-lime-brand/[0.035] sm:border-r">
                <span className="mono-label text-[11px] text-text-dim">{m.tag}</span>
                <dd className="font-display font-medium leading-none tracking-[-0.04em] text-paper" style={{ fontSize: "clamp(56px, 6vw, 88px)" }}>
                  <Counter value={m.value} />
                  <sup className="relative top-[0.25em] ml-1 align-top text-[.45em] text-lime-brand">{m.suffix}</sup>
                </dd>
                <GrowBar value={m.bar} />
                <dt className="text-base font-semibold">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Endless ribbon of programme photos; the list renders twice so the -50% marquee loops seamlessly. */}
      <Reveal delay={0.2} className="relative mt-[clamp(48px,6vw,80px)]">
        <p className="sr-only">Photos from our impact activities</p>
        <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="flex w-max animate-[marquee_70s_linear_infinite] gap-4 pr-4 group-hover:[animation-play-state:paused]">
            {[...impactGallery, ...impactGallery].map((p, i) => (
              <li
                key={`${p.src}-${i}`}
                aria-hidden={i >= impactGallery.length || undefined}
                className="relative h-[200px] w-[280px] flex-none overflow-hidden rounded-[22px] ring-1 ring-white/10 md:h-[240px] md:w-[340px]"
              >
                <Image quality={90}
                  src={p.src}
                  alt={i < impactGallery.length ? p.alt : ""}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3.5 pt-10">
                  <span className="mono-label block text-[10px] text-lime-brand">{p.tag}</span>
                  <span className="block truncate text-sm text-[#E8F0EC]">{p.caption}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

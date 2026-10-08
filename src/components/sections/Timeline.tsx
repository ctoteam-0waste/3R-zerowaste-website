import { timeline } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GrowLine } from "@/components/ui/GrowLine";

export function Timeline() {
  return (
    <section id="journey" aria-labelledby="tl-h" className="section-pad bg-ink text-[#F2F6F3]">
      <div className="container-site flex flex-col gap-16">
        <SectionHeading
          id="tl-h"
          tone="dark"
          eyebrow="10 — Our Journey"
          title={
            <>
              From a foundation to a <span className="grad-text">climate-tech ecosystem.</span>
            </>
          }
          aside={<p className="mono-label text-[11px] text-text-dim md:hidden">Swipe →</p>}
        />
        {/* Revealed as one block: items scrolled out of view in the mobile swipe row can't trigger their own reveal */}
        <Reveal>
        <ol className="grid snap-x snap-mandatory auto-cols-[minmax(220px,1fr)] grid-flow-col overflow-x-auto pb-3 lg:grid-flow-row lg:grid-cols-6 lg:overflow-visible">
          {timeline.map((t, i) => {
            const last = i === timeline.length - 1;
            return (
              <li key={t.title} className="group relative flex snap-start flex-col gap-3.5 pr-6">
                <span aria-hidden className="absolute inset-x-0 top-2 h-0.5 bg-white/10">
                  <GrowLine className="bg-gradient-to-r from-emerald-brand to-lime-brand" />
                </span>
                <span
                  className={`relative z-[1] h-[18px] w-[18px] rounded-full border-2 border-lime-brand transition-all duration-300 group-hover:scale-[1.35] group-hover:bg-lime-brand ${last ? "bg-lime-brand shadow-[0_0_20px_#C8F26A]" : "bg-ink"}`}
                />
                <span className="mono-label text-xs text-lime-brand">{t.year}</span>
                <h3 className={`text-[22px] font-semibold ${last ? "text-lime-brand" : ""}`}>{t.title}</h3>
                <p className="text-sm leading-relaxed text-[#A9BBB2]">{t.note}</p>
              </li>
            );
          })}
        </ol>
        </Reveal>
      </div>
    </section>
  );
}

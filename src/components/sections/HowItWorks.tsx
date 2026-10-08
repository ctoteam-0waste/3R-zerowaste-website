import { steps } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GrowLine } from "@/components/ui/GrowLine";

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-h" className="section-pad relative overflow-hidden bg-ink-2 text-[#F2F6F3]">
      <div aria-hidden className="absolute -right-[200px] -top-[200px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(43,208,139,.16),transparent_65%)]" />
      <div className="container-site relative flex flex-col gap-[72px]">
        <SectionHeading
          id="how-h"
          tone="dark"
          eyebrow="04 — How 3R works"
          title={
            <>
              One loop. From intent to <span className="grad-text">verified impact.</span>
            </>
          }
        />
        <div className="relative">
          <div aria-hidden className="flow-glow absolute left-[10%] right-[10%] top-11 hidden h-px bg-white/[0.12] lg:block">
            <GrowLine />
          </div>
          <ol className="grid grid-cols-1 gap-7 lg:grid-cols-5">
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <Reveal as="li" key={s.title} delay={i * 0.08} className="group flex items-start gap-4 lg:flex-col">
                  <span
                    className={`node-dash relative grid h-[72px] w-[72px] flex-none place-items-center rounded-full border transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-lime-brand group-hover:shadow-[0_0_40px_-6px_rgba(200,242,106,.5)] lg:h-[88px] lg:w-[88px] ${last ? "border-lime-brand bg-lime-brand" : "border-white/[0.14] bg-ink-2"}`}
                  >
                    <span className={`mono-label text-xs ${last ? "text-text" : "text-lime-brand"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <h3 className={`text-2xl font-semibold tracking-[0.02em] ${last ? "text-lime-brand" : ""}`}>{s.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#A9BBB2]">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

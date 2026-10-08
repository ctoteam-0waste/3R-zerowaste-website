import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section id="contact" aria-labelledby="cta-h" className="relative isolate overflow-hidden bg-ink py-[clamp(120px,14vw,200px)] text-[#F2F6F3]">
      <div
        aria-hidden
        className="absolute -bottom-[60%] left-1/2 -z-10 h-[1400px] w-[1400px] -translate-x-1/2 animate-[breathe_9s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(43,208,139,0)_44%,rgba(43,208,139,.35)_48%,rgba(200,242,106,.18)_50%,rgba(5,16,12,0)_56%),radial-gradient(circle,#0C3324_0%,#05100C_46%)]"
      />
      <div aria-hidden className="stars -z-10" />
      <div className="container-site flex flex-col items-center gap-8 text-center">
        <Reveal><p className="eyebrow text-lime-brand">{site.philosophy}</p></Reveal>
        <Reveal delay={0.05}>
          <h2 id="cta-h" className="max-w-[1100px] font-semibold leading-[0.98] tracking-[-0.045em]" style={{ fontSize: "clamp(42px, 6.4vw, 104px)" }}>
            Ready to create <span className="grad-text">measurable impact?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[560px] leading-relaxed text-[#C3D1CA]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Let&apos;s build a more sustainable, circular and climate-resilient future together.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex flex-wrap justify-center gap-3.5">
          <Button href={`mailto:${site.email}`} arrow>
            Talk to 3R
          </Button>
          <Button href="/solutions" variant="ghost">
            Explore Our Solutions
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

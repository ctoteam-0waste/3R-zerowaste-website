import { whyCards } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Why3R() {
  return (
    <section id="why" aria-labelledby="why-h" className="section-pad bg-forest text-[#F2F6F3]">
      <div className="container-site flex flex-col gap-14">
        <SectionHeading id="why-h" tone="dark" eyebrow="08 — Why 3R" title="Why organizations choose 3R" />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-4">
          {whyCards.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={i * 0.06}
              className="group relative flex min-h-[260px] flex-col gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 after:absolute after:inset-x-7 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-emerald-brand after:to-lime-brand after:transition-transform after:duration-500 hover:-translate-y-1 hover:border-lime-brand/30 hover:bg-lime-brand/5 hover:after:scale-x-100"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-lime-brand/40 text-lime-brand">
                <Icon name={c.icon} className="h-[22px] w-[22px]" />
              </span>
              <h3 className="text-[22px] font-semibold">{c.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#B9C8C0]">{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

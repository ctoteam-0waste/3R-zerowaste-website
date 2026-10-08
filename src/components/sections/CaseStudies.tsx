import Image from "next/image";
import clsx from "clsx";
import { impactGallery } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Slide = (typeof impactGallery)[number];

function SlideCard({ s, hidden }: { s: Slide; hidden?: boolean }) {
  return (
    <figure aria-hidden={hidden || undefined} className="group/slide relative h-[260px] w-[300px] flex-none overflow-hidden rounded-[22px] bg-text md:h-[320px] md:w-[440px]">
      <Image quality={90}
        src={s.src}
        alt={hidden ? "" : s.alt}
        fill
        sizes="(max-width: 768px) 300px, 440px"
        className="object-cover transition-transform duration-700 group-hover/slide:scale-[1.06]"
      />
      <span className="mono-label absolute left-4 top-4 rounded-lg bg-ink/70 px-2.5 py-1.5 text-[10px] text-lime-brand backdrop-blur-sm">{s.tag}</span>
      <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(5,16,12,.88))] px-5 pb-4 pt-12 text-[15px] font-semibold leading-snug text-[#F2F6F3]">
        {s.caption}
      </figcaption>
    </figure>
  );
}

/** One endlessly scrolling row: the slides are rendered twice and the track slides by half its width. */
function SliderRow({ slides, reverse, seconds }: { slides: Slide[]; reverse?: boolean; seconds: number }) {
  return (
    <div className="group/row overflow-hidden motion-reduce:overflow-x-auto">
      <div
        className={clsx("flex w-max gap-4 animate-marquee group-hover/row:[animation-play-state:paused] md:gap-5", reverse && "[animation-direction:reverse]")}
        style={{ animationDuration: `${seconds}s` }}
      >
        {slides.map((s) => (
          <SlideCard key={s.src} s={s} />
        ))}
        {slides.map((s) => (
          <SlideCard key={`${s.src}-dup`} s={s} hidden />
        ))}
      </div>
    </div>
  );
}

export function CaseStudies() {
  const half = Math.ceil(impactGallery.length / 2);
  return (
    <section id="cases" aria-labelledby="case-h" className="section-pad overflow-hidden bg-paper text-text">
      <div className="container-site">
        <SectionHeading
          id="case-h"
          eyebrow="07 — Impact stories"
          title="From sustainability initiatives to measurable impact."
          aside={<p className="mono-label max-w-[300px] text-[11px] leading-[1.7] text-[#5E6B65]">On the ground since 2020 — drives, schools, communities and workplaces with 3RZW Environment Foundation.</p>}
        />
      </div>
      <Reveal className="mt-14 flex flex-col gap-4 md:gap-5 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <SliderRow slides={impactGallery.slice(0, half)} seconds={70} />
        <SliderRow slides={impactGallery.slice(half)} seconds={80} reverse />
      </Reveal>
    </section>
  );
}

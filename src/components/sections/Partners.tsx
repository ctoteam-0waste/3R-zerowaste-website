import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { MaskRise, SlideIn } from "@/components/ui/TextFx";
import { partners } from "@/content/pages";

const half = Math.ceil(partners.length / 2);
const rows = [partners.slice(0, half), partners.slice(half)];

function label(name: string) {
  return name.startsWith("[") ? "Partner logo" : name;
}

/** One endless row: the list is rendered twice so the -50% marquee loops seamlessly. */
function LogoRow({ items, reverse }: { items: typeof partners; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul
        className={`flex w-max animate-[marquee_45s_linear_infinite] gap-4 py-2 pr-4 group-hover:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {[...items, ...items].map((p, i) => (
          <li
            key={`${p.slug}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className="grid h-[88px] w-[180px] flex-none place-items-center rounded-2xl border border-text/[0.07] bg-white px-5 shadow-[0_14px_34px_-24px_rgba(11,23,18,.45)] transition duration-300 hover:-translate-y-1 hover:border-emerald-brand/40 hover:shadow-[0_20px_40px_-20px_rgba(43,208,139,.45)] md:h-[100px] md:w-[210px]"
          >
            <Image quality={90}
              src={`/images/partners/logos/${p.slug}.png`}
              unoptimized
              alt={i < items.length ? label(p.name) : ""}
              width={180}
              height={70}
              className="max-h-[56px] w-auto max-w-full object-contain md:max-h-[64px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Partners() {
  return (
    <section id="partners" aria-labelledby="pt-h" className="section-pad overflow-hidden bg-paper text-text">
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <SlideIn>
          <p className="eyebrow justify-center text-emerald-deep">Our partners in impact</p>
        </SlideIn>
        <h2 id="pt-h" className="h-section">
          <MaskRise delay={0.1}>Trusted by Leading Organizations</MaskRise>
        </h2>
        <Reveal delay={0.2}>
          <p className="max-w-[620px] text-[17px] leading-[1.7] text-text-muted">
            Collaborating with global corporations, government bodies, educational institutions and industry leaders to accelerate sustainable impact across India.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.25} className="mt-12 flex flex-col gap-4">
        <p className="sr-only">Partners: {partners.filter((p) => !p.name.startsWith("[")).map((p) => p.name).join(", ")}</p>
        <LogoRow items={rows[0]} />
        <LogoRow items={rows[1]} reverse />
      </Reveal>
    </section>
  );
}

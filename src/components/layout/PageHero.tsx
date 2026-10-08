import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Dark intro band for inner pages: eyebrow, title, intro, optional photo and in-page jump links. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  actions,
  jumps,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image?: { src: string; alt: string };
  actions?: ReactNode;
  jumps?: { label: string; href: string }[];
}) {
  return (
    <section className="relative isolate -mt-[76px] overflow-hidden bg-ink pb-[clamp(56px,7vw,96px)] pt-[calc(76px+clamp(64px,8vw,112px))] text-[#F2F6F3]">
      <span aria-hidden className="absolute right-[6%] top-[8%] -z-10 h-[380px] w-[380px] rounded-full bg-emerald-brand opacity-40 blur-[60px]" />
      <span aria-hidden className="absolute right-[28%] top-[46%] -z-10 h-[220px] w-[220px] rounded-full bg-lime-brand opacity-20 blur-[50px]" />
      <div className="container-site flex flex-wrap items-center gap-x-16 gap-y-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
          <Reveal>
            <p className="eyebrow text-lime-brand">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-[900px] font-semibold leading-[1.02] tracking-[-0.04em]" style={{ fontSize: "clamp(38px, 5vw, 72px)" }}>
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[600px] leading-relaxed text-[#C3D1CA]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
              {intro}
            </p>
          </Reveal>
          {actions && (
            <Reveal delay={0.15} className="flex flex-wrap items-center gap-3.5">
              {actions}
            </Reveal>
          )}
          {jumps && (
            <Reveal delay={0.2}>
              <nav aria-label="On this page" className="flex flex-wrap gap-2">
                {jumps.map((j) => (
                  <Link
                    key={j.href}
                    href={j.href}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-[#D9E4DE] transition-colors hover:border-lime-brand hover:text-lime-brand"
                  >
                    {j.label}
                  </Link>
                ))}
              </nav>
            </Reveal>
          )}
        </div>
        {image && (
          <Reveal delay={0.15} className="relative aspect-[4/3] min-w-0 flex-[1_1_380px] overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,.8)]">
            <Image quality={90} src={image.src} alt={image.alt} fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
          </Reveal>
        )}
      </div>
    </section>
  );
}

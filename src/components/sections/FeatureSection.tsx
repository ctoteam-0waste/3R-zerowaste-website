import Image from "next/image";
import clsx from "clsx";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { MaskRise, SlideIn } from "@/components/ui/TextFx";

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  points?: string[];
  image?: { src: string; alt: string; tag?: string };
};

/** Two-column text + photo block used across the inner pages. Alternate `reverse` for rhythm. */
export function FeatureSection({
  f,
  tone = "light",
  reverse,
  actions,
  children,
}: {
  f: Feature;
  tone?: "light" | "dark" | "kv";
  reverse?: boolean;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={f.id}
      aria-labelledby={`${f.id}-h`}
      className={clsx(
        "section-pad relative scroll-mt-20 overflow-hidden",
        dark ? "bg-ink text-[#F2F6F3]" : tone === "kv" ? "bg-kv text-text" : "bg-paper text-text",
      )}
    >
      <div className={clsx("container-site flex flex-wrap items-center gap-[clamp(40px,6vw,88px)]", reverse && "flex-row-reverse")}>
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
          <SlideIn>
            <p className={clsx("eyebrow", dark ? "text-lime-brand" : "text-emerald-deep")}>{f.eyebrow}</p>
          </SlideIn>
          <h2 id={`${f.id}-h`} className="h-section">
            <MaskRise delay={0.1}>{f.title}</MaskRise>
          </h2>
          {f.body.map((p, i) => (
            <Reveal key={i} delay={0.15 + i * 0.05}>
              <p className={clsx("max-w-[600px] text-[17px] leading-[1.75]", dark ? "text-[#B9C8C0]" : "text-text-muted")}>{p}</p>
            </Reveal>
          ))}
          {f.points && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {f.points.map((pt, i) => (
                <Reveal as="li" key={pt} delay={0.2 + i * 0.05} className="flex items-start gap-3 text-[15.5px] leading-snug">
                  <span className={clsx("mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full", dark ? "bg-lime-brand/15 text-lime-brand" : "bg-emerald-brand/15 text-emerald-deep")}>
                    <Check aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  <span className={dark ? "text-[#E8F0EC]" : "text-text"}>{pt}</span>
                </Reveal>
              ))}
            </ul>
          )}
          {actions && (
            <Reveal delay={0.3} className="flex flex-wrap items-center gap-3.5 pt-2">
              {actions}
            </Reveal>
          )}
        </div>
        {f.image && (
          <Reveal delay={0.1} className="relative aspect-[4/3] min-w-0 flex-[1_1_420px] overflow-hidden rounded-[28px] shadow-[0_40px_100px_-50px_rgba(0,0,0,.6)]">
            <Image quality={90} src={f.image.src} alt={f.image.alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover transition-transform duration-[1.2s] hover:scale-[1.04]" />
            {f.image.tag && (
              <span className="mono-label absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] text-lime-brand backdrop-blur-md">{f.image.tag}</span>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Muted card for content that is still being collected (awards, testimonials, reports…). */
export function PlaceholderCard({ title, body, dark }: { title: string; body: string; dark?: boolean }) {
  return (
    <div
      className={clsx(
        "flex h-full flex-col gap-3 rounded-[22px] border border-dashed p-6",
        dark ? "border-white/[0.16] bg-white/[0.02]" : "border-text/20 bg-white/50",
      )}
    >
      <span className={clsx("font-display text-lg font-semibold", dark ? "text-[#E8F0EC]" : "text-text")}>{title}</span>
      <span className="placeholder text-[15px] leading-relaxed">{body}</span>
    </div>
  );
}

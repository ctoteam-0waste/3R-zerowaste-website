import type { Metadata } from "next";
import Image from "next/image";
import { Award, Quote } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ImpactDashboard } from "@/components/sections/ImpactDashboard";
import { VideoCard } from "@/components/sections/VideoCard";
import { Partners } from "@/components/sections/Partners";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, impactAreas, testimonials } from "@/content/pages";
import { impactGallery } from "@/content/home";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/impact" },
  title: "Impact",
  description: "Environmental, social and community impact from 3R ZeroWaste programmes across businesses, housing societies and schools.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title={
          <>
            Impact you can count. <span className="grad-text">Not just claim.</span>
          </>
        }
        intro="Verified engagements across businesses, industries, residential communities and schools — and the environmental, social and community outcomes they create."
        image={{ src: "/images/impact/plogging-drive.webp", alt: "Volunteers beside filled collection bags in a park" }}
        jumps={[
          { label: "Impact Dashboard", href: "#dashboard" },
          { label: "Environmental", href: "#environmental" },
          { label: "Social", href: "#social" },
          { label: "Community", href: "#community" },
        ]}
      />

      <div id="dashboard" className="scroll-mt-20">
        <ImpactDashboard />
      </div>

      {impactAreas.map((a, i) => (
        <FeatureSection key={a.id} f={a} tone={i === 1 ? "dark" : "light"} reverse={i % 2 === 1} />
      ))}

      {/* Photo wall */}
      <section aria-labelledby="gallery-h" className="section-pad bg-ink-2 text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="gallery-h" tone="dark" eyebrow="On the ground" title="Moments from our programmes" />
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {impactGallery.map((p, i) => (
              <Reveal as="li" key={p.src} delay={(i % 3) * 0.06} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[22px]">
                <Image quality={90} src={p.src} alt={p.alt} width={720} height={i % 3 === 1 ? 900 : 540} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3.5 pt-10">
                  <span className="mono-label block text-[10px] text-lime-brand">{p.tag}</span>
                  <span className="block text-sm text-[#E8F0EC]">{p.caption}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials + video */}
      <section aria-labelledby="voices-h" className="section-pad bg-paper text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="voices-h" eyebrow="Testimonials" title="In their words" />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08} className="flex h-full flex-col gap-5 rounded-[24px] bg-white p-7 shadow-[0_20px_60px_-40px_rgba(11,23,18,.35)]">
                <Quote aria-hidden className="h-7 w-7 text-emerald-brand" />
                <p className="flex-1 text-[17px] leading-relaxed text-text">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex flex-col">
                  <span className="font-semibold text-text">{t.name}</span>
                  <span className="text-sm text-text-muted">{t.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
              <p className="eyebrow text-emerald-deep">Watch</p>
              <h3 className="font-display text-[clamp(26px,3vw,40px)] font-semibold leading-tight tracking-[-0.03em]">
                See how everyday gestures become measurable impact.
              </h3>
            </div>
            <div className="min-w-0 flex-[1.4_1_420px]">
              <VideoCard videoId={site.karmaverseVideoId} />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & awards */}
      <section aria-labelledby="awards-h" className="section-pad bg-forest text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="awards-h" tone="dark" eyebrow="Achievements & Awards" title="Recognition along the way" />
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 0.08} className={`flex h-full flex-col gap-4 rounded-[24px] border bg-white/[0.03] p-7 ${a.title.startsWith("[") ? "border-dashed border-white/20" : "border-lime-brand/40"}`}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-brand/15 text-lime-brand">
                  <Award aria-hidden className="h-6 w-6" />
                </span>
                <span className={a.title.startsWith("[") ? "placeholder font-display text-lg" : "font-display text-lg font-semibold text-[#F2F6F3]"}>{a.title}</span>
                <span className={a.title.startsWith("[") ? "placeholder text-[15px]" : "text-[15px] text-[#A9BBB2]"}>{a.body}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Partners />
    </>
  );
}

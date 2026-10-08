import type { Metadata } from "next";
import { Coins, Gift, GraduationCap, Leaf, ListChecks, Recycle, Trophy, Users, Wallet } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PlayStoreBadge } from "@/components/layout/Footer";
import { KarmaVerse } from "@/components/sections/KarmaVerse";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { kvEcosystem, kvFeatures, kvFlow } from "@/content/pages";
import { metrics } from "@/content/home";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "KarmaVerse",
  description: "KarmaVerse is India's sustainability rewards ecosystem by 3RZeroWaste — turn sustainable actions into KarmaCoins and real rewards.",
};

const featureIcons = [Recycle, GraduationCap, Users, Trophy, Gift, Leaf, ListChecks, Wallet];

export default function KarmaVersePage() {
  return (
    <>
      <PageHero
        eyebrow="KarmaVerse by 3RZeroWaste"
        title={
          <>
            Smart sustainability. <span className="grad-text">Real rewards.</span>
          </>
        }
        intro="KarmaVerse rewards every sustainable action — schedule green pickups, sharpen your green knowledge with the AI-powered eco-quiz, and turn it all into KarmaCoins with real, measurable impact."
        actions={
          <>
            <PlayStoreBadge />
            <Button href={site.karmaverseUrl} external variant="ghost" arrow>
              Visit karmaverse.earth
            </Button>
          </>
        }
        jumps={[
          { label: "What is KarmaVerse?", href: "#what" },
          { label: "How it Works", href: "#how" },
          { label: "Features", href: "#features" },
          { label: "Impact", href: "#impact" },
        ]}
      />

      <div id="what" className="scroll-mt-20">
        <KarmaVerse />
      </div>

      <section id="how" aria-labelledby="how-h" className="section-pad scroll-mt-20 bg-ink text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-14">
          <SectionHeading id="how-h" tone="dark" eyebrow="How it Works" title="Sustainable actions, AI-enabled rewards" />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kvFlow.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="group relative flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-lime-brand/50">
                <span className="font-display text-[56px] font-semibold leading-none text-lime-brand/90">{i + 1}</span>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#A9BBB2]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" aria-labelledby="feat-h" className="section-pad scroll-mt-20 bg-paper text-text">
        <div className="container-site flex flex-col gap-14">
          <SectionHeading id="feat-h" eyebrow="Features" title="Learn. Act. Earn." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kvFeatures.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <Reveal as="li" key={f.title} delay={(i % 4) * 0.06} className="flex flex-col gap-4 rounded-[24px] bg-white p-7 shadow-[0_20px_60px_-40px_rgba(11,23,18,.35)] transition-transform duration-500 hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-brand/40 text-emerald-deep">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="text-[15px] leading-relaxed text-text-muted">{f.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="impact" aria-labelledby="kvi-h" className="section-pad scroll-mt-20 bg-kv text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading
            id="kvi-h"
            eyebrow="Impact"
            title="One platform connecting every sustainability stakeholder"
            aside={
              <p className="max-w-[420px] text-[17px] leading-[1.7] text-[#33413B]">
                Every sustainable action on KarmaVerse generates value — for the person who acts, the community around them and the planet.
              </p>
            }
          />
          <Reveal className="flex flex-wrap gap-2.5">
            {kvEcosystem.map((e) => (
              <span key={e} className="rounded-full bg-text px-5 py-3 text-sm font-semibold text-[#F2F6F3]">
                {e}
              </span>
            ))}
          </Reveal>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="flex flex-col gap-2 rounded-[24px] bg-white/70 p-7">
                <dd className="font-display text-[48px] font-semibold leading-none tracking-[-0.04em]">
                  {m.value}
                  <span className="text-emerald-deep">{m.suffix}</span>
                </dd>
                <dt className="text-sm font-semibold text-text-muted">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
          <Reveal className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-text p-[clamp(24px,3.5vw,44px)] text-[#F2F6F3]">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-brand text-text">
                <Coins aria-hidden className="h-6 w-6" />
              </span>
              <p className="font-display text-[clamp(20px,2.2vw,28px)] font-semibold leading-tight">
                Start your journey — <span className="text-lime-brand">+500 KarmaCoins on signup.</span>
              </p>
            </div>
            <PlayStoreBadge />
          </Reveal>
        </div>
      </section>
    </>
  );
}

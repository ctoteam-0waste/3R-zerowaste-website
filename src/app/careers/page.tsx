import type { Metadata } from "next";
import { Briefcase, HeartHandshake, Lightbulb, Sprout } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openPositions } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers",
  description: "Open positions at 3R ZeroWaste — build technology and programmes that turn everyday actions into measurable climate impact.",
};

const reasons = [
  { title: "Real-world impact", body: "Your work shows up as material recovered, communities engaged and emissions avoided.", Icon: Sprout },
  { title: "Tech meets ground", body: "Work across a rewards app, data platform and on-ground operations.", Icon: Lightbulb },
  { title: "Human-centred", body: "We design for people first — users, pickup partners and each other.", Icon: HeartHandshake },
];

export default function CareersPage() {
  const cvMail = `mailto:${site.footerEmail}?subject=${encodeURIComponent("Job application — 3R ZeroWaste")}`;
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Do good work that <span className="grad-text">does good.</span>
          </>
        }
        intro="Join the team building India's sustainability rewards ecosystem and helping organisations turn sustainable intent into measurable impact."
        image={{ src: "/images/impact/corporate-session.webp", alt: "Large group of participants in a conference hall" }}
        actions={
          <Button href="#positions" arrow>
            View open positions
          </Button>
        }
      />

      <section aria-labelledby="why-join-h" className="section-pad bg-paper text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="why-join-h" eyebrow="Why join us" title="Work that leaves the planet better" />
          <div className="grid gap-4 md:grid-cols-3">
            {reasons.map(({ title, body, Icon }, i) => (
              <Reveal key={title} delay={i * 0.08} className="flex flex-col gap-4 rounded-[24px] bg-white p-7 shadow-[0_20px_60px_-40px_rgba(11,23,18,.35)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-brand/40 text-emerald-deep">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="text-[15px] leading-relaxed text-text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="positions" aria-labelledby="pos-h" className="section-pad scroll-mt-20 bg-ink text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-10">
          <SectionHeading id="pos-h" tone="dark" eyebrow="Open positions" title="Current openings" />
          {openPositions.length > 0 ? (
            <ul className="flex flex-col border-b border-white/10">
              {openPositions.map((p) => (
                <Reveal as="li" key={p.title} className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-6">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                    <span className="text-sm text-text-dim">{[p.team, p.location, p.type].join(" · ")}</span>
                  </div>
                  <Button href={p.applyUrl || cvMail} external={Boolean(p.applyUrl)} variant="ghost" arrow>
                    Apply
                  </Button>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-dashed border-white/20 bg-white/[0.03] p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-lime-brand/15 text-lime-brand">
                  <Briefcase aria-hidden className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="font-display text-xl font-semibold">No open positions right now</p>
                  <p className="text-[15px] text-[#A9BBB2]">We&apos;re always happy to hear from people who care about climate. Send us your CV and we&apos;ll reach out when a role fits.</p>
                </div>
              </div>
              <Button href={cvMail} arrow>
                Send your CV
              </Button>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

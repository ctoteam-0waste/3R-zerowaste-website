import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSolution, solutionDetails } from "@/content/solutionDetails";
import { getPosts } from "@/lib/content";

export function generateStaticParams() {
  return solutionDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSolution((await params).slug);
  return s ? { title: `${s.title} Solutions`, description: s.intro, alternates: { canonical: `/solutions/${s.slug}` } } : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const index = solutionDetails.indexOf(s);
  const posts = getPosts();
  const related = s.related.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const others = solutionDetails.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        eyebrow={`Solutions · ${String(index + 1).padStart(2, "0")} — ${s.title}`}
        title={s.tagline}
        intro={s.intro}
        actions={
          <>
            <Button href={s.cta?.href ?? "/contact"} arrow>
              {s.cta?.label ?? "Talk to us"}
            </Button>
            <Button href="/solutions" variant="ghost">
              All solutions
            </Button>
          </>
        }
        jumps={[
          { label: "Overview", href: "#overview" },
          { label: "What we deliver", href: "#deliver" },
          { label: "How it works", href: "#how-it-works" },
          { label: "Outcomes", href: "#outcomes" },
        ]}
      />

      {/* Challenge vs approach */}
      <section id="overview" aria-labelledby="overview-h" className="section-pad scroll-mt-20 bg-paper text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="overview-h" eyebrow="Overview" title={`Why ${s.title} matters`} />
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="flex flex-col gap-4 rounded-[26px] border border-text/[0.08] bg-white p-8">
              <span className="mono-label text-[11px] text-text-muted">The challenge</span>
              <p className="text-[17px] leading-[1.75] text-text-muted">{s.challenge}</p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-4 rounded-[26px] bg-text p-8 text-[#F2F6F3]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime-brand text-text">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="mono-label text-[11px] text-lime-brand">The 3R approach</span>
              </div>
              <p className="text-[17px] leading-[1.75] text-[#C3D1CA]">{s.approach}</p>
            </Reveal>
          </div>
          {s.proof && (
            <dl className="grid gap-4 sm:grid-cols-2">
              {s.proof.map((p, i) => (
                <Reveal key={p.label} delay={i * 0.08} className="flex items-baseline gap-4 rounded-[22px] bg-lime-brand/40 px-7 py-6">
                  <dd className="font-display text-[clamp(32px,3.4vw,44px)] font-semibold leading-none tracking-[-0.03em]">{p.value}</dd>
                  <dt className="text-[15px] font-medium text-[#33413B]">{p.label}</dt>
                </Reveal>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* Offerings */}
      <section id="deliver" aria-labelledby="deliver-h" className="section-pad scroll-mt-20 bg-ink text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="deliver-h" tone="dark" eyebrow="What we deliver" title="Services within this solution" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 3) * 0.08} className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-lime-brand/50">
                <span className="font-mono text-xs text-lime-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl font-semibold">{o.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#A9BBB2]">{o.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section id="how-it-works" aria-labelledby="how-h" className="section-pad scroll-mt-20 bg-paper text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="how-h" eyebrow="How it works" title="From first conversation to measurable results" />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 0.08} className="relative flex flex-col gap-3 rounded-[24px] bg-white p-7 shadow-[0_20px_60px_-40px_rgba(11,23,18,.35)]">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-text font-display text-lg font-semibold text-lime-brand">{i + 1}</span>
                <h3 className="font-display text-xl font-semibold">{st.title}</h3>
                <p className="text-[15px] leading-relaxed text-text-muted">{st.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcomes + audience */}
      <section id="outcomes" aria-labelledby="outcomes-h" className="section-pad scroll-mt-20 bg-kv text-text">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-7">
            <SectionHeading id="outcomes-h" eyebrow="Outcomes" title="What you can expect" />
            <ul className="flex flex-col gap-3">
              {s.outcomes.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 0.06} className="flex items-center gap-3 rounded-2xl bg-white/70 px-5 py-4 text-[16px] font-medium">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-emerald-brand/20 text-emerald-deep">
                    <Check aria-hidden className="h-4 w-4" />
                  </span>
                  {o}
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-7">
            <Reveal>
              <p className="eyebrow text-emerald-deep">Who it&apos;s for</p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-2.5">
              {s.audience.map((a) => (
                <span key={a} className="rounded-full bg-text px-5 py-3 text-sm font-semibold text-[#F2F6F3]">
                  {a}
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-auto flex flex-col gap-5 rounded-[26px] bg-text p-8 text-[#F2F6F3]">
              <p className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight tracking-[-0.02em]">
                Ready to explore {s.title} with 3R?
              </p>
              <p className="text-[15px] text-[#A9BBB2]">Tell us about your organisation and goals — we&apos;ll suggest the right starting point.</p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" arrow>
                  Talk to us
                </Button>
                {s.cta && (
                  <Button href={s.cta.href} variant="ghost">
                    {s.cta.label}
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-h" className="section-pad bg-paper text-text">
          <div className="container-site flex flex-col gap-12">
            <SectionHeading id="related-h" eyebrow="Insights" title="Further reading" />
            <ul className="grid gap-7 md:grid-cols-2">
              {related.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 0.06}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Other solutions */}
      <section aria-labelledby="others-h" className="bg-paper pb-[clamp(80px,10vw,128px)] text-text">
        <div className="container-site flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-text/10 pt-12">
            <h2 id="others-h" className="font-display text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.02em]">
              Explore other solutions
            </h2>
            <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-deep hover:underline">
              <ArrowLeft aria-hidden className="h-4 w-4" /> Back to all solutions
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o, i) => (
              <Reveal as="li" key={o.slug} delay={i * 0.05}>
                <Link
                  href={`/solutions/${o.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-[22px] border border-text/[0.08] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-emerald-brand/40 hover:shadow-[0_30px_60px_-40px_rgba(11,40,28,.5)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-text text-lime-brand transition-transform duration-300 group-hover:-rotate-6">
                    <Icon name={o.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-semibold">{o.title}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-deep">
                    Explore <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

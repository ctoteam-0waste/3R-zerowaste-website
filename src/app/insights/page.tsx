import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Quote } from "lucide-react";
import { getPosts } from "@/lib/content";
import { news, reports } from "@/content/pages";

export const metadata: Metadata = {
  alternates: { canonical: "/insights" },
  title: "Insights",
  description: "Blog, reports, research and news from 3R ZeroWaste and KarmaVerse.",
};

/** In-depth explainers shown under Research. */
const researchSlugs = ["brsr-core-explained", "scope-1-2-3-emissions-guide", "epr-plastic-packaging-primer"];

export default function InsightsPage() {
  const posts = getPosts();
  const latest = posts.slice(0, 3);
  const research = researchSlugs.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Ideas, evidence and news for a <span className="grad-text">circular future.</span>
          </>
        }
        intro="Perspectives on ESG, circular economy, EPR and carbon, plus our reports, research and latest news — from the 3R and KarmaVerse team."
        jumps={[
          { label: "Blog", href: "#blog" },
          { label: "Reports", href: "#reports" },
          { label: "Research", href: "#research" },
          { label: "News", href: "#news" },
          { label: "Events", href: "/events" },
        ]}
      />

      <section id="blog" aria-labelledby="ins-blog-h" className="section-pad scroll-mt-20 bg-paper text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading
            id="ins-blog-h"
            eyebrow="Blog"
            title="Latest articles"
            aside={
              <Button href="/blog" variant="dark" arrow>
                All articles
              </Button>
            }
          />
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="reports" aria-labelledby="reports-h" className="section-pad scroll-mt-20 bg-ink text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-10">
          <SectionHeading id="reports-h" tone="dark" eyebrow="Reports" title="Impact & activity reports" />
          {reports.map((r) => (
            <Reveal key={r.title} as="article" className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-[clamp(20px,3vw,40px)]">
              <span className="mono-label text-[11px] text-lime-brand">{r.period}</span>
              <h3 className="max-w-[820px] font-display text-[clamp(22px,2.4vw,32px)] font-semibold leading-tight tracking-[-0.02em]">{r.title}</h3>
              <p className="max-w-[720px] text-[16px] leading-[1.7] text-[#B9C8C0]">{r.summary}</p>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {r.stats.map((st) => (
                  <div key={st.label} className="flex flex-col gap-1 rounded-2xl border border-white/10 px-4 py-4">
                    <dd className="font-display text-[28px] font-semibold leading-none text-lime-brand">{st.value}</dd>
                    <dt className="text-[13px] text-[#A9BBB2]">{st.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="research" aria-labelledby="research-h" className="section-pad scroll-mt-20 bg-paper text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading
            id="research-h"
            eyebrow="Research"
            title="Research & in-depth guides"
            aside={
              <p className="max-w-[420px] text-[17px] leading-[1.7] text-text-muted">
                Plain-language deep dives on the frameworks behind ESG reporting, carbon accounting and producer responsibility in India.
              </p>
            }
          />
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {research.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="news" aria-labelledby="news-h" className="section-pad scroll-mt-20 bg-ink text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-10">
          <SectionHeading id="news-h" tone="dark" eyebrow="News" title="In the news" />
          {news.map((n) => (
            <Reveal key={n.title} as="article" className="grid gap-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-[clamp(20px,3vw,36px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
              <div className="overflow-hidden rounded-[18px] bg-white">
                <Image quality={90} src={n.image} alt={`${n.outlet} newspaper clipping: ${n.title}`} width={540} height={386} sizes="(max-width: 1024px) 92vw, 560px" className="h-auto w-full" />
              </div>
              <div className="flex flex-col gap-5">
                <span className="mono-label text-[11px] text-lime-brand">
                  {n.outlet} · {n.date}
                </span>
                <h3 className="font-display text-[clamp(22px,2.4vw,32px)] font-semibold leading-tight tracking-[-0.02em]">{n.title}</h3>
                <p className="text-[16px] leading-[1.7] text-[#B9C8C0]">{n.summary}</p>
                <blockquote className="flex gap-3 border-l-2 border-lime-brand pl-4">
                  <Quote aria-hidden className="mt-1 h-5 w-5 flex-none text-lime-brand" />
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] italic leading-[1.65] text-[#E8F0EC]">&ldquo;{n.quote}&rdquo;</p>
                    <cite className="text-sm not-italic text-text-dim">— {n.quoteBy}</cite>
                  </div>
                </blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

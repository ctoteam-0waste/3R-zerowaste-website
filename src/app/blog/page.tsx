import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Newsletter } from "@/components/blog/Newsletter";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Insights & Blog",
  description: "Perspectives on ESG, circular economy, EPR, carbon and the behaviour change behind real impact — from the 3R and KarmaVerse team.",
};

export default function BlogPage() {
  return (
    <>
      <section aria-labelledby="blog-title" className="relative isolate -mt-[76px] overflow-hidden bg-ink pb-10 pt-[calc(76px+clamp(72px,9vw,120px))] text-[#F2F6F3]">
        <span aria-hidden className="absolute right-[6%] top-[10%] -z-10 h-[380px] w-[380px] rounded-full bg-emerald-brand opacity-50 blur-[40px]" />
        <span aria-hidden className="absolute right-[26%] top-[40%] -z-10 h-[220px] w-[220px] rounded-full bg-lime-brand opacity-30 blur-[40px]" />
        <div className="container-site flex flex-col gap-7">
          <p className="mono-label text-xs text-lime-brand">Insights &amp; Blog</p>
          <h1 id="blog-title" className="max-w-[980px] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ fontSize: "clamp(42px, 6vw, 92px)" }}>
            Ideas for a circular, <span className="grad-text">measurable</span> future.
          </h1>
          <p className="max-w-[620px] leading-relaxed text-[#C3D1CA]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Perspectives on ESG, circular economy, EPR, carbon and the behaviour change behind real impact — from the 3R and KarmaVerse team.
          </p>
        </div>
      </section>
      <BlogIndex posts={getPosts()} />
      <Newsletter />
    </>
  );
}

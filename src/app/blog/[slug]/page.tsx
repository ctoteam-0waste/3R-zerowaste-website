import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { PostCard, PostCover } from "@/components/blog/PostCard";
import { Newsletter } from "@/components/blog/Newsletter";
import { JsonLd, absolute, breadcrumbs, publisher } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      section: post.category,
      authors: post.author ? [post.author] : undefined,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: post.image ? [post.image] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const all = getPosts().filter((p) => p.slug !== post.slug);
  const related = [...all.filter((p) => p.category === post.category), ...all.filter((p) => p.category !== post.category)].slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.summary,
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.category,
            author: { "@type": post.author && !/team/i.test(post.author) ? "Person" : "Organization", name: post.author || "3R ZeroWaste" },
            publisher,
            image: post.image ? [absolute(post.image)] : undefined,
            mainEntityOfPage: absolute(`/blog/${post.slug}`),
            inLanguage: "en-IN",
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <section aria-labelledby="post-title" className="relative isolate -mt-[76px] overflow-hidden bg-ink pb-16 pt-[calc(76px+clamp(56px,7vw,96px))] text-[#F2F6F3]">
        <span aria-hidden className="absolute right-[6%] top-[10%] -z-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(43,208,139,.55)_0%,rgba(43,208,139,.18)_45%,transparent_70%)]" />
        <div className="container-site flex max-w-[960px] flex-col gap-6">
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-lime-brand hover:text-white">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All articles
          </Link>
          <p className="mono-label text-xs text-lime-brand">{post.category}</p>
          <h1 id="post-title" className="font-semibold leading-[1.02] tracking-[-0.035em]" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            {post.title}
          </h1>
          {post.summary && <p className="max-w-[720px] text-lg leading-relaxed text-[#C3D1CA]">{post.summary}</p>}
          <p className="mono-label text-[11px] text-[#8EA198]">
            {formatDate(post.date)} · {post.readTime} read{post.author ? ` · ${post.author}` : ""}
          </p>
        </div>
      </section>

      <article className="bg-paper pb-24 pt-14 text-text">
        <div className="container-site flex max-w-[960px] flex-col gap-12">
          {post.image ? (
            <figure className="flex flex-col gap-3">
              <div className="relative aspect-video overflow-hidden rounded-[28px]">
                <Image quality={90} src={post.image} alt="" fill priority unoptimized={post.image.endsWith(".svg")} sizes="(max-width: 960px) 100vw, 960px" className="object-cover" />
              </div>
              {post.imageCredit && <figcaption className="text-right text-xs text-[#6C7871]">{post.imageCredit}</figcaption>}
            </figure>
          ) : (
            <PostCover post={post} className="aspect-[21/9]" />
          )}
          <div className="prose-3r mx-auto w-full max-w-[720px]" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="more-h" className="bg-paper pb-24 text-text">
          <div className="container-site flex flex-col gap-9">
            <h2 id="more-h" className="border-t border-text/[0.12] pt-7 text-[28px] font-medium">
              Keep reading
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-7">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <Newsletter />
    </>
  );
}

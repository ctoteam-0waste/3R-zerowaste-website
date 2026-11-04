import "server-only";
import type { Post } from "@/content/posts";
import { site } from "@/content/site";
import { blogCtaAbsolute } from "@/lib/blogCta";

/**
 * Public blog feed shared with other sites (karmaverse.earth reads it).
 * 0waste.co.in stays the single place where posts are written: add, edit or delete a
 * post in /admin and every site that reads this feed updates on the next deploy.
 */

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
};

const abs = (p?: string) => (!p ? undefined : p.startsWith("http") ? p : `${site.url}${p.startsWith("/") ? "" : "/"}${p}`);

export function feedItem(p: Post) {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.category,
    date: p.date,
    readTime: p.readTime,
    author: p.author ?? null,
    image: abs(p.image) ?? null,
    imageCredit: p.imageCredit ?? null,
    featured: Boolean(p.featured),
    keywords: p.keywords ?? [],
    url: `${site.url}/blog/${p.slug}`,
    cta: blogCtaAbsolute(p.category),
  };
}

/** Article HTML with site-relative links/images made absolute, so they work when shown on another domain. */
export function absoluteHtml(html: string) {
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${site.url}/`);
}

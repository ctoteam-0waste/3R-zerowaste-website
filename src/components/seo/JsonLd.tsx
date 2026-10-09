import { site } from "@/content/site";

/** Renders schema.org structured data for search engines. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const absolute = (p: string) => (p.startsWith("http") ? p : `${site.url}${p.startsWith("/") ? "" : "/"}${p}`);

export const publisher = {
  "@type": "Organization",
  name: site.name,
  logo: { "@type": "ImageObject", url: absolute("/images/brand/logo-full.png") },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absolute(it.path) })),
  };
}

import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getEvents, getPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/blog", "/events", "/about", "/solutions", "/karmaverse", "/impact", "/insights", "/careers", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "/blog" || p === "/events" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.6,
  }));
  const { upcoming, past } = getEvents();
  const posts: MetadataRoute.Sitemap = getPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.5,
  }));
  const events: MetadataRoute.Sitemap = [...upcoming, ...past].map((e) => ({
    url: `${site.url}/events/${e.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));
  return [...pages, ...posts, ...events];
}

import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { blogCategories, type BlogCategory, type Post, type PostWithBody } from "@/content/posts";
import type { CompanyEvent, CompanyEventWithBody } from "@/content/events";

/**
 * Reads blog posts and events from Markdown files in `content/blog` and `content/events`.
 * The file name (minus `.md`) is the URL slug. Files starting with `_` are ignored (drafts / templates).
 */
const ROOT = path.join(process.cwd(), "content");
const IST = "+05:30";

function readDir(dir: string) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, f), "utf8"));
      return { slug: f.replace(/\.md$/, ""), data, content };
    });
}

/** YAML turns unquoted dates into Date objects — normalise everything back to YYYY-MM-DD. */
function isoDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v == null ? "" : String(v);
}

function str(v: unknown): string | undefined {
  return v == null || v === "" ? undefined : String(v);
}

function readTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

function render(body: string) {
  return marked.parse(body, { async: false, gfm: true }) as string;
}

/* ---------- Blog ---------- */

function toPost(slug: string, data: Record<string, unknown>, body: string): Post {
  const category = blogCategories.includes(data.category as never) && data.category !== "All" ? (data.category as BlogCategory) : "ESG";
  const cover = [1, 2, 3, 4].includes(Number(data.cover)) ? (Number(data.cover) as Post["cover"]) : 1;
  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    category,
    date: isoDate(data.date),
    readTime: str(data.readTime) ?? readTime(body),
    author: str(data.author),
    cover,
    image: str(data.image),
    imageCredit: str(data.imageCredit),
    featured: data.featured === true,
  };
}

/** All published posts, newest first. */
export function getPosts(): Post[] {
  return readDir("blog")
    .filter(({ data }) => data.draft !== true)
    .map(({ slug, data, content }) => toPost(slug, data, content))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): PostWithBody | null {
  const hit = readDir("blog").find((p) => p.slug === slug && p.data.draft !== true);
  return hit ? { ...toPost(hit.slug, hit.data, hit.content), html: render(hit.content) } : null;
}

/* ---------- Events ---------- */

function toEvent(slug: string, data: Record<string, unknown>): CompanyEvent {
  const date = isoDate(data.date);
  return {
    slug,
    title: String(data.title ?? slug),
    type: String(data.type ?? "Event"),
    summary: String(data.summary ?? ""),
    date,
    endDate: isoDate(data.endDate) || date,
    time: str(data.time),
    venue: String(data.venue ?? ""),
    registerUrl: str(data.registerUrl),
    image: str(data.image),
  };
}

/** True once the event's last day (IST) is over. */
export function isPast(e: CompanyEvent, now = Date.now()) {
  return Date.parse(`${e.endDate}T23:59:59${IST}`) < now;
}

/** Upcoming (soonest first) and past (most recent first) events. */
export function getEvents() {
  const all = readDir("events")
    .filter(({ data }) => data.draft !== true)
    .map(({ slug, data }) => toEvent(slug, data));
  const now = Date.now();
  return {
    upcoming: all.filter((e) => !isPast(e, now)).sort((a, b) => a.date.localeCompare(b.date)),
    past: all.filter((e) => isPast(e, now)).sort((a, b) => b.date.localeCompare(a.date)),
  };
}

export function getEvent(slug: string): CompanyEventWithBody | null {
  const hit = readDir("events").find((e) => e.slug === slug && e.data.draft !== true);
  return hit ? { ...toEvent(hit.slug, hit.data), html: render(hit.content) } : null;
}

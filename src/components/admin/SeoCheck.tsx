"use client";

import { Check, X } from "lucide-react";

const STOP = new Set(["a", "an", "the", "in", "of", "for", "to", "and", "on", "at", "by", "with", "is", "your", "our"]);

/** Lowercase words only, no Markdown/punctuation/stop words — so "Company in India" matches "company-india" and "**company in India**". */
const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/\]\([^)]*\)/g, " ") // drop link targets, keep link text
    .replace(/'s\b/g, "")
    .split(/[^a-z0-9ऀ-ॿ]+/)
    .filter((w) => w && !STOP.has(w))
    .join(" ")} `;

/** Live SEO checklist for the blog editor. */
export function SeoCheck({ title, summary, body, keyword, slug }: { title: string; summary: string; body: string; keyword: string; slug: string }) {
  const kw = norm(keyword).trim();
  const needle = ` ${kw} `;
  const words = body.split(/\s+/).filter(Boolean).length;
  const firstWords = body.split(/\s+/).slice(0, 100).join(" ");
  const h2s = body.match(/^#{2,3}\s.+$/gm) ?? [];
  const internal = (body.match(/\]\(\/[^)]*\)/g) ?? []).length;
  const uses = kw ? norm(body).split(needle).length - 1 : 0;
  const has = (s: string) => Boolean(kw) && norm(s).includes(needle);

  const checks: { ok: boolean; label: string }[] = [
    { ok: Boolean(kw), label: kw ? `Checking for “${keyword.trim()}”` : "Focus keyword is empty — fill it in below" },
    { ok: title.length >= 30 && title.length <= 65, label: `Title length ${title.length}/65` },
    { ok: has(title), label: "Keyword in title" },
    { ok: summary.length >= 120 && summary.length <= 165, label: `Summary length ${summary.length} (120–165)` },
    { ok: has(summary), label: "Keyword in summary" },
    { ok: has(slug.replace(/-/g, " ")), label: "Keyword in URL" },
    { ok: has(firstWords), label: "Keyword in first 100 words" },
    { ok: h2s.some(has), label: "Keyword in a heading" },
    { ok: uses >= 3, label: `Keyword used ${uses}× (3+)` },
    { ok: words >= 600, label: `${words} words (600+)` },
    { ok: h2s.length >= 3, label: `${h2s.length} section headings (3+)` },
    { ok: internal >= 2, label: `${internal} internal links (2+)` },
    { ok: /^##\s+(frequently asked questions|faq)/im.test(body), label: "FAQ section (Google rich result)" },
  ];
  const score = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-sm font-semibold">
        SEO check
        <span className={`rounded-full px-2.5 py-0.5 text-xs ${score >= 80 ? "bg-lime-brand/60" : score >= 50 ? "bg-amber-100" : "bg-red-50 text-red-700"}`}>{score}%</span>
      </div>
      <ul className="flex flex-col gap-1.5 text-[13px]">
        {checks.map((c) => (
          <li key={c.label} className={`flex items-start gap-2 ${c.ok ? "" : "text-text-muted"}`}>
            {c.ok ? <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-deep" /> : <X aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />}
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

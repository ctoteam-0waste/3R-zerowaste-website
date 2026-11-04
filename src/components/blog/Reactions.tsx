"use client";

import { useEffect, useState } from "react";

type Counts = { like: number; love: number; recycle: number };
const KINDS: { key: keyof Counts; emoji: string; label: string }[] = [
  { key: "like", emoji: "👍", label: "Useful" },
  { key: "love", emoji: "💚", label: "Loved it" },
  { key: "recycle", emoji: "♻️", label: "Will try this" },
];

const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string | null) {
    try {
      if (v === null) localStorage.removeItem(k);
      else localStorage.setItem(k, v);
    } catch {
      /* private mode */
    }
  },
};

/** "Was this helpful?" reactions + counts a view of the post. */
export function Reactions({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [mine, setMine] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMine(new Set((store.get(`3r-react:${slug}`) ?? "").split(",").filter(Boolean)));
    fetch(`/api/blog/stats?slug=${slug}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => j && setCounts(j.reactions))
      .catch(() => {});
    // count the view once per browser session
    const seen = `3r-viewed:${slug}`;
    try {
      if (sessionStorage.getItem(seen)) return;
      sessionStorage.setItem(seen, "1");
    } catch {
      /* ignore */
    }
    fetch("/api/blog/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, action: "view" }), keepalive: true }).catch(() => {});
  }, [slug]);

  async function toggle(key: keyof Counts) {
    const undo = mine.has(key);
    const next = new Set(mine);
    if (undo) next.delete(key);
    else next.add(key);
    setMine(next);
    store.set(`3r-react:${slug}`, [...next].join(",") || null);
    setCounts((c) => (c ? { ...c, [key]: Math.max(0, c[key] + (undo ? -1 : 1)) } : c));
    fetch("/api/blog/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, action: "react", reaction: key, undo }) }).catch(() => {});
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">Was this helpful?</p>
      <div className="flex flex-wrap gap-2">
        {KINDS.map(({ key, emoji, label }) => {
          const on = mine.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              aria-pressed={on}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
                on ? "border-emerald-brand bg-emerald-brand/10 text-emerald-deep" : "border-text/15 bg-white text-text hover:border-emerald-brand"
              }`}
            >
              <span aria-hidden className="text-lg leading-none">{emoji}</span>
              {label}
              {counts && counts[key] > 0 && <span className="tabular-nums text-text-muted">{counts[key]}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

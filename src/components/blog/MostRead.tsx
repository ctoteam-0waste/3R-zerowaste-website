"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

type Item = { slug: string; title: string; category: string; readTime: string };

/** "Most read" — top posts by views across both websites. Hidden until there is enough data. */
export function MostRead({ posts }: { posts: Item[] }) {
  const [top, setTop] = useState<Item[]>([]);
  useEffect(() => {
    fetch("/api/blog/stats", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { mostRead: string[]; views: Record<string, number> } | null) => {
        if (!j) return;
        const total = Object.values(j.views).reduce((a, b) => a + b, 0);
        if (j.mostRead.length < 3 || total < 15) return;
        setTop(j.mostRead.map((s) => posts.find((p) => p.slug === s)).filter((p): p is Item => Boolean(p)).slice(0, 3));
      })
      .catch(() => {});
  }, [posts]);

  if (top.length < 3) return null;
  return (
    <section aria-labelledby="most-read-h" className="bg-paper pb-16 text-text">
      <div className="container-site flex flex-col gap-6">
        <h2 id="most-read-h" className="flex items-center gap-2.5 border-t border-text/[0.12] pt-7 text-[28px] font-medium">
          <TrendingUp aria-hidden className="h-6 w-6 text-emerald-deep" /> Most read
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {top.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full gap-4 rounded-[22px] border border-text/10 bg-white p-5 transition hover:border-emerald-brand">
                <span className="font-display text-4xl font-semibold leading-none text-emerald-brand/70">{i + 1}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="mono-label text-[10px] text-emerald-deep">{p.category}</span>
                  <span className="font-semibold leading-snug group-hover:underline">{p.title}</span>
                  <span className="text-xs text-text-muted">{p.readTime} read</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { blogCategories, type Post } from "@/content/posts";
import { PostCard } from "./PostCard";

export function BlogFilters({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2.5">
      {blogCategories.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={value === c}
          onClick={() => onChange(c)}
          className={clsx(
            "min-h-11 rounded-full border px-[18px] text-sm font-semibold transition-colors",
            value === c ? "border-lime-brand bg-lime-brand text-text" : "border-white/[0.18] bg-white/[0.04] text-[#D9E4DE] hover:border-lime-brand hover:text-white",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export function BlogIndex({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState<string>("All");
  const featured = posts.find((p) => p.featured);
  const list = useMemo(() => posts.filter((p) => !p.featured && (cat === "All" || p.category === cat)), [cat, posts]);

  return (
    <>
      <section className="bg-ink pb-14 text-[#F2F6F3]">
        <div className="container-site">
          <BlogFilters value={cat} onChange={setCat} />
        </div>
      </section>
      {featured && (
        <section aria-labelledby="featured-h" className="bg-paper pb-6 pt-14 text-text">
          <h2 id="featured-h" className="sr-only">Featured article</h2>
          <div className="container-site">
            <PostCard post={featured} featured />
          </div>
        </section>
      )}
      <section aria-labelledby="latest-h" className="bg-paper pb-28 pt-12 text-text">
        <div className="container-site flex flex-col gap-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-text/[0.12] pt-7">
            <h2 id="latest-h" className="text-[28px] font-medium">
              Latest articles
            </h2>
            <span className="mono-label text-[11px] text-[#5E6B65]" aria-live="polite">
              {list.length} {list.length === 1 ? "article" : "articles"}
            </span>
          </div>
          <motion.ul layout className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-x-7 gap-y-10">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <PostCard post={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>
    </>
  );
}

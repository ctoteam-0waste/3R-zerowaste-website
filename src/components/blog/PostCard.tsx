import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import type { Post } from "@/content/posts";
import { formatDate } from "@/lib/format";

const isPh = (s: string) => s.startsWith("[");

export function PostCover({ post, className }: { post: Post; className?: string }) {
  const light = post.cover === 4;
  return (
    <div className={clsx("relative isolate flex aspect-[16/10] items-start justify-between overflow-hidden rounded-[22px] p-4", className)}>
      {post.image ? (
        <Image quality={90} src={post.image} alt="" fill unoptimized={post.image.endsWith(".svg")} sizes="(max-width: 768px) 100vw, 50vw" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
      ) : (
        <span aria-hidden className={`cover-${post.cover} absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-[1.06]`} />
      )}
      <span className="mono-label rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] tracking-[0.12em] text-text">
        {post.featured ? `Featured · ${post.category}` : post.category}
      </span>
      {!post.image && (
        <span className={clsx("mono-label absolute bottom-3 right-3.5 text-[10px]", light ? "text-text/55" : "text-white/70")}>[Cover image]</span>
      )}
    </div>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        "group flex transition-transform duration-500 hover:-translate-y-1.5",
        featured ? "flex-wrap items-center gap-10" : "flex-col gap-4",
      )}
    >
      <PostCover post={post} className={featured ? "min-w-0 flex-[1.4_1_420px] aspect-video" : ""} />
      <div className={clsx("flex flex-col gap-2.5", featured && "min-w-0 flex-[1_1_320px] gap-3.5")}>
        <span className="mono-label text-[11px] text-[#5E6B65]">
          {formatDate(post.date)} · {post.readTime} read{post.author ? ` · ${post.author}` : ""}
        </span>
        <h3 className={clsx("font-medium", featured ? "leading-[1.08]" : "text-[22px] leading-[1.2]")} style={featured ? { fontSize: "clamp(28px, 3vw, 44px)" } : undefined}>
          {post.title}
        </h3>
        <p className={clsx(featured ? "text-[17px]" : "text-[15px]", "leading-relaxed", isPh(post.summary) ? "placeholder" : "text-text-muted")}>{post.summary}</p>
        <span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold">
          Read article <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

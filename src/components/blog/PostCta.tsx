import { Button } from "@/components/ui/Button";
import { blogCta } from "@/lib/blogCta";

/** Call-to-action box shown after the article — chosen by the post's category. */
export function PostCta({ category }: { category: string }) {
  const cta = blogCta(category);
  const dark = cta.kind === "service";
  return (
    <aside
      aria-labelledby="cta-h"
      className={`mx-auto flex w-full max-w-[720px] flex-col gap-4 rounded-[28px] p-[clamp(24px,4vw,40px)] ${dark ? "bg-ink text-[#F2F6F3]" : "bg-kv text-text"}`}
    >
      <p className={`mono-label text-[11px] ${dark ? "text-lime-brand" : "text-emerald-deep"}`}>{cta.eyebrow}</p>
      <h2 id="cta-h" className="font-semibold leading-[1.1] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 2.6vw, 34px)" }}>
        {cta.title}
      </h2>
      <p className={`max-w-[560px] text-base leading-relaxed ${dark ? "text-[#C3D1CA]" : "text-[#33413B]"}`}>{cta.text}</p>
      <div className="flex flex-wrap gap-3 pt-1">
        <Button href={cta.primary.href} variant={dark ? "primary" : "dark"} arrow>
          {cta.primary.label}
        </Button>
        <Button href={cta.secondary.href} variant={dark ? "ghost" : "outline"}>
          {cta.secondary.label}
        </Button>
      </div>
    </aside>
  );
}

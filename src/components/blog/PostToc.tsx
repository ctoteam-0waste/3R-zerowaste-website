/** "In this article" — jump links to each section. Shown when a post has 3+ sections. */
export function PostToc({ toc }: { toc: { id: string; text: string }[] }) {
  if (toc.length < 3) return null;
  return (
    <nav aria-label="In this article" className="mx-auto w-full max-w-[720px] rounded-[22px] border border-text/[0.1] bg-white/70 p-5 sm:p-6">
      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.08em] text-emerald-deep [&::-webkit-details-marker]:hidden">
          In this article
          <span aria-hidden className="text-lg leading-none text-text-muted transition-transform group-open:rotate-45">+</span>
        </summary>
        <ol className="mt-4 flex flex-col gap-2.5 text-[15px] leading-snug">
          {toc.map((t, i) => (
            <li key={t.id} className="flex gap-3">
              <span className="w-5 flex-none text-right font-mono text-xs leading-[1.6] text-text-muted">{i + 1}</span>
              <a href={`#${t.id}`} className="font-medium text-text underline-offset-4 hover:text-emerald-deep hover:underline">
                {t.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

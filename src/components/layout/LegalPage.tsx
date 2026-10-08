import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import type { LegalDoc } from "@/content/legal/types";

const docs = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

/** Turns email addresses into mailto links. */
function linkify(text: string): ReactNode[] {
  return text.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) =>
    i % 2 ? (
      <a key={i} href={`mailto:${part}`} className="font-semibold text-emerald-deep underline underline-offset-2">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/** Bolds a short lead-in: "Label — text", "Question? answer" or "Label: text". */
function Rich({ text }: { text: string }) {
  const cands = [
    { at: text.indexOf(" — "), keep: 0, skip: 3, max: 65 },
    { at: text.indexOf("? "), keep: 1, skip: 2, max: 70 },
    { at: text.indexOf(": "), keep: 1, skip: 2, max: 25 },
  ].filter((c) => c.at > 0 && c.at <= c.max);
  const c = cands.sort((a, b) => a.at - b.at)[0];
  if (!c) return <>{linkify(text)}</>;
  const label = text.slice(0, c.at + c.keep);
  const rest = text.slice(c.at + c.skip);
  return (
    <>
      <strong className="font-semibold text-text">{label}</strong>
      {c.skip === 3 ? " — " : " "}
      {linkify(rest)}
    </>
  );
}

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <section className="-mt-[76px] bg-paper pb-28 pt-[calc(76px+80px)] text-text">
      <div className="container-site">
        <header className="flex max-w-3xl flex-col gap-6">
          <p className="mono-label text-xs text-emerald-deep">Legal</p>
          <h1 className="h-section">{doc.title}</h1>
          <nav aria-label="Legal documents" className="flex flex-wrap gap-2">
            {docs.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                aria-current={d.href === path ? "page" : undefined}
                className={
                  d.href === path
                    ? "rounded-full bg-text px-4 py-2 text-sm font-semibold text-paper"
                    : "rounded-full border border-text/15 px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:border-emerald-deep hover:text-emerald-deep"
                }
              >
                {d.label}
              </Link>
            ))}
          </nav>
          <p className="text-lg leading-[1.7] text-text-muted">{doc.intro}</p>
        </header>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28 flex max-h-[calc(100vh-140px)] flex-col gap-0.5 overflow-y-auto pr-2">
              <span className="mono-label mb-3 text-[11px] text-text-muted">On this page</span>
              {doc.sections.map((s, i) => (
                <a
                  key={s.title}
                  href={`#s-${i + 1}`}
                  className="flex gap-2.5 rounded-lg px-2 py-1.5 text-[13.5px] leading-snug text-text-muted transition-colors hover:bg-white hover:text-emerald-deep"
                >
                  <span className="w-5 flex-none font-mono text-[11px] leading-[1.6] text-emerald-deep">{i + 1}</span>
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex max-w-3xl flex-col gap-12">
            {doc.sections.map((s, i) => (
              <article key={s.title} id={`s-${i + 1}`} className="scroll-mt-28 border-t border-text/10 pt-10 first:border-t-0 first:pt-0">
                <div className="mb-5 flex items-center gap-4">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-emerald-brand/15 font-mono text-sm font-medium text-emerald-deep">
                    {i + 1}
                  </span>
                  <h2 className="font-display text-[clamp(22px,2.2vw,28px)] font-semibold tracking-[-0.02em]">{s.title}</h2>
                </div>
                <div className="flex flex-col gap-4 text-[16px] leading-[1.75] text-text-muted">
                  {s.paras?.map((p) => <p key={p}>{linkify(p)}</p>)}
                  {s.table && (
                    <div className="overflow-x-auto rounded-2xl border border-text/10 bg-white">
                      <table className="w-full min-w-[520px] text-left text-[14.5px]">
                        <thead className="bg-text text-paper">
                          <tr>
                            {s.table[0].map((h) => (
                              <th key={h} scope="col" className="px-4 py-3 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.slice(1).map((row) => (
                            <tr key={row[0]} className="border-t border-text/10 last:bg-lime-brand/25">
                              {row.map((cell, k) => (
                                <td key={k} className={k === 0 ? "px-4 py-3 font-semibold text-text" : "px-4 py-3"}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {s.list && (
                    <ul className="flex flex-col gap-3">
                      {s.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-emerald-brand" />
                          <span>
                            <Rich text={item} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after?.map((p) => <p key={p}>{linkify(p)}</p>)}
                </div>
              </article>
            ))}

            <footer className="flex flex-col gap-4 rounded-3xl bg-white p-7 text-[15px] leading-[1.7] text-text-muted">
              {doc.closing.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-sm text-[#6C7871]">
                © {new Date().getFullYear()} {site.legalName} All rights reserved.
              </p>
              <Link href="/" className="font-semibold text-emerald-deep">
                ← Back to home
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}

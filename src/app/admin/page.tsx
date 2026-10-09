"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CalendarDays, ExternalLink, FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";

type Row = { slug: string; title: string; date: string; draft: boolean };
type Kind = "blog" | "events";

const TABS: { kind: Kind; label: string; Icon: typeof FileText }[] = [
  { kind: "blog", label: "Blog posts", Icon: FileText },
  { kind: "events", label: "Events", Icon: CalendarDays },
];

function initialTab(): Kind {
  if (typeof window === "undefined") return "blog";
  return new URLSearchParams(window.location.search).get("tab") === "events" ? "events" : "blog";
}

export default function AdminHome() {
  const [tab, setTab] = useState<Kind>("blog");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [mode, setMode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async (k: Kind) => {
    setRows(null);
    setError("");
    const res = await fetch(`/api/admin/items?kind=${k}`, { cache: "no-store" });
    if (res.status === 401) return void (window.location.href = "/admin/login");
    const json = await res.json();
    if (!res.ok) return setError(json.error ?? "Could not load content.");
    setRows(json.items);
    setMode(json.mode);
  }, []);

  useEffect(() => {
    const t = initialTab();
    setTab(t);
    void load(t);
    const saved = new URLSearchParams(window.location.search).get("saved");
    if (saved) setNotice(saved);
  }, [load]);

  function switchTab(k: Kind) {
    setTab(k);
    history.replaceState(null, "", `/admin?tab=${k}`);
    void load(k);
  }

  async function remove(r: Row) {
    if (!confirm(`Delete “${r.title}”? It will be removed from the website.`)) return;
    const res = await fetch(`/api/admin/items?kind=${tab}&slug=${r.slug}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) return setError(json.error ?? "Delete failed.");
    setNotice(mode === "github" ? `“${r.title}” deleted — the website updates in about 2 minutes.` : `“${r.title}” deleted.`);
    void load(tab);
  }

  const base = tab === "blog" ? "/blog" : "/events";

  return (
    <>
      <AdminBar />
      <main className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Content</h1>
            <p className="text-sm text-text-muted">Add or edit blog posts and events. Published changes go live on 0waste.co.in in about 2 minutes.</p>
          </div>
          <Link
            href={`/admin/${tab}/new`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-text px-5 text-sm font-semibold text-paper transition hover:shadow-[0_12px_40px_-10px_rgba(11,23,18,.6)]"
          >
            <Plus aria-hidden className="h-4 w-4" /> New {tab === "blog" ? "blog post" : "event"}
          </Link>
        </div>

        {notice && (
          <p role="status" className="rounded-2xl bg-lime-brand/40 px-5 py-3 text-sm font-medium">
            {notice}
          </p>
        )}
        {mode === "local" && (
          <p className="rounded-2xl border border-dashed border-text/20 px-5 py-3 text-sm text-text-muted">
            Local test mode: changes are saved to the files on this computer, not to GitHub.
          </p>
        )}

        <div role="tablist" className="inline-flex gap-1 self-start rounded-full bg-text/[0.06] p-1">
          {TABS.map(({ kind, label, Icon }) => (
            <button
              key={kind}
              role="tab"
              aria-selected={tab === kind}
              type="button"
              onClick={() => switchTab(kind)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${tab === kind ? "bg-white shadow-sm" : "text-text-muted"}`}
            >
              <Icon aria-hidden className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {error && (
          <p role="alert" className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <ul className="flex flex-col divide-y divide-text/[0.07] overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_-45px_rgba(11,23,18,.45)]">
          {rows === null && !error && <li className="px-5 py-8 text-center text-sm text-text-muted">Loading…</li>}
          {rows?.length === 0 && <li className="px-5 py-8 text-center text-sm text-text-muted">Nothing here yet — click “New” to add the first one.</li>}
          {rows?.map((r) => (
            <li key={r.slug} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-semibold">{r.title}</span>
                <span className="text-xs text-text-muted">
                  {r.date || "No date"} · /{tab === "blog" ? "blog" : "events"}/{r.slug}
                  {r.draft && <span className="ml-2 rounded bg-text/10 px-1.5 py-0.5 font-semibold">Draft</span>}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {!r.draft && (
                  <a href={`${base}/${r.slug}`} target="_blank" aria-label={`View ${r.title}`} className="grid h-10 w-10 place-items-center rounded-full text-text-muted hover:bg-text/5">
                    <ExternalLink aria-hidden className="h-4 w-4" />
                  </a>
                )}
                <Link href={`/admin/${tab}/${r.slug}`} className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold hover:bg-text/5">
                  <Pencil aria-hidden className="h-4 w-4" /> Edit
                </Link>
                <button type="button" onClick={() => remove(r)} aria-label={`Delete ${r.title}`} className="grid h-10 w-10 place-items-center rounded-full text-red-600 hover:bg-red-50">
                  <Trash2 aria-hidden className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

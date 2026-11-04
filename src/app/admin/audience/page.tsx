"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Copy, Download, Eye, Mail, Trash2 } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";

type Subscriber = { email: string; source: string; date: string };
type PostStat = { slug: string; title: string; date: string; views: number; reactions: { like: number; love: number; recycle: number } };

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const btn = "inline-flex min-h-10 items-center gap-2 rounded-full border border-text/20 bg-white px-4 text-sm font-semibold hover:bg-text/5";

export default function AudiencePage() {
  const [subs, setSubs] = useState<Subscriber[] | null>(null);
  const [posts, setPosts] = useState<PostStat[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setError("");
    const res = await fetch("/api/admin/audience", { cache: "no-store" });
    if (res.status === 401) return void (window.location.href = "/admin/login");
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return setError(json.error ?? "Could not load.");
    setSubs(json.subscribers);
    setPosts(json.posts);
  }, []);

  useEffect(() => void load(), [load]);

  const thisMonth = useMemo(() => {
    const m = new Date().toISOString().slice(0, 7);
    return (subs ?? []).filter((s) => s.date.startsWith(m)).length;
  }, [subs]);
  const totalViews = posts.reduce((n, p) => n + p.views, 0);
  const totalReactions = posts.reduce((n, p) => n + p.reactions.like + p.reactions.love + p.reactions.recycle, 0);

  async function remove(email: string) {
    if (!confirm(`Remove ${email} from the newsletter list?`)) return;
    const res = await fetch(`/api/admin/audience?email=${encodeURIComponent(email)}`, { method: "DELETE" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return setError(json.error ?? "Remove failed.");
    setNotice(`${email} removed.`);
    void load();
  }

  async function copyAll() {
    try {
      await navigator.clipboard.writeText((subs ?? []).map((s) => s.email).join(", "));
      setNotice("All emails copied — paste them into the BCC field in Gmail.");
    } catch {
      setError("Your browser blocked copying. Use “Download CSV” instead.");
    }
  }

  return (
    <div className="min-h-screen bg-paper text-text">
      <AdminBar />
      <main className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 py-8">
        <div className="flex flex-col gap-2">
          <Link href="/admin" className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-text-muted hover:text-text">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Back to posts
          </Link>
          <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Subscribers &amp; stats</h1>
          <p className="text-sm text-text-muted">Newsletter sign-ups, views and reactions from the blog on 0waste.co.in and karmaverse.earth.</p>
        </div>

        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="rounded-xl bg-lime-brand/30 px-4 py-3 text-sm font-semibold">{notice}</p>}

        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Subscribers", subs?.length ?? "…"],
            ["New this month", subs ? thisMonth : "…"],
            ["Post views", totalViews],
            ["Reactions", totalReactions],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-text/10 bg-white p-5">
              <p className="text-sm text-text-muted">{label}</p>
              <p className="font-display text-3xl font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <section className="flex flex-col gap-4 rounded-[22px] border border-text/10 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Mail aria-hidden className="h-5 w-5 text-emerald-deep" /> Newsletter subscribers
            </h2>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={copyAll} disabled={!subs?.length} className={`${btn} disabled:opacity-50`}>
                <Copy aria-hidden className="h-4 w-4" /> Copy all emails
              </button>
              <a href="/api/admin/audience?format=csv" className={btn}>
                <Download aria-hidden className="h-4 w-4" /> Download CSV
              </a>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            To send a newsletter: “Copy all emails”, then paste them into the <strong>BCC</strong> field in Gmail (never “To” — that shows everyone&apos;s address). Remove anyone who asks to unsubscribe.
          </p>
          {subs === null ? (
            <p className="text-sm text-text-muted">Loading…</p>
          ) : subs.length === 0 ? (
            <p className="text-sm text-text-muted">No sign-ups yet. They appear here as soon as someone subscribes on either website.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-text-muted">
                  <tr>
                    <th className="py-2 pr-3">Email</th>
                    <th className="py-2 pr-3">Signed up</th>
                    <th className="py-2 pr-3">From</th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {subs.map((s) => (
                    <tr key={s.email} className="border-t border-text/10">
                      <td className="py-2.5 pr-3 font-medium">{s.email}</td>
                      <td className="py-2.5 pr-3 text-text-muted">{fmt(s.date)}</td>
                      <td className="py-2.5 pr-3 text-text-muted">{s.source}</td>
                      <td className="py-2.5 text-right">
                        <button type="button" onClick={() => remove(s.email)} aria-label={`Remove ${s.email}`} className="rounded-full p-2 text-text-muted hover:bg-red-50 hover:text-red-700">
                          <Trash2 aria-hidden className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-4 rounded-[22px] border border-text/10 bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Eye aria-hidden className="h-5 w-5 text-emerald-deep" /> Posts by views
          </h2>
          <p className="text-xs text-text-muted">Views from both websites (one per visitor per post every 30 minutes). Numbers can take a couple of minutes to update.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-text-muted">
                <tr>
                  <th className="py-2 pr-3">Post</th>
                  <th className="py-2 pr-3 text-right">Views</th>
                  <th className="py-2 pr-3 text-right">👍</th>
                  <th className="py-2 pr-3 text-right">💚</th>
                  <th className="py-2 text-right">♻️</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.slug} className="border-t border-text/10">
                    <td className="py-2.5 pr-3">
                      <a href={`/blog/${p.slug}`} target="_blank" className="font-medium hover:underline">{p.title}</a>
                    </td>
                    <td className="py-2.5 pr-3 text-right font-semibold">{p.views}</td>
                    <td className="py-2.5 pr-3 text-right text-text-muted">{p.reactions.like}</td>
                    <td className="py-2.5 pr-3 text-right text-text-muted">{p.reactions.love}</td>
                    <td className="py-2.5 text-right text-text-muted">{p.reactions.recycle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

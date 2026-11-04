"use client";

import { useEffect, useState } from "react";
import { Check, ClipboardCopy, ExternalLink, Loader2, Megaphone } from "lucide-react";

type Social = { instagram: string; linkedin: string; facebook: string; x: string; whatsapp: string };
const LABELS: [keyof Social, string][] = [
  ["instagram", "Instagram"],
  ["linkedin", "LinkedIn"],
  ["facebook", "Facebook"],
  ["x", "X (Twitter)"],
  ["whatsapp", "WhatsApp"],
];

const btn = "inline-flex min-h-10 items-center gap-2 rounded-full border border-text/20 bg-white px-4 text-sm font-semibold hover:bg-text/5 disabled:opacity-60";
const darkBtn = "inline-flex min-h-10 items-center gap-2 rounded-full bg-text px-4 text-sm font-semibold text-paper disabled:opacity-60";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** "Social posts" helper: ready-to-post captions for Instagram, LinkedIn, Facebook, X and WhatsApp. */
export function SocialPosts({ post }: { post: { title: string; summary: string; slug: string; body: string } }) {
  const [auto, setAuto] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState<{ text: string; copied: boolean } | null>(null);
  const [social, setSocial] = useState<Social | null>(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    fetch("/api/admin/ai", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setAuto(Boolean(j.enabled)))
      .catch(() => setAuto(false));
  }, []);

  async function run() {
    setError("");
    if (!post.title.trim() || post.body.trim().length < 50) return setError("Write the post first — the social posts are made from its title and article.");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: auto ? "social" : "prompt", for: "social", post }),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "The AI request failed.");
      if (auto) setSocial(json.social);
      else setPrompt({ text: json.prompt, copied: await copyText(json.prompt) });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function copyOne(key: string, text: string) {
    if (await copyText(text)) {
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    }
  }

  if (auto === null) return null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-text/10 bg-paper p-4">
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Megaphone aria-hidden className="h-4 w-4 text-emerald-deep" /> Social posts
        </p>
        <p className="text-xs text-text-muted">Ready-to-post captions for Instagram, LinkedIn, Facebook, X and WhatsApp, made from this article. Share them the day it goes live.</p>
      </div>
      <button type="button" onClick={run} disabled={busy} className={`${darkBtn} self-start`}>
        {busy ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Megaphone aria-hidden className="h-4 w-4" />}
        {auto ? "Write social posts" : "Copy social-posts prompt"}
      </button>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!auto && prompt && (
        <ol className="flex flex-col gap-2 text-sm">
          <li>
            <span className="font-semibold">1. {prompt.copied ? "Prompt copied ✓" : "Copy this prompt:"}</span>
            {!prompt.copied && (
              <textarea readOnly value={prompt.text} onFocus={(e) => e.target.select()} className="mt-1.5 min-h-[80px] w-full rounded-lg border border-text/15 bg-white p-2 font-mono text-[11px]" />
            )}
          </li>
          <li className="flex flex-col gap-1.5">
            <span className="font-semibold">2. Paste it into a new Claude chat — it writes all five posts, ready to copy.</span>
            <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer" className={`${btn} self-start`}>
              <ExternalLink aria-hidden className="h-4 w-4" /> Open Claude
            </a>
          </li>
        </ol>
      )}

      {auto && social && (
        <ul className="flex flex-col gap-3">
          {LABELS.map(([key, label]) => (
            <li key={key} className="flex flex-col gap-1.5 rounded-lg border border-text/10 bg-white p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{label}</span>
                <button type="button" onClick={() => copyOne(key, social[key])} className={btn}>
                  {copied === key ? <Check aria-hidden className="h-4 w-4" /> : <ClipboardCopy aria-hidden className="h-4 w-4" />}
                  {copied === key ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-text-muted">{social[key]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

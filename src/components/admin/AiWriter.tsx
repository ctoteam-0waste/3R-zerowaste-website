"use client";

import { useEffect, useState } from "react";
import { Check, ClipboardCopy, ClipboardPaste, ExternalLink, Lightbulb, Loader2, Sparkles, Wand2 } from "lucide-react";

export type DraftPost = {
  title: string;
  summary: string;
  slug: string;
  category: string;
  focusKeyword: string;
  keywords: string[];
  body: string;
};
type Idea = { title: string; angle: string; focusKeyword: string; category: string; searchIntent: string };

const input =
  "min-h-11 w-full rounded-xl border border-text/15 bg-paper px-3.5 text-[15px] font-normal outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/30";
const ghostBtn = "inline-flex min-h-11 items-center gap-2 rounded-full border border-text/20 bg-white px-5 text-sm font-semibold hover:bg-text/5 disabled:opacity-60";
const darkBtn = "inline-flex min-h-11 items-center gap-2 rounded-full bg-text px-5 text-sm font-semibold text-paper disabled:opacity-60";

async function call<T>(payload: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/admin/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Signed out");
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "The AI request failed.");
  return json as T;
}

/** Reads the "--- front matter --- markdown" reply that Claude gives in copy-paste mode. */
export function parsePasted(raw: string): DraftPost | null {
  let text = raw.trim().replace(/\r\n/g, "\n");
  // drop a wrapping ```markdown fence if Claude added one
  const fenced = text.match(/^```[a-z]*\n([\s\S]*?)\n```\s*$/i);
  if (fenced) text = fenced[1].trim();
  const start = text.indexOf("---\n");
  if (start < 0) return null;
  const end = text.indexOf("\n---", start + 4);
  if (end < 0) return null;
  const meta: Record<string, string> = {};
  for (const line of text.slice(start + 4, end).split("\n")) {
    // tolerate "Focus keyword:", "**focusKeyword**:", "- slug:" etc.
    const m = line.replace(/[*_]/g, "").match(/^\s*-?\s*([A-Za-z][A-Za-z _-]*?)\s*:\s*(.*)$/);
    if (m) meta[m[1].toLowerCase().replace(/[^a-z]/g, "")] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  const body = text.slice(end + 4).replace(/^-*\n/, "").trim();
  if (!meta.title || !body) return null;
  return {
    title: meta.title,
    summary: meta.summary ?? "",
    slug: meta.slug ?? "",
    category: meta.category ?? "",
    focusKeyword: meta.focuskeyword ?? "",
    keywords: (meta.keywords ?? "").split(",").map((k) => k.trim()).filter(Boolean),
    body,
  };
}

/** "Write with AI" panel: get ideas, then turn an idea into a full SEO-ready draft. */
export function AiWriter({ onDraft, hasContent }: { onDraft: (p: DraftPost) => void; hasContent: boolean }) {
  const [auto, setAuto] = useState<boolean | null>(null);
  const [open, setOpen] = useState(!hasContent);
  const [context, setContext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [length, setLength] = useState("standard");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [busy, setBusy] = useState<"" | "ideas" | "write">("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  // copy-paste mode
  const [prompt, setPrompt] = useState<{ text: string; copied: boolean; kind: "ideas" | "write" } | null>(null);
  const [pasted, setPasted] = useState("");

  useEffect(() => {
    fetch("/api/admin/ai", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setAuto(Boolean(j.enabled)))
      .catch(() => setAuto(false));
  }, []);

  useEffect(() => {
    if (busy !== "write" || !auto) return;
    setSeconds(0);
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [busy, auto]);

  function confirmReplace() {
    return !hasContent || confirm("Replace the current title, summary and article with the AI draft?");
  }

  /* ----- automatic mode (API key on the server) ----- */

  async function getIdeas() {
    setError("");
    setBusy("ideas");
    try {
      setIdeas((await call<{ ideas: Idea[] }>({ action: "ideas", context })).ideas);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  }

  function pickIdea(i: Idea) {
    setContext(`${i.title}\n\n${i.angle}`);
    setKeyword(i.focusKeyword);
    setIdeas([]);
  }

  async function write() {
    setError("");
    if (context.trim().length < 10) return setError("Describe the idea first — a sentence or two is enough, more detail gives a better post.");
    if (!confirmReplace()) return;
    setBusy("write");
    try {
      const { post } = await call<{ post: DraftPost }>({ action: "write", context, focusKeyword: keyword, length });
      onDraft(post);
      setOpen(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  }

  /* ----- copy-paste mode (Claude subscription on claude.ai) ----- */

  async function makePrompt(kind: "ideas" | "write") {
    setError("");
    if (kind === "write" && context.trim().length < 10) return setError("Describe the idea first — a sentence or two is enough, more detail gives a better post.");
    setBusy(kind);
    try {
      const { prompt: text } = await call<{ prompt: string }>({ action: "prompt", for: kind, context, focusKeyword: keyword, length });
      let copied = false;
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        /* browser blocked it — the text box below lets them copy by hand */
      }
      setPrompt({ text, copied, kind });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  }

  async function copyAgain() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt.text);
      setPrompt({ ...prompt, copied: true });
    } catch {
      setError("Your browser blocked copying — select the text in the box and copy it with Ctrl+C.");
    }
  }

  function fillFromPaste() {
    setError("");
    const post = parsePasted(pasted);
    if (!post) return setError("Couldn't read that. Copy Claude's whole reply — it should start with --- and a title: line.");
    if (!confirmReplace()) return;
    onDraft(post);
    setPasted("");
    setPrompt(null);
    setOpen(false);
  }

  if (auto === null) return null;

  return (
    <section className="flex flex-col gap-4 rounded-[22px] border border-emerald-brand/30 bg-gradient-to-br from-lime-brand/20 to-white p-5 sm:p-6">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center justify-between gap-3 text-left">
        <span className="flex items-center gap-2 font-display text-lg font-semibold">
          <Sparkles aria-hidden className="h-5 w-5 text-emerald-deep" /> Write with AI
          {!auto && <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-text-muted">uses your Claude subscription</span>}
        </span>
        <span className="text-xs font-semibold text-text-muted">{open ? "Hide" : "Show"}</span>
      </button>

      {open && (
        <>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Your idea or context
            <textarea
              className={`${input} min-h-[110px] py-2.5`}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              maxLength={4000}
              placeholder="e.g. We ran a zero-waste drive with 40 housing societies in Gurugram. Write a guide for RWAs on starting wet/dry segregation, with the problems we saw and how KarmaVerse rewards residents."
            />
            <span className="text-xs font-normal text-text-muted">Leave it empty and press “Get ideas” for topic suggestions, or type a theme to get ideas around it.</span>
          </label>

          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Focus keyword <span className="-mt-1 text-xs font-normal text-text-muted">Optional — the phrase you want to rank for on Google</span>
              <input className={input} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. waste segregation at source" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Length <span className="-mt-1 text-xs font-normal text-text-muted">&nbsp;</span>
              <select className={input} value={length} onChange={(e) => setLength(e.target.value)}>
                <option value="short">Short (~800 words)</option>
                <option value="standard">Standard (~1,300)</option>
                <option value="long">Long (~2,000)</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={Boolean(busy)} onClick={() => (auto ? getIdeas() : makePrompt("ideas"))} className={ghostBtn}>
              {busy === "ideas" ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Lightbulb aria-hidden className="h-4 w-4" />} Get ideas
            </button>
            <button type="button" disabled={Boolean(busy)} onClick={() => (auto ? write() : makePrompt("write"))} className={darkBtn}>
              {busy === "write" ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Wand2 aria-hidden className="h-4 w-4" />} Write full blog
            </button>
          </div>

          {auto && busy === "write" && (
            <p role="status" className="text-sm text-text-muted">
              Writing your post with SEO… {seconds}s (usually 30–90 seconds). Keep this page open.
            </p>
          )}
          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* automatic mode: idea cards */}
          {auto && ideas.length > 0 && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {ideas.map((i) => (
                <li key={i.title}>
                  <button
                    type="button"
                    onClick={() => pickIdea(i)}
                    className="flex h-full w-full flex-col gap-1.5 rounded-xl border border-text/10 bg-white p-4 text-left transition hover:border-emerald-brand hover:shadow-sm"
                  >
                    <span className="font-semibold leading-snug">{i.title}</span>
                    <span className="text-sm text-text-muted">{i.angle}</span>
                    <span className="mt-auto flex flex-wrap gap-1.5 pt-1 text-[11px] font-semibold">
                      <span className="rounded bg-lime-brand/50 px-1.5 py-0.5">🔑 {i.focusKeyword}</span>
                      <span className="rounded bg-text/[0.07] px-1.5 py-0.5">{i.category}</span>
                      <span className="rounded bg-text/[0.07] px-1.5 py-0.5">{i.searchIntent}</span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="text-xs text-text-muted sm:col-span-2">Click an idea to use it, add your own details, then press “Write full blog”.</li>
            </ul>
          )}

          {/* copy-paste mode: steps */}
          {!auto && prompt && (
            <ol className="flex flex-col gap-3 rounded-xl bg-white p-4 text-sm">
              <li className="flex flex-col gap-2">
                <span className="font-semibold">
                  1. {prompt.copied ? "Prompt copied ✓" : "Copy this prompt"}{" "}
                  <span className="font-normal text-text-muted">— it includes your brand, existing posts and all the SEO rules.</span>
                </span>
                <textarea readOnly value={prompt.text} onFocus={(e) => e.target.select()} className={`${input} min-h-[90px] py-2 font-mono text-[12px] text-text-muted`} />
                <button type="button" onClick={copyAgain} className={`${ghostBtn} self-start`}>
                  {prompt.copied ? <Check aria-hidden className="h-4 w-4" /> : <ClipboardCopy aria-hidden className="h-4 w-4" />} Copy prompt
                </button>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-semibold">2. Paste it into a new Claude chat and send it.</span>
                {prompt.kind === "ideas" && (
                  <span className="text-text-muted">Claude lists 6 ideas. Reply with the number you like (add any extra details), and it writes the full post.</span>
                )}
                <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer" className={`${darkBtn} self-start`}>
                  <ExternalLink aria-hidden className="h-4 w-4" /> Open Claude
                </a>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-semibold">3. Copy Claude&apos;s finished post and paste it here.</span>
                <textarea
                  value={pasted}
                  onChange={(e) => setPasted(e.target.value)}
                  placeholder={"---\ntitle: …\nsummary: …\n---\n\nThe article…"}
                  className={`${input} min-h-[140px] py-2 font-mono text-[12px]`}
                />
                <button type="button" disabled={!pasted.trim()} onClick={fillFromPaste} className={`${darkBtn} self-start`}>
                  <ClipboardPaste aria-hidden className="h-4 w-4" /> Fill the editor
                </button>
              </li>
            </ol>
          )}
          {!auto && !prompt && (
            <p className="text-xs text-text-muted">
              Works with your Claude subscription: the button copies a ready-made prompt, you paste it into claude.ai, then paste Claude&apos;s answer back here. (Adding an ANTHROPIC_API_KEY on the server makes this fully automatic.)
            </p>
          )}
        </>
      )}
    </section>
  );
}

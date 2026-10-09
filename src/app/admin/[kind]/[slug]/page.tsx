"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { marked } from "marked";
import { ArrowLeft, Bold, Check, Heading2, ImagePlus, Italic, Link2, List, Loader2, Quote, X } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { blogCategories } from "@/content/posts";

type Kind = "blog" | "events";
type Data = Record<string, string | boolean>;

const today = () => new Date().toISOString().slice(0, 10);
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

const EMPTY: Record<Kind, Data> = {
  blog: { title: "", summary: "", category: "ESG", date: today(), author: "3R ZeroWaste Team", image: "", imageCredit: "", featured: false, draft: false },
  events: { title: "", type: "", summary: "", date: today(), endDate: "", time: "", venue: "", registerUrl: "", image: "", draft: false },
};

/** Shrinks a photo to max 1600px wide WebP in the browser before upload. */
async function compress(file: File): Promise<{ base64: string; ext: string; preview: string }> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / bmp.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const preview = canvas.toDataURL("image/webp", 0.86);
  const isWebp = preview.startsWith("data:image/webp");
  const url = isWebp ? preview : canvas.toDataURL("image/jpeg", 0.86);
  return { base64: url.split(",")[1], ext: isWebp ? "webp" : "jpg", preview: url };
}

function Field({ label, hint, children, wide }: { label: string; hint?: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
      {hint && <span className="text-xs font-normal text-text-muted">{hint}</span>}
    </label>
  );
}

const input =
  "min-h-11 w-full rounded-xl border border-text/15 bg-paper px-3.5 text-[15px] font-normal outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/30";

export default function Editor() {
  const params = useParams<{ kind: string; slug: string }>();
  const router = useRouter();
  const kind: Kind = params.kind === "events" ? "events" : "blog";
  const isNew = params.slug === "new";

  const [data, setData] = useState<Data>(EMPTY[kind]);
  const [body, setBody] = useState("");
  const [slug, setSlug] = useState(isNew ? "" : params.slug);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [image, setImage] = useState<{ base64: string; ext: string; preview: string } | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<{ text: string; live?: boolean; href?: string } | null>(null);
  const ta = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const res = await fetch(`/api/admin/items?kind=${kind}&slug=${params.slug}`, { cache: "no-store" });
      if (res.status === 401) return void (window.location.href = "/admin/login");
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not load.");
        return setLoading(false);
      }
      const d: Data = { ...EMPTY[kind] };
      for (const [k, v] of Object.entries(json.data as Record<string, unknown>)) {
        d[k] = typeof v === "boolean" ? v : v instanceof Object ? String(v) : String(v ?? "");
      }
      // YAML dates can arrive as full ISO strings
      for (const k of ["date", "endDate"]) if (typeof d[k] === "string") d[k] = (d[k] as string).slice(0, 10);
      setData(d);
      setBody(json.body ?? "");
      setLoading(false);
    })();
  }, [isNew, kind, params.slug]);

  const set = (k: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData((d) => ({ ...d, [k]: v }));
    if (k === "title" && !slugTouched) setSlug(slugify(String(v)));
  };

  /** Wraps the selection (or inserts a placeholder) with Markdown syntax. */
  function wrap(before: string, after = "", placeholder = "text") {
    const el = ta.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const sel = body.slice(s, e) || placeholder;
    const next = body.slice(0, s) + before + sel + after + body.slice(e);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  }

  async function pickImage(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return setError("Please choose an image file.");
    try {
      setImage(await compress(f));
      setError("");
    } catch {
      setError("Could not read that image. Try a JPG or PNG.");
    }
  }

  async function waitUntilLive(href: string) {
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 10_000));
      const res = await fetch(`${href}?check=${Date.now()}`, { cache: "no-store" }).catch(() => null);
      if (res?.ok) return setStatus({ text: "It's live on the website.", live: true, href });
    }
    setStatus({ text: "Saved. The website is taking longer than usual to update — check again in a few minutes.", href });
  }

  async function save(publish: boolean) {
    setError("");
    if (!String(data.title).trim()) return setError("Please add a title.");
    if (!slug) return setError("Please add a URL name.");
    setSaving(true);
    const payload = {
      kind,
      slug,
      previousSlug: isNew ? undefined : params.slug,
      data: { ...data, draft: !publish },
      body,
      image: image ? { base64: image.base64, ext: image.ext } : undefined,
    };
    const res = await fetch("/api/admin/items", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) return setError(json.error ?? "Saving failed.");
    const href = `/${kind === "blog" ? "blog" : "events"}/${slug}`;
    if (!publish) {
      setStatus({ text: "Saved as a draft — it's hidden from the website until you publish it." });
    } else if (json.mode === "local") {
      setStatus({ text: "Published (local test mode).", live: true, href });
    } else {
      setStatus({ text: "Published. The website is updating — this usually takes about 2 minutes…", href });
      if (isNew) void waitUntilLive(href);
    }
    // the server stores the upload and returns its public path
    setData((d) => ({ ...d, image: String(json.image ?? "") }));
    setImage(null);
    if (isNew || slug !== params.slug) router.replace(`/admin/${kind}/${slug}`);
  }

  const html = useMemo(() => (tab === "preview" ? (marked.parse(body || "_Nothing written yet._", { async: false, gfm: true }) as string) : ""), [tab, body]);
  const currentImage = image?.preview || (data.image ? String(data.image) : "");
  const label = kind === "blog" ? "blog post" : "event";

  if (loading) {
    return (
      <>
        <AdminBar />
        <p className="px-4 py-16 text-center text-text-muted">Loading…</p>
      </>
    );
  }

  return (
    <>
      <AdminBar>
        <button
          type="button"
          disabled={saving}
          onClick={() => save(false)}
          className="hidden min-h-10 items-center rounded-full border border-text/20 px-4 text-sm font-semibold hover:bg-text/5 disabled:opacity-60 sm:inline-flex"
        >
          Save draft
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => save(true)}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-text px-4 text-sm font-semibold text-paper disabled:opacity-60"
        >
          {saving ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Check aria-hidden className="h-4 w-4" />} Publish
        </button>
      </AdminBar>

      <main className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 py-8">
        <Link href={`/admin?tab=${kind}`} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-emerald-deep">
          <ArrowLeft aria-hidden className="h-4 w-4" /> All {kind === "blog" ? "blog posts" : "events"}
        </Link>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">{isNew ? `New ${label}` : `Edit ${label}`}</h1>

        {error && (
          <p role="alert" className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {status && (
          <p role="status" className={`flex flex-wrap items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium ${status.live ? "bg-lime-brand/50" : "bg-lime-brand/25"}`}>
            {!status.live && status.href && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
            {status.text}
            {status.href && (
              <a href={status.href} target="_blank" className="font-semibold underline">
                Open page
              </a>
            )}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <div className="flex flex-col gap-5 rounded-[22px] bg-white p-5 sm:p-6">
            <Field label="Title">
              <input className={`${input} text-lg font-semibold`} value={String(data.title)} onChange={set("title")} placeholder={kind === "blog" ? "e.g. How to run a zero-waste office" : "e.g. Plogging drive at Sector 29"} />
            </Field>
            <Field label="Short summary" hint="Shown on cards and in Google results (1–2 sentences, about 150 characters).">
              <textarea className={`${input} min-h-[76px] py-2.5`} value={String(data.summary)} onChange={set("summary")} maxLength={260} />
            </Field>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold">{kind === "blog" ? "Article" : "Event details"}</span>
                <div className="inline-flex gap-1 rounded-full bg-text/[0.06] p-1 text-xs font-semibold">
                  {(["write", "preview"] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-3 py-1.5 capitalize ${tab === t ? "bg-white shadow-sm" : "text-text-muted"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              {tab === "write" ? (
                <>
                  <div className="flex flex-wrap gap-1 rounded-xl border border-text/10 bg-paper p-1">
                    {[
                      { Icon: Heading2, label: "Heading", run: () => wrap("\n## ", "\n", "Heading") },
                      { Icon: Bold, label: "Bold", run: () => wrap("**", "**") },
                      { Icon: Italic, label: "Italic", run: () => wrap("*", "*") },
                      { Icon: List, label: "Bullet list", run: () => wrap("\n- ", "", "List item") },
                      { Icon: Quote, label: "Quote", run: () => wrap("\n> ", "", "Quote") },
                      { Icon: Link2, label: "Link", run: () => wrap("[", "](https://)", "link text") },
                    ].map(({ Icon, label: l, run }) => (
                      <button key={l} type="button" onClick={run} title={l} aria-label={l} className="grid h-9 w-9 place-items-center rounded-lg text-text-muted hover:bg-white hover:text-text">
                        <Icon aria-hidden className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                  <textarea
                    ref={ta}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={`${input} min-h-[420px] py-3 font-mono text-[14px] leading-relaxed`}
                    placeholder={"Write here. Use the buttons above for headings, bold text, lists and links.\n\n## A heading\n\nA paragraph…"}
                  />
                </>
              ) : (
                <div className="prose-3r min-h-[420px] rounded-xl border border-text/10 bg-paper p-5" dangerouslySetInnerHTML={{ __html: html }} />
              )}
            </div>
          </div>

          {/* Side column */}
          <aside className="flex flex-col gap-5 rounded-[22px] bg-white p-5 sm:p-6">
            <Field label="Cover image" hint="JPG or PNG; it's resized automatically.">
              <div className="flex flex-col gap-2">
                {currentImage ? (
                  <div className="relative overflow-hidden rounded-xl border border-text/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentImage} alt="" className="aspect-[16/10] w-full object-cover" />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => {
                        setImage(null);
                        setData((d) => ({ ...d, image: "" }));
                      }}
                      className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white"
                    >
                      <X aria-hidden className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
                <span className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-text/25 text-sm font-semibold text-text-muted hover:border-emerald-brand hover:text-emerald-deep">
                  <ImagePlus aria-hidden className="h-4 w-4" /> {currentImage ? "Replace image" : "Upload image"}
                  <input type="file" accept="image/*" className="sr-only" onChange={pickImage} />
                </span>
              </div>
            </Field>

            {kind === "blog" ? (
              <>
                <Field label="Category">
                  <select className={input} value={String(data.category)} onChange={set("category")}>
                    {blogCategories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                  </select>
                </Field>
                <Field label="Publish date">
                  <input type="date" className={input} value={String(data.date)} onChange={set("date")} />
                </Field>
                <Field label="Author">
                  <input className={input} value={String(data.author)} onChange={set("author")} />
                </Field>
                <Field label="Image credit" hint="Optional, e.g. “Photo: 3RZW Foundation”.">
                  <input className={input} value={String(data.imageCredit)} onChange={set("imageCredit")} />
                </Field>
                <label className="flex items-center gap-2.5 text-sm font-semibold">
                  <input type="checkbox" checked={Boolean(data.featured)} onChange={set("featured")} className="h-4 w-4 accent-emerald-600" />
                  Feature at the top of the blog
                </label>
              </>
            ) : (
              <>
                <Field label="Event type" hint="e.g. Community drive, School workshop, Webinar · ESG">
                  <input className={input} value={String(data.type)} onChange={set("type")} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start date">
                    <input type="date" className={input} value={String(data.date)} onChange={set("date")} />
                  </Field>
                  <Field label="End date">
                    <input type="date" className={input} value={String(data.endDate)} onChange={set("endDate")} />
                  </Field>
                </div>
                <Field label="Time" hint="e.g. 10:00–13:00 IST">
                  <input className={input} value={String(data.time)} onChange={set("time")} />
                </Field>
                <Field label="Venue" hint="City / venue, or “Online”">
                  <input className={input} value={String(data.venue)} onChange={set("venue")} />
                </Field>
                <Field label="Registration link" hint="Optional — Google Form, Luma, etc.">
                  <input type="url" className={input} value={String(data.registerUrl)} onChange={set("registerUrl")} placeholder="https://" />
                </Field>
              </>
            )}

            <Field label="URL name" hint={`0waste.co.in/${kind === "blog" ? "blog" : "events"}/${slug || "…"}`}>
              <input
                className={`${input} font-mono text-[13px]`}
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
              />
            </Field>

            <button
              type="button"
              disabled={saving}
              onClick={() => save(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-text/20 text-sm font-semibold hover:bg-text/5 disabled:opacity-60 sm:hidden"
            >
              Save as draft
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}

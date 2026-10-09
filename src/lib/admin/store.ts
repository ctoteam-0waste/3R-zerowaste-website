import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Where admin edits are saved.
 * - Production (GITHUB_TOKEN set): one commit per save to the GitHub repo; Hostinger rebuilds from it.
 * - Local development without a token: files are written straight into content/ and public/.
 */
export type Kind = "blog" | "events";
export type ItemSummary = { slug: string; title: string; date: string; draft: boolean; image?: string };
export type Item = { slug: string; data: Record<string, unknown>; body: string };
export type Upload = { path: string; base64: string };

const DIR: Record<Kind, string> = { blog: "content/blog", events: "content/events" };
const REPO = process.env.GITHUB_REPO || "ctoteam-0waste/3R-zerowaste-website";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const API = `https://api.github.com/repos/${REPO}`;

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function storeMode(): "github" | "local" {
  if (process.env.GITHUB_TOKEN) return "github";
  if (process.env.NODE_ENV !== "production") return "local";
  throw new Error("GITHUB_TOKEN is not set on the server, so changes cannot be published.");
}

/* ---------- GitHub ---------- */

async function gh<T>(pathname: string, init?: RequestInit): Promise<T> {
  const res = await fetch(pathname.startsWith("http") ? pathname : `${API}${pathname}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json() as Promise<T>;
}

async function ghRead(file: string): Promise<string | null> {
  try {
    const r = await gh<{ content: string }>(`/contents/${encodeURI(file)}?ref=${BRANCH}`);
    return Buffer.from(r.content, "base64").toString("utf8");
  } catch (e) {
    if (String(e).includes("GitHub 404")) return null;
    throw e;
  }
}

/** Writes and deletes several files in a single commit (Git Data API). */
async function ghCommit(message: string, writes: { path: string; content: string; encoding: "utf-8" | "base64" }[], deletes: string[]) {
  const ref = await gh<{ object: { sha: string } }>(`/git/ref/heads/${BRANCH}`);
  const parent = await gh<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`);
  const tree = [];
  for (const w of writes) {
    const blob = await gh<{ sha: string }>(`/git/blobs`, { method: "POST", body: JSON.stringify({ content: w.content, encoding: w.encoding }) });
    tree.push({ path: w.path, mode: "100644", type: "blob", sha: blob.sha });
  }
  for (const d of deletes) tree.push({ path: d, mode: "100644", type: "blob", sha: null });
  const newTree = await gh<{ sha: string }>(`/git/trees`, { method: "POST", body: JSON.stringify({ base_tree: parent.tree.sha, tree }) });
  const commit = await gh<{ sha: string }>(`/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: newTree.sha,
      parents: [ref.object.sha],
      author: { name: "3R Website Admin", email: process.env.GITHUB_COMMIT_EMAIL || "cto.team@0waste.co.in" },
    }),
  });
  await gh(`/git/refs/heads/${BRANCH}`, { method: "PATCH", body: JSON.stringify({ sha: commit.sha }) });
  return commit.sha;
}

/* ---------- Public API ---------- */

function parse(slug: string, raw: string): Item {
  const { data, content } = matter(raw);
  return { slug, data, body: content.replace(/^\n+/, "") };
}

function summary(item: Item): ItemSummary {
  const d = item.data;
  const date = d.date instanceof Date ? d.date.toISOString().slice(0, 10) : String(d.date ?? "");
  return { slug: item.slug, title: String(d.title ?? item.slug), date, draft: d.draft === true, image: d.image ? String(d.image) : undefined };
}

export async function listItems(kind: Kind): Promise<ItemSummary[]> {
  const mode = storeMode();
  let items: Item[];
  if (mode === "local") {
    const dir = path.join(process.cwd(), DIR[kind]);
    items = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .map((f) => parse(f.slice(0, -3), fs.readFileSync(path.join(dir, f), "utf8")));
  } else {
    const files = await gh<{ name: string; path: string }[]>(`/contents/${DIR[kind]}?ref=${BRANCH}`).catch(() => []);
    items = await Promise.all(
      files
        .filter((f) => f.name.endsWith(".md") && !f.name.startsWith("_"))
        .map(async (f) => parse(f.name.slice(0, -3), (await ghRead(f.path)) ?? "")),
    );
  }
  return items.map(summary).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getItem(kind: Kind, slug: string): Promise<Item | null> {
  if (!SLUG_RE.test(slug)) return null;
  const file = `${DIR[kind]}/${slug}.md`;
  if (storeMode() === "local") {
    const full = path.join(process.cwd(), file);
    return fs.existsSync(full) ? parse(slug, fs.readFileSync(full, "utf8")) : null;
  }
  const raw = await ghRead(file);
  return raw == null ? null : parse(slug, raw);
}

export async function itemExists(kind: Kind, slug: string) {
  return (await getItem(kind, slug)) !== null;
}

/** Saves an item (and optional uploaded image); removes the old file when the slug changed. */
export async function saveItem(kind: Kind, item: Item, opts: { previousSlug?: string; upload?: Upload }) {
  const file = `${DIR[kind]}/${item.slug}.md`;
  const md = matter.stringify(`\n${item.body.trim()}\n`, item.data);
  const deletes = opts.previousSlug && opts.previousSlug !== item.slug ? [`${DIR[kind]}/${opts.previousSlug}.md`] : [];
  if (storeMode() === "local") {
    const root = process.cwd();
    if (opts.upload) {
      fs.mkdirSync(path.dirname(path.join(root, opts.upload.path)), { recursive: true });
      fs.writeFileSync(path.join(root, opts.upload.path), Buffer.from(opts.upload.base64, "base64"));
    }
    fs.writeFileSync(path.join(root, file), md);
    for (const d of deletes) fs.rmSync(path.join(root, d), { force: true });
    return "local";
  }
  const writes: { path: string; content: string; encoding: "utf-8" | "base64" }[] = [{ path: file, content: md, encoding: "utf-8" }];
  if (opts.upload) writes.push({ path: opts.upload.path, content: opts.upload.base64, encoding: "base64" });
  const label = kind === "blog" ? "blog post" : "event";
  return ghCommit(`${opts.previousSlug ? "Update" : "Add"} ${label}: ${String(item.data.title ?? item.slug)}`, writes, deletes);
}

export async function deleteItem(kind: Kind, slug: string) {
  const file = `${DIR[kind]}/${slug}.md`;
  // also remove the cover this panel uploaded for the item (named "<slug>-<id>.<ext>")
  const item = await getItem(kind, slug);
  const img = String(item?.data.image ?? "");
  const folder = kind === "blog" ? "blog" : "events";
  const files = [file, ...(img.startsWith(`/images/${folder}/${slug}-`) ? [`public${img}`] : [])];
  if (storeMode() === "local") {
    for (const f of files) fs.rmSync(path.join(process.cwd(), f), { force: true });
    return "local";
  }
  return ghCommit(`Remove ${kind === "blog" ? "blog post" : "event"}: ${slug}`, [], files);
}

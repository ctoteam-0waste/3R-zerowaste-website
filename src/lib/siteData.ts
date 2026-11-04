import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

/**
 * Small data store for the blog — newsletter subscribers, reactions and view counts —
 * with no outside service. It is kept in the same GitHub repo as the site, on a separate
 * branch ("site-data"), so saving data never triggers a website rebuild.
 *
 * - The repo is public, so the subscriber list is encrypted (AES-256-GCM) with a key
 *   derived from DATA_ENCRYPTION_KEY, or ADMIN_SESSION_SECRET if that isn't set.
 *   Changing that secret makes the old list unreadable — set DATA_ENCRYPTION_KEY once and keep it.
 * - Reactions and views are public numbers. They are added up in memory and saved in one
 *   commit every couple of minutes, so busy pages don't create a commit per visit.
 * - Without GITHUB_TOKEN (local development) everything is kept in ./.data instead.
 */

const REPO = process.env.GITHUB_REPO || "ctoteam-0waste/3R-zerowaste-website";
const DATA_BRANCH = process.env.GITHUB_DATA_BRANCH || "site-data";
const BASE_BRANCH = process.env.GITHUB_BRANCH || "main";
const API = `https://api.github.com/repos/${REPO}`;

const FILES = {
  subscribers: "data/subscribers.enc.json",
  reactions: "data/reactions.json",
  views: "data/views.json",
};

export const REACTIONS = ["like", "love", "recycle"] as const;
export type Reaction = (typeof REACTIONS)[number];
export type ReactionCounts = Record<Reaction, number>;
export type Subscriber = { email: string; source: string; date: string };

const githubMode = () => Boolean(process.env.GITHUB_TOKEN);

/* ---------- raw file access ---------- */

async function gh(pathname: string, init?: RequestInit) {
  return fetch(`${API}${pathname}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
    },
  });
}

let branchReady: Promise<void> | null = null;
function ensureBranch() {
  return (branchReady ??= (async () => {
    const r = await gh(`/git/ref/heads/${DATA_BRANCH}`);
    if (r.ok) return;
    const base = await gh(`/git/ref/heads/${BASE_BRANCH}`);
    if (!base.ok) throw new Error(`GitHub ${base.status} reading ${BASE_BRANCH}`);
    const sha = ((await base.json()) as { object: { sha: string } }).object.sha;
    const c = await gh(`/git/refs`, { method: "POST", body: JSON.stringify({ ref: `refs/heads/${DATA_BRANCH}`, sha }) });
    if (!c.ok && c.status !== 422) throw new Error(`GitHub ${c.status} creating ${DATA_BRANCH}`);
  })().catch((e) => {
    branchReady = null;
    throw e;
  }));
}

async function readFile(file: string): Promise<{ text: string | null; sha?: string }> {
  if (!githubMode()) {
    const full = path.join(process.cwd(), ".data", path.basename(file));
    return { text: fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null };
  }
  await ensureBranch();
  const r = await gh(`/contents/${file}?ref=${DATA_BRANCH}`);
  if (r.status === 404) return { text: null };
  if (!r.ok) throw new Error(`GitHub ${r.status} reading ${file}`);
  const j = (await r.json()) as { content: string; sha: string };
  return { text: Buffer.from(j.content, "base64").toString("utf8"), sha: j.sha };
}

class Conflict extends Error {}

async function writeFile(file: string, text: string, sha: string | undefined, message: string) {
  if (!githubMode()) {
    const dir = path.join(process.cwd(), ".data");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, path.basename(file)), text);
    return;
  }
  const r = await gh(`/contents/${file}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(text).toString("base64"),
      sha,
      branch: DATA_BRANCH,
      committer: { name: "3R Website", email: process.env.GITHUB_COMMIT_EMAIL || "cto.team@0waste.co.in" },
    }),
  });
  if (r.status === 409 || r.status === 422) throw new Conflict(`GitHub ${r.status}`);
  if (!r.ok) throw new Error(`GitHub ${r.status} writing ${file}`);
}

/** Read → change → write, retried if someone else wrote in between. One change at a time per file. */
const queues = new Map<string, Promise<unknown>>();
function update<T>(file: string, message: string, change: (text: string | null) => { text: string; result: T }): Promise<T> {
  const run = async () => {
    for (let attempt = 0; ; attempt++) {
      const cur = await readFile(file);
      const { text, result } = change(cur.text);
      try {
        await writeFile(file, text, cur.sha, message);
        return result;
      } catch (e) {
        if (!(e instanceof Conflict) || attempt >= 3) throw e;
      }
    }
  };
  const next = (queues.get(file) ?? Promise.resolve()).catch(() => {}).then(run);
  queues.set(file, next);
  return next;
}

/* ---------- subscribers (encrypted) ---------- */

function dataKey() {
  const secret = process.env.DATA_ENCRYPTION_KEY || process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret || secret.length < 8) throw new Error("Set DATA_ENCRYPTION_KEY on the server to store subscribers.");
  return createHash("sha256").update(`3r-site-data:${secret}`).digest();
}

function encrypt(list: Subscriber[]) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", dataKey(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(list), "utf8"), cipher.final()]);
  return JSON.stringify({ v: 1, note: "Encrypted newsletter list. View it in the website admin.", iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), data: data.toString("base64") });
}

function decrypt(text: string | null): Subscriber[] {
  if (!text) return [];
  const j = JSON.parse(text) as { iv: string; tag: string; data: string };
  const d = createDecipheriv("aes-256-gcm", dataKey(), Buffer.from(j.iv, "base64"));
  d.setAuthTag(Buffer.from(j.tag, "base64"));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(j.data, "base64")), d.final()]).toString("utf8"));
}

/** Adds a subscriber. Returns false if the email was already on the list. */
export function addSubscriber(email: string, source: string) {
  return update(FILES.subscribers, "Newsletter sign-up", (text) => {
    const list = decrypt(text);
    if (list.some((s) => s.email === email)) return { text: text!, result: false };
    list.push({ email, source, date: new Date().toISOString() });
    return { text: encrypt(list), result: true };
  });
}

export async function listSubscribers() {
  return decrypt((await readFile(FILES.subscribers)).text).sort((a, b) => b.date.localeCompare(a.date));
}

export function removeSubscriber(email: string) {
  return update(FILES.subscribers, "Newsletter: remove subscriber", (text) => {
    const list = decrypt(text);
    const next = list.filter((s) => s.email !== email);
    return { text: encrypt(next), result: next.length !== list.length };
  });
}

/* ---------- reactions + views (buffered counters) ---------- */

type ReactionMap = Record<string, ReactionCounts>;
type ViewMap = Record<string, number>;

const empty = (): ReactionCounts => ({ like: 0, love: 0, recycle: 0 });
const pending = { reactions: {} as ReactionMap, views: {} as ViewMap, count: 0, since: 0 };
let stored: { reactions: ReactionMap; views: ViewMap; at: number } | null = null;
let loading: Promise<void> | null = null;
let flushing: Promise<void> | null = null;

const FLUSH_EVERY = 2 * 60_000;
const FLUSH_AT = 40;
const CACHE_FOR = 60_000;

async function loadStored() {
  if (stored && Date.now() - stored.at < CACHE_FOR) return;
  loading ??= (async () => {
    try {
      const [r, v] = await Promise.all([readFile(FILES.reactions), readFile(FILES.views)]);
      stored = { reactions: r.text ? JSON.parse(r.text) : {}, views: v.text ? JSON.parse(v.text) : {}, at: Date.now() };
    } finally {
      loading = null;
    }
  })();
  await loading;
}

function flushSoon() {
  if (flushing || pending.count === 0) return;
  if (pending.count < FLUSH_AT && Date.now() - pending.since < FLUSH_EVERY) return;
  const reactions = pending.reactions;
  const views = pending.views;
  pending.reactions = {};
  pending.views = {};
  pending.count = 0;
  pending.since = 0;
  flushing = (async () => {
    try {
      if (Object.keys(reactions).length) {
        await update(FILES.reactions, "Blog reactions", (text) => {
          const all: ReactionMap = text ? JSON.parse(text) : {};
          for (const [slug, add] of Object.entries(reactions)) {
            const cur = (all[slug] ??= empty());
            for (const k of REACTIONS) cur[k] = Math.max(0, (cur[k] ?? 0) + (add[k] ?? 0));
          }
          return { text: JSON.stringify(all, null, 1), result: null };
        });
      }
      if (Object.keys(views).length) {
        await update(FILES.views, "Blog views", (text) => {
          const all: ViewMap = text ? JSON.parse(text) : {};
          for (const [slug, n] of Object.entries(views)) all[slug] = (all[slug] ?? 0) + n;
          return { text: JSON.stringify(all, null, 1), result: null };
        });
      }
      stored = null; // re-read next time
    } catch (e) {
      // put the numbers back so they are saved on the next try
      console.error("Saving blog stats failed", e);
      for (const [slug, add] of Object.entries(reactions)) for (const k of REACTIONS) bump(pending.reactions, slug, k, add[k] ?? 0);
      for (const [slug, n] of Object.entries(views)) pending.views[slug] = (pending.views[slug] ?? 0) + n;
      pending.count += 1;
      pending.since ||= Date.now();
    } finally {
      flushing = null;
    }
  })();
}

function bump(map: ReactionMap, slug: string, k: Reaction, by: number) {
  (map[slug] ??= empty())[k] += by;
}

// save whatever is waiting every couple of minutes even with no new visits
const timer = setInterval(() => {
  if (pending.count) {
    pending.since = Math.min(pending.since, Date.now() - FLUSH_EVERY);
    flushSoon();
  }
}, FLUSH_EVERY);
(timer as { unref?: () => void }).unref?.();

function track() {
  pending.count += 1;
  if (!pending.since) pending.since = Date.now();
  flushSoon();
}

export function addReaction(slug: string, k: Reaction, by: 1 | -1) {
  bump(pending.reactions, slug, k, by);
  track();
}

export function addView(slug: string) {
  pending.views[slug] = (pending.views[slug] ?? 0) + 1;
  track();
}

/** Saved counts plus anything not saved yet. */
export async function getStats() {
  await loadStored().catch((e) => console.error("Reading blog stats failed", e));
  const reactions: ReactionMap = {};
  const views: ViewMap = { ...(stored?.views ?? {}) };
  for (const src of [stored?.reactions ?? {}, pending.reactions]) {
    for (const [slug, c] of Object.entries(src)) for (const k of REACTIONS) bump(reactions, slug, k, c[k] ?? 0);
  }
  for (const [slug, n] of Object.entries(pending.views)) views[slug] = (views[slug] ?? 0) + n;
  for (const c of Object.values(reactions)) for (const k of REACTIONS) c[k] = Math.max(0, c[k]);
  return { reactions, views };
}

export { empty as emptyReactions };

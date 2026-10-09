import { NextResponse } from "next/server";
import { SLUG_RE, deleteItem, getItem, itemExists, listItems, saveItem, storeMode, type Kind } from "@/lib/admin/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KINDS: Kind[] = ["blog", "events"];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function kindOf(v: unknown): Kind | null {
  return KINDS.includes(v as Kind) ? (v as Kind) : null;
}

function fail(e: unknown, status = 500) {
  return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status });
}

/** GET ?kind=blog → list, GET ?kind=blog&slug=x → one item */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const kind = kindOf(u.searchParams.get("kind"));
  if (!kind) return fail("Unknown kind", 400);
  try {
    const slug = u.searchParams.get("slug");
    if (slug) {
      const item = await getItem(kind, slug);
      return item ? NextResponse.json(item) : fail("Not found", 404);
    }
    return NextResponse.json({ items: await listItems(kind), mode: storeMode() });
  } catch (e) {
    return fail(e);
  }
}

type SaveBody = {
  kind: string;
  slug: string;
  previousSlug?: string;
  data: Record<string, unknown>;
  body: string;
  image?: { base64: string; ext: string };
};

const BLOG_FIELDS = ["title", "summary", "category", "date", "author", "image", "imageCredit", "featured", "draft"];
const EVENT_FIELDS = ["title", "type", "summary", "date", "endDate", "time", "venue", "registerUrl", "image", "draft"];

export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as SaveBody | null;
  const kind = kindOf(b?.kind);
  if (!b || !kind) return fail("Invalid request", 400);
  if (!SLUG_RE.test(b.slug)) return fail("The URL name may only use lowercase letters, numbers and hyphens.", 400);
  if (!String(b.data?.title ?? "").trim()) return fail("Title is required.", 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(b.data?.date ?? ""))) return fail("Date is required.", 400);

  try {
    if (b.slug !== b.previousSlug && (await itemExists(kind, b.slug))) {
      return fail(`Something already uses the URL “${b.slug}”. Pick a different URL name.`, 409);
    }

    // keep only known fields; drop empty strings / false so the Markdown stays tidy
    const allowed = kind === "blog" ? BLOG_FIELDS : EVENT_FIELDS;
    const data: Record<string, unknown> = {};
    for (const k of allowed) {
      const v = b.data[k];
      if (v === undefined || v === null || v === "" || v === false) continue;
      data[k] = typeof v === "string" ? v.trim() : v;
    }
    if (kind === "blog") data.cover = 1;

    let upload: { path: string; base64: string } | undefined;
    if (b.image?.base64) {
      const ext = ["webp", "jpg", "jpeg", "png"].includes(b.image.ext) ? b.image.ext : "webp";
      if (Buffer.byteLength(b.image.base64, "base64") > MAX_IMAGE_BYTES) return fail("Image is too large (max 4 MB).", 413);
      const file = `${b.slug}-${Date.now().toString(36)}.${ext}`;
      const folder = kind === "blog" ? "blog" : "events";
      upload = { path: `public/images/${folder}/${file}`, base64: b.image.base64 };
      data.image = `/images/${folder}/${file}`;
    }

    const ref = await saveItem(kind, { slug: b.slug, data, body: b.body ?? "" }, { previousSlug: b.previousSlug || undefined, upload });
    return NextResponse.json({ ok: true, slug: b.slug, ref, mode: storeMode(), image: data.image ?? "" });
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request) {
  const u = new URL(req.url);
  const kind = kindOf(u.searchParams.get("kind"));
  const slug = u.searchParams.get("slug") ?? "";
  if (!kind || !SLUG_RE.test(slug)) return fail("Invalid request", 400);
  try {
    return NextResponse.json({ ok: true, ref: await deleteItem(kind, slug) });
  } catch (e) {
    return fail(e);
  }
}

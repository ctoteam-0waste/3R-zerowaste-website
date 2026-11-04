import { NextResponse } from "next/server";
import { getPost, getPosts } from "@/lib/content";
import { REACTIONS, addReaction, addView, emptyReactions, getStats, type Reaction } from "@/lib/siteData";
import { allow, clientIp, corsFor } from "@/lib/publicApi";

/**
 * Blog reactions and views (public; used by 0waste.co.in and karmaverse.earth).
 *
 * GET  /api/blog/stats?slug=x  → { views, reactions }            for one post
 * GET  /api/blog/stats         → { mostRead: [slug…], views }    top posts by views
 * POST /api/blog/stats { slug, action: "view" }
 * POST /api/blog/stats { slug, action: "react", reaction: "like"|"love"|"recycle", undo?: true } → { reactions }
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const headers = { ...corsFor(req), "Cache-Control": "no-store" };
  const slug = new URL(req.url).searchParams.get("slug");
  const { reactions, views } = await getStats();
  if (slug) {
    if (!getPost(slug)) return NextResponse.json({ error: "Not found" }, { status: 404, headers });
    return NextResponse.json({ views: views[slug] ?? 0, reactions: reactions[slug] ?? emptyReactions() }, { headers });
  }
  const live = new Set(getPosts().map((p) => p.slug));
  const mostRead = Object.entries(views)
    .filter(([s, n]) => live.has(s) && n > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([s]) => s);
  return NextResponse.json({ mostRead, views: Object.fromEntries(Object.entries(views).filter(([s]) => live.has(s))) }, { headers });
}

export async function POST(req: Request) {
  const headers = corsFor(req);
  const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers });
  const b = (await req.json().catch(() => null)) as { slug?: string; action?: string; reaction?: string; undo?: boolean } | null;
  const slug = String(b?.slug ?? "");
  if (!getPost(slug)) return reply({ error: "Not found" }, 404);
  const ip = clientIp(req);

  if (b?.action === "view") {
    // one view per visitor per post every 30 minutes
    if (allow(`view:${ip}:${slug}`, 1, 30 * 60_000) && allow(`views:${ip}`, 60, 60 * 60_000)) addView(slug);
    return reply({ ok: true });
  }

  if (b?.action === "react") {
    const k = b.reaction as Reaction;
    if (!REACTIONS.includes(k)) return reply({ error: "Unknown reaction" }, 400);
    if (allow(`react:${ip}`, 40, 60 * 60_000)) addReaction(slug, k, b.undo ? -1 : 1);
    const { reactions } = await getStats();
    return reply({ reactions: reactions[slug] ?? emptyReactions() });
  }

  return reply({ error: "Unknown action" }, 400);
}

export function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: corsFor(req) });
}

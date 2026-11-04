import { NextResponse } from "next/server";
import { getPosts } from "@/lib/content";
import { emptyReactions, getStats, listSubscribers, removeSubscriber } from "@/lib/siteData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const csvCell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/**
 * GET  /api/admin/audience             → { subscribers, posts: [{slug,title,date,views,reactions}] }
 * GET  /api/admin/audience?format=csv  → subscribers.csv download
 * DELETE /api/admin/audience?email=x   → remove a subscriber
 */
export async function GET(req: Request) {
  const format = new URL(req.url).searchParams.get("format");
  try {
    const subscribers = await listSubscribers();
    if (format === "csv") {
      const rows = [["email", "signed_up", "source"], ...subscribers.map((s) => [s.email, s.date.slice(0, 10), s.source])];
      return new Response(rows.map((r) => r.map(csvCell).join(",")).join("\n") + "\n", {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
          "Cache-Control": "no-store",
        },
      });
    }
    const { reactions, views } = await getStats();
    const posts = getPosts()
      .map((p) => ({ slug: p.slug, title: p.title, date: p.date, views: views[p.slug] ?? 0, reactions: reactions[p.slug] ?? emptyReactions() }))
      .sort((a, b) => b.views - a.views || b.date.localeCompare(a.date));
    return NextResponse.json({ subscribers, posts });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const email = new URL(req.url).searchParams.get("email")?.toLowerCase();
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });
  try {
    return NextResponse.json({ removed: await removeSubscriber(email) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getPost } from "@/lib/content";
import { CORS, absoluteHtml, feedItem } from "@/lib/blogFeed";

/** GET /api/blog/<slug> → one published post with its article HTML (public, CORS-enabled). */
export const revalidate = 300;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });
  return NextResponse.json({ post: { ...feedItem(post), html: absoluteHtml(post.html), faq: post.faq } }, { headers: CORS });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

import { NextResponse } from "next/server";
import { getPosts } from "@/lib/content";
import { CORS, feedItem } from "@/lib/blogFeed";

/** GET /api/blog → all published posts, newest first (public, CORS-enabled). */
export const revalidate = 300;

export function GET() {
  return NextResponse.json({ source: "0waste.co.in", posts: getPosts().map(feedItem) }, { headers: CORS });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

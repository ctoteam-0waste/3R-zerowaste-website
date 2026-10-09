import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_HOURS, adminConfigured, createSession, safeEqual } from "@/lib/admin/session";

export const runtime = "nodejs";

// Simple brute-force brake: per-IP failures within 15 minutes (resets when the server restarts).
const failures = new Map<string, { count: number; since: number }>();

export async function POST(req: Request) {
  if (!adminConfigured()) return NextResponse.json({ error: "Admin is not set up yet (ADMIN_PASSWORD missing on the server)." }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const f = failures.get(ip);
  if (f && Date.now() - f.since < 15 * 60_000 && f.count >= 8) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!password || !safeEqual(password, process.env.ADMIN_PASSWORD!)) {
    const cur = f && Date.now() - f.since < 15 * 60_000 ? f : { count: 0, since: Date.now() };
    failures.set(ip, { ...cur, count: cur.count + 1 });
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  failures.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  return res;
}

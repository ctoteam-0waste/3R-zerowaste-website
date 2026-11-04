import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/siteData";
import { allow, clientIp, corsFor } from "@/lib/publicApi";

/**
 * POST /api/newsletter { email, source?, website? } → saves the email to the newsletter list
 * (encrypted, see lib/siteData). Used by the sign-up boxes on 0waste.co.in and karmaverse.earth.
 * The list is viewed and downloaded in /admin/audience.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const headers = corsFor(req, "POST, OPTIONS");
  const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers });

  const b = (await req.json().catch(() => null)) as { email?: string; source?: string; website?: string } | null;
  // "website" is a hidden field people never fill in — bots do.
  if (b?.website) return reply({ ok: true });
  const email = String(b?.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return reply({ error: "Please enter a valid email address." }, 400);
  if (!allow(`nl:${clientIp(req)}`, 5, 60 * 60_000)) return reply({ error: "Too many sign-ups from here. Please try again later." }, 429);

  const source = String(b?.source ?? "website").replace(/[^a-z0-9 _.-]/gi, "").slice(0, 40) || "website";
  try {
    const added = await addSubscriber(email, source);
    return reply({ ok: true, already: !added });
  } catch (e) {
    console.error("Newsletter sign-up failed", e);
    return reply({ error: "Couldn't sign you up right now. Please try again later." }, 502);
  }
}

export function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: corsFor(req, "POST, OPTIONS") });
}

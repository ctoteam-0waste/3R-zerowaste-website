import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * POST /api/newsletter { email, source?, website? } → adds the email to the Mailchimp audience.
 * Used by the sign-up boxes on 0waste.co.in and karmaverse.earth.
 *
 * Needs MAILCHIMP_API_KEY (ends in e.g. "-us21") and MAILCHIMP_AUDIENCE_ID on the server.
 * New people get Mailchimp's confirmation email first (double opt-in), which keeps the list clean.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = ["https://karmaverse.earth", "https://www.karmaverse.earth", "https://0waste.co.in", "https://www.0waste.co.in"];

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const headers = cors(req);
  const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers });

  const b = (await req.json().catch(() => null)) as { email?: string; source?: string; website?: string } | null;
  // "website" is a hidden field people never fill in — bots do.
  if (b?.website) return reply({ ok: true });
  const email = String(b?.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return reply({ error: "Please enter a valid email address." }, 400);

  const key = process.env.MAILCHIMP_API_KEY;
  const list = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = key?.split("-")[1];
  if (!key || !list || !dc) return reply({ error: "Sign-ups are not available right now. Please try again later." }, 503);

  const source = String(b?.source ?? "website").replace(/[^a-z0-9 _.-]/gi, "").slice(0, 40) || "website";
  const hash = createHash("md5").update(email).digest("hex");
  const base = `https://${dc}.api.mailchimp.com/3.0/lists/${list}/members/${hash}`;
  const auth = { Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString("base64")}`, "Content-Type": "application/json" };

  try {
    // Upsert: new people get "pending" (confirmation email); existing subscribers are left as they are.
    const res = await fetch(base, {
      method: "PUT",
      headers: auth,
      body: JSON.stringify({ email_address: email, status_if_new: "pending" }),
    });
    const json = (await res.json().catch(() => ({}))) as { status?: string | number; title?: string; detail?: string };
    if (!res.ok) {
      if (json.title === "Member In Compliance State" || json.title === "Forgotten Email Not Subscribed") {
        return reply({ error: "This email unsubscribed earlier. Please use the sign-up link in any of our emails to rejoin." }, 400);
      }
      if (json.title === "Invalid Resource") return reply({ error: "Please enter a valid email address." }, 400);
      console.error("Mailchimp error", res.status, json.title, json.detail);
      return reply({ error: "Couldn't sign you up right now. Please try again later." }, 502);
    }
    // Tag where they signed up (best effort).
    await fetch(`${base}/tags`, { method: "POST", headers: auth, body: JSON.stringify({ tags: [{ name: source, status: "active" }] }) }).catch(() => {});
    return reply({ ok: true, status: json.status === "subscribed" ? "subscribed" : "pending" });
  } catch (e) {
    console.error("Mailchimp request failed", e);
    return reply({ error: "Couldn't sign you up right now. Please try again later." }, 502);
  }
}

export function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) });
}

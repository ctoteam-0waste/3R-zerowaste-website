import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { aiConfigured, ideasPrompt, socialPrompt, suggestIdeas, writePost, writePrompt, writeSocial, type Length } from "@/lib/admin/ai";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// writing a full post can take a minute or two
export const maxDuration = 300;

function fail(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function explain(e: unknown) {
  if (e instanceof Anthropic.AuthenticationError) return fail("The AI key (ANTHROPIC_API_KEY) is not valid.", 500);
  if (e instanceof Anthropic.RateLimitError) return fail("The AI is busy right now. Wait a minute and try again.", 429);
  if (e instanceof Anthropic.APIError) return fail(`AI service error (${e.status ?? "network"}). Please try again.`, 502);
  return fail(e instanceof Error ? e.message : String(e));
}

/** GET → does this server have an API key (automatic mode), or is it copy-paste mode? */
export async function GET() {
  return NextResponse.json({ enabled: aiConfigured() });
}

/**
 * POST { action: "ideas" | "write", context, focusKeyword?, length? }      → calls Claude (needs API key)
 * POST { action: "prompt", for: "ideas" | "write", context, ... }          → returns the prompt text to paste into claude.ai
 */
export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as { action?: string; for?: string; context?: string; focusKeyword?: string; length?: string; post?: { title?: string; summary?: string; slug?: string; body?: string } } | null;
  const context = String(b?.context ?? "").slice(0, 4000);
  const focusKeyword = b?.focusKeyword?.slice(0, 120);
  const length = (["short", "standard", "long"].includes(String(b?.length)) ? b?.length : "standard") as Length;
  const social = () => {
    const p = b?.post ?? {};
    return { title: String(p.title ?? "").slice(0, 300), summary: String(p.summary ?? "").slice(0, 1000), url: `${site.url}/blog/${String(p.slug ?? "")}`, body: String(p.body ?? "") };
  };
  try {
    if (b?.for === "social" || b?.action === "social") {
      const p = social();
      if (!p.title || p.body.trim().length < 50) return fail("Write or open a post first — the social posts are made from its title and article.", 400);
      if (b.action === "prompt") return NextResponse.json({ prompt: socialPrompt(p) });
      if (!aiConfigured()) return fail("No API key on the server — use the copy-paste mode with your Claude subscription.", 503);
      return NextResponse.json({ social: await writeSocial(p) });
    }
    if (b?.action === "prompt") {
      if (b.for === "write" && context.trim().length < 10) return fail("Describe the idea in at least a sentence.", 400);
      return NextResponse.json({ prompt: b.for === "write" ? writePrompt(context, focusKeyword, length) : ideasPrompt(context, length) });
    }
    if (!aiConfigured()) return fail("No API key on the server — use the copy-paste mode with your Claude subscription.", 503);
    if (b?.action === "ideas") return NextResponse.json({ ideas: await suggestIdeas(context) });
    if (b?.action === "write") {
      if (context.trim().length < 10) return fail("Describe the idea in at least a sentence.", 400);
      return NextResponse.json({ post: await writePost({ context, focusKeyword, length }) });
    }
    return fail("Unknown action", 400);
  } catch (e) {
    return explain(e);
  }
}

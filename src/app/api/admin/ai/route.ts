import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { aiConfigured, ideasPrompt, suggestIdeas, writePost, writePrompt, type Length } from "@/lib/admin/ai";

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
  const b = (await req.json().catch(() => null)) as { action?: string; for?: string; context?: string; focusKeyword?: string; length?: string } | null;
  const context = String(b?.context ?? "").slice(0, 4000);
  const focusKeyword = b?.focusKeyword?.slice(0, 120);
  const length = (["short", "standard", "long"].includes(String(b?.length)) ? b?.length : "standard") as Length;
  try {
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

import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { blogCategories } from "@/content/posts";
import { site } from "@/content/site";
import { getPosts } from "@/lib/content";

/**
 * AI blog writer for the admin panel. Two modes:
 * - API mode (ANTHROPIC_API_KEY set): the server calls Claude and fills the editor directly.
 * - Copy-paste mode (no key): the server builds the same prompt; the admin pastes it into
 *   claude.ai (their Claude subscription) and pastes the answer back into the editor.
 */

const MODEL = "claude-opus-5-5";
const CATEGORIES = blogCategories.filter((c) => c !== "All") as [string, ...string[]];

export function aiConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

let client: Anthropic | null = null;
const anthropic = () => (client ??= new Anthropic());

/** Pages on the site the writer may link to (internal links help SEO and keep readers on the site). */
const SITE_PAGES = [
  { path: "/solutions/esg", about: "ESG & BRSR reporting services" },
  { path: "/solutions/circular-economy", about: "Circular economy, recycling, e-waste and zero-waste services" },
  { path: "/solutions/epr", about: "EPR compliance for plastic packaging, e-waste, batteries" },
  { path: "/solutions/carbon-net-zero", about: "Carbon accounting and net-zero planning" },
  { path: "/solutions/climate-intelligence", about: "Climate intelligence and data platform" },
  { path: "/solutions/sustainable-engagement", about: "Employee / community sustainability engagement" },
  { path: "/karmaverse", about: "KarmaVerse app: rewards people with KarmaCoins for sustainable actions" },
  { path: "/events", about: "Upcoming drives, workshops and webinars" },
  { path: "/contact", about: "Talk to the team / book a consultation" },
];

function brief() {
  const posts = getPosts()
    .map((p) => `- /blog/${p.slug} — "${p.title}" (${p.category})`)
    .join("\n");
  const pages = SITE_PAGES.map((p) => `- ${p.path} — ${p.about}`).join("\n");
  return `You are the content strategist and senior writer for ${site.name} (${site.url}).

About the company: ${site.seoDescription} ${site.about} Philosophy: "${site.philosophy}". Based in Gurugram, India; readers are mostly Indian businesses (sustainability, compliance and CSR teams), housing societies, schools and eco-conscious individuals.

Voice: clear, practical, warm and confident. Plain English, short paragraphs, Indian context and examples (₹, Indian rules and bodies such as CPCB, MoEFCC, SEBI, municipal corporations). No hype, no filler, no clichés like "in today's fast-paced world".

Accuracy matters more than anything — this is published under the company's name:
- Never invent statistics, survey results, quotes, client names, case-study results or dates.
- Only state rules, deadlines and figures you are confident are correct and current; otherwise describe them qualitatively or tell readers to check the official source.
- Do not claim things about ${site.name} beyond what is described above.

Existing blog posts (link to the relevant ones; never duplicate their topic):
${posts || "- (none yet)"}

Site pages you may link to:
${pages}

Blog categories: ${CATEGORIES.join(", ")}.`;
}

/* ---------- Shared instructions ---------- */

function ideasAsk(context: string) {
  const ask = context.trim()
    ? `Suggest 6 blog post ideas built around this theme or context from the team:\n\n"""${context.trim()}"""`
    : "Suggest 6 blog post ideas that fit the company and fill gaps in the existing posts.";
  return `${ask}

Pick ideas with real search demand in India and strong engagement potential: questions people actually type into Google, practical guides, checklists, explainers of new rules, and "how to" posts that lead naturally to our services or the KarmaVerse app. Mix categories and search intents. Avoid topics the existing posts already cover.`;
}

const LENGTHS = { short: "about 800 words", standard: "about 1,300 words", long: "about 2,000 words" } as const;
export type Length = keyof typeof LENGTHS;

const SEO_RULES = `SEO and engagement requirements:
- Title: 50–60 characters, focus keyword near the start, compelling to click.
- Summary (meta description): 140–160 characters, contains the focus keyword, ends with a reason to read.
- Slug: lowercase words joined by hyphens, 3–6 words, contains the focus keyword.
- Use the focus keyword in the first 100 words, at least one H2, and naturally 3–6 times overall. Never keyword-stuff.
- Open with a hook in 2–3 short sentences that names the reader's problem, then say what they will learn. No H1 — the title is shown separately.
- Structure with ## H2 sections (and ### H3 where useful) phrased the way people search, e.g. questions or "How to…". Keep paragraphs to 2–4 sentences.
- Make it skimmable: bullet lists, a numbered step-by-step section or checklist where it fits, a Markdown table if comparing things, and **bold** for key terms.
- Add 2–4 internal links in Markdown to the existing blog posts and site pages listed above, with descriptive anchor text (never "click here"). Only use paths from those lists. No external links unless it is an official government source you are certain of.
- Include a short "Key takeaways" bullet list near the end.
- End with a section exactly titled "## Frequently asked questions" containing 3–5 questions people really search, each as a ### H3 question followed by a 2–4 sentence answer.
- Finish with a brief call to action after the FAQ, linking to /contact or /karmaverse as relevant.`;

function writeAsk(context: string, focusKeyword: string | undefined, length: Length) {
  const kw = focusKeyword?.trim();
  return `Write a complete, ready-to-publish blog post from this idea / context:

"""${context.trim()}"""
${kw ? `\nFocus keyword (use exactly this): "${kw}"` : "\nChoose the best focus keyword: the phrase people in India would actually search for."}
Length: ${LENGTHS[length] ?? LENGTHS.standard}.

${SEO_RULES}`;
}

/** How Claude must format the post in copy-paste mode, so the editor can read it back. */
const PASTE_FORMAT = `Reply with ONLY the post in this exact format (front matter, then the Markdown article), with nothing before or after it:

---
title: <title>
summary: <meta description>
slug: <slug>
category: <one of the blog categories>
focusKeyword: <focus keyword>
keywords: <4–8 related search phrases, comma separated>
---

<the full article in Markdown>`;

/* ---------- Copy-paste prompts (Claude subscription, no API key) ---------- */

export function ideasPrompt(context: string, length: Length) {
  return `${brief()}

---

${ideasAsk(context)}

Number the ideas 1–6. For each give: the headline (under 65 characters), 1–2 sentences on the angle, the focus keyword, the category and the search intent.

After the list, wait. When I reply with a number (optionally with extra notes), write that post (${LENGTHS[length]}) following these rules:

${SEO_RULES}

${PASTE_FORMAT}`;
}

export function writePrompt(context: string, focusKeyword: string | undefined, length: Length) {
  return `${brief()}

---

${writeAsk(context, focusKeyword, length)}

${PASTE_FORMAT}`;
}

/* ---------- API mode ---------- */

const IdeasSchema = z.object({
  ideas: z.array(
    z.object({
      title: z.string().describe("Working headline, under 65 characters"),
      angle: z.string().describe("1–2 sentences: what the post covers and why readers will care"),
      focusKeyword: z.string().describe("The main search phrase this post should rank for"),
      category: z.enum(CATEGORIES),
      searchIntent: z.enum(["informational", "how-to", "comparison", "commercial", "news"]),
    }),
  ),
});
export type Idea = z.infer<typeof IdeasSchema>["ideas"][number];

export async function suggestIdeas(context: string): Promise<Idea[]> {
  const res = await anthropic().beta.messages.parse({
    model: MODEL,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(IdeasSchema) },
    system: brief(),
    messages: [{ role: "user", content: ideasAsk(context) }],
  });
  if (res.stop_reason === "refusal") throw new Error("The AI declined this request. Try rewording the context.");
  if (!res.parsed_output) throw new Error("The AI reply could not be read. Please try again.");
  return res.parsed_output.ideas;
}

const PostSchema = z.object({
  title: z.string(),
  summary: z.string(),
  slug: z.string(),
  category: z.enum(CATEGORIES),
  focusKeyword: z.string(),
  keywords: z.array(z.string()).describe("4–8 related search phrases used naturally in the article"),
  body: z.string().describe("The full article in Markdown, starting with the intro paragraph"),
});
export type DraftPost = z.infer<typeof PostSchema>;

export async function writePost(input: { context: string; focusKeyword?: string; length?: Length }): Promise<DraftPost> {
  const res = await anthropic().beta.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(PostSchema) },
    system: brief(),
    messages: [{ role: "user", content: writeAsk(input.context, input.focusKeyword, input.length ?? "standard") }],
  });
  if (res.stop_reason === "refusal") throw new Error("The AI declined this request. Try rewording the idea.");
  if (res.stop_reason === "max_tokens" || !res.parsed_output) throw new Error("The AI reply was cut off. Try a shorter length.");
  return res.parsed_output;
}

/* ---------- Social posts for a finished blog post ---------- */

export type SocialInput = { title: string; summary: string; url: string; body: string };

function socialAsk(p: SocialInput) {
  return `Write social media posts to promote this blog post from ${site.name}. Each one must make people want to click the link and read it.

Rules:
- Lead with the most interesting fact, question or takeaway from the article — not "Check out our new blog".
- Only use facts that appear in the article. Never invent numbers or claims.
- Every post includes the link exactly as given: ${p.url}
- Indian audience; plain, warm, confident English. Do not use the phrase "waste management".

Write:
1. Instagram caption: 80–150 words, a strong first line, short lines, a few emojis, a call to action ("link in bio" plus the link), then 8–12 relevant hashtags.
2. LinkedIn post: 120–220 words for business readers (sustainability, compliance, CSR), a hook first line, short paragraphs, 3–5 hashtags.
3. Facebook post: 60–120 words, friendly, with the link.
4. X (Twitter) post: under 270 characters including the link, 1–2 hashtags.
5. WhatsApp message: 40–80 words, easy to forward to housing society / office groups, with the link.

The blog post:
Title: ${p.title}
Summary: ${p.summary}

${p.body.slice(0, 12000)}`;
}

/** Copy-paste mode: the prompt to paste into claude.ai. */
export function socialPrompt(p: SocialInput) {
  return `${socialAsk(p)}

Label each one clearly (Instagram, LinkedIn, Facebook, X, WhatsApp) so it is easy to copy.`;
}

const SocialSchema = z.object({
  instagram: z.string(),
  linkedin: z.string(),
  facebook: z.string(),
  x: z.string(),
  whatsapp: z.string(),
});
export type SocialPosts = z.infer<typeof SocialSchema>;

export async function writeSocial(p: SocialInput): Promise<SocialPosts> {
  const res = await anthropic().beta.messages.parse({
    model: MODEL,
    max_tokens: 6000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: betaZodOutputFormat(SocialSchema) },
    system: brief(),
    messages: [{ role: "user", content: socialAsk(p) }],
  });
  if (res.stop_reason === "refusal") throw new Error("The AI declined this request.");
  if (!res.parsed_output) throw new Error("The AI reply could not be read. Please try again.");
  return res.parsed_output;
}

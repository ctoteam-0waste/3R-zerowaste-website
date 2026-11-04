---
name: write-blog
description: Suggest SEO blog ideas or write a complete SEO-optimised blog post for 0waste.co.in and save it as a draft in content/blog. Use when the user asks for blog ideas, or gives an idea/context and wants a blog post written.
---

# Write an SEO blog post for 3R ZeroWaste

The user's input (if any): $ARGUMENTS

1. Read the writing brief and rules in `src/lib/admin/ai.ts`: the `brief()` text (company, voice, accuracy rules, site pages to link to) and `SEO_RULES`. Follow them exactly. They are the same rules the website's admin AI uses.
2. Read the front matter of every post in `content/blog/*.md` (skip files starting with `_`) to know existing topics and slugs for internal links. Read `src/content/site.ts` for company facts.
3. If the user asked for **ideas**, or gave no clear topic: suggest 6 ideas, numbered, each with headline, angle, focus keyword, category and search intent. Prefer topics with real search demand in India that the existing posts don't cover. Stop and let the user pick.
4. If the user gave an idea or context (or picked an idea): write the full post following `SEO_RULES` (default length is about 1,300 words unless they ask otherwise). Never invent statistics, quotes, client names or results.
5. Save it as `content/blog/<slug>.md` with this front matter, then the Markdown article:

   ```
   ---
   title: "..."
   summary: "..."
   category: "..."        # ESG | Circular Economy | EPR | Carbon & Net Zero | KarmaVerse | Community & Events
   date: YYYY-MM-DD       # today
   author: "3R ZeroWaste Team"
   focusKeyword: "..."
   keywords: "a, b, c"
   cover: 1
   draft: true
   ---
   ```

   Make sure the slug isn't already used.
6. Tell the user the file path. Say that it's saved as a **draft**: they should review it in `/admin`, add a cover image, and click Publish (or remove `draft: true` and push to GitHub `main`).

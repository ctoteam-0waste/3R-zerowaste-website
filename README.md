# 3R ZeroWaste — Website

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide icons.

## Run locally (VS Code)

```bash
npm install
npm run dev        # http://localhost:3000
```

Production: `npm run build && npm start`. Checks: `npm run lint`, `npm run typecheck`.
Deploys as-is to Vercel (or any Node host). Fonts are self-hosted via `@fontsource`, so the build needs no Google Fonts access.

## Where to edit content

All copy and data live in `src/content/` — components only render it.

| File | What it holds |
| --- | --- |
| `site.ts` | Brand, tagline, email, social links, hero video paths, navbar & footer links, mascot speech lines |
| `home.ts` | Impact metrics, solutions, How-it-works steps, technology, case studies, Why 3R, journey timeline, partner logos |
| `team.ts` | Team members (photos in `public/images/team/`) |
| `posts.ts` | Blog categories + post type (posts themselves are Markdown — see below) |
| `events.ts` | Live sustainability calendar + event type (events themselves are Markdown — see below) |

Anything in `[brackets]` is a placeholder waiting for verified data — no numbers or clients have been invented.

### Blog posts & events — admin panel (no code needed)

Go to **https://0waste.co.in/admin**, sign in with the admin password, and use **New blog post** / **New event**.
Fill in the form (title, summary, cover image, date, article or event details) and click **Publish**.
The panel saves the post to GitHub and Hostinger rebuilds the site — the page is live in about **2 minutes**
(the editor shows "It's live" when it is). **Save draft** keeps it hidden; **Delete** removes it from the site.
Cover photos are resized to WebP in the browser before upload (max 4 MB).

How it works: `/admin` (protected by `src/middleware.ts`) → `/api/admin/items` → `src/lib/admin/store.ts`,
which commits the Markdown file (and image) to the repo in one commit via the GitHub API. Locally, without a
token, it writes straight to `content/` and `public/images/` so you can test.

**One-time setup on Hostinger** (hPanel → Websites → 0waste.co.in → Node.js / Environment variables), then redeploy:

| Variable | Value |
| --- | --- |
| `ADMIN_PASSWORD` | A long password for the team (share it privately) |
| `ADMIN_SESSION_SECRET` | Any long random string (keeps sign-ins secure) |
| `GITHUB_TOKEN` | Fine-grained GitHub token: repository `ctoteam-0waste/3R-zerowaste-website` only, permission **Contents: Read and write** |
| `GITHUB_REPO` | `ctoteam-0waste/3R-zerowaste-website` (optional — this is the default) |

Create the token at GitHub → Settings → Developer settings → Fine-grained tokens. Sign-ins last 8 hours;
8 wrong passwords lock an address out for 15 minutes. `/admin` is excluded from search engines.

### Blog posts & events (Markdown files)

The panel above edits these same files. Each post is a file in `content/blog/`, each event a file in `content/events/`. The file name is the URL
(`content/blog/epr-explained.md` → `/blog/epr-explained`). Copy `_template.md` in that folder, fill in the
fields at the top, write the body in Markdown. Files starting with `_` and files with `draft: true` are hidden.

- Posts are sorted newest first; reading time is calculated automatically.
- Events move from **Upcoming** to **Past** by themselves the day after they end (IST); pages refresh hourly.
- Pages: `/blog`, `/blog/[slug]`, `/events`, `/events/[slug]`. All appear in the sitemap automatically.

### Common tasks
- **Hero video:** put `hero-earth-loop.webm/.mp4` (+ a poster) in `public/videos/` and set the paths in `site.hero.video`. The animated planet stays as the mobile / reduced-motion fallback.
- **New metric:** set `value` on an item in `pendingMetrics` (or move it into `metrics`).
- **Case study:** replace the placeholder entries in `home.ts`.
- **Blog post / event:** replace the sample `.md` files (they hold `[bracketed]` placeholders and sample dates).
- **Partner logos:** add `{ name, src }` entries in `partners` with files in `public/images/partners/`.
- **Live calendar:** nothing to edit. Global sustainability observances and UN climate conferences (COPs) are fetched live from Wikidata (`src/lib/liveCalendar.ts`, served at `/api/calendar`, cached 6 h). Adjust which observances appear via the `TOPICS` / `EXCLUDE` patterns there. A COP appears once its exact dates are on Wikidata.
- **Newsletter:** wire `onSubmit` in `src/components/blog/Newsletter.tsx` to your provider.
- **Legal pages:** paste approved text into `src/components/layout/LegalPage.tsx` (or give each route its own content).

## Structure

```
src/
  app/                 layout, home, /blog, legal pages, sitemap, robots, 404
  components/
    layout/            Navbar (dropdowns, scroll-spy, progress bar), Footer, FloatingBuddy, LegalPage
    sections/          Hero, Marquee, Vision, ImpactDashboard, Solutions, HowItWorks, KarmaVerse,
                       VideoCard, Technology, CaseStudies, Why3R, Team, Timeline, BlogSection,
                       Events, LiveCalendar, Partners, CTA
    blog/              PostCard, BlogIndex (filters), Newsletter
    ui/                Button (magnetic), Reveal, Tilt, Parallax, Counter, Mascot, SpeechBubble, …
  content/             all editable data
  lib/                 calendar logic, hooks
public/images/         brand, mascot layers, team photos, app screenshots
```

## SEO
- Every page has a title, description and canonical URL on https://0waste.co.in (`site.url` in `site.ts`).
- Structured data (schema.org): Organization + WebSite (all pages), BlogPosting + breadcrumbs (articles), Event + breadcrumbs (events).
- Share image: `src/app/opengraph-image.tsx` (1200×630); articles and events use their own cover when they have one.
- `sitemap.xml` lists every page, article, event and solution; `robots.txt` blocks `/admin` and `/api/`.
- Old WordPress URLs redirect permanently (`next.config.mjs`).

## Notes
- **Mascot animation** = base render + 3 transparent overlay frames (blink, mouth half-open, mouth closed) swapped by CSS keyframes (`.mascot` in `globals.css`). For smoother animation later, swap `Mascot.tsx` for a Lottie/Rive file.
- **YouTube video** loads only after the visitor clicks play (privacy-enhanced `youtube-nocookie.com`).
- **Accessibility:** semantic landmarks, skip link, keyboard-reachable dropdowns (`focus-within`), Escape closes the mobile menu, and `prefers-reduced-motion` disables all animation.
- The KarmaVerse phone shows a real account screenshot (name + balance) — swap `public/images/app/home-scroll.webp` for a demo-account capture before going public.

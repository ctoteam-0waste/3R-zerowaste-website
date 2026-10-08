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

### Blog posts & events (Markdown)

Each post is a file in `content/blog/`, each event a file in `content/events/`. The file name is the URL
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

## Notes
- **Mascot animation** = base render + 3 transparent overlay frames (blink, mouth half-open, mouth closed) swapped by CSS keyframes (`.mascot` in `globals.css`). For smoother animation later, swap `Mascot.tsx` for a Lottie/Rive file.
- **YouTube video** loads only after the visitor clicks play (privacy-enhanced `youtube-nocookie.com`).
- **Accessibility:** semantic landmarks, skip link, keyboard-reachable dropdowns (`focus-within`), Escape closes the mobile menu, and `prefers-reduced-motion` disables all animation.
- The KarmaVerse phone shows a real account screenshot (name + balance) — swap `public/images/app/home-scroll.webp` for a demo-account capture before going public.

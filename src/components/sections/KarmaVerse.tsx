import Image from "next/image";
import { Check, Coins, Flame, Gauge, Gift, Globe, Leaf, Plus } from "lucide-react";
import { karmaJourney } from "@/content/home";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { Parallax } from "@/components/ui/Parallax";
import { VideoCard } from "@/components/sections/VideoCard";

const chips = [
  { label: "+100 KarmaCoins", Icon: Plus, bg: "bg-lime-brand", fg: "text-text", pos: "-left-[150px] top-10", delay: -1, always: true },
  { label: "Sustainable Action", Icon: Check, bg: "bg-text", fg: "text-lime-brand", pos: "-right-[170px] top-[90px]", delay: -3 },
  { label: "7 Day Streak", Icon: Flame, bg: "bg-[#FFE7C2]", fg: "text-[#B45309]", pos: "-left-[130px] top-[190px]", delay: -2 },
  { label: "Impact Score", Icon: Gauge, bg: "bg-[#D6F6F2]", fg: "text-[#0E7C70]", pos: "-right-[150px] top-[250px]", delay: -4 },
  { label: "Rewards", Icon: Gift, bg: "bg-text", fg: "text-lime-brand", pos: "-right-[120px] top-[410px]", delay: -5 },
  { label: "Carbon Impact", Icon: Leaf, bg: "bg-[#DDF5E8]", fg: "text-emerald-deep", pos: "-right-[130px] top-[565px]", delay: -2.5, always: true },
];

export function KarmaVerse() {
  return (
    <section id="karmaverse" aria-labelledby="kv-h" className="section-pad relative isolate overflow-hidden bg-kv text-text">
      <div aria-hidden className="absolute right-[6%] top-1/2 -z-10 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_40%,#C8F26A_0%,rgba(200,242,106,.4)_40%,rgba(232,241,207,0)_70%)]" />
      <div aria-hidden className="absolute right-[22%] top-[18%] -z-10 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(43,208,139,.35),rgba(232,241,207,0)_70%)]" />

      <div className="container-site flex flex-wrap items-center gap-[clamp(48px,6vw,96px)]">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-7">
          <Reveal className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-text">
              <Coins aria-hidden className="h-5 w-5 text-lime-brand" />
            </span>
            <span className="font-display text-xl font-bold tracking-[-0.02em]">KarmaVerse</span>
            <span className="mono-label rounded-md bg-text/[0.08] px-2 py-1 text-[10px] text-[#33413B]">by 3R</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="kv-h" className="font-semibold leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(40px, 5vw, 76px)" }}>
              What if every sustainable action had a reward?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[520px] text-[19px] leading-relaxed text-[#33413B]">
              KarmaVerse turns sustainable gestures into meaningful engagement, rewards and measurable impact.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ol aria-label="KarmaVerse journey" className="flex flex-wrap items-center gap-2.5">
              {karmaJourney.map((step, i) => {
                const last = i === karmaJourney.length - 1;
                return (
                  <li key={step} className="flex items-center gap-2.5">
                    <span
                      className={`group inline-flex min-h-12 items-center gap-2.5 rounded-full px-[18px] text-sm font-semibold transition-colors ${last ? "bg-lime-brand text-text" : "bg-text text-[#F2F6F3] hover:bg-lime-brand hover:text-text"}`}
                    >
                      <span className={`font-mono text-[11px] ${last ? "text-text" : "text-lime-brand group-hover:text-text"}`}>{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </span>
                    {!last && <span aria-hidden className="text-text-muted">→</span>}
                  </li>
                );
              })}
            </ol>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-wrap items-center gap-3.5">
            <Button href={site.karmaverseUrl} variant="dark" arrow external>
              Explore KarmaVerse
            </Button>
            <a
              href={site.karmaverseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white py-0 pl-2 pr-[18px] text-[15px] font-bold text-text ring-1 ring-text/[0.08] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(11,40,28,.5)]"
            >
              <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-text">
                <Globe aria-hidden className="h-4 w-4 text-lime-brand" />
              </span>
              karmaverse.earth
            </a>
          </Reveal>
        </div>

        <div className="relative flex min-w-0 flex-[1_1_420px] justify-center py-10">
          <Parallax>
            <div className="relative">
              <PhoneMockup />
              <div className="absolute -bottom-10 -left-10 z-[3] w-[170px] md:-left-[250px] md:w-[250px]">
                <div className="absolute -top-[84px] left-0 hidden w-max max-w-[220px] md:block">
                  <SpeechBubble />
                </div>
                <Mascot />
              </div>
              {chips.map(({ label, Icon, bg, fg, pos, delay, always }) => (
                <div
                  key={label}
                  aria-hidden
                  className={`absolute ${pos} z-[2] ${always ? "hidden sm:flex" : "hidden lg:flex"} animate-[float_6s_ease-in-out_infinite] items-center gap-2.5 whitespace-nowrap rounded-[18px] bg-white px-4 py-3 text-sm font-semibold shadow-[0_24px_50px_-24px_rgba(11,40,28,.45),0_0_0_1px_rgba(11,23,18,.06)]`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-[10px] ${bg}`}>
                    <Icon className={`h-4 w-4 ${fg}`} strokeWidth={2.2} />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </Parallax>
        </div>
      </div>

      <div className="container-site mt-[clamp(64px,8vw,112px)]">
        <Reveal>
          <VideoCard videoId={site.karmaverseVideoId} />
        </Reveal>
      </div>
    </section>
  );
}

/** Phone frame with the real KarmaVerse home screen auto-scrolling inside. */
function PhoneMockup() {
  return (
    <div
      role="img"
      aria-label="KarmaVerse app home screen: KarmaCoins XP balance, day streak, eco-quiz streak, sustainability actions, schedule a pickup, daily eco-quiz and invite friends"
      className="phone relative h-[620px] w-[300px] rounded-[48px] bg-text p-3 shadow-[0_60px_120px_-40px_rgba(11,40,28,.65),0_0_0_1px_rgba(0,0,0,.4),inset_0_0_0_2px_#24322C]"
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-[#0B2A1F]">
        <div className="relative flex-1 overflow-hidden">
          <Image quality={90}
            src="/images/app/home-scroll.webp"
            alt=""
            width={780}
            height={2076}
            sizes="276px"
            className="app-scroll block h-auto w-full"
            style={{ ["--scroll-by" as string]: "-195px" }}
            priority={false}
          />
        </div>
        <Image quality={90} src="/images/app/tabbar.webp" alt="" width={780} height={158} sizes="276px" className="block h-auto w-full flex-none" />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { YouTubeIcon } from "@/components/ui/SocialIcons";
import { Mascot } from "@/components/ui/Mascot";

/**
 * Lightweight YouTube embed: shows a branded poster and only loads the
 * (privacy-enhanced) YouTube iframe after the visitor presses play.
 */
export function VideoCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-[36px] bg-black shadow-[0_60px_120px_-50px_rgba(11,40,28,.7)]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title="KarmaVerse video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play the KarmaVerse video"
      className="group relative isolate flex min-h-[clamp(420px,40vw,560px)] w-full items-start overflow-hidden rounded-[36px] bg-[#07130E] p-[clamp(28px,5vw,72px)] pb-[220px] text-left shadow-[0_60px_120px_-50px_rgba(11,40,28,.7)] transition-transform duration-500 hover:-translate-y-1.5 md:items-center md:pb-[clamp(28px,5vw,72px)]"
    >
      <Image quality={90}
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 1280px) 100vw, 1184px"
        className="-z-20 object-cover opacity-40"
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(800px_circle_at_80%_70%,rgba(43,208,139,.45),transparent_55%),radial-gradient(500px_circle_at_15%_10%,rgba(200,242,106,.18),transparent_60%),linear-gradient(90deg,rgba(7,19,14,.95)_0%,rgba(7,19,14,.7)_50%,rgba(7,19,14,.4)_100%)]" />
      <span className="relative z-[2] flex max-w-[520px] flex-col gap-4">
        <span className="mono-label flex items-center gap-2.5 text-[11px] text-lime-brand">
          <YouTubeIcon className="h-[18px] w-[18px]" /> KarmaVerse · Watch
        </span>
        <span className="font-display font-semibold leading-[1.02] tracking-[-0.035em] text-[#F2F6F3]" style={{ fontSize: "clamp(30px, 3.6vw, 54px)" }}>
          See KarmaVerse in action.
        </span>
        <span className="text-[17px] leading-relaxed text-[#B9C8C0]">
          Watch how everyday sustainable gestures turn into KarmaCoins, rewards and measurable impact.
        </span>
      </span>
      <span
        aria-hidden
        className="absolute bottom-10 left-8 z-[3] grid h-[84px] w-[84px] place-items-center rounded-full bg-lime-brand shadow-[0_20px_60px_-10px_rgba(200,242,106,.6)] transition-transform duration-500 group-hover:scale-110 md:bottom-auto md:left-1/2 md:top-1/2 md:h-[104px] md:w-[104px] md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <span className="play-ring" />
        <span className="play-ring" style={{ animationDelay: "-1.2s" }} />
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#0B1712" className="relative ml-1.5">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
      <span className="absolute -bottom-[6%] -right-2.5 z-[1] w-[170px] md:right-[4%] md:w-[clamp(180px,24vw,330px)]">
        <Mascot decorative blinkDelay={-1} />
      </span>
    </button>
  );
}

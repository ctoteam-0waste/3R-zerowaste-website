"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.25-.27.54-.34.72-.34h.52c.17 0 .4-.06.62.47.23.55.78 1.9.85 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.33Z" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.57l11.1 14.43Z" />
  </svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.68c0-.85.24-1.43 1.46-1.43h1.56V4.62a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.9v2.16H7.92v2.94h2.54V21h3.04Z" />
  </svg>
);

/** One-tap share buttons for a blog post. */
export function ShareBar({ url, title, tone = "light" }: { url: string; title: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, Icon: WhatsAppIcon },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: XIcon },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
  ];
  const btn =
    tone === "dark"
      ? "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 text-sm font-semibold text-[#F2F6F3] transition hover:bg-white/15"
      : "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-text/15 bg-white px-3 text-sm font-semibold text-text transition hover:border-emerald-brand hover:text-emerald-deep";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }
  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      /* closed */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`mr-1 text-sm font-semibold ${tone === "dark" ? "text-[#C3D1CA]" : "text-text-muted"}`}>Share</span>
      {links.map(({ name, href, Icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`} title={`Share on ${name}`} className={btn}>
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={btn}>
        {copied ? <Check aria-hidden className="h-[18px] w-[18px]" /> : <Link2 aria-hidden className="h-[18px] w-[18px]" />}
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
      {canShare && (
        <button type="button" onClick={nativeShare} aria-label="More sharing options" className={`${btn} sm:hidden`}>
          <Share2 aria-hidden className="h-[18px] w-[18px]" />
        </button>
      )}
    </div>
  );
}

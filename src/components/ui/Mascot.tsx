import clsx from "clsx";

/**
 * KarmaVerse mascot. The base render plus three transparent overlay frames
 * (eyes closed, mouth half-open, mouth closed) are swapped with CSS keyframes
 * to blink and "talk". Respects prefers-reduced-motion via globals.css.
 */
export function Mascot({
  className,
  label = "KarmaVerse mascot: a smiling Earth in a green karmaverse.earth hoodie giving a thumbs up",
  blinkDelay = 0,
  decorative = false,
}: {
  className?: string;
  label?: string;
  blinkDelay?: number;
  decorative?: boolean;
}) {
  return (
    <div
      className={clsx("mascot", className)}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src="/images/mascot/base-sm.webp" alt="" width={400} height={444} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" className="blink" src="/images/mascot/blink-sm.webp" alt="" style={{ animationDelay: `${blinkDelay}s` }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" className="mouth-a" src="/images/mascot/mouthA-sm.webp" alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" className="mouth-b" src="/images/mascot/mouthB-sm.webp" alt="" />
    </div>
  );
}

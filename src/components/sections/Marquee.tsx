import { BarChart3, Brain, Coins, Factory, HandHeart, Leaf, Recycle, Sprout, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";

/** Icon shown before each word; falls back to a sprout. */
const icons: Record<string, LucideIcon> = {
  ESG: BarChart3,
  "Circular Economy": Recycle,
  EPR: Factory,
  "Carbon & Net Zero": Leaf,
  "Climate Intelligence": Brain,
  "Sustainable Engagement": HandHeart,
  KarmaVerse: Coins,
};

function Star({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 flex-none animate-[spin_8s_linear_infinite] md:h-6 md:w-6 ${className}`}>
      <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" fill="currentColor" />
    </svg>
  );
}

/** One tilted ribbon; the word list renders twice so the -50% marquee loops seamlessly. */
function Ribbon({ dark, reverse, tilt }: { dark?: boolean; reverse?: boolean; tilt: string }) {
  const words = site.marquee;
  return (
    <div
      aria-hidden
      className={`group relative -mx-[5vw] flex overflow-hidden border-y py-4 md:py-5 ${tilt} ${
        dark ? "z-0 border-white/10 bg-text text-[#F2F6F3]" : "z-10 border-[#B5E25A] bg-lime-brand text-text shadow-[0_20px_50px_-25px_rgba(11,23,18,.55)]"
      }`}
    >
      <div
        className={`flex w-max items-center gap-8 pr-8 group-hover:[animation-play-state:paused] md:gap-10 md:pr-10 ${
          reverse ? "animate-[marquee_46s_linear_infinite_reverse]" : "animate-[marquee_38s_linear_infinite]"
        }`}
      >
        {[...words, ...words].map((w, i) => {
          const Icon = icons[w] ?? Sprout;
          const outlined = i % 2 === 1;
          return (
            <span key={i} className="flex items-center gap-8 md:gap-10">
              <span className="flex items-center gap-3 whitespace-nowrap">
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-full md:h-10 md:w-10 ${
                    dark ? "bg-lime-brand/15 text-lime-brand" : "bg-text text-lime-brand"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span
                  className={`font-display font-semibold tracking-[-0.02em] ${
                    outlined ? (dark ? "text-transparent [-webkit-text-stroke:1.2px_#C8F26A]" : "text-transparent [-webkit-text-stroke:1.2px_#0B1712]") : ""
                  }`}
                  style={{ fontSize: "clamp(22px, 2.4vw, 34px)" }}
                >
                  {w}
                </span>
              </span>
              <Star className={dark ? "text-lime-brand" : "text-emerald-deep"} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="What we work on" className="relative overflow-hidden bg-paper py-8 md:py-12">
      <p className="sr-only">{site.marquee.join(", ")}</p>
      {/* Two ribbons tilted in opposite directions, scrolling opposite ways */}
      <div className="relative flex flex-col gap-3 md:gap-4">
        <Ribbon tilt="rotate-[-1.5deg]" />
        <Ribbon dark reverse tilt="rotate-[1.2deg]" />
      </div>
    </section>
  );
}

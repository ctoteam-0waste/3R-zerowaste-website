import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { MaskRise, SlideIn } from "./TextFx";

export function SectionHeading({
  eyebrow,
  title,
  id,
  tone = "light",
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  id: string;
  tone?: "light" | "dark";
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-wrap items-end justify-between gap-8", className)}>
      <div className="flex max-w-[780px] flex-col gap-5">
        <SlideIn>
          <p className={clsx("eyebrow", tone === "dark" ? "text-lime-brand" : "text-emerald-deep")}>{eyebrow.replace(/^\d+\s*—\s*/, "")}</p>
        </SlideIn>
        <h2 id={id} className="h-section">
          <MaskRise delay={0.1}>{title}</MaskRise>
        </h2>
      </div>
      {aside && <Reveal delay={0.3}>{aside}</Reveal>}
    </div>
  );
}

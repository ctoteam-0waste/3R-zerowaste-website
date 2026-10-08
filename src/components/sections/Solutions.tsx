import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { solutions } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="sol-h" className="section-pad bg-paper text-text">
      <div className="container-site flex flex-col gap-14">
        <SectionHeading
          id="sol-h"
          eyebrow="03 — Our Solutions"
          title="Technology built for measurable sustainability."
          aside={
            <Button href="/contact" variant="outline" arrow>
              Find the right fit
            </Button>
          }
        />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-5">
          {solutions.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05}>
              <Tilt className="h-full">
                <Link
                  href={s.href}
                  className={clsx(
                    "group relative isolate flex h-full min-h-[300px] flex-col gap-[18px] overflow-hidden rounded-3xl border p-8 transition-[box-shadow,border-color] duration-500",
                    "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(500px_circle_at_100%_0%,rgba(43,208,139,.16),transparent_45%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
                    "hover:border-emerald-brand/35 hover:shadow-[0_40px_80px_-40px_rgba(11,40,28,.45)]",
                    s.featured ? "border-text bg-text text-[#F2F6F3]" : "border-text/[0.08] bg-white",
                  )}
                >
                  <span className="mono-label absolute right-[30px] top-7 text-xs text-[#8A968F]">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={clsx(
                      "grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-[8deg] group-hover:scale-105",
                      s.featured ? "bg-lime-brand text-text" : "bg-text text-lime-brand",
                    )}
                  >
                    <Icon name={s.icon} className="h-[26px] w-[26px]" />
                  </span>
                  <h3 className="text-[28px] font-medium">{s.title}</h3>
                  <p className={clsx("text-base leading-relaxed", s.featured ? "text-[#B9C8C0]" : "text-text-muted")}>{s.body}</p>
                  <span className={clsx("mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold", s.featured ? "text-lime-brand" : "text-text")}>
                    Explore <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

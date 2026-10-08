"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import type { ReactNode, MouseEvent } from "react";

const variants = {
  primary: "bg-lime-brand text-[#07140E] hover:shadow-[0_10px_40px_-8px_rgba(200,242,106,.55)]",
  ghost: "border border-white/20 bg-white/5 text-[#F2F6F3] backdrop-blur-md hover:bg-white/10",
  dark: "bg-text text-paper hover:shadow-[0_12px_40px_-10px_rgba(11,23,18,.6)]",
  outline: "border border-text/25 text-text hover:bg-text/5",
} as const;

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  size?: "md" | "sm";
};

/** Pill link-button with a subtle magnetic pull toward the cursor. */
export function Button({ href, children, variant = "primary", arrow, external, className, onClick, size = "md" }: ButtonProps) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const cls = clsx(
    "group inline-flex items-center gap-2.5 rounded-full font-semibold transition-[box-shadow,background-color,color] duration-300",
    size === "md" ? "min-h-[52px] px-[26px] text-[15px]" : "min-h-[44px] px-5 text-sm",
    variants[variant],
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");
  return (
    <motion.span style={{ x, y, display: "inline-flex" }} onMouseMove={onMove} onMouseLeave={reset}>
      {isExternal ? (
        <a
          href={href}
          className={cls}
          onClick={onClick}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls} onClick={onClick}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
}

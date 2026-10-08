"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article";
};

/** Fades, lifts and brings its children into focus once, when scrolled into the viewport. */
export function Reveal({ delay = 0, y = 36, as = "div", children, className, style }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  return (
    <Comp
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, scale: 0.97, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      // a tall top margin also counts content already scrolled past, so a fast jump never leaves it hidden
      viewport={{ once: true, margin: "400% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Comp>
  );
}

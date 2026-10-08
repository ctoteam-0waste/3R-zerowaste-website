"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.2, 0.8, 0.2, 1] as const;
// tall top margin: content already scrolled past still reveals after a fast jump
const viewport = { once: true, margin: "400% 0px -10% 0px" };

/** Text rises out of a clipping mask with a slight tilt, once, when scrolled into view. */
export function MaskRise({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    // the mask wrapper watches the viewport: the clipped inner span never intersects on its own
    <motion.span
      className="block overflow-hidden pb-[0.08em]"
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={viewport}
    >
      <motion.span
        className="block origin-bottom-left"
        variants={{ hidden: { y: "105%", rotate: 2.5, opacity: 0 }, shown: { y: 0, rotate: 0, opacity: 1 } }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Slides in from the left with a fade, once, when scrolled into view. */
export function SlideIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

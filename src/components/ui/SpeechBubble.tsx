"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { site } from "@/content/site";

/** Rotating mascot speech bubble, synced to the mascot's 3.6s talk loop. */
export function SpeechBubble({ className, lines = site.mascotLines }: { className?: string; lines?: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % lines.length), 3600);
    return () => clearInterval(t);
  }, [reduce, lines.length]);

  return (
    <div
      aria-live="polite"
      className={clsx(
        "rounded-[20px_20px_20px_6px] bg-white px-[18px] py-3.5 text-[15px] font-bold leading-[1.35] text-text shadow-[0_24px_50px_-20px_rgba(11,40,28,.5),0_0_0_1px_rgba(11,23,18,.06)]",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="block"
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
        >
          {lines[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

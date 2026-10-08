"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GrowBar({ value }: { value: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="h-0.5 overflow-hidden rounded bg-white/[0.08]">
      <motion.i
        className="block h-full origin-left bg-gradient-to-r from-emerald-brand to-lime-brand"
        style={{ width: `${value * 100}%` }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </div>
  );
}

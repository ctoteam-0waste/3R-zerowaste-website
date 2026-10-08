"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GrowLine({ className = "bg-gradient-to-r from-emerald-brand via-lime-brand to-cyan-brand" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.i
      className={`absolute inset-0 block origin-left ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
    />
  );
}

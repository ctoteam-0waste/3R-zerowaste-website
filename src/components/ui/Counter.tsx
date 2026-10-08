"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to `value` the first time it scrolls into view.
 * Server HTML renders the final value (SEO / no-JS); the client resets to 0
 * only if the number is still off-screen, so there is no visible flash.
 */
export function Counter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      armed.current = true;
      setN(0);
    }
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce || !armed.current) return;
    armed.current = false;
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

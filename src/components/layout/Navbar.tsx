"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  const pathname = usePathname();
  // Each menu lights up on its own pages; Home also covers the homepage itself.
  const activeKey =
    nav.find((g) => g.match.some((p) => pathname.startsWith(p)))?.key ?? (pathname === "/" ? "home" : undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-[60] border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-white/[0.07] bg-ink/95 md:bg-ink/60 md:backdrop-blur-xl md:backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-site flex h-[76px] items-center justify-between gap-6">
        <Logo onClick={() => setOpen(false)} />

        <ul className="hidden items-center gap-1.5 xl:flex">
          {nav.map((g) => (
            <li key={g.key} className="group relative">
              <Link
                href={g.href}
                aria-current={pathname === g.href ? "page" : undefined}
                aria-haspopup={g.children ? "true" : undefined}
                className={clsx(
                  "relative inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium transition-colors",
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-lime-brand after:transition-transform after:duration-300",
                  activeKey === g.key
                    ? "text-lime-brand after:scale-x-100"
                    : "text-[#D9E4DE] after:scale-x-0 hover:text-white hover:after:scale-x-100",
                )}
              >
                {g.label}
                {g.children && (
                  <ChevronDown aria-hidden className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                )}
              </Link>
              {g.children && (
                <div
                  className={clsx(
                    "invisible absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300",
                    "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    "before:absolute before:inset-x-0 before:-top-3.5 before:h-3.5",
                    "rounded-[20px] border border-white/10 bg-[rgba(8,22,16,.94)] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl",
                    g.wide ? "w-[560px]" : "w-[290px]",
                  )}
                >
                  <div className={clsx("grid gap-0.5", g.wide && "grid-cols-2")}>
                    {g.children.map((c) => (
                      <Link key={c.label} href={c.href} className="group/item flex flex-col gap-0.5 rounded-xl px-3.5 py-3 transition-colors hover:bg-lime-brand/[0.08]">
                        <span className="text-sm font-semibold text-[#F2F6F3] group-hover/item:text-lime-brand">{c.label}</span>
                        {c.description && <span className="text-[12.5px] text-[#8EA198]">{c.description}</span>}
                      </Link>
                    ))}
                  </div>
                  {g.footer && (
                    <div className="mt-1.5 flex gap-5 border-t border-white/[0.08] px-3.5 pb-1.5 pt-3 text-[13px] font-semibold">
                      {g.footer.map((f) =>
                        f.href.startsWith("http") ? (
                          <a key={f.label} href={f.href} target="_blank" rel="noopener noreferrer" className="text-cyan-brand hover:text-lime-brand">
                            {f.label}
                          </a>
                        ) : (
                          <Link key={f.label} href={f.href} className="text-cyan-brand hover:text-lime-brand">
                            {f.label}
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <Button href="/contact" variant="ghost" size="sm" arrow>
              Talk to Us
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-12 w-12 place-items-center rounded-[14px] border border-white/20 bg-white/5 text-[#F2F6F3] xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-emerald-brand via-lime-brand to-cyan-brand shadow-[0_0_12px_rgba(200,242,106,.6)]" />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 top-[76px] z-[59] overflow-y-auto bg-ink px-5 pb-10 pt-4 sm:px-8 xl:hidden"
          >
            {nav.map((g) => (
              <div key={g.key}>
                <p className="mono-label mb-0.5 mt-5 text-[10px] text-lime-brand">{g.label}</p>
                {(g.children ?? [{ label: g.label, href: g.href }]).map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[56px] items-center justify-between border-b border-white/[0.08] font-display text-2xl font-medium text-[#F2F6F3] hover:text-lime-brand"
                  >
                    {c.label} <ArrowRight aria-hidden className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-7">
              <Button href="/contact" arrow onClick={() => setOpen(false)} className="w-full justify-center">
                Talk to Us
              </Button>
            </div>
            <p className="mono-label mt-6 text-[11px] text-text-dim">{site.philosophy}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

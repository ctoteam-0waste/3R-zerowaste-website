"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}

/**
 * Makes in-page anchor links ("/#solutions", "#team") scroll reliably.
 * Next.js' <Link> hash handling is flaky on this long, animated homepage (first click often
 * does nothing), so same-page hash clicks are handled here; Link sees `defaultPrevented` and
 * skips its own navigation. Arriving from another page (e.g. /blog → /#team) scrolls once the
 * target section has rendered.
 */
export function HashLinkScroll() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      e.preventDefault();
      // Let click handlers (e.g. closing the mobile menu) settle before scrolling.
      requestAnimationFrame(() => scrollToId(id));
      if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    let tries = 0;
    const t = setInterval(() => {
      if (scrollToId(id) || ++tries > 30) clearInterval(t);
    }, 100);
    return () => clearInterval(t);
  }, [pathname]);

  return null;
}

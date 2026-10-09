"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";

export function AdminBar({ children }: { children?: React.ReactNode }) {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <header className="sticky top-0 z-10 border-b border-text/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-3 px-4">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image src="/images/brand/logo-mark.png" alt="" width={32} height={32} className="rounded-full" />
          <span className="font-display font-semibold">
            Website admin <span className="hidden text-text-muted sm:inline">· 3R ZeroWaste</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {children}
          <a href="/" target="_blank" className="hidden min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-text-muted hover:bg-text/5 sm:inline-flex">
            View site <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          </a>
          <button type="button" onClick={logout} className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-text-muted hover:bg-text/5">
            <LogOut aria-hidden className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

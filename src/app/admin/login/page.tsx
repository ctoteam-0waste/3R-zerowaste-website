"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) {
      window.location.href = "/admin";
      return;
    }
    setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Sign-in failed.");
    setBusy(false);
  }

  return (
    <main className="grid min-h-full place-items-center px-4 py-16">
      <form onSubmit={submit} className="flex w-full max-w-[400px] flex-col gap-5 rounded-[28px] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(11,23,18,.45)]">
        <div className="flex items-center gap-3">
          <Image src="/images/brand/logo-mark.png" alt="" width={44} height={44} className="rounded-full" />
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold">3R ZeroWaste</span>
            <span className="mono-label text-[10px] text-text-muted">Website admin</span>
          </div>
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-[-0.02em]">Sign in to manage blogs &amp; events</h1>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-12 rounded-xl border border-text/15 bg-paper px-4 text-base font-normal outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/30"
          />
        </label>
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-text px-6 font-semibold text-paper transition hover:shadow-[0_12px_40px_-10px_rgba(11,23,18,.6)] disabled:opacity-60"
        >
          <Lock aria-hidden className="h-4 w-4" /> {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

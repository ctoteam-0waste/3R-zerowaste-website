"use client";

import { useState, type FormEvent } from "react";
import { Mascot } from "@/components/ui/Mascot";

/** Newsletter sign-up → saved via /api/newsletter (list is in /admin/audience). */
export function Newsletter() {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError("");
    setState("busy");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), website: form.get("website"), source: "0waste.co.in" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Couldn't sign you up right now. Please try again later.");
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }
  return (
    <section aria-labelledby="nl-h" className="bg-paper pb-28 text-text">
      <div className="container-site">
        <div className="relative flex flex-wrap items-center gap-10 overflow-hidden rounded-[32px] bg-kv p-[clamp(32px,5vw,64px)]">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
            <p className="mono-label text-[11px] text-emerald-deep">Newsletter</p>
            <h2 id="nl-h" className="font-semibold leading-[1.04] tracking-[-0.03em]" style={{ fontSize: "clamp(30px, 3.4vw, 48px)" }}>
              Get 3R insights in your inbox.
            </h2>
            <p className="max-w-[460px] text-base leading-relaxed text-[#33413B]">New articles, event invites and KarmaVerse updates. No spam — unsubscribe anytime.</p>
            {state === "done" ? (
              <p role="status" className="font-semibold text-emerald-deep">
                Thanks — you&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex max-w-[520px] flex-wrap gap-2.5">
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="min-h-[52px] flex-[1_1_240px] rounded-full border border-text/[0.18] bg-white px-5 text-[15px] text-text placeholder:text-[#6C7871]"
                />
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <button
                  type="submit"
                  disabled={state === "busy"}
                  className="min-h-[52px] rounded-full bg-text px-[26px] text-[15px] font-semibold text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {state === "busy" ? "Signing up…" : "Subscribe →"}
                </button>
                {error && (
                  <p role="alert" className="w-full text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
          <div className="mx-auto w-[170px] flex-none">
            <Mascot />
          </div>
        </div>
      </div>
    </section>
  );
}

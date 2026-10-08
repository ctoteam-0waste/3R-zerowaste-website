"use client";

import { useState, type FormEvent } from "react";
import { Mascot } from "@/components/ui/Mascot";

/**
 * Newsletter sign-up. Wire `onSubmit` to your provider (Mailchimp, Resend, a
 * Next.js route handler …). Until then it only confirms locally.
 */
export function Newsletter() {
  const [state, setState] = useState<"idle" | "done">("idle");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST new FormData(e.currentTarget) to your newsletter endpoint.
    setState("done");
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
                <button type="submit" className="min-h-[52px] rounded-full bg-text px-[26px] text-[15px] font-semibold text-paper transition-transform hover:-translate-y-0.5">
                  Subscribe →
                </button>
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

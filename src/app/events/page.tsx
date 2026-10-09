import type { Metadata } from "next";
import { getEvents } from "@/lib/content";
import { Events } from "@/components/sections/Events";

export const metadata: Metadata = {
  alternates: { canonical: "/events" },
  title: "Events",
  description: "Drives, workshops and conversations with the 3R and KarmaVerse community — on the ground and online.",
};

/** Re-check content every hour so events move from Upcoming to Past on their own. */
export const revalidate = 3600;

export default function EventsPage() {
  const { upcoming, past } = getEvents();
  return (
    <>
      <section aria-labelledby="events-title" className="relative isolate -mt-[76px] overflow-hidden bg-ink pb-4 pt-[calc(76px+clamp(72px,9vw,120px))] text-[#F2F6F3]">
        <span aria-hidden className="absolute right-[6%] top-[10%] -z-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(43,208,139,.55)_0%,rgba(43,208,139,.18)_45%,transparent_70%)]" />
        <span aria-hidden className="absolute right-[26%] top-[40%] -z-10 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(200,242,106,.45)_0%,rgba(200,242,106,.12)_45%,transparent_70%)]" />
        <div className="container-site flex flex-col gap-7">
          <p className="mono-label text-xs text-lime-brand">Events</p>
          <h1 id="events-title" className="max-w-[980px] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ fontSize: "clamp(42px, 6vw, 92px)" }}>
            Show up. <span className="grad-text">Make it count.</span>
          </h1>
          <p className="max-w-[620px] leading-relaxed text-[#C3D1CA]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Drives, workshops and conversations with the 3R and KarmaVerse community — on the ground and online.
          </p>
        </div>
      </section>
      <Events upcoming={upcoming} past={past} heading={false} />
    </>
  );
}

"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Click-to-load Google Map. The embed is ~0.6 MB of third-party script and sets cookies,
 * so it only loads when a visitor asks for it — lighter, greener and more private by default.
 */
export function MapEmbed({ address, mapsUrl }: { address: string; mapsUrl: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        title="3R ZeroWaste office location on Google Maps"
        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        className="block h-[380px] w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <div className="relative grid h-[380px] place-items-center overflow-hidden bg-[#E9EFE4] p-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(11,23,18,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(11,23,18,.07)_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="relative flex max-w-[420px] flex-col items-center gap-4">
        <span className="grid h-14 w-14 animate-float place-items-center rounded-full bg-text text-lime-brand shadow-[0_0_0_10px_rgba(43,208,139,.15)]">
          <MapPin aria-hidden className="h-6 w-6" />
        </span>
        <p className="font-display text-lg font-semibold text-text">{address}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setOn(true)}
            className="inline-flex min-h-11 items-center rounded-full bg-text px-5 text-sm font-semibold text-paper transition hover:shadow-[0_12px_40px_-10px_rgba(11,23,18,.6)]"
          >
            Show interactive map
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-text/25 px-5 text-sm font-semibold text-text transition hover:bg-text/5"
          >
            Open in Google Maps ↗
          </a>
        </div>
        <p className="text-xs text-text-muted">The map loads from Google only when you choose to show it.</p>
      </div>
    </div>
  );
}

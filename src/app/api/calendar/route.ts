import { NextResponse } from "next/server";
import { fetchSustainabilityCalendar } from "@/lib/liveCalendar";

// Rendered per request; the Wikidata fetches underneath are cached for 6 hours (see lib/liveCalendar.ts),
// so a failed refresh never overwrites the last good data.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await fetchSustainabilityCalendar();
    return NextResponse.json(
      { events, fetchedAt: new Date().toISOString(), source: "Wikidata" },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (err) {
    console.error("[calendar] fetch failed:", err);
    return NextResponse.json({ events: [], error: "Calendar source unavailable" }, { status: 502 });
  }
}

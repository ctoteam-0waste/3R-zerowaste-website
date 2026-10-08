import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { getEvent, getEvents, isPast } from "@/lib/content";
import { dateBadge, formatRange } from "@/lib/format";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  const { upcoming, past } = getEvents();
  return [...upcoming, ...past].map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getEvent((await params).slug);
  if (!event) return {};
  return { title: event.title, description: event.summary || `${event.type} · ${formatRange(event.date, event.endDate)}` };
}

export default async function EventPage({ params }: Props) {
  const event = getEvent((await params).slug);
  if (!event) notFound();

  const past = isPast(event);
  const { day, month } = dateBadge(event.date);
  const facts = [
    { icon: CalendarDays, label: formatRange(event.date, event.endDate) },
    event.time && { icon: Clock, label: event.time },
    event.venue && { icon: MapPin, label: event.venue },
  ].filter(Boolean) as { icon: typeof Clock; label: string }[];

  return (
    <>
      <section aria-labelledby="event-title" className="relative isolate -mt-[76px] overflow-hidden bg-ink-2 pb-16 pt-[calc(76px+clamp(56px,7vw,96px))] text-[#F2F6F3]">
        <div aria-hidden className="absolute -bottom-60 -left-60 -z-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(200,242,106,.12),transparent_65%)]" />
        <div className="container-site flex max-w-[960px] flex-col gap-6">
          <Link href="/events" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-lime-brand hover:text-white">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All events
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex h-24 w-24 flex-none flex-col items-center justify-center gap-0.5 rounded-[20px] border border-white/[0.14] bg-white/[0.03]">
              <span className="font-display text-[34px] font-semibold leading-none">{day}</span>
              <span className="mono-label text-[10px] text-lime-brand">{month}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className={past ? "mono-label self-start rounded-[7px] bg-white/[0.08] px-2.5 py-1 text-[10px] tracking-[0.12em] text-[#C3D1CA]" : "mono-label self-start rounded-[7px] bg-cyan-brand/[0.12] px-2.5 py-1 text-[10px] tracking-[0.12em] text-cyan-brand"}>
                {past ? `Past · ${event.type}` : event.type}
              </span>
              <h1 id="event-title" className="font-semibold leading-[1.02] tracking-[-0.035em]" style={{ fontSize: "clamp(34px, 4.6vw, 64px)" }}>
                {event.title}
              </h1>
            </div>
          </div>
          {event.summary && <p className="max-w-[720px] text-lg leading-relaxed text-[#C3D1CA]">{event.summary}</p>}
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-[#C3D1CA]">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon aria-hidden className="h-4 w-4 text-lime-brand" /> {label}
              </li>
            ))}
          </ul>
          {!past && event.registerUrl && (
            <div>
              <Button href={event.registerUrl} arrow external>
                Register
              </Button>
            </div>
          )}
        </div>
      </section>

      <article className="bg-paper pb-28 pt-14 text-text">
        <div className="container-site flex max-w-[960px] flex-col gap-12">
          {event.image && (
            <div className="relative aspect-video overflow-hidden rounded-[28px]">
              <Image quality={90} src={event.image} alt="" fill priority unoptimized={event.image.endsWith(".svg")} sizes="(max-width: 960px) 100vw, 960px" className="object-cover" />
            </div>
          )}
          <div className="prose-3r mx-auto w-full max-w-[720px]" dangerouslySetInnerHTML={{ __html: event.html }} />
        </div>
      </article>
    </>
  );
}

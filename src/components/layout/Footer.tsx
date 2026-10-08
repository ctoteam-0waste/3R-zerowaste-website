import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, site } from "@/content/site";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
];

const linkClass = "inline-flex min-h-8 items-center text-[15px] text-[#9DB0A7] transition-colors hover:text-lime-brand";

function Col({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <nav aria-label={`Footer — ${title}`} className="flex flex-col gap-1">
      <span className="mb-3 font-display text-base font-semibold text-[#E8F0EC]">{title}</span>
      {links.map((l) =>
        l.external ? (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {l.label}
          </a>
        ) : (
          <Link key={l.label} href={l.href} className={linkClass}>
            {l.label}
          </Link>
        ),
      )}
    </nav>
  );
}

/** "Get it on Google Play" badge linking to the KarmaVerse Android app. */
export function PlayStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get the KarmaVerse app on Google Play"
      className={`inline-flex h-[52px] items-center gap-3 rounded-xl border border-white/20 bg-black px-4 text-white transition hover:-translate-y-0.5 hover:border-lime-brand hover:shadow-[0_12px_32px_-12px_rgba(200,242,106,.5)] ${className}`}
    >
      <svg aria-hidden viewBox="0 0 24 26" className="h-6 w-6 flex-none">
        <path d="M1.2.6 13.4 12.9 1.2 25.2c-.4-.3-.7-.9-.7-1.6V2.2c0-.7.3-1.3.7-1.6z" fill="#00D7FE" />
        <path d="m17.5 8.8-4.1 4.1-12.2-12.3c.5-.4 1.3-.5 2.1-.1z" fill="#00F076" />
        <path d="m17.5 17-14.2 8.3c-.8.4-1.6.3-2.1-.1l12.2-12.3z" fill="#FF3A44" />
        <path d="m22.3 11.6-4.8-2.8-4.1 4.1 4.1 4.1 4.8-2.8c1.4-.8 1.4-1.8 0-2.6z" fill="#FFD400" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/75">Get it on</span>
        <span className="mt-1 font-display text-[19px] font-semibold tracking-[-0.01em]">Google Play</span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-3 text-[#F2F6F3]">
      {/* App download band */}
      <div className="border-b border-white/[0.06] bg-[radial-gradient(600px_circle_at_15%_0%,rgba(43,208,139,.12),transparent_70%)]">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-10">
          <div className="flex max-w-[560px] flex-col gap-2">
            <span className="mono-label text-[11px] text-lime-brand">Download the KarmaVerse app</span>
            <p className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight tracking-[-0.02em]">
              Turn every sustainable action into KarmaCoins.
            </p>
            <p className="text-[15px] text-[#9DB0A7]">Free doorstep pickups, daily eco-quiz and real rewards — right on your phone.</p>
          </div>
          <PlayStoreBadge />
        </div>
      </div>

      <div className="container-site flex flex-col gap-12 pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.3fr] md:gap-10">
          <div className="flex max-w-[360px] flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="grid h-[64px] w-[60px] place-items-center rounded-2xl bg-white p-1.5">
                <Image quality={90} src="/images/brand/logo-full.png" alt="3R 0-Waste logo" width={52} height={56} />
              </span>
              <span className="font-display text-xl font-semibold">{site.name}</span>
            </div>
            <p className="text-[15px] leading-[1.65] text-[#9DB0A7]">{site.about}</p>
            <a
              href={site.karmaverseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[15px] font-semibold text-emerald-brand transition-colors hover:text-lime-brand"
            >
              karmaverse.earth ↗
            </a>
            <div className="flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href || "#"}
                  aria-label={href ? label : `${label} (link to be added)`}
                  {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-[#C3D1CA] transition-colors hover:border-lime-brand hover:bg-lime-brand hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <Col title="Explore" links={footerNav.explore} />
          <Col title="Company" links={footerNav.company} />

          <div className="flex flex-col gap-1">
            <span className="mb-3 font-display text-base font-semibold text-[#E8F0EC]">Contact us</span>
            <a href={`mailto:${site.footerEmail}`} className={`${linkClass} gap-2.5`}>
              <Mail aria-hidden className="h-4 w-4 flex-none text-emerald-brand" />
              {site.footerEmail}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={`${linkClass} gap-2.5`}>
              <Phone aria-hidden className="h-4 w-4 flex-none text-emerald-brand" />
              {site.phone}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex gap-2.5 text-[15px] leading-[1.5] text-[#9DB0A7] underline-offset-4 transition-colors hover:text-lime-brand hover:underline"
            >
              <MapPin aria-hidden className="mt-[3px] h-4 w-4 flex-none text-emerald-brand" />
              {site.address}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-7">
          <div className="flex flex-col gap-3 text-[13px] text-[#7E9188] sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
            <span className="whitespace-nowrap">
              © {new Date().getFullYear()} {site.legalName} All rights reserved.
            </span>
            <nav aria-label="Footer — Legal" className="flex items-center">
              {footerNav.legal.map((l, i) => (
                <span key={l.href} className="flex items-center">
                  <span aria-hidden className={`mx-4 h-3.5 w-px bg-white/20 ${i === 0 ? "hidden sm:block" : ""}`} />
                  <Link href={l.href} className="whitespace-nowrap py-1 transition-colors hover:text-lime-brand">
                    {l.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
          <span className="mono-label text-[11px] text-[#7E9188]">{site.philosophy}</span>
        </div>
      </div>
    </footer>
  );
}

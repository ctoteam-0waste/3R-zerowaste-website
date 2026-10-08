import type { Metadata } from "next";
import { Globe, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PlayStoreBadge } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact 3R ZeroWaste — email, phone, office address in IMT Manesar, Gurugram, and all our platforms.",
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

export default function ContactPage() {
  const cards = [
    { label: "Email", value: site.footerEmail, href: `mailto:${site.footerEmail}`, Icon: Mail },
    { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, Icon: Phone },
    { label: "Office", value: site.address, href: mapsUrl, Icon: MapPin, external: true },
  ];
  const platforms = [
    { label: "karmaverse.earth", note: "KarmaVerse website", href: site.karmaverseUrl, Icon: Globe },
    { label: "KarmaVerse app", note: "Android · Google Play", href: site.playStoreUrl, Icon: Smartphone },
    { label: "Instagram", note: "@mykarmaverse", href: site.social.instagram, Icon: InstagramIcon },
    { label: "LinkedIn", note: "KarmaVerse on LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s create <span className="grad-text">measurable impact</span> together.
          </>
        }
        intro="Whether you're a business, a housing society, a school or a KarmaVerse user — we'd love to hear from you."
        actions={
          <Button href={`mailto:${site.footerEmail}`} arrow>
            Email us
          </Button>
        }
      />

      <section aria-labelledby="reach-h" className="section-pad bg-paper text-text">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="reach-h" eyebrow="Reach us" title="Talk to the 3R team" />
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map(({ label, value, href, Icon, external }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-4 rounded-[24px] bg-white p-7 shadow-[0_20px_60px_-40px_rgba(11,23,18,.35)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-brand/40 text-emerald-deep">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="mono-label text-[11px] text-text-muted">{label}</span>
                  <span className="font-display text-lg font-semibold leading-snug group-hover:text-emerald-deep">{value}</span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="overflow-hidden rounded-[28px] ring-1 ring-text/10">
            <MapEmbed address={site.address} mapsUrl={mapsUrl} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="platforms-h" className="section-pad bg-ink text-[#F2F6F3]">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="platforms-h" tone="dark" eyebrow="All platforms" title="Find us everywhere" aside={<PlayStoreBadge />} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map(({ label, note, href, Icon }, i) => (
              <Reveal as="li" key={label} delay={i * 0.06}>
                <a
                  href={href || "#"}
                  {...(href ? { target: "_blank", rel: "noopener noreferrer" } : { "aria-disabled": true })}
                  className="flex h-full flex-col gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-lime-brand/60"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-lime-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-semibold">{label}</span>
                  <span className={href ? "text-sm text-[#A9BBB2]" : "placeholder text-sm"}>{note}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

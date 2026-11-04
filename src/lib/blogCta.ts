import { site } from "@/content/site";

/**
 * The call-to-action box at the end of every blog post. It is picked from the
 * post's category, so a reader of an EPR guide is offered EPR help and a reader
 * of a community story is offered a KarmaVerse pickup. Served in the blog feed
 * too, so karmaverse.earth shows the same box.
 */
export type BlogCta = {
  /** "karmaverse" boxes promote the app; "service" boxes promote a 3R ZeroWaste service. */
  kind: "karmaverse" | "service";
  eyebrow: string;
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const talk = { label: "Talk to our team", href: "/contact" };

const SERVICE: Record<string, Omit<BlogCta, "kind" | "secondary">> = {
  EPR: {
    eyebrow: "EPR compliance",
    title: "Need help meeting your EPR targets?",
    text: "We handle registration, collection, recycling and certificates for plastic packaging, e-waste and batteries, so your filings stay on time.",
    primary: { label: "See our EPR services", href: "/solutions/epr" },
  },
  ESG: {
    eyebrow: "ESG & BRSR reporting",
    title: "Make your next BRSR report easier.",
    text: "We collect the data, calculate the metrics and prepare reporting your auditors and investors can trust.",
    primary: { label: "See our ESG services", href: "/solutions/esg" },
  },
  "Carbon & Net Zero": {
    eyebrow: "Carbon & net zero",
    title: "Know your footprint. Plan your path to net zero.",
    text: "We measure Scope 1, 2 and 3 emissions and build a reduction plan that fits your business.",
    primary: { label: "See our carbon services", href: "/solutions/carbon-net-zero" },
  },
  "Circular Economy": {
    eyebrow: "Circular economy",
    title: "Turn your organisation's waste into value.",
    text: "Recycling, e-waste and zero-waste programmes for offices, factories and campuses, with impact you can report.",
    primary: { label: "See our circular economy services", href: "/solutions/circular-economy" },
  },
};

const KARMAVERSE: BlogCta = {
  kind: "karmaverse",
  eyebrow: "KarmaVerse",
  title: "Book a free doorstep recycling pickup.",
  text: "Hand over your segregated waste, see exactly what it became, and earn KarmaCoins you can redeem for rewards.",
  primary: { label: "Get started on KarmaVerse", href: site.karmaverseUrl },
  secondary: { label: "Get the Android app", href: site.playStoreUrl },
};

export function blogCta(category: string): BlogCta {
  const s = SERVICE[category];
  return s ? { kind: "service", ...s, secondary: talk } : KARMAVERSE;
}

/** Same box with absolute links, for the public feed. */
export function blogCtaAbsolute(category: string): BlogCta {
  const abs = (href: string) => (href.startsWith("/") ? `${site.url}${href}` : href);
  const c = blogCta(category);
  return { ...c, primary: { ...c.primary, href: abs(c.primary.href) }, secondary: { ...c.secondary, href: abs(c.secondary.href) } };
}

/**
 * Site-wide content. Edit copy here — components only render it.
 * Anything wrapped in [brackets] is a placeholder waiting for verified data.
 */

export const site = {
  name: "3R ZeroWaste",
  legalName: "3R ZeroWaste Pvt. Ltd.",
  // Production lives on 0waste.co.in (Hostinger). NEXT_PUBLIC_SITE_URL can override it, e.g. for a staging host.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://0waste.co.in",
  tagline: "Turning sustainable gestures and everyday actions into measurable climate impact.",
  description:
    "Technology that transforms sustainable actions into measurable environmental and business impact.",
  philosophy: "Kar Bhala Toh Ho Bhala",
  email: "contact@karmaverse.earth",
  karmaverseUrl: "https://karmaverse.earth",
  karmaverseVideoId: "ocf6R2SO7ds",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.karmacredits.app",
  /** Same contact details as the footer on karmaverse.earth */
  footerEmail: "info@0waste.co.in",
  phone: "+91 70931 98828",
  address: "Plot 62, Sector 8, IMT Manesar, Gurugram, Haryana 122051",
  about:
    "3RZeroWaste® was founded to do waste management differently — turning India's growing waste into value through the circular economy. KarmaVerse is its sustainability rewards ecosystem.",
  social: {
    linkedin: "https://www.linkedin.com/showcase/karmaversee/",
    instagram: "https://www.instagram.com/mykarmaverse/",
  },
  hero: {
    lines: ["SUSTAINABLE GESTURES.", "EVERYDAY ACTIONS.", "MEASURABLE CLIMATE IMPACT."],
    /** Drop optimized files in /public/videos and the hero switches from the animated planet to video. */
    video: {
      webm: "", // e.g. "/videos/hero-earth-loop.webm"
      mp4: "", // e.g. "/videos/hero-earth-loop.mp4"
      poster: "", // e.g. "/images/hero-poster.jpg"
    },
    signals: [
      { label: "CO₂", dir: "down" },
      { label: "ESG", dir: "up" },
      { label: "Circularity", dir: "up" },
      { label: "Impact", dir: "up" },
    ] as const,
  },
  marquee: [
    "ESG",
    "Circular Economy",
    "EPR",
    "Carbon & Net Zero",
    "Climate Intelligence",
    "Sustainable Engagement",
    "KarmaVerse",
    "Kar Bhala Toh Ho Bhala",
  ],
  mascotLines: [
    "Hi! Welcome to KarmaVerse",
    "Every good deed earns KarmaCoins",
    "Kar Bhala Toh Ho Bhala!",
    "Visit me at karmaverse.earth",
  ],
};

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = {
  key: string;
  label: string;
  href: string;
  /** path prefixes that light this nav item up */
  match: string[];
  children?: NavItem[];
  footer?: NavItem[];
  wide?: boolean;
};

export const nav: NavGroup[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    match: ["/about"],
    children: [
      { label: "About 3RZW", href: "/about", description: "Who we are" },
      { label: "Our Story", href: "/about#story", description: "From drives to climate-tech" },
      { label: "Our Mission", href: "/about#mission", description: "Why 3R exists" },
      { label: "Our Approach", href: "/about#approach", description: "Measure, engage, act, reward" },
      { label: "Leadership", href: "/about#leadership", description: "The people behind 3R" },
      { label: "Careers", href: "/careers", description: "Join the team" },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    href: "/solutions",
    match: ["/solutions"],
    wide: true,
    children: [
      { label: "KarmaVerse", href: "/solutions#karmaverse", description: "Rewards for everyday sustainability" },
      { label: "Community Solutions", href: "/solutions#community", description: "RWAs, schools & neighbourhoods" },
      { label: "Enterprise Sustainability", href: "/solutions#enterprise", description: "ESG, BRSR & carbon" },
      { label: "Circular Economy Solutions", href: "/solutions#circular", description: "EPR & material recovery" },
    ],
    footer: [
      { label: "All capabilities →", href: "/solutions#capabilities" },
      { label: "Our technology →", href: "/solutions#technology" },
    ],
  },
  {
    key: "karmaverse",
    label: "KarmaVerse",
    href: "/karmaverse",
    match: ["/karmaverse"],
    children: [
      { label: "What is KarmaVerse?", href: "/karmaverse#what", description: "Sustainability rewards ecosystem" },
      { label: "How it Works", href: "/karmaverse#how", description: "Act, verify, earn, redeem" },
      { label: "Features", href: "/karmaverse#features", description: "Pickups, quiz, rewards & more" },
      { label: "Impact", href: "/karmaverse#impact", description: "Every action creates value" },
    ],
    footer: [
      { label: "karmaverse.earth ↗", href: "https://karmaverse.earth" },
      { label: "Android app ↗", href: "https://play.google.com/store/apps/details?id=com.karmacredits.app" },
    ],
  },
  {
    key: "impact",
    label: "Impact",
    href: "/impact",
    match: ["/impact"],
    children: [
      { label: "Impact Dashboard", href: "/impact#dashboard", description: "Clients, industries, RWAs, schools" },
      { label: "Environmental Impact", href: "/impact#environmental", description: "Waste recovered, emissions avoided" },
      { label: "Social Impact", href: "/impact#social", description: "Livelihoods & learning" },
      { label: "Community Impact", href: "/impact#community", description: "Cleaner, greener neighbourhoods" },
    ],
  },
  {
    key: "insights",
    label: "Insights",
    href: "/insights",
    match: ["/insights", "/blog", "/events"],
    children: [
      { label: "Blog", href: "/blog", description: "Articles & guides" },
      { label: "Reports", href: "/insights#reports", description: "Impact & sustainability reports" },
      { label: "Research", href: "/insights#research", description: "Whitepapers & studies" },
      { label: "News", href: "/insights#news", description: "Press & announcements" },
      { label: "Events", href: "/events", description: "Drives, workshops & webinars" },
    ],
  },
  { key: "careers", label: "Careers", href: "/careers", match: ["/careers"] },
  { key: "contact", label: "Contact", href: "/contact", match: ["/contact"] },
];

export const footerNav = {
  explore: [
    { label: "Solutions", href: "/solutions" },
    { label: "KarmaVerse", href: "/karmaverse" },
    { label: "Impact", href: "/impact" },
    { label: "Insights", href: "/insights" },
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About 3RZW", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

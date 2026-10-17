import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBuddy } from "@/components/layout/FloatingBuddy";
import { HashLinkScroll } from "@/components/layout/HashLinkScroll";


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Climate-tech for measurable impact`, template: `%s · ${site.name}` },
  description: site.seoDescription,
  keywords: ["ESG", "circular economy", "EPR", "carbon", "net zero", "climate tech", "KarmaVerse", "sustainability India", "e-waste recycling Gurugram", "waste management Gurugram", "BRSR"],
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    // 192px (a multiple of 48) is the size Google prefers for the logo shown beside search results
    icon: [{ url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" }, { url: "/images/brand/logo-mark.png" }],
    apple: "/images/brand/logo-mark.png",
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.seoDescription,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.seoDescription },
  // Search Console / Bing Webmaster "HTML tag" verification — paste only the content="…" code into these env vars.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#05100C", width: "device-width", initialScale: 1 };

const orgJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: ["3RZeroWaste", "3RZW", "3R Zero Waste"],
    legalName: site.legalName,
    description: site.seoDescription,
    url: site.url,
    email: site.footerEmail,
    telephone: site.phone,
    logo: { "@type": "ImageObject", url: `${site.url}/images/brand/logo-mark.png`, width: 292, height: 292 },
    image: `${site.url}/images/brand/logo-full.png`,
    slogan: site.tagline,
    foundingDate: "2020-07-24",
    founder: { "@type": "Person", name: "Shiv Rao Challa", jobTitle: "Founder & CEO", sameAs: "https://www.linkedin.com/in/shivchalla/" },
    address: { "@type": "PostalAddress", streetAddress: "Plot 62, Sector 8, IMT Manesar", addressLocality: "Gurugram", addressRegion: "Haryana", postalCode: "122051", addressCountry: "IN" },
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: site.footerEmail, telephone: site.phone, areaServed: "IN", availableLanguage: ["en", "hi"] },
    knowsAbout: ["ESG reporting", "BRSR", "Extended Producer Responsibility (EPR)", "E-waste recycling", "Waste management", "Circular economy", "Carbon accounting", "Net zero"],
    areaServed: "IN",
    sameAs: [site.social.linkedin, site.social.instagram, site.karmaverseUrl, site.playStoreUrl].filter(Boolean),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#organization` },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* brand fonts are preloaded so headlines paint in the final font straight away (see globals.css) */}
        <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="sr-only z-[100] rounded-full bg-lime-brand px-4 py-2 text-text focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingBuddy />
        <HashLinkScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}

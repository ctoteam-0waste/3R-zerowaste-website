import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/manrope";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBuddy } from "@/components/layout/FloatingBuddy";
import { HashLinkScroll } from "@/components/layout/HashLinkScroll";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Climate-tech for measurable impact`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["ESG", "circular economy", "EPR", "carbon", "net zero", "climate tech", "KarmaVerse", "sustainability India", "e-waste recycling Gurugram", "waste management Gurugram", "BRSR"],
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  formatDetection: { telephone: true, email: true, address: true },
  icons: { icon: "/images/brand/logo-mark.png", apple: "/images/brand/logo-mark.png" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport: Viewport = { themeColor: "#05100C", width: "device-width", initialScale: 1 };

const orgJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.footerEmail,
    telephone: site.phone,
    logo: `${site.url}/images/brand/logo-full.png`,
    slogan: site.tagline,
    foundingDate: "2020-07-24",
    founder: { "@type": "Person", name: "Shiv Rao Challa" },
    address: { "@type": "PostalAddress", streetAddress: "Plot 62, Sector 8, IMT Manesar", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
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

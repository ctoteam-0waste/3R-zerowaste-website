/** Old WordPress pages on 0waste.co.in → closest page on the new site (keeps links and search rankings working). */
const legacyRedirects = [
  ["/about-us", "/about"],
  ["/our-team", "/about#leadership"],
  ["/certification", "/about"],
  ["/ngo", "/about#story"],
  ["/testimonials", "/impact"],
  ["/testimonial/:slug*", "/impact"],
  ["/awards-achievements", "/impact"],
  ["/our-gallery", "/impact"],
  ["/our-partner", "/impact#partners"],
  ["/our-clients", "/impact#partners"],
  ["/sdg-2030", "/impact"],
  ["/services", "/solutions"],
  ["/waste-r-d", "/solutions"],
  ["/circular-economy", "/solutions/circular-economy"],
  ["/zero-waste", "/solutions/circular-economy"],
  ["/e-waste-recycling", "/solutions/circular-economy"],
  ["/recycling-consultancy", "/solutions/circular-economy"],
  ["/recycling-plant-set-up-consultancy", "/solutions/circular-economy"],
  ["/trading-of-recycled-plastic-granules", "/solutions/circular-economy"],
  ["/trading-of-virgin-plastic-granules", "/solutions/circular-economy"],
  ["/environment-consultancy", "/solutions/esg"],
  ["/industry-5-0", "/solutions/climate-intelligence"],
  ["/policy-and-reports", "/insights#reports"],
  ["/blogs", "/blog"],
  ["/feed", "/blog"],
  ["/comments/feed", "/blog"],
  ["/career-opening", "/careers"],
  ["/internship-opportunities", "/careers"],
  ["/consulting-assignments", "/careers"],
  ["/contact-us", "/contact"],
  ["/faq", "/contact"],
  ["/privacy-policy", "/privacy"],
  ["/terms-n-conditions", "/terms"],
  ["/disclaimer-statement", "/terms"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 keeps photos crisp; next/image otherwise defaults to 75
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};
export default nextConfig;

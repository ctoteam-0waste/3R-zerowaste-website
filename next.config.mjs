/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 keeps photos crisp; next/image otherwise defaults to 75
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};
export default nextConfig;

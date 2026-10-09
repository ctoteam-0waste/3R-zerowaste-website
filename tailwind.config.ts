import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#05100C", 2: "#0A1C15", 3: "#030A07" },
        forest: "#0E2A1F",
        emerald: { brand: "#2BD08B", deep: "#18704C" },
        lime: { brand: "#C8F26A" },
        cyan: { brand: "#6FE3D6" },
        paper: { DEFAULT: "#F5F2EA", 2: "#ECE7DB" },
        kv: "#E8F1CF",
        text: { DEFAULT: "#0B1712", muted: "#4A5852", dim: "#9DB0A7" },
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', '"Helvetica Neue"', "Arial", "sans-serif"],
        sans: ['"Manrope Variable"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      maxWidth: { site: "1280px" },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        pulseRing: { "70%": { boxShadow: "0 0 0 10px rgba(43,208,139,0)" }, "100%": { boxShadow: "0 0 0 0 rgba(43,208,139,0)" } },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        pulseRing: "pulseRing 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;

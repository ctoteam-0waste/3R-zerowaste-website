import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { termsAndConditions } from "@/content/legal/terms";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms & Conditions",
  description: "Terms governing use of the KarmaVer$e app, website and pickup services operated by 3R Zero Waste.",
};

export default function Page() {
  return <LegalPage doc={termsAndConditions} path="/terms" />;
}

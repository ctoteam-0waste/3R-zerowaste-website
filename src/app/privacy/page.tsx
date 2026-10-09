import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacyPolicy } from "@/content/legal/privacy";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description: "How 3R Zero Waste collects, uses, shares and protects personal data under India’s DPDP Act, 2023.",
};

export default function Page() {
  return <LegalPage doc={privacyPolicy} path="/privacy" />;
}

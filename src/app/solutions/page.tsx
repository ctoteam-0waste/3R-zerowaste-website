import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { Solutions } from "@/components/sections/Solutions";
import { Technology } from "@/components/sections/Technology";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";
import { solutionAreas } from "@/content/pages";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions" },
  title: "Solutions",
  description: "KarmaVerse, community solutions, enterprise sustainability and circular economy solutions from 3R ZeroWaste.",
};

const tones = ["kv", "light", "dark", "light"] as const;

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            One ecosystem for <span className="grad-text">people, communities and business.</span>
          </>
        }
        intro="From a rewards app in every pocket to ESG data for the boardroom — our solutions turn sustainable intent into verified, measurable action."
        jumps={solutionAreas.map((s) => ({ label: s.eyebrow, href: `#${s.id}` }))}
      />
      {solutionAreas.map((s, i) => (
        <FeatureSection
          key={s.id}
          f={s}
          tone={tones[i]}
          reverse={i % 2 === 1}
          actions={
            i === 0 ? (
              <Button href="/karmaverse" variant="dark" arrow>
                Explore KarmaVerse
              </Button>
            ) : (
              <Button href="/contact" variant={tones[i] === "dark" ? "primary" : "dark"} arrow>
                Talk to us
              </Button>
            )
          }
        />
      ))}
      <div id="capabilities" className="scroll-mt-20">
        <Solutions />
      </div>
      <Technology />
      <CTA />
    </>
  );
}

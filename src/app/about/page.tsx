import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { Timeline } from "@/components/sections/Timeline";
import { Vision } from "@/components/sections/Vision";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Why3R } from "@/components/sections/Why3R";
import { Team } from "@/components/sections/Team";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/pages";

export const metadata: Metadata = {
  title: "About 3RZW",
  description: "Our story, mission, approach and the people behind 3R ZeroWaste — turning everyday sustainable actions into measurable climate impact.",
};

const [aboutUs, story, mission] = about;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About 3RZW"
        title={
          <>
            Built on everyday actions. <span className="grad-text">Measured for real impact.</span>
          </>
        }
        intro="3R ZeroWaste brings together technology, data, AI and human behaviour to help businesses and communities turn sustainable intent into verified, measurable outcomes."
        image={{ src: "/images/about/together.webp", alt: "Many hands together holding a small globe with a growing plant" }}
        jumps={[
          { label: "Our Story", href: "#story" },
          { label: "Our Mission", href: "#mission" },
          { label: "Our Approach", href: "#approach" },
          { label: "Leadership", href: "#leadership" },
          { label: "Careers", href: "/careers" },
        ]}
      />
      <FeatureSection f={aboutUs} />
      <FeatureSection f={story} tone="dark" reverse />
      <Timeline />
      <FeatureSection f={mission} />
      <Vision />
      <div id="approach" className="scroll-mt-20">
        <HowItWorks />
      </div>
      <Why3R />
      <div id="leadership" className="scroll-mt-20">
        <Team />
      </div>
      <section aria-labelledby="careers-cta-h" className="bg-paper pb-[clamp(80px,10vw,128px)] text-text">
        <Reveal className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-text p-[clamp(28px,4vw,56px)] text-[#F2F6F3]">
            <div className="flex max-w-[620px] flex-col gap-3">
              <p className="eyebrow text-lime-brand">Careers</p>
              <h2 id="careers-cta-h" className="font-display text-[clamp(26px,3vw,40px)] font-semibold leading-tight tracking-[-0.03em]">
                Want to build measurable climate impact with us?
              </h2>
            </div>
            <Button href="/careers" arrow>
              See open positions
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

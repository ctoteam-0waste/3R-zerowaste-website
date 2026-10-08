import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { ImpactDashboard } from "@/components/sections/ImpactDashboard";
import { Solutions } from "@/components/sections/Solutions";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { KarmaVerse } from "@/components/sections/KarmaVerse";
import { Technology } from "@/components/sections/Technology";
import { Why3R } from "@/components/sections/Why3R";
import { Team } from "@/components/sections/Team";
import { Timeline } from "@/components/sections/Timeline";
import { BlogSection } from "@/components/sections/BlogSection";
import { Events } from "@/components/sections/Events";
import { Partners } from "@/components/sections/Partners";
import { CTA } from "@/components/sections/CTA";
import { getEvents } from "@/lib/content";

/** Re-check content every hour so events move from Upcoming to Past on their own. */
export const revalidate = 3600;

export default function HomePage() {
  const { upcoming, past } = getEvents();
  return (
    <>
      <Hero />
      <Vision />
      <ImpactDashboard />
      <Solutions />
      <HowItWorks />
      <KarmaVerse />
      <Technology />
      <Why3R />
      <Team />
      <Timeline />
      <BlogSection />
      <Events upcoming={upcoming} past={past} />
      <Partners />
      <CTA />
    </>
  );
}

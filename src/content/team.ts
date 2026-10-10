export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  /** Optional — the LinkedIn icon is hidden when there is no profile. */
  linkedin?: string;
  founding?: boolean;
};

export const teamIntro =
  "Founders, founding team & operators — a deep bench across ESG, AI/tech, operations and business.";

export const team: TeamMember[] = [
  {
    name: "Shiv Rao Challa",
    role: "Founder & CEO",
    bio: "25 yrs ESG — Oil & Gas, Utilities, Infra across 12 countries. 3R Tech (M) PVT. Certified ESG Professional (IFCA), Sustainability, ESG Vision & Leadership.",
    photo: "/images/team/shiv.webp",
    linkedin: "https://www.linkedin.com/in/shivchalla/",
  },
  {
    name: "Jayashree Rao",
    role: "CBO — 3R ZeroWaste",
    bio: "Zero-waste solutions expert. Driving ESG transformation & growth across UK & Europe. Leads UK/Europe business & ESG expansion.",
    photo: "/images/team/jayashree.webp",
    linkedin: "https://www.linkedin.com/in/jayashree-rao-198a4a1b3/",
  },
  {
    name: "Gourav Pati",
    role: "ESG & Sustainability Lead",
    bio: "Environmental Sustainability Professional & Applied Geologist. Drives ESG, environmental compliance & CSR programmes.",
    photo: "/images/team/gourav.webp",
    linkedin: "https://www.linkedin.com/in/gourav-pati-53644a1b8/",
  },
  {
    name: "Krishan Kumar",
    role: "Waste Mgmt Operations Head",
    bio: "Waste-management operations specialist. Runs end-to-end collection, logistics & recycler network.",
    photo: "/images/team/krishan-2026.webp",
    linkedin: "https://www.linkedin.com/in/krishan-kumar-6924a61a4/",
  },
  {
    name: "Rama Shankar",
    role: "Waste Executive Engineer",
    bio: "Waste-management engineer. Oversees segregation, processing & on-site execution across projects.",
    photo: "/images/team/rama.webp",
  },
  {
    name: "Shashi Shekhar",
    role: "SDE-I",
    bio: "Frontend engineer crafting fast, intuitive interfaces. Optimizes user experience, UI systems & performance for KarmaCoin XP.",
    photo: "/images/team/shashi.webp",
    linkedin: "https://www.linkedin.com/in/cinsin/",
  },
  {
    name: "Ayushi Singh",
    role: "Founding Engineer",
    bio: "3+ yrs solving high-growth products. Full-Stack Architect & Growth Engineer. Leads product & engineering delivery for KarmaCoin XP.",
    photo: "/images/team/ayushi.webp",
    linkedin: "https://www.linkedin.com/in/ayushi-singh-6302a0249/",
    founding: true,
  },
  {
    name: "Akash Prajapati",
    role: "SDE-I",
    bio: "Backend engineer focused on robust, scalable services. Owns backend systems, APIs & data reliability.",
    photo: "/images/team/akash.webp",
    linkedin: "https://www.linkedin.com/in/akashprajapati08/",
  },
  {
    name: "Tanishq Pratap",
    role: "QA Engineer",
    bio: "QA engineer. Drives test strategy, automation & release quality across the product.",
    photo: "/images/team/tanishq.webp",
    linkedin: "https://www.linkedin.com/in/tanishqpratap/",
  },
];

export const teamValues = ["Strong Leadership", "Diverse Expertise", "Proven Execution", "Purpose Driven"];

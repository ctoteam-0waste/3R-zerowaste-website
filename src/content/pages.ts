/**
 * Copy for the inner pages (About, Solutions, KarmaVerse, Impact, Insights, Careers).
 * Anything wrapped in [brackets] is a placeholder waiting for verified content.
 */
import type { Feature } from "@/components/sections/FeatureSection";

const img = (name: string) => `/images/impact/${name}.webp`;

/* ---------------- About ---------------- */

export const about: Feature[] = [
  {
    id: "about-3rzw",
    eyebrow: "About 3RZW",
    title: "Reduce. Reuse. Recycle — with technology.",
    body: [
      "3RZeroWaste® was founded to do waste management differently — turning India's growing waste into value through the circular economy.",
      "Today we combine on-ground operations with technology, data and behaviour design, so that businesses, housing societies and schools can turn everyday sustainable actions into measurable environmental and ESG outcomes.",
    ],
    points: ["Enterprise sustainability & ESG", "Circular economy & EPR", "Community & school programmes", "KarmaVerse rewards platform"],
    image: { src: img("rrr-centre-launch"), alt: "Team in green shirts in front of an RRR Centre with bins", tag: "RRR Centre launch" },
  },
  {
    id: "story",
    eyebrow: "Our Story",
    title: "From neighbourhood drives to a climate-tech ecosystem.",
    body: [
      "We started on the ground — clean-up drives, segregation stations and awareness sessions with residents, students and corporate volunteers. Between 2020 and 2025, the 3RZW Environment Foundation ran activities across communities, schools and workplaces.",
      "Every drive taught us the same thing: good intent fades unless action is easy, visible and rewarded. That insight became our technology platform and, eventually, KarmaVerse.",
    ],
    image: { src: img("neighbourhood-cleanup"), alt: "Volunteers with gloves and pickers collecting litter", tag: "Where it started" },
  },
  {
    id: "mission",
    eyebrow: "Our Mission",
    title: "Make every sustainable action count — and be counted.",
    body: [
      "Our mission is to transform sustainable gestures and everyday actions into measurable climate impact, for organisations and individuals alike.",
      "We believe sustainability is no longer just an obligation. It is an opportunity to build smarter businesses, stronger communities and a healthier planet — guided by a simple philosophy: Kar Bhala Toh Ho Bhala.",
    ],
    points: ["Measurable outcomes, not just activities", "Participation that lasts beyond a campaign", "Verified data you can report", "Value for people and the planet"],
    image: { src: img("tree-plantation"), alt: "Group planting a sapling together", tag: "Kar Bhala Toh Ho Bhala" },
  },
];

/* ---------------- Solutions ---------------- */

export const solutionAreas: Feature[] = [
  {
    id: "karmaverse",
    eyebrow: "KarmaVerse",
    title: "A rewards ecosystem for everyday sustainability.",
    body: [
      "KarmaVerse turns sustainable gestures — doorstep recycling pickups, the daily eco-quiz, community challenges — into KarmaCoins that people redeem for eco-friendly products, gift cards, discounts, tree planting or donations.",
    ],
    points: ["Free doorstep recycling pickups", "Verified actions, coins credited instantly", "Rewards marketplace", "Referrals, quizzes & challenges"],
    image: { src: img("sustainability-fair"), alt: "Children and volunteers at a sustainability fair stall", tag: "KarmaVerse" },
  },
  {
    id: "community",
    eyebrow: "Community Solutions",
    title: "Zero-waste programmes for societies and schools.",
    body: [
      "We work with Resident Welfare Associations and schools to set up segregation, run collection drives and keep participation going long after launch day.",
    ],
    points: ["RWA zero-waste drives", "Segregation set-up & training", "School awareness sessions", "Clean-ups & plantation drives"],
    image: { src: img("rwa-residents"), alt: "Residents holding a 'Make every day Earth Day' banner", tag: "Community · RWA" },
  },
  {
    id: "enterprise",
    eyebrow: "Enterprise Sustainability",
    title: "ESG performance you can measure and report.",
    body: [
      "For businesses, we build the data baseline, run employee engagement and convert on-ground action into ESG metrics that stand up to reporting frameworks such as BRSR.",
    ],
    points: ["ESG & BRSR data readiness", "Carbon & net-zero tracking", "Employee engagement drives", "Office waste & segregation stations"],
    image: { src: img("corporate-plogging"), alt: "Corporate volunteers after a plogging drive", tag: "Enterprise" },
  },
  {
    id: "circular",
    eyebrow: "Circular Economy Solutions",
    title: "Keep materials in use — and out of landfill.",
    body: [
      "We help producers and organisations move from linear to circular systems: recovering materials, meeting Extended Producer Responsibility obligations and routing waste to authorised recyclers.",
    ],
    points: ["EPR compliance support", "Plastic, paper, metal & e-waste recovery", "Authorised recycler network", "Material traceability"],
    image: { src: img("material-sorting"), alt: "Sorting collected recyclable material", tag: "Material recovery" },
  },
];

/* ---------------- KarmaVerse ---------------- */

export const kvFlow = [
  { title: "Choose sustainable actions", body: "Schedule a pickup, play the eco-quiz, or complete a challenge." },
  { title: "Complete actions & verify", body: "Your action is checked and verified for authenticity." },
  { title: "Earn KarmaCoins", body: "Coins are credited to your wallet instantly." },
  { title: "Redeem rewards", body: "Trade coins for products, discounts, or real-world impact." },
];

export const kvFeatures = [
  { title: "Doorstep pickups", body: "Free recycling pickups for plastic, paper, metal, e-waste, textile and more." },
  { title: "Daily eco-quiz", body: "An AI-generated daily quiz — never a repeat." },
  { title: "Refer & earn", body: "Invite friends — you both earn 1,000 bonus KarmaCoins XP." },
  { title: "Challenges & campaigns", body: "Compete, climb the board and join community drives." },
  { title: "Rewards marketplace", body: "Green Store, eco gift cards, conscious savings and eco experiences." },
  { title: "Plant a tree", body: "Convert coins into real trees and real impact." },
  { title: "Learning modules", body: "Bite-sized lessons and a knowledge hub on real sustainability topics." },
  { title: "Streaks & wallet", body: "Track your coins, streaks and every verified action in one place." },
];

export const kvEcosystem = ["Citizens", "Housing societies", "Schools", "Corporates", "NGOs", "Recyclers", "Pickup partners", "Sustainable brands"];

/* ---------------- Impact ---------------- */

export const impactAreas: Feature[] = [
  {
    id: "environmental",
    eyebrow: "Environmental Impact",
    title: "Waste recovered. Emissions avoided. Trees planted.",
    body: [
      "Every pickup, drive and segregation station keeps material out of landfill and back in use. We track what is collected, how it is processed and what it avoids.",
    ],
    points: ["500,000+ trees planted", "850 t of litter collected", "320 t of plastic diverted", "250 t of e-waste recycled"],
    image: { src: img("community-bins"), alt: "Team beside colour-coded segregation bins", tag: "Environmental" },
  },
  {
    id: "social",
    eyebrow: "Social Impact",
    title: "Livelihoods and learning built into every programme.",
    body: [
      "Our work supports pickup partners and recyclers with fair, verified work, and brings sustainability education to students and employees.",
    ],
    points: ["Awareness sessions in 35+ schools", "Fair work for pickup partners", "Employee volunteering at 260+ B2B clients", "500,000+ students & educators reached"],
    image: { src: img("school-assembly"), alt: "Students at a sustainability awareness session", tag: "Education" },
  },
  {
    id: "community",
    eyebrow: "Community Impact",
    title: "Neighbourhoods that make every day Earth Day.",
    body: [
      "From housing societies to public trails, residents and volunteers turn shared spaces cleaner and greener — and keep them that way.",
    ],
    points: ["32+ RWAs engaged", "Clean-up & plogging drives", "Plantation drives", "Sustainability fairs"],
    image: { src: img("hill-cleanup"), alt: "Volunteers gathered on a hillside trail", tag: "Community" },
  },
];

/**
 * Partner logo slider. Each logo is /public/images/partners/logos/<slug>.webp — add a file and a row here to add a partner.
 * Names marked [ ] are logos we could not read; please correct them.
 */
export const partners: { name: string; slug: string }[] = [
  { name: "NARSI", slug: "narsi" },
  { name: "PCP", slug: "pcp" },
  { name: "Compact Food Solutions", slug: "compact" },
  { name: "Indigrid", slug: "indigrid" },
  { name: "Bindu Fashion Pvt. Ltd.", slug: "bindu-fashion" },
  { name: "Allflex Livestock Intelligence", slug: "allflex" },
  { name: "Pricol", slug: "pricol" },
  { name: "IICA", slug: "iica" },
  { name: "Epicurean Hospitality Services", slug: "epicurean" },
  { name: "Conquerent", slug: "conquerent" },
  { name: "Three Sixty", slug: "three-sixty" },
  { name: "Anmol", slug: "anmol" },
  { name: "JK", slug: "jk" },
  { name: "Sarvodaya Healthcare", slug: "sarvodaya" },
  { name: "Municipal Corporation of Gurugram", slug: "mcg-gurugram" },
  { name: "Municipal Corporation Manesar", slug: "mc-manesar" },
  { name: "Alok N Pandey & Associates", slug: "alok-n-pandey" },
  { name: "[Partner badge]", slug: "partner-badge" },
  { name: "[Partner seal]", slug: "partner-seal" },
  { name: "MIWA", slug: "miwa" },
  { name: "Genpact", slug: "genpact" },
  { name: "[Partner emblem]", slug: "partner-emblem" },
  { name: "Bisleri", slug: "bisleri" },
  { name: "Radio Design", slug: "radio-design" },
  { name: "Kumar", slug: "kumar" },
  { name: "V&M", slug: "v-and-m" },
];

/** Press coverage — newest first. Shown on Insights → News. */
export const news = [
  {
    outlet: "The Business Guardian",
    date: "7 August 2026",
    title: "India–UK Free Trade Agreement Opens New Global Growth Opportunities for 3R ZeroWaste’s Circular Economy Solutions",
    summary:
      "The landmark India–UK FTA creates new opportunities for Indian sustainability and circular economy companies to expand globally. For Gurugram-based 3R ZeroWaste, it is a chance to take its integrated waste management, MRFs, e-waste recycling, EPR and ESG advisory services to the United Kingdom and other international markets.",
    quote:
      "The India–UK FTA is much more than a trade agreement. It creates a powerful platform for Indian sustainability companies to scale globally through technology partnerships, digital innovation and knowledge exchange.",
    quoteBy: "Shiv Rao Challa, Founder, 3R ZeroWaste",
    image: "/images/news/business-guardian-india-uk-fta.webp",
  },
];

/** Verbatim from the testimonials page of 0waste.co.in (archived March 2026); long ones end at a full sentence. */
export const testimonials = [
  {
    quote: "Known this dedicated team for a decade now. They are committed and innovative.",
    name: "Deepa",
    role: "CEO",
  },
  {
    quote: "The 3R Zero waste team are Customer focused and ensured our delight in our association.",
    name: "Sachin",
    role: "CEO",
  },
  {
    quote: "Great initiative Shiv. Thank you for making Three Sixty a part of the drive. Let us all work together for a better tomorrow.",
    name: "Vikash",
    role: "Three Sixty",
  },
  {
    quote:
      "I recently had the pleasure of engaging with 3R Zerowaste, a waste management and sustainable firm, and I am delighted to share my experience. This company truly embodies the essence of sustainability and environmental responsibility.",
    name: "Shivani Sunil",
    role: "Client",
  },
  {
    quote: "I visited Shiv’s unit today. I can vouch that he is doing an amazing job. I am very impressed with the dedication, patience and commitment that he is showing towards the environment.",
    name: "Kailash Iyer",
    role: "Visitor to the 3R unit",
  },
  {
    quote: "I got the opportunity to work as an intern at 3R zero waste on EPR. I have valuable learning during the internship period. I learned that how EPR works & established EPR schemes worldwide.",
    name: "Amit Kumar",
    role: "Former intern, EPR · Analytics",
  },
];

export const achievements = [
  { title: "Featured in The Business Guardian", body: "India–UK FTA & global circular economy growth · August 2026" },
  { title: "Recognised by MoEFCC", body: "Ministry of Environment, Forest and Climate Change · plogging initiative" },
  { title: "International recognition from UNEP", body: "United Nations Environment Programme · India’s largest plogging initiative" },
];

/* ---------------- Insights: reports ---------------- */

/** Report highlights, newest first (figures only — the PDFs are not published). */
export const reports = [
  {
    title: "3RZW Environment Foundation — five years of impact",
    period: "September 2020 – October 2025",
    summary:
      "Five years of the Foundation’s outreach, awareness campaigns, plogging movement, waste management and urban greening programmes across India — aligned with SDG 11, 13 and 15.",
    stats: [
      { value: "17 lakh+", label: "Citizens reached directly" },
      { value: "1,500+", label: "Plogging events" },
      { value: "1.5 lakh+", label: "Ploggers" },
      { value: "5 lakh+", label: "Trees planted" },
      { value: "850 t", label: "Litter collected" },
      { value: "200+", label: "Schools & colleges" },
    ],
  },
];

/* ---------------- Careers ---------------- */

/** Add open roles here; the Careers page shows an empty state while this list is empty. */
export const openPositions: { title: string; team: string; location: string; type: string; applyUrl?: string }[] = [];

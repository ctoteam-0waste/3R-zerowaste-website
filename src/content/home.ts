/**
 * Homepage section content. Keep numbers verified — publish only confirmed metrics.
 */

export const metrics = [
  { label: "B2B Clients", tag: "01 · Enterprise", value: 260, suffix: "+", bar: 0.84 },
  { label: "Industries", tag: "02 · Sectors", value: 310, suffix: "+", bar: 1 },
  { label: "RWAs", tag: "03 · Communities", value: 32, suffix: "+", bar: 0.46 },
  { label: "Schools", tag: "04 · Education", value: 35, suffix: "+", bar: 0.5 },
];

export type IconKey =
  | "esg"
  | "circular"
  | "epr"
  | "carbon"
  | "climate"
  | "engagement"
  | "tech"
  | "data"
  | "measurable"
  | "scalable"
  | "human"
  | "ai"
  | "sustainability";

export const solutions: { title: string; body: string; icon: IconKey; href: string; featured?: boolean }[] = [
  { title: "ESG", icon: "esg", featured: true, href: "/contact", body: "Data-driven ESG solutions for measurable environmental and sustainability performance." },
  { title: "Circular Economy", icon: "circular", href: "/contact", body: "Technology-enabled circularity solutions that help businesses move from linear to circular systems." },
  { title: "EPR", icon: "epr", href: "/contact", body: "Digital solutions supporting extended producer responsibility and compliance." },
  { title: "Carbon & Net Zero", icon: "carbon", href: "/contact", body: "Carbon measurement, tracking and pathways toward net-zero goals." },
  { title: "Climate Intelligence", icon: "climate", href: "/contact", body: "Data and AI-powered insights for better sustainability decisions." },
  { title: "Sustainable Engagement", icon: "engagement", href: "/karmaverse", body: "Tools that turn sustainability from an obligation into everyday participation." },
];

export const visionForces: { label: string; icon: IconKey; highlight?: boolean }[] = [
  { label: "Technology", icon: "tech" },
  { label: "Data", icon: "data" },
  { label: "AI", icon: "ai" },
  { label: "Sustainability", icon: "sustainability" },
  { label: "Human Behaviour", icon: "human", highlight: true },
];

export const steps = [
  { title: "MEASURE", body: "Establish a data baseline for waste, resources and emissions across operations and communities." },
  { title: "ENGAGE", body: "Bring employees, residents and students into the effort through digital participation." },
  { title: "ACT", body: "Convert engagement into on-ground sustainable actions that are captured and verified." },
  { title: "REWARD", body: "Recognise every verified action with incentives that make the behaviour stick." },
  { title: "IMPACT", body: "Translate actions into measurable environmental and ESG outcomes, ready to report." },
];

export const karmaJourney = ["Sustainable Gesture", "Verification", "KarmaCoins", "Rewards", "Measurable Impact"];

export const techNodes = ["AI", "Data", "Analytics", "Cloud", "Automation", "Digital Engagement"];

export const techLayers = [
  { k: "Capture", v: "Data, cloud and automation bring field activity and operations into one reliable record." },
  { k: "Understand", v: "AI and analytics turn that record into climate intelligence for better decisions." },
  { k: "Activate", v: "Digital engagement puts that intelligence in people's hands — and rewards them for acting on it." },
];

/** Case studies: publish only verified data. Placeholders render as muted italics. */
/**
 * Impact stories slider: photos from 3RZW Environment Foundation activities, 2020–2025
 * (source: "activities for 5 years" report). Files live in /public/images/impact.
 * `tag` is the small label on each slide.
 */
export const impactGallery: { src: string; caption: string; tag: string; alt: string }[] = [
  { src: "/images/impact/corporate-plogging.webp", tag: "Enterprise", caption: "Corporate volunteers after a plogging drive", alt: "Corporate volunteers in team jerseys with collected bags after a plogging drive" },
  { src: "/images/impact/rwa-residents.webp", tag: "Community · RWA", caption: "Residents pledging to make every day Earth Day", alt: "Residents of a housing society holding a 'Make every day Earth Day' banner" },
  { src: "/images/impact/school-assembly.webp", tag: "Education", caption: "Sustainability awareness session at a school", alt: "Students at a sustainability awareness session in a school hall" },
  { src: "/images/impact/plogging-drive.webp", tag: "Enterprise", caption: "Plogging drive with corporate volunteers", alt: "Volunteers in team jerseys standing beside filled collection bags in a park" },
  { src: "/images/impact/tree-plantation.webp", tag: "Community", caption: "Tree plantation drive", alt: "Group planting a sapling together" },
  { src: "/images/impact/community-bins.webp", tag: "Community", caption: "Colour-coded segregation bins at a community centre", alt: "Team standing beside green, blue, yellow and red bins at a gate" },
  { src: "/images/impact/school-talk.webp", tag: "Education", caption: "Outdoor awareness talk for students", alt: "Speaker addressing rows of seated students outdoors" },
  { src: "/images/impact/hill-cleanup.webp", tag: "Community", caption: "Trail clean-up with young volunteers", alt: "Volunteers gathered on a hillside trail" },
  { src: "/images/impact/rrr-centre-launch.webp", tag: "Enterprise", caption: "RRR Centre launch", alt: "Team in green shirts lined up in front of an RRR Centre with bins" },
  { src: "/images/impact/office-bins.webp", tag: "Enterprise", caption: "Segregation station set up at an office", alt: "People standing beside a row of colour-coded bins and banners" },
  { src: "/images/impact/sustainability-fair.webp", tag: "Community", caption: "Sustainability fair", alt: "Children and volunteers at a sustainability fair stall" },
  { src: "/images/impact/neighbourhood-cleanup.webp", tag: "Community", caption: "Neighbourhood clean-up drive", alt: "Volunteers with gloves and pickers collecting litter beside a wall" },
  { src: "/images/impact/corporate-session.webp", tag: "Enterprise", caption: "Corporate sustainability session", alt: "Large group photo of participants in a conference hall" },
  { src: "/images/impact/student-exhibit.webp", tag: "Education", caption: "Students at a sustainability exhibit", alt: "Students in blazers gathered around an exhibit" },
  { src: "/images/impact/material-sorting.webp", tag: "Recovery", caption: "Sorting collected bottles for recovery", alt: "Worker sorting a large pile of collected plastic bottles" },
];

export const whyCards: { title: string; body: string; icon: IconKey }[] = [
  { title: "Technology-led", body: "Technology is at the core of our sustainability solutions.", icon: "tech" },
  { title: "Data-driven", body: "Turn sustainability activity into measurable intelligence.", icon: "data" },
  { title: "Measurable", body: "Focus on outcomes, not just activities.", icon: "measurable" },
  { title: "Scalable", body: "Designed for businesses, communities and ecosystems.", icon: "scalable" },
  { title: "Human-centered", body: "Make sustainable behaviour easier and more engaging.", icon: "human" },
];

/** Company milestones — sourced from public records and press (see notes in each line). */
export const timeline = [
  { year: "Jul 2020", title: "3R ZeroWaste founded", note: "Incorporated in Gurugram on 24 July 2020 by Shiv Rao Challa to do waste management differently." },
  { year: "Sep 2020", title: "3RZW Environment Foundation", note: "Non-profit arm set up on 25 September 2020 for awareness, plogging and community drives." },
  { year: "2020–25", title: "A national movement", note: "1,500+ plogging events and 17 lakh+ citizens reached directly across India." },
  { year: "2023", title: "Circular Economy", note: "CPCB-authorised e-waste recycler at IMT Manesar, with 500 tonnes a year of capacity." },
  { year: "Jan 2024", title: "Enterprise Sustainability", note: "Climate-proactive contract with Karma Lakelands, Gurugram, for zero-waste operations." },
  { year: "2026", title: "KarmaVerse & global growth", note: "Sustainability rewards app live on Google Play; India–UK FTA opens expansion to the UK." },
];

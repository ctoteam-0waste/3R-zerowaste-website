/**
 * Detail pages for each solution card (/solutions/<slug>).
 * Keep claims verifiable — proof points must come from public records or programme data.
 */
import type { IconKey } from "@/content/home";

export type SolutionDetail = {
  slug: string;
  title: string;
  icon: IconKey;
  tagline: string;
  intro: string;
  challenge: string;
  approach: string;
  offerings: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  outcomes: string[];
  audience: string[];
  proof?: { value: string; label: string }[];
  related: string[]; // blog post slugs
  cta?: { label: string; href: string };
};

export const solutionDetails: SolutionDetail[] = [
  {
    slug: "esg",
    title: "ESG",
    icon: "esg",
    tagline: "ESG performance you can measure, verify and report.",
    intro:
      "We help organisations turn environmental and social activity into clean, auditable data — ready for BRSR, investor questionnaires and sustainability reports.",
    challenge:
      "ESG data is usually scattered across vendors, facilities and spreadsheets. Waste, water and energy figures arrive late, in different units, with little evidence behind them — which makes reporting slow and assurance risky.",
    approach:
      "3R builds a single, evidence-backed record of your environmental performance. Field activity is captured at source, verified, and rolled up into the indicators frameworks like BRSR Core actually ask for.",
    offerings: [
      { title: "ESG baseline & gap assessment", body: "Map what you measure today against BRSR and investor requirements, and prioritise the gaps." },
      { title: "Waste & resource data capture", body: "Digitise collection, segregation and recycler hand-overs so every tonne has a traceable record." },
      { title: "BRSR & BRSR Core readiness", body: "Structure data for the assurable KPIs SEBI requires — waste, energy, water and emissions intensity." },
      { title: "Dashboards & reporting", body: "Site-level and company-wide views of your indicators, exportable for annual reports and audits." },
      { title: "Employee & community programmes", body: "Plogging drives, awareness sessions and volunteering that feed your social (S) disclosures." },
      { title: "Assurance support", body: "Evidence trails — manifests, weighments, photographs — that make third-party assurance smoother." },
    ],
    steps: [
      { title: "Assess", body: "Review current data sources, frameworks and reporting deadlines." },
      { title: "Capture", body: "Set up digital capture for waste, resources and programme activity." },
      { title: "Verify", body: "Check data at source with weighments, documents and site evidence." },
      { title: "Report", body: "Deliver framework-ready indicators and dashboards, every period." },
    ],
    outcomes: [
      "Faster, more confident annual reporting",
      "Traceable evidence for every reported figure",
      "Clear view of performance across sites",
      "Stronger social disclosures through real programmes",
    ],
    audience: ["Listed companies preparing BRSR", "Corporates with multi-site operations", "Sustainability & CSR teams", "Real-estate and facility managers"],
    proof: [
      { value: "260+", label: "B2B clients" },
      { value: "310+", label: "Industries served" },
    ],
    related: ["brsr-core-explained", "scope-1-2-3-emissions-guide"],
  },
  {
    slug: "circular-economy",
    title: "Circular Economy",
    icon: "circular",
    tagline: "Keep materials in use — and out of landfill.",
    intro:
      "We help businesses and communities move from take–make–throw to systems where materials are recovered, recycled and returned to productive use.",
    challenge:
      "Most waste still leaves sites mixed and untracked, ending up in landfill or informal channels. Value is lost, compliance is uncertain, and nobody can say what actually happened to the material.",
    approach:
      "3R combines on-ground infrastructure with digital traceability: segregation at source, Materials Recovery Facilities, authorised recycling — and a record of every hand-over in between.",
    offerings: [
      { title: "Source segregation set-up", body: "Colour-coded systems, signage and training for offices, campuses and residential societies." },
      { title: "Materials Recovery Facilities (MRF)", body: "Collection and sorting of dry waste so recyclables are recovered rather than dumped." },
      { title: "E-waste recycling", body: "Safe collection and processing of electronic waste through our CPCB-authorised unit at IMT Manesar." },
      { title: "Plastic, paper & metal recovery", body: "Routing recovered material to authorised recyclers and the secondary-materials market." },
      { title: "Recycling plant set-up consultancy", body: "Technical guidance for organisations planning their own recycling or processing units." },
      { title: "Material traceability", body: "Digital records from pickup to recycler, so diversion figures are backed by evidence." },
    ],
    steps: [
      { title: "Audit", body: "Understand what waste you generate, where, and how much." },
      { title: "Segregate", body: "Put the right bins, process and training in place at source." },
      { title: "Recover", body: "Collect, sort and route material to authorised recyclers." },
      { title: "Trace", body: "Track every hand-over and report what was diverted from landfill." },
    ],
    outcomes: [
      "Higher landfill diversion",
      "Compliant, documented disposal",
      "Value recovered from recyclables",
      "Clear data for ESG and EPR reporting",
    ],
    audience: ["Manufacturers & industrial units", "Offices and tech parks", "Residential societies (RWAs)", "Schools and campuses"],
    proof: [
      { value: "500 t/yr", label: "Authorised e-waste capacity (CPCB list, 2023)" },
      { value: "250 t", label: "E-waste collected for recycling (2020–25)" },
    ],
    related: ["linear-to-circular-five-shifts", "e-waste-rules-india-what-businesses-need-to-know"],
  },
  {
    slug: "epr",
    title: "EPR",
    icon: "epr",
    tagline: "Extended Producer Responsibility, handled end to end.",
    intro:
      "We support producers, importers and brand owners in meeting their EPR obligations for plastic packaging and e-waste — from targets to certificates to filings.",
    challenge:
      "EPR rules are detailed and change often. Producers must register, meet category-wise targets, source valid certificates and file returns on time — while proving that collected material was genuinely processed.",
    approach:
      "3R pairs regulatory know-how with real collection and recycling capacity, so your obligations are fulfilled through verifiable material flows — not paperwork alone.",
    offerings: [
      { title: "Obligation assessment", body: "Work out your categories, quantities and targets under the applicable EPR rules." },
      { title: "Registration support", body: "Help with registration on the relevant CPCB portals and the documents they require." },
      { title: "Collection & channelisation", body: "Collect post-consumer plastic and e-waste and route it to authorised processors." },
      { title: "Certificate sourcing", body: "Support in securing valid EPR certificates against your targets." },
      { title: "Returns & compliance calendar", body: "Track filing deadlines and keep annual and quarterly returns on schedule." },
      { title: "Audit-ready records", body: "Maintain the evidence trail regulators and auditors expect." },
    ],
    steps: [
      { title: "Assess", body: "Determine your obligations, categories and annual targets." },
      { title: "Register", body: "Complete portal registration and documentation." },
      { title: "Fulfil", body: "Collect, process and secure certificates against targets." },
      { title: "File", body: "Submit returns and keep records ready for audit." },
    ],
    outcomes: [
      "Obligations met on time",
      "Lower compliance risk and penalties",
      "Traceable, genuine material recovery",
      "One partner for collection and compliance",
    ],
    audience: ["Brand owners & FMCG companies", "Producers and importers", "Electronics manufacturers", "Packaging-intensive businesses"],
    related: ["epr-plastic-packaging-primer", "e-waste-rules-india-what-businesses-need-to-know"],
  },
  {
    slug: "carbon-net-zero",
    title: "Carbon & Net Zero",
    icon: "carbon",
    tagline: "Measure, track and reduce emissions — credibly.",
    intro:
      "We help organisations understand their carbon footprint across Scope 1, 2 and 3, and build practical pathways toward their net-zero commitments.",
    challenge:
      "Net-zero pledges are easy; credible numbers are hard. Scope 3 — including waste — is often the largest and least measured part of the footprint, and reductions are rarely tracked against a reliable baseline.",
    approach:
      "3R starts from the data you can verify, especially waste and materials, and builds outward: a baseline aligned with the GHG Protocol, then targets and reduction actions you can actually track.",
    offerings: [
      { title: "Carbon footprint baseline", body: "Scope 1, 2 and relevant Scope 3 categories, following the GHG Protocol." },
      { title: "Waste-related emissions", body: "Quantify emissions from waste generated in operations and how diversion reduces them." },
      { title: "Reduction roadmap", body: "Prioritised actions with estimated impact, cost and ownership." },
      { title: "Target setting support", body: "Interim and long-term targets that are ambitious but defensible." },
      { title: "Progress tracking", body: "Dashboards that show movement against the baseline each period." },
      { title: "Disclosure-ready outputs", body: "Emissions data structured for BRSR and other reporting frameworks." },
    ],
    steps: [
      { title: "Baseline", body: "Collect activity data and calculate your footprint." },
      { title: "Prioritise", body: "Identify the biggest and most achievable reductions." },
      { title: "Act", body: "Implement changes — starting with waste and materials." },
      { title: "Track", body: "Measure progress against the baseline and report it." },
    ],
    outcomes: [
      "A credible, defensible baseline",
      "Clear priorities for reduction",
      "Measurable progress toward net zero",
      "Emissions data ready for disclosure",
    ],
    audience: ["Companies with net-zero commitments", "Organisations reporting under BRSR", "Supply-chain partners asked for carbon data", "Campuses and large facilities"],
    related: ["scope-1-2-3-emissions-guide", "brsr-core-explained"],
  },
  {
    slug: "climate-intelligence",
    title: "Climate Intelligence",
    icon: "climate",
    tagline: "Turn sustainability data into better decisions.",
    intro:
      "We use data, analytics and AI to help organisations see what is happening across their sustainability programmes — and decide what to do next.",
    challenge:
      "Even when sustainability data exists, it rarely drives decisions. It sits in reports, arrives months late, and doesn't show where to act first or which interventions are working.",
    approach:
      "3R connects field data, operations and engagement into one layer of climate intelligence — dashboards, trends and AI-assisted insight that teams can use week to week, not just at year end.",
    offerings: [
      { title: "Unified data layer", body: "Bring waste, resource, emissions and engagement data into one consistent model." },
      { title: "Live dashboards", body: "Site, region and programme views that update as activity is captured." },
      { title: "Trend & anomaly detection", body: "Spot unusual spikes, under-performing sites and data gaps early." },
      { title: "AI-assisted insight", body: "Plain-language summaries and suggested actions drawn from your own data." },
      { title: "Scenario planning", body: "Estimate the impact of interventions before you invest in them." },
      { title: "Custom reporting", body: "Board, investor and regulator views from the same trusted data." },
    ],
    steps: [
      { title: "Connect", body: "Integrate the data sources you already have." },
      { title: "Model", body: "Standardise units, sites and indicators into one structure." },
      { title: "Analyse", body: "Surface trends, gaps and opportunities with analytics and AI." },
      { title: "Decide", body: "Turn insight into prioritised, trackable actions." },
    ],
    outcomes: [
      "Faster, data-led decisions",
      "Early warning on performance issues",
      "One version of the truth across teams",
      "Better return on sustainability spend",
    ],
    audience: ["Sustainability & ESG leaders", "Operations and facility heads", "Leadership teams and boards", "Municipal and community programmes"],
    related: ["brsr-core-explained", "linear-to-circular-five-shifts"],
  },
  {
    slug: "sustainable-engagement",
    title: "Sustainable Engagement",
    icon: "engagement",
    tagline: "Make sustainable behaviour easy, visible and rewarding.",
    intro:
      "We turn sustainability from an obligation into everyday participation — for employees, residents and students — through programmes on the ground and KarmaVerse in their pocket.",
    challenge:
      "Most sustainability programmes depend on people changing habits. Awareness alone fades within weeks; without feedback and recognition, participation drops and so do results.",
    approach:
      "3R designs for behaviour: simple actions, instant verification and real rewards. KarmaVerse turns every verified pickup, quiz or challenge into KarmaCoins, while our drives and sessions build the habit offline.",
    offerings: [
      { title: "KarmaVerse rewards app", body: "Doorstep recycling pickups, a daily eco-quiz and challenges — all earning KarmaCoins." },
      { title: "Employee engagement drives", body: "Plogging, clean-ups and volunteering days that bring teams together." },
      { title: "Residential (RWA) programmes", body: "Zero-waste drives and segregation campaigns for housing societies." },
      { title: "School & campus programmes", body: "Awareness sessions, eco-clubs and student leadership activities." },
      { title: "Challenges & leaderboards", body: "Friendly competition that keeps participation high over time." },
      { title: "Impact reporting", body: "Participation and outcome data that feeds your ESG and CSR reports." },
    ],
    steps: [
      { title: "Invite", body: "Launch with a drive, session or app onboarding." },
      { title: "Act", body: "Participants complete simple, verified sustainable actions." },
      { title: "Reward", body: "Every verified action earns KarmaCoins and recognition." },
      { title: "Measure", body: "Track participation and impact, and report it." },
    ],
    outcomes: [
      "Participation that lasts beyond launch",
      "Verified actions, not just sign-ups",
      "Measurable social and environmental impact",
      "Stronger culture around sustainability",
    ],
    audience: ["Corporates and HR / CSR teams", "Residential societies", "Schools and colleges", "Citizens in Gurugram (KarmaVerse pickups)"],
    proof: [
      { value: "17 lakh+", label: "Citizens reached (2020–25)" },
      { value: "1,500+", label: "Plogging events organised" },
    ],
    related: ["behaviour-change-missing-piece", "zero-waste-drive-housing-society-guide"],
    cta: { label: "Explore KarmaVerse", href: "/karmaverse" },
  },
];

export const getSolution = (slug: string) => solutionDetails.find((s) => s.slug === slug);

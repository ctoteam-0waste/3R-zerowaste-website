/**
 * Homepage FAQ. Rendered visibly by components/sections/FAQ.tsx AND emitted as FAQPage
 * structured data — Google only trusts FAQ schema whose text is also on the page, so keep
 * this the single source. Phrase questions the way people type them into Google; answers
 * should open with a plain one-sentence fact (that's the line AI Overviews quote).
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "What is 3R ZeroWaste?",
    a: "3R ZeroWaste (3RZW) is a Gurugram-based climate-tech and circular economy company. It helps businesses, housing societies and schools turn everyday sustainable actions into measurable environmental and ESG outcomes, through waste management, e-waste recycling, EPR compliance, ESG and BRSR reporting, carbon and net-zero services, and the KarmaVerse sustainability rewards app.",
  },
  {
    q: "Who founded 3R ZeroWaste?",
    a: "3R ZeroWaste was founded by Shiv Rao Challa, who is also its CEO. He has 25 years of ESG experience across oil and gas, utilities and infrastructure in 12 countries.",
  },
  {
    q: "Who is the CEO of 3R ZeroWaste?",
    a: "Shiv Rao Challa is the Founder and CEO of 3R ZeroWaste.",
  },
  {
    q: "When was 3R ZeroWaste founded?",
    a: "3R ZeroWaste Pvt. Ltd. was incorporated in Gurugram on 24 July 2020. Its non-profit arm, the 3RZW Environment Foundation, was set up on 25 September 2020.",
  },
  {
    q: "Where is 3R ZeroWaste located?",
    a: "3R ZeroWaste is headquartered at Plot 62, Sector 8, IMT Manesar, Gurugram, Haryana 122051, India, where it also runs a CPCB-authorised e-waste recycling facility.",
  },
  {
    q: "What services does 3R ZeroWaste offer?",
    a: "3R ZeroWaste offers ESG and BRSR reporting, Extended Producer Responsibility (EPR) compliance, e-waste recycling, integrated waste management and material recovery, carbon accounting and net-zero planning, climate intelligence, and community sustainability programmes for RWAs and schools.",
  },
  {
    q: "Is 3R ZeroWaste an authorised e-waste recycler?",
    a: "Yes. Since 2023, 3R ZeroWaste has operated a CPCB-authorised e-waste recycling unit at IMT Manesar, Gurugram, with a capacity of 500 tonnes a year.",
  },
  {
    q: "What is KarmaVerse?",
    a: "KarmaVerse is the sustainability rewards app built by 3R ZeroWaste. Users schedule free doorstep recycling pickups and complete eco-actions to earn KarmaCoins, which can be redeemed for rewards. It is available at karmaverse.earth and on Android.",
  },
  {
    q: "How many organisations work with 3R ZeroWaste?",
    a: "3R ZeroWaste has worked with 260+ B2B clients, 32+ resident welfare associations and 35+ schools, and its community drives have directly reached 17 lakh+ citizens across India.",
  },
  {
    q: "How do I contact 3R ZeroWaste?",
    a: "Email info@0waste.co.in, call +91 70931 98828, or use the contact form at 0waste.co.in/contact.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

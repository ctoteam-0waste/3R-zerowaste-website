import type { LegalDoc } from "./types";

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  intro: `3R Zero Waste ("Company", "we", "us", "our") operates the KarmaVer$e app and website (the "Service"). We are the Data Fiduciary for the personal data described here, which means we determine why and how it is processed. This Policy explains what personal data we collect, why, who we share it with, how long we keep it, and your rights under India’s Digital Personal Data Protection Act, 2023. It should be read together with our Terms & Conditions.`,
  sections: [
    {
      title: "At a glance",
      paras: ["This summary is for convenience only. The detailed sections below govern."],
      list: [
        "Who controls my data? 3R Zero Waste, as Data Fiduciary under the DPDP Act, 2023.",
        "What is most sensitive? Your pickup address and location, and — if you cash out — your bank or UPI details.",
        "Do you track my location in the background? No. We access location only while you are scheduling or a Pickup is being fulfilled.",
        "Who sees my address? Only the Agent assigned to your Pickup, and our staff on a need-to-know basis. Never other Users.",
        "Do you sell my data? No. We do not sell personal data.",
        "Where is it stored? Primarily on servers in India.",
        "Can I delete it? Yes. Deleting your account erases your data within 30 days, apart from records we must keep by law.",
        "Who do I complain to? Our Data Protection Officer, then the Data Protection Board of India.",
      ],
    },
    {
      title: "Notice, consent, and legal basis",
      paras: [
        "Under the DPDP Act we tell you, in clear terms, what personal data we collect and why, before or when we ask for it — through this Policy and short in-context notices (for example, when we ask for location access).",
      ],
      list: [
        "Your consent — optional profile details, marketing, device location, and any processing we ask you to agree to separately.",
        "Performance of our agreement — creating your account, scheduling and fulfilling Pickups, calculating and crediting KarmaCoins XP, and processing redemptions.",
        "Legal obligation — tax, accounting, and audit records; lawful requests from authorities; breach notification.",
        "Protecting the Service — detecting and preventing fraud, abuse, and security incidents.",
      ],
      after: [
        "You may withdraw consent at any time, as easily as you gave it, through in-app settings, device settings, or by contacting us. Withdrawal takes effect going forward. Withdrawing location consent means you enter addresses manually; withdrawing consent needed to fulfil a Pickup may mean we cannot provide it.",
      ],
    },
    {
      title: "Personal data we collect",
      list: [
        "Account details (required) — name, email, mobile number; or basic Google profile if you sign in with Google.",
        "Pickup address (required to book) — full address, locality, city, state, PIN code, coordinates, and any landmarks or notes.",
        "Pickup details (required to book) — waste categories, estimated quantity, hazardous-waste declarations, and chosen slot.",
        "Profile details (optional, never needed for pickups or rewards) — age, gender, marital status, employment status.",
        "Redemption details (only if you request a payout) — bank account or UPI ID and any KYC documents our Payment Partner requires.",
        "Communications — support tickets, ratings, reviews, photographs, and dispute details, as you provide them.",
        "Quiz and referral activity — answers, scores, referral-code usage, and the referral relationship between accounts.",
        "Collected automatically — device and app data, usage data, approximate or precise location, and network data (IP, connection info) for security and fraud prevention. Cookies are used on the website only.",
        "Generated through the Service — Agent-verified category and weight of material, verification photographs, your Wallet and transaction history, and serviceability results.",
        "What we do not collect — government identity numbers (except KYC required by our Payment Partner for a payout), health or biometric data, and no data knowingly from anyone under 13.",
      ],
    },
    {
      title: "Location data — in detail",
      paras: ["Location is the most sensitive category of data the Service routinely handles, so we set out our practices separately."],
      list: [
        "Why — to help you find and confirm the Pickup address, to check serviceability (Pickups are offered only in Gurgaon / Gurugram), and to route the assigned Agent and confirm collection at the booked address.",
        "We access device location only while you are actively scheduling a Pickup or during fulfilment of a booked Pickup. We do not collect background location and do not build a movement history.",
        "We ask at the point of need, with an explanation. If you decline, you can still search and confirm a Pickup address manually — only convenience features are affected. Permission can be revoked anytime in device settings.",
        "The coordinates stored against a booking are those of the Pickup Address you confirmed, not a live device position.",
        "The assigned Agent sees the address, coordinates, contact number, categories, and slot needed for the collection, and only around the assigned Pickup; access ends when it is completed or cancelled. Your location and address are never exposed to other Users.",
        "Location data is used only for Pickup-related purposes — never for advertising or profiling — and is never sold or rented. Where serviceability cannot be confirmed, we decline the booking rather than assume.",
      ],
    },
    {
      title: "How we use your personal data",
      list: [
        "Create, authenticate, and manage your account.",
        "Schedule, assign, and fulfil Pickups, and check whether a location is serviceable.",
        "Calculate, credit, and manage KarmaCoins XP, Streaks, and bonuses.",
        "Process redemption payouts (shared with the Payment Partner).",
        "Provide support and resolve disputes.",
        "Personalise your experience, such as suggesting slots or quiz content.",
        "Detect, investigate, and prevent fraud and abuse, and maintain security and reliability.",
        "Send service communications (confirmations, coin updates, payout status, policy changes) and, only with your consent, marketing — which you can opt out of at any time.",
        "Improve the Service and plan coverage using aggregated or de-identified data, and comply with legal obligations.",
      ],
    },
    {
      title: "How we share your personal data",
      list: [
        "With Agents — the address, contact number, and pickup details needed to complete your booking, only for the period around it, under confidentiality obligations.",
        "With our Payment Partner (RazorpayX) — the account and transaction details needed to process a cash payout, handled under its own privacy policy and RBI regulations.",
        "With service providers — vendors who help run the Service under written confidentiality and data-protection obligations.",
        "With recycling and fulfilment partners — where needed to process collected material or fulfil a reward or donation you chose.",
        "For legal reasons — where required by law or to protect rights, property, or safety; we notify you where we may lawfully do so.",
        "In a business transfer — data may transfer as part of a merger, acquisition, or sale of assets, subject to this Policy, with notice.",
      ],
      after: ["We do not sell your personal data, and do not share it for third parties’ own independent marketing."],
    },
    {
      title: "Cookies, security & transfers",
      list: [
        "Cookies are used on our website (the app does not use cookies, though it uses device identifiers). Strictly-necessary cookies keep you signed in; performance and functionality cookies can be disabled. We do not use cookies for cross-site behavioural advertising.",
        "We apply reasonable administrative, technical, and physical safeguards — including encryption in transit, access controls, logging, and periodic review. Access is limited to those who need it; Agent access is scoped to their Pickup.",
        "Payment details for redemption are transmitted to our Payment Partner using industry-standard encryption; we do not permanently store full bank or card details beyond what is needed to show transaction status.",
        "In the event of a breach, we notify each affected User and the Data Protection Board of India within the timelines under the DPDP Act.",
        "We primarily store and process data on servers in India. Some providers may process data outside India under contractual and technical safeguards consistent with the DPDP Act. No method of transmission or storage is completely secure.",
      ],
    },
    {
      title: "How long we keep your data",
      list: [
        "Account and profile data — while your account is active; erased within 30 days of deletion, except where retention is legally required.",
        "KarmaCoins XP and Wallet — erased on account deletion; unredeemed coins are lost.",
        "Pickup records, addresses, and coordinates — erased with your account, subject to financial-record retention below.",
        "Transaction, redemption, and financial records — up to 8 years, to meet tax, accounting, payment-industry, and audit requirements.",
        "Support tickets and dispute records — up to 3 years. Security and access logs — up to 180 days, or longer during an investigation.",
        "Fraud and abuse records for terminated accounts — up to 3 years, to prevent re-registration. Aggregated or de-identified data may be kept indefinitely.",
      ],
    },
    {
      title: "Your rights",
      list: [
        "Access — a summary of the personal data we hold, our processing, and who we shared it with.",
        "Correction and updating — most profile fields can be edited in the app.",
        "Erasure — where data is no longer necessary, subject to the retention requirements above.",
        "Withdraw consent — for any consent-based processing, at any time.",
        "Grievance redressal — raise a grievance and receive a response within the prescribed timeline.",
        "Nominate — nominate another individual to exercise your rights in the event of death or incapacity.",
        "Complain to the Board — file a complaint with the Data Protection Board of India if you are not satisfied with our response.",
        "Other choices — opt out of marketing; manage location, camera, and notification permissions in device settings; delete your account from settings; request a copy of your records. We do not charge for exercising these rights.",
      ],
    },
    {
      title: "Your duties, children & automated processing",
      paras: [
        "The DPDP Act asks that you comply with applicable law when exercising your rights, do not impersonate another person, do not suppress material information (for example during a KYC check), and do not register false or frivolous grievances.",
        "The Service is for Users aged 13 and above; Users under 18 may use it only with verifiable parental or guardian consent. We do not undertake tracking, behavioural monitoring, or targeted advertising directed at Users under 18, and do not knowingly collect data from anyone under 13.",
        "We use automated processing for serviceability checks, slot allocation, coin and Streak calculation, and fraud detection. Automated fraud checks may temporarily restrict an account or payout; you can ask for a human review through in-app support or our Data Protection Officer. Final coins for a Pickup are based on an Agent’s human verification.",
      ],
    },
    {
      title: "Changes to this Policy",
      paras: [
        "We may update this Policy for changes in our practices or for legal, operational, or regulatory reasons. Material changes — a new purpose, a new category of recipient, or a longer retention period — are notified through the app, by email, or by other reasonable means at least 30 days before they take effect. Where a change requires your consent, we will ask for it. Continued use after a change takes effect constitutes acceptance, except where consent is separately required.",
      ],
    },
    {
      title: "Contact us",
      list: [
        "Data Protection Officer / privacy requests — privacy@karmaverse.earth",
        "Privacy grievances and escalations — Grievance Officer, grievance@karmaverse.earth",
        "General enquiries — info@karmaverse.earth · 070931 98828",
        "In-app — \"Need help?\" → Privacy",
        "Postal address — 3R Zero Waste, Plot 62, Sector 8 Road, IMT Manesar, Gurugram, Haryana 122503",
        "Regulator — the Data Protection Board of India, if you are not satisfied with our response.",
      ],
    },
  ],
  closing: [
    "This Policy is governed by the laws of India, principally the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000. Disputes are subject to the courts at Gurugram, Haryana, without prejudice to your right to approach the Data Protection Board or a consumer forum where you reside or work.",
    "By using KarmaVer$e, you acknowledge that you have read and understood this Privacy Policy.",
  ],
};

import type { LegalDoc } from "./types";

export const termsAndConditions: LegalDoc = {
  title: "Terms & Conditions",
  intro: `KarmaVer$e is operated by 3R Zero Waste ("Company", "we", "us", "our"), with its registered office at Plot 62, Sector 8 Road, IMT Manesar, Gurugram, Haryana 122503. These Terms & Conditions ("Terms") govern your access to and use of the KarmaVer$e app, website, and related services (the "Service"). Our Privacy Policy is incorporated by reference and forms part of your agreement with us. By creating an account, scheduling a pickup, or otherwise using the Service, you confirm that you have read and accepted these Terms. If you do not accept them, you must not use the Service.`,
  sections: [
    {
      title: "At a glance",
      paras: ["This summary is for convenience only. It is not part of the agreement and does not override the full Terms below."],
      list: [
        "What we do — we collect segregated recyclable waste from your address, free of charge, in areas we currently serve.",
        "What you get — KarmaCoins XP, loyalty reward points. They are not money and not a payment instrument.",
        "Where we operate — Gurgaon / Gurugram, Haryana only, at present. Bookings outside a live service area cannot be accepted.",
        "Cashing out — redemption opens on the dates in the KarmaCoins XP section. Payouts run through RazorpayX and require KYC.",
        "Rate for quiz & referral coins — depends on your unbroken verified-pickup streak at the moment you redeem.",
        "Rate for pickup coins — always the best rate: 10 coins = ₹1. Your streak does not affect it.",
        "Age — 18+ to hold an account in your own name; 13–17 only with verifiable parental or guardian consent.",
        "Complaints — in-app \"Need help?\" first, then our Grievance Officer. Escalation rights are preserved.",
      ],
    },
    {
      title: "Definitions",
      list: [
        "Agent — an independent pickup partner engaged and verified by the Company to collect, weigh, and verify recyclable waste. Agents are not employees of the Company.",
        "KarmaCoins XP — non-transferable loyalty reward points issued by the Company. A promotional benefit; not currency, not a security, and not a prepaid payment instrument.",
        "Payment Partner — RazorpayX, or any successor payment service provider engaged to disburse redemption payouts.",
        "Pickup — a scheduled collection of segregated recyclable waste from a Pickup Address by an Agent.",
        "Pickup Address — the address and coordinates you select or confirm in the app for a given Pickup.",
        "Service Area — a geographic boundary within which Pickups are currently offered.",
        "Serviceability Check — the automated validation that determines whether a Pickup Address falls within an active Service Area.",
        "Streak — your run of consecutive days on which a Pickup was completed and verified.",
        "Wallet — the in-app record of your KarmaCoins XP balance and transaction history.",
      ],
    },
    {
      title: "Eligibility",
      list: [
        "18 years and above: you may register and hold an account in your own name.",
        "13 to 17 years: you may use the Service only where a parent or legal guardian has given verifiable consent, accepted these Terms on your behalf, and accepts responsibility for your use and for any Pickup at your address.",
        "Under 13 years: you may not use the Service, and we do not knowingly permit registration.",
        "Under the DPDP Act, 2023 an individual under 18 is a \"child\"; we process a child’s data only on verifiable parental or guardian consent, without tracking or behavioural advertising directed at them.",
        "You must be competent to contract under the Indian Contract Act, 1872, or be represented by a parent or guardian who is.",
        "You must provide accurate, complete, and current registration information and keep it updated.",
        "The Service is offered for use in India; Pickups are further limited to active Service Areas. Registration does not by itself entitle you to a Pickup.",
      ],
    },
    {
      title: "Account registration and security",
      list: [
        "Register using a valid email address and mobile number, or by signing in with a Google account.",
        "One account per person. Duplicate, automated, or fraudulently created accounts may be suspended or terminated and any associated KarmaCoins XP forfeited.",
        "You are responsible for keeping your credentials, device, and registered mobile number secure, and for all activity under your account.",
        "Notify us promptly through in-app support if you believe your account has been accessed without authorisation. Until you do, activity under your account is treated as yours.",
        "We may require verification of your mobile number, email, or identity before enabling certain features, including redemption payouts.",
      ],
    },
    {
      title: "Service areas and pickup serviceability",
      list: [
        "Pickups are currently available only within the Gurgaon / Gurugram, Haryana Service Area. If your Pickup Address falls outside an active Service Area, the app will not permit a booking. This is an operational limit, not a fault in the app.",
        "When you schedule a Pickup you select or confirm a Pickup Address; we derive its coordinates, locality, city, state, and PIN code and run a Serviceability Check against our active Service Areas. If the address is inside an active area you may choose a slot; if not, you cannot complete the booking there.",
        "We will not change your address for you, and we will never silently substitute a different, serviceable address for the one you selected.",
        "We will not confirm a booking we cannot verify. Where serviceability cannot be reliably established, we decline to create the booking rather than accept one we may be unable to fulfil.",
        "Time slots are shown only after your Pickup Address passes the Serviceability Check.",
        "The check is enforced on our servers, independently of the app. Attempting to bypass it by modifying, replaying, or forging a request is a breach and may result in termination.",
        "Service Areas may be added, reduced, suspended, or withdrawn at any time. Coverage within an area may be partial. Where an area is withdrawn and you hold a confirmed future booking, we will notify you and cancel or reschedule it, without affecting coins already credited.",
        "We request device location only to find or confirm a Pickup Address and run the check. We do not collect background location. If you decline location access, you can still search and confirm an address manually.",
      ],
    },
    {
      title: "Services we provide",
      list: [
        "Waste pickup scheduling — free collection of segregated plastic, paper, metal, glass, e-waste, textile, organic, and declared hazardous household materials, within active Service Areas.",
        "KarmaCoins XP rewards — reward points credited on the type and Agent-verified weight of material collected.",
        "Daily eco-quiz — a daily quiz through which additional KarmaCoins XP may be earned.",
        "Referral programme — bonus KarmaCoins XP for introducing new Users.",
        "Redemption — the ability to redeem KarmaCoins XP for rewards, eco-friendly products, donations, or a cash payout through our Payment Partner, subject to the timelines below.",
      ],
      after: [
        "We may add, modify, suspend, or withdraw any part of the Service. Where a change materially reduces a benefit you have already earned, we will give reasonable prior notice.",
      ],
    },
    {
      title: "Pickup terms",
      list: [
        "A booking is confirmed only when a Pickup ID is generated and shown to you. We may cancel, reschedule, or decline a Pickup for operational, weather, safety, regulatory, or capacity reasons, and will notify you.",
        "Ensure the waste is properly segregated, dry where applicable, safely packed, and accessible at the scheduled address and time.",
        "Someone aged 18 or over should be present to hand over the material. If nobody is available, the Pickup may be recorded as missed. Repeated late cancellations or missed Pickups may lead to booking restrictions.",
        "The Agent verifies the category and weighs the material at collection. Final KarmaCoins XP are based on that verification, not on your estimate. Dispute a verification through in-app support within 7 days.",
        "By handing over material you confirm it is lawfully yours to dispose of, and title passes to the Company or its recycling partner on collection.",
        "Check for personal belongings, documents, storage media, and valuables before handing over. We cannot return items once collected. For e-waste, wipe or remove data-bearing storage before handover.",
      ],
    },
    {
      title: "Waste categories and prohibited items",
      paras: [
        "Hazardous household waste and e-waste must be declared at booking. Undeclared hazardous material may result in refusal, cancellation, and suspension. E-waste and hazardous waste are collected only where the required authorisations are held, so availability may vary by area and over time.",
      ],
      list: [
        "Do not present: medical, biomedical, clinical, or sanitary waste, including sharps and used PPE.",
        "Do not present: explosives, ammunition, fireworks, compressed gas cylinders, or pressurised containers.",
        "Do not present: radioactive material; flammable liquids, fuels, solvents, or unlabelled chemicals.",
        "Do not present: asbestos or construction and demolition debris.",
        "Do not present: animal remains, decomposing food waste presenting a health risk, or human waste.",
        "Do not present: anything whose possession, transfer, or disposal is restricted under law, or stolen goods.",
      ],
      after: [
        "Presenting prohibited items may result in refusal, suspension, forfeiture of KarmaCoins XP, recovery of costs, and reporting to authorities.",
      ],
    },
    {
      title: "KarmaCoins XP",
      paras: [
        "KarmaCoins XP are loyalty reward points issued as a promotional benefit. They are not legal tender, e-money, a prepaid payment instrument, a security, or a virtual digital asset. You cannot buy them, transfer them, or hold them as a store of value. Any cash payout is a discretionary promotional disbursement, not the redemption of stored value.",
      ],
      list: [
        "Earning — coins are credited on the category and Agent-verified weight of material collected, and for the daily quiz or qualifying referrals. Rates are set by the Company and may change prospectively.",
        "Adjustment — we may adjust, reverse, or revoke coins credited in error or through fraud, abuse, manipulation, system fault, or breach, and will notify you of the reason.",
        "Expiry — coins may carry an expiry period notified in the app; at least 30 days’ notice is given before an expiry is introduced or shortened for coins already in your Wallet.",
        "Redemption is enabled in stages — Pickup coins after 30 September 2026 (subject to verification); Quiz coins after 31 December 2026; Referral coins after 31 December 2026 (subject to anti-abuse rules).",
        "Payouts run through RazorpayX, subject to its terms, KYC, and RBI regulations. You may need to provide bank/UPI details and identity documents. You are responsible for any tax on amounts you receive. A minimum balance or payout amount may apply and is shown before you confirm.",
      ],
    },
    {
      title: "Redemption rate for pickup coins",
      paras: [
        "KarmaCoins XP earned from a verified Pickup always redeem at the best available rate of 10 coins = ₹1, regardless of your Streak. Your daily activity does not change the value of coins you earned by recycling.",
      ],
    },
    {
      title: "Streak-based rate for quiz & referral coins",
      paras: [
        "Coins earned through the daily eco-quiz or the referral programme redeem at a rate set by your unbroken daily Streak of verified Pickups, read at the moment you redeem. This rewards consistent, genuine recycling and prevents one-time or bulk sign-ups being cashed out at the best rate on day one.",
      ],
      table: [
        ["Stage", "Tier", "Streak", "Rate", "Multiplier"],
        ["Seedling", "Bronze", "Day 1–2", "100 coins = ₹1", "1×"],
        ["Sapling", "Silver", "Day 3–6", "75 coins = ₹1", "1.3×"],
        ["Grove", "Gold", "Day 7–13", "50 coins = ₹1", "2×"],
        ["Woodland", "Platinum", "Day 14–20", "30 coins = ₹1", "3.3×"],
        ["Forest", "Diamond", "Day 21–29", "20 coins = ₹1", "5×"],
        ["Evergreen", "Royal", "Day 30+", "10 coins = ₹1", "10× (best rate)"],
      ],
      list: [
        "Each day with a verified Pickup advances your Streak by one; completing the quiz or making a referral earns coins but does not advance the Streak.",
        "Miss a single day without a verified Pickup and the Streak resets to Seedling — you keep all coins earned, only the rate on quiz and referral coins returns to the Seedling rate until you rebuild it.",
        "A day is not counted against you where a Pickup you booked was cancelled, missed, or unavailable because of us, an Agent, or a suspended Service Area — report it and we will restore the Streak where our records confirm it.",
        "We may change the stages, rates, or multipliers, with at least 30 days’ notice of any change that reduces the rate on coins already in your Wallet.",
      ],
    },
    {
      title: "Referral programme",
      list: [
        "Each User receives a unique referral code. Bonus coins are credited to both the referrer and the referee on the referee’s first successfully completed and verified Pickup.",
        "The referee must be a genuinely new User who has not previously held an account.",
        "Self-referrals, referrals to accounts you control, fake or automated sign-ups, and coordinated abuse result in reversal of the bonus, termination of the accounts involved, and forfeiture of all coins in them.",
        "We may cap the number of eligible referrals in any period, and may modify or discontinue the programme on notice.",
      ],
    },
    {
      title: "Acceptable use",
      list: [
        "Do not provide false, misleading, or impersonated information at registration, booking, or during a Pickup.",
        "Do not create multiple accounts or use another person’s account.",
        "Do not manipulate or exploit the KarmaCoins XP, Streak, quiz, or referral systems, including by falsifying weights, splitting Pickups, or presenting the same material more than once.",
        "Do not circumvent the Serviceability Check, including by spoofing device location or modifying, replaying, or forging API requests.",
        "Do not use bots, scrapers, automated tools, or scripts; do not reverse-engineer or extract the source code, except where the law does not permit that restriction.",
        "Do not probe, scan, overload, or interfere with the Service, or attempt unauthorised access to any account or system.",
        "Do not abuse, threaten, harass, or discriminate against Agents, other Users, or Company personnel.",
        "Do not upload unlawful, infringing, obscene, or harmful content, or use the Service for any unlawful purpose.",
      ],
    },
    {
      title: "Agents",
      list: [
        "Agents are independent contractors — not employees. Nothing in these Terms creates an employment, partnership, joint venture, or agency relationship.",
        "We verify Agents before onboarding but do not guarantee their conduct. You may rate an Agent after each Pickup; poor ratings or substantiated complaints may lead to removal.",
        "Do not make direct payment arrangements with Agents outside the platform. Agents are not authorised to demand or accept payment for a Pickup — report any such request immediately.",
        "Report any dispute or safety concern involving an Agent through in-app support; safety concerns are acted on promptly.",
      ],
    },
    {
      title: "Intellectual property",
      list: [
        "All Content, trademarks, logos, app design, quiz material, and software associated with KarmaVer$e are owned by or licensed to the Company and protected under applicable law.",
        "Subject to your compliance, we grant you a limited, non-exclusive, non-transferable, revocable licence to use the app for personal, non-commercial use.",
        "You may not copy, modify, distribute, sell, lease, publicly display, or create derivative works from any part of the Service, except as expressly permitted.",
        "The \"KarmaVer$e\" name and logo and \"KarmaCoins XP\" branding are trademarks of the Company.",
        "Your content — you retain ownership of photographs, ratings, and reviews you submit, and grant us a worldwide, royalty-free, non-exclusive licence to host, store, reproduce, and display them to operate, improve, and promote the Service. This licence ends when you delete the material or your account, except for copies retained as described in the Privacy Policy or required by law.",
        "Feedback you voluntarily submit may be used by us without obligation to compensate or credit you.",
      ],
    },
    {
      title: "Third-party services",
      list: [
        "The Service relies on third-party providers — mapping and geocoding, cloud hosting, messaging providers, and our Payment Partner. Their availability is outside our control.",
        "Where you follow a link to a third-party site or a redemption or donation partner, that third party’s own terms and privacy policy apply. We are not responsible for their content, products, or practices.",
        "Making a third-party service available through the app is not an endorsement of it.",
      ],
    },
    {
      title: "Complaints, disputes & grievance redressal",
      list: [
        "In-app support — use \"Need help?\" first. This is the fastest route and creates a traceable ticket.",
        "Grievance Officer — if you are not satisfied, escalate using the contact details below.",
        "External remedies — nothing here limits your right to approach a consumer forum, the Data Protection Board of India, or any other competent authority.",
        "Raise a dispute about coin calculation, Agent conduct, or a redemption within 7 days of the relevant Pickup or transaction.",
        "We acknowledge a reported issue within 2 business days, resolve routine issues within 15 business days, and resolve grievances escalated to the Grievance Officer within 30 days.",
        "The Service does not charge Users for Pickups, so cash refunds do not arise for Pickup services. Where a Pickup is missed, delayed, or done incorrectly through our or an Agent’s error, we may credit compensatory coins, restore your Streak, reschedule, or take other corrective action.",
      ],
    },
    {
      title: "Suspension and termination",
      list: [
        "You may stop using the Service at any time and delete your account through settings or support. Deleting your account permanently erases your KarmaCoins XP, including unredeemed coins — redeem eligible coins first.",
        "We may suspend or terminate your account, with notice where practicable, for breach of these Terms, suspected fraud or abuse, risk to the safety of Agents or others, or where required by law.",
        "Where we suspend pending investigation, we will tell you the reason unless doing so would prejudice an investigation or breach a legal obligation, and will restore the account if the concern is not substantiated.",
        "Coins from fraudulent or abusive activity may be forfeited. Coins genuinely earned through verified Pickups are not forfeited merely because an account is closed for convenience.",
        "Termination does not relieve either party of obligations accrued before it; the intellectual-property, liability, indemnity, general-provisions, and governing-law sections survive.",
      ],
    },
    {
      title: "Disclaimers and limitation of liability",
      list: [
        "The Service is provided on an \"as is\" and \"as available\" basis. We do not warrant it will be uninterrupted or error-free, or that mapping, geocoding, or serviceability data will be free of inaccuracies. Estimated coin values shown before verification are indicative only.",
        "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits, data, or goodwill.",
        "Our aggregate liability arising out of the Service is limited to the greater of (a) the rupee value of the KarmaCoins XP in your Wallet when the claim arose, at the rate applicable to you, and (b) ₹5,000.",
        "Nothing limits or excludes our liability for death or personal injury caused by our negligence, fraud, any liability that cannot lawfully be excluded (including your rights under the Consumer Protection Act, 2019), or our obligations as a Data Fiduciary under the DPDP Act, 2023.",
        "We are not liable for failure or delay caused by events beyond our reasonable control, including natural disasters, epidemics, strikes, civil unrest, network or power outages, government action, or failure of the Payment Partner.",
      ],
    },
    {
      title: "Indemnity",
      paras: [
        "You agree to indemnify the Company and its officers, employees, and Agents against reasonable losses, claims, and costs arising from (a) your breach of these Terms, (b) your presentation of prohibited or undeclared hazardous material, (c) your infringement of any third-party right, or (d) your violation of applicable law. This does not apply to the extent the loss is caused by our own act, omission, or negligence. We will notify you promptly of any claim and will not settle it without your consent, not to be unreasonably withheld.",
      ],
    },
    {
      title: "Changes to these Terms",
      list: [
        "We may update these Terms to reflect changes to the Service, our practices, or legal or regulatory requirements.",
        "Material changes — including to coin earn or redemption rates, Streak mechanics, expiry, or your rights — are notified through the app, by email, or by other reasonable means at least 30 days before they take effect, except where a shorter period is required by law or to address a security or legal risk.",
        "Non-material changes, such as clarifications and corrections, take effect on publication. The \"Last updated\" date and version number are revised.",
        "Continued use after a change takes effect constitutes acceptance. Changes apply prospectively and will not retroactively reduce coins already credited.",
      ],
    },
    {
      title: "General & governing law",
      list: [
        "These Terms, with the Privacy Policy and any promotion-specific terms, form the entire agreement between you and the Company regarding the Service.",
        "If any provision is held invalid, it is severed and the remainder continues. Our failure to enforce a right is not a waiver of it.",
        "You may not assign your rights without our consent; we may assign these Terms, including on a merger or sale of assets, provided your rights are not reduced.",
        "These Terms are made in English; any translation is for convenience, and the English version prevails in case of conflict.",
        "These Terms are governed by the laws of India. Subject to your consumer rights, the courts at Gurugram, Haryana have exclusive jurisdiction. Nothing removes your right to bring proceedings before the consumer forum where you reside or work under the Consumer Protection Act, 2019.",
        "Both parties agree to attempt informal resolution through in-app support and the Grievance Officer for at least 30 days before legal proceedings, without preventing urgent interim relief.",
      ],
    },
    {
      title: "Contact us",
      list: [
        "General support — in-app \"Need help?\"",
        "General enquiries — info@karmaverse.earth · 070931 98828",
        "Grievance Officer (Terms, content, and platform complaints) — grievance@karmaverse.earth",
        "Data protection / privacy requests — see the Privacy Policy, Contact section",
        "Registered address — 3R Zero Waste, Plot 62, Sector 8 Road, IMT Manesar, Gurugram, Haryana 122503",
      ],
    },
    {
      title: "Active service areas",
      list: [
        "Gurgaon / Gurugram, Haryana — Active · Pickups available.",
        "Delhi — Planned · not yet available.",
        "Noida, Uttar Pradesh — Planned · not yet available.",
        "Faridabad, Haryana — Planned · not yet available.",
        "Ghaziabad, Uttar Pradesh — Planned · not yet available.",
      ],
      after: [
        "\"Planned\" areas are indicative only and create no commitment as to timing. Coverage within an active area may be partial; the version shown in the app is authoritative.",
      ],
    },
  ],
  closing: ["By using KarmaVer$e, you acknowledge that you have read, understood, and agreed to these Terms & Conditions."],
};

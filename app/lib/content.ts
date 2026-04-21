/**
 * Content model — text extracted from 111group.ae (original site).
 * Only textual/structural content retained; design layout is new.
 */

export const BRAND = {
  name: "111 Group",
  fullName: "Triple One Immigration Services",
  legal: "111Group LLC",
  tagline: "Your trusted partner in legal matters.",
  heroKicker: "Global Mobility · Citizenship · Private Wealth",
  logo: "/brand/logo.gif",
  contact: {
    email: "info@111group.ae",
    phone: "+971 4 000 0000",
    address: "Dubai, United Arab Emirates",
  },
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
  ],
};

export const NAV_LINKS = [
  { label: "Expertise", href: "/#expertise" },
  { label: "About", href: "/#about" },
  { label: "Global Reach", href: "/#global" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];

/** Investment & mobility programs — the core premium offering. */
export const INVESTMENT_SERVICES = [
  {
    code: "01",
    title: "Citizenship by Investment",
    abbr: "CBI",
    body:
      "Strategic guidance and legal counsel for qualifying individuals seeking second citizenship through recognised investment programs worldwide.",
  },
  {
    code: "02",
    title: "Residence by Investment",
    abbr: "RBI",
    body:
      "Comprehensive assistance for clients pursuing long-term residency through qualifying real estate, fund or enterprise contributions.",
  },
  {
    code: "03",
    title: "Real Estate — Golden Visa",
    abbr: "GV",
    body:
      "Long-term residency secured through qualifying real estate investment. From property selection and due diligence to documentation and government procedure.",
  },
  {
    code: "04",
    title: "Passport Applications",
    abbr: "PP",
    body:
      "Streamlining the complex process of acquiring a second passport through legal and regulated channels.",
  },
  {
    code: "05",
    title: "Visa Applications",
    abbr: "VA",
    body:
      "Navigating the intricacies of visa applications across jurisdictions with a focus on efficiency and compliance.",
  },
  {
    code: "06",
    title: "Post-Citizenship Advisory",
    abbr: "PC",
    body:
      "Continuing counsel after citizenship is granted — tax residency, family inclusion, mobility planning and renewal strategy.",
  },
];

/** Legal practice areas — full-service law firm. */
export const PRACTICE_AREAS = [
  "Alternate Dispute Resolution",
  "Arbitration & Mediation",
  "Competition Law & Anti-Trust",
  "Employment & Administrative Law",
  "Immigration",
  "Intellectual Property",
  "Legal Document Attestation",
  "Personal Data Protection & Privacy Law",
  "Private Wealth & Family Business",
  "Real Estate",
  "Regulatory Compliance & Enforcement",
  "Shipping & Maritime",
  "Tax & Revenue",
  "Technology, Media & Telco",
];

/** Regions of operation — Henley-style global reach signal. */
export const REGIONS = [
  { region: "Middle East", countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Oman"] },
  { region: "Europe", countries: ["Portugal", "Malta", "Cyprus", "Spain", "Greece", "Italy"] },
  { region: "Caribbean", countries: ["St. Kitts & Nevis", "Dominica", "Grenada", "Antigua & Barbuda", "St. Lucia"] },
  { region: "Americas", countries: ["United States", "Canada"] },
  { region: "Asia-Pacific", countries: ["Singapore", "Hong Kong", "New Zealand"] },
];

export const STATS = [
  { value: "18+", label: "Practice Areas" },
  { value: "40+", label: "Jurisdictions Served" },
  { value: "1,200", label: "Successful Applications" },
  { value: "24 / 7", label: "Advisory Availability" },
];

export const INTRO_COPY = {
  about:
    "Are you searching for a legal partner that understands your business? Or looking for someone to receive critical and helpful legal advice? At 111 Legal, we believe in the power of law to solve your most significant challenges — and to help you take on the future.",
  team:
    "Our team holds an in-depth understanding of the local legal and regulatory environment, allowing us to deliver comprehensive, cost-effective and commercial counsel — while ensuring every legal objective is met.",
  uae:
    "The UAE continues to emerge as one of the most competent and lucrative places for building and scaling enterprise. Engaging experienced counsel has become a necessity to ensure businesses operate effectively and with full compliance.",
  tech:
    "We integrate cutting-edge technology with our operation to offer quick and effective legal solutions to clients.",
};

export const FOUNDER = {
  name: "Tony",
  role: "Founding Partner",
  bio: [
    "Global Success in Second Passports & Residency Permits — a proven track record of securing outcomes for clients spanning the globe.",
    "Specialization in CBI / RBI Applications — an unparalleled level of expertise in handling intricate citizenship-by-investment and residence-by-investment matters.",
    "Language Proficiency — fluent in English and Arabic, ensuring a seamless, client-centric approach to legal representation.",
  ],
};

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* ─── Static visa data per destination ───────────────────── */
const VISA_DATA: Record<string, {
  flag: string;
  image: string;
  overview: string;
  visaTypes: {
    type: string;
    duration: string;
    processing: string;
    cost: string;
    renewable: boolean;
    visaFree: string;
    eligibility: string;
    description: string;
    documents: string[];
    notes: string[];
  }[];
  generalDocs: string[];
  advisoryNote: string;
}> = {
  "United Arab Emirates": {
    flag: "/brand/images/country-flags-3d/egypt.png",
    image: "/brand/images/expandable-cards/financial.jpg",
    overview: "The UAE is one of the world's most sought-after destinations for investors, professionals, and families. With no personal income tax, a world-class lifestyle, and strategic global access, the UAE offers several pathways for long-term residency and investment.",
    visaTypes: [
      {
        type: "Golden Visa (10-Year Residency)",
        duration: "10 years (renewable)",
        processing: "30–60 days",
        cost: "AED 2,800–4,000 (govt fees)",
        renewable: true,
        visaFree: "180+ countries with UAE residence",
        eligibility: "Investors, entrepreneurs, specialised talents, outstanding students",
        description: "The UAE Golden Visa is a long-term residence visa that allows foreigners to live, work, and study in the UAE without a national sponsor. It is valid for 10 years and is automatically renewed.",
        documents: ["Valid passport (min 6 months validity)", "UAE entry permit or current residence visa", "Proof of qualifying investment or talent", "Emirates ID (if renewing)", "Property title deed (if real estate investment)", "Trade licence (if business owner)", "Bank statements (last 6 months)", "Medical fitness certificate", "Emirates ID application form"],
        notes: ["Investment threshold: AED 2 million in property or approved fund", "Family members can be sponsored under one application", "No minimum stay requirement to maintain visa validity"],
      },
      {
        type: "Investor Visa (3-Year Residency)",
        duration: "3 years (renewable)",
        processing: "2–4 weeks",
        cost: "AED 1,500–3,000 (govt fees)",
        renewable: true,
        visaFree: "N/A",
        eligibility: "Business owners with registered UAE company or property investors",
        description: "A 3-year residency visa for investors who own a business or property in the UAE. Ideal for those not yet qualifying for the Golden Visa.",
        documents: ["Valid passport", "UAE trade licence or title deed", "Memorandum of Association (if company)", "Passport-sized photos", "Medical fitness certificate", "Emirates ID application"],
        notes: ["Property value must be AED 750,000+", "Business must be active and licensed", "Sponsor/partner may be required for certain business structures"],
      },
      {
        type: "Tourist / Visit Visa",
        duration: "30 or 90 days",
        processing: "3–5 business days",
        cost: "AED 350–1,050",
        renewable: true,
        visaFree: "N/A",
        eligibility: "All nationalities (some exempted — visa on arrival)",
        description: "Short-stay visa for tourism, family visits, or business exploration. Many nationalities receive visa on arrival or visa-free access to the UAE.",
        documents: ["Valid passport (6+ months)", "Passport-sized photo", "Return flight booking", "Hotel reservation or host invitation", "Travel insurance", "Bank statements"],
        notes: ["GCC residents may apply on arrival", "Extendable once for 30 days", "Overstay fines apply — AED 100/day"],
      },
    ],
    generalDocs: ["Passport valid for at least 6 months", "Completed application form", "2 recent passport photos (white background)", "Medical fitness test (MOHAP approved clinic)", "Emirates ID biometrics registration"],
    advisoryNote: "Our UAE advisors are based in Dubai and can accompany you through every government touchpoint — from GDRFA submissions to DIFC entity setup.",
  },
  "Grenada": {
    flag: "/brand/images/country-flags-3d/Grenada.png",
    image: "/brand/images/expandable-cards/citizenship.jpg",
    overview: "Grenada's Citizenship by Investment Programme is one of the Caribbean's most prestigious — uniquely offering access to the US E-2 Investor Visa Treaty. Grenadian passport holders enjoy visa-free travel to 145+ countries including the UK, EU Schengen Area, and China.",
    visaTypes: [
      {
        type: "Citizenship by Investment — National Transformation Fund",
        duration: "Permanent",
        processing: "4–6 months",
        cost: "USD 150,000 (single) / USD 200,000 (family of 4) — non-refundable donation",
        renewable: false,
        visaFree: "145+ countries (UK, Schengen, China)",
        eligibility: "Nationals of non-restricted countries, clean criminal record, min. age 18",
        description: "A non-refundable contribution to Grenada's National Transformation Fund. The fastest and most straightforward route to Grenadian citizenship.",
        documents: ["Certified copy of current passport(s)", "Birth certificate (apostilled)", "Marriage certificate (if applicable)", "Police clearance (from all countries of residence)", "Medical certificate", "Bank reference letter", "Source of funds declaration", "Proof of residential address", "4 passport-sized photos", "Due diligence questionnaire"],
        notes: ["Family members (spouse, dependent children up to 30, parents 55+) can be included", "No residency requirement — no need to visit or live in Grenada", "Dual citizenship fully permitted by Grenada", "US E-2 Investor Visa eligibility — unique benefit"],
      },
      {
        type: "Citizenship by Investment — Real Estate",
        duration: "Permanent",
        processing: "4–6 months",
        cost: "USD 220,000+ in approved real estate project",
        renewable: false,
        visaFree: "145+ countries",
        eligibility: "Investment in pre-approved government projects only",
        description: "Purchase approved real estate in Grenada to qualify for citizenship. Property must be held for a minimum of 5 years.",
        documents: ["All standard CBI documents", "Property purchase agreement", "Proof of investment payment", "Developer confirmation letter", "Title deed (upon completion)"],
        notes: ["Property must be government-approved", "5-year minimum holding period", "Property can be sold after 5 years — citizenship is retained"],
      },
    ],
    generalDocs: ["Valid passport (all countries of citizenship)", "Full certified birth certificate", "Character reference letter", "Proof of professional background (CV / employment letter)", "Sworn declaration of source of funds"],
    advisoryNote: "111 Group is an authorised Grenada CBI agent. We manage the full process including government liaison, due diligence preparation, and post-approval passport delivery.",
  },
  "Jordan": {
    flag: "/brand/images/country-flags-3d/jordan.png",
    image: "/brand/images/country-images/jordan.png",
    overview: "Jordan offers one of the most accessible residency-by-investment programmes in the Arab world. With a stable political environment, growing economy, and strategic location, Jordan is increasingly popular with investors from the GCC, Europe, and the wider MENA region.",
    visaTypes: [
      {
        type: "Residency by Investment",
        duration: "5 years (renewable)",
        processing: "2–4 months",
        cost: "USD 75,000 deposit (refundable after 3 years) or USD 1M+ investment",
        renewable: true,
        visaFree: "50+ countries",
        eligibility: "Investors and their immediate family",
        description: "Jordan's investment residency allows foreign nationals to obtain long-term residence through a qualifying deposit or direct investment. The deposit route is fully refundable.",
        documents: ["Valid passport", "Clean criminal record certificate", "Medical fitness report", "Bank deposit confirmation", "Marriage/family certificates (if applicable)", "Proof of residential address", "2 passport photos"],
        notes: ["Deposit of JD 53,000 (~USD 75K) is fully refundable after 3 years", "Family can be included at no additional investment threshold", "Path to citizenship available after 10 years of legal residence"],
      },
      {
        type: "Tourist / Visit Visa",
        duration: "30 days (extendable)",
        processing: "On arrival or 3–5 business days (e-visa)",
        cost: "JOD 40 (~USD 56) — waived for some nationalities",
        renewable: true,
        visaFree: "N/A",
        eligibility: "Most nationalities",
        description: "Jordan issues visit visas on arrival at all major entry points and through its official e-visa portal. Many nationalities receive free-of-charge visas.",
        documents: ["Valid passport (6+ months)", "Passport-sized photo", "Return ticket", "Hotel reservation", "Sufficient funds proof"],
        notes: ["Visa-on-arrival available at Queen Alia International Airport", "Free visa for holders of US, UK, EU, and GCC residence visas", "Extendable at any police directorate"],
      },
    ],
    generalDocs: ["Valid passport", "Recent passport photo (white background)", "No-objection letter from employer (if employed)", "Proof of health insurance"],
    advisoryNote: "Our Amman-based partners coordinate directly with the Jordan Investment Commission to facilitate expedited residency applications.",
  },
  "Saint Kitts and Nevis": {
    flag: "/brand/images/country-flags-3d/saint-kitts.png",
    image: "/brand/images/country-images/saint-kitts-and-nevis.png",
    overview: "Saint Kitts and Nevis operates the world's oldest Citizenship by Investment Programme (since 1984). Known for its rigorous due diligence and global reputation, the SKN passport grants visa-free access to 157+ countries including the UK, Schengen, and Hong Kong.",
    visaTypes: [
      {
        type: "Citizenship by Investment — Sustainable Island State Contribution",
        duration: "Permanent",
        processing: "45–60 days (Accelerated Application Process)",
        cost: "USD 250,000 (single) / USD 295,000 (family of 4)",
        renewable: false,
        visaFree: "157+ countries",
        eligibility: "Clean background, all nationalities except restricted list",
        description: "The primary and fastest route to SKN citizenship. A direct contribution to the government fund with no investment return — but with lifelong citizenship for the entire family.",
        documents: ["Certified passport copies", "Birth certificates (apostilled)", "Marriage certificate", "Police clearance from all countries of residence/citizenship", "Medical certificate", "Bank reference (6 months)", "Source of funds declaration", "Professional CV", "Notarised photos (6)", "Due diligence forms"],
        notes: ["Accelerated Application Process: 45–60 day approval", "No residency or visit requirement", "Dual citizenship permitted", "Children up to age 25 (in full-time education) included", "Parents/grandparents 65+ can be included at additional cost"],
      },
      {
        type: "Citizenship by Investment — Approved Real Estate",
        duration: "Permanent",
        processing: "3–5 months",
        cost: "USD 400,000+ in pre-approved property",
        renewable: false,
        visaFree: "157+ countries",
        eligibility: "Investment in government-approved project",
        description: "Purchase of approved real estate qualifies for citizenship. Property must be held for a minimum of 7 years.",
        documents: ["All standard CBI documents", "Sale and purchase agreement", "Proof of payment to developer", "Government-approved project confirmation"],
        notes: ["7-year minimum holding period for resale", "Rental income allowed during holding period", "Title deed transferred upon project completion"],
      },
    ],
    generalDocs: ["All passports held (current and previous)", "Full birth certificate with parents' names", "Character reference from professional", "Statutory declaration of source of wealth"],
    advisoryNote: "111 Group is a registered SKN CBI authorised agent. Our legal team has processed over 200 SKN applications with a 100% approval rate.",
  },
  "Antigua and Barbuda": {
    flag: "/brand/images/country-flags-3d/antigua.png",
    image: "/brand/images/country-images/antigua.png",
    overview: "Antigua and Barbuda's Citizenship by Investment Programme offers one of the most affordable entry points to a Caribbean passport. With visa-free travel to 150+ countries and a requirement to visit just once per 5 years, it is highly popular with global investors.",
    visaTypes: [
      {
        type: "Citizenship by Investment — National Development Fund",
        duration: "Permanent",
        processing: "3–5 months",
        cost: "USD 100,000 (single) / USD 125,000 (family up to 4)",
        renewable: false,
        visaFree: "150+ countries",
        eligibility: "18+ years, clean background, non-restricted nationality",
        description: "Non-refundable contribution to the Antigua and Barbuda National Development Fund — the most cost-effective CBI route in the Eastern Caribbean.",
        documents: ["Valid passport (all nationalities held)", "Certified birth certificate", "Marriage certificate (if applicable)", "Police clearance (all countries of residence)", "Medical exam report", "Bank statements (6 months)", "Source of funds declaration", "Professional references (2)", "Passport photos (6)", "Application forms"],
        notes: ["5-year residency visit requirement: 5 days within 5 years", "Dual citizenship permitted", "Siblings and unmarried children up to 26 can be included", "Parents/grandparents 58+ eligible at additional cost"],
      },
      {
        type: "Citizenship by Investment — Real Estate",
        duration: "Permanent",
        processing: "3–5 months",
        cost: "USD 200,000+ in approved project",
        renewable: false,
        visaFree: "150+ countries",
        eligibility: "Investment in government-approved development",
        description: "Qualifying real estate investment in pre-approved projects entitles the investor and family to full citizenship.",
        documents: ["All standard CBI documents", "Property reservation form", "Evidence of payment", "Developer's government approval letter"],
        notes: ["5-year holding period before resale", "Rental income permitted", "Joint investment with co-applicant allowed (min USD 200K each)"],
      },
    ],
    generalDocs: ["Passport copies (all pages)", "National ID (if applicable)", "Employment letter or business registration", "Proof of residential address"],
    advisoryNote: "Our advisors have direct relationships with Antigua's Citizenship by Investment Unit (CIU) and can provide real-time processing updates.",
  },
  "Dominica": {
    flag: "/brand/images/country-flags-3d/dominica.png",
    image: "/brand/images/country-images/dominica.png",
    overview: "The Commonwealth of Dominica has one of the longest-running and most reputable Citizenship by Investment Programmes globally. It consistently ranks among the top 3 programmes for value and due diligence standards.",
    visaTypes: [
      {
        type: "Citizenship by Investment — Economic Diversification Fund",
        duration: "Permanent",
        processing: "3–6 months",
        cost: "USD 100,000 (single) / USD 175,000 (family of 4)",
        renewable: false,
        visaFree: "144+ countries",
        eligibility: "18+ years, no criminal record",
        description: "A government fund contribution providing permanent citizenship — no residency requirement, no visit needed.",
        documents: ["Certified passport", "Birth certificate (apostilled)", "Police clearance", "Medical certificate", "Bank reference letter", "Source of wealth declaration", "Passport photos", "Application forms"],
        notes: ["No residency or visit obligation", "Dual citizenship permitted by Dominica", "Children up to 25 (full-time students) included", "Processing entirely offshore — no travel required"],
      },
    ],
    generalDocs: ["All passports held", "Full birth certificate", "Declaration of good character"],
    advisoryNote: "111 Group coordinates directly with the Dominican Citizenship by Investment Unit for all submissions and status tracking.",
  },
  "Turkey": {
    flag: "/brand/images/country-flags-3d/turkety.png",
    image: "/brand/images/country-images/turkey.png",
    overview: "Turkey's Citizenship by Investment Programme offers one of the most affordable routes to a G20 country passport. With a minimum property investment of just USD 400,000, applicants receive full Turkish citizenship — a Schengen visa-free country with a rapidly growing economy.",
    visaTypes: [
      {
        type: "Citizenship by Investment — Real Estate",
        duration: "Permanent",
        processing: "3–6 months",
        cost: "USD 400,000 minimum real estate purchase",
        renewable: false,
        visaFree: "110+ countries",
        eligibility: "Any nationality (some restrictions apply), investment in Turkish property",
        description: "Purchase of real estate worth USD 400,000+ qualifies for Turkish citizenship. The property must be held for a minimum of 3 years and registered with a 'no-sale' annotation.",
        documents: ["Valid passport", "Title deed (TAPU)", "Sworn translation of passport", "Property valuation report", "Certificate of conformity from local municipality", "Bank transfer receipts", "Criminal record from home country", "4 biometric photos", "Birth certificate", "Marriage certificate (if applicable)"],
        notes: ["3-year minimum holding period on property", "Rental income fully permitted during holding", "Dual citizenship not recognised by Turkey — but widely held in practice", "Family (spouse + children under 18) included at no additional investment"],
      },
      {
        type: "Tourist / e-Visa",
        duration: "30–90 days",
        processing: "Immediate to 3 days",
        cost: "USD 20–50 (varies by nationality)",
        renewable: true,
        visaFree: "N/A",
        eligibility: "Most nationalities via e-visa system",
        description: "Turkey's e-visa system is quick and straightforward. Most nationalities can apply online and receive approval within minutes.",
        documents: ["Valid passport", "Credit/debit card for payment", "Return ticket (recommended)", "Accommodation proof"],
        notes: ["e-Visa available at evisa.gov.tr", "Some nationalities receive free visas", "Multiple-entry options available"],
      },
    ],
    generalDocs: ["Valid passport (6+ months)", "Recent passport photos (biometric)", "Proof of residential address"],
    advisoryNote: "111 Group works with licensed Turkish real estate developers and legal partners to identify qualifying properties and manage the full citizenship application.",
  },
  "Vanuatu": {
    flag: "/brand/images/country-flags-3d/vanuatu.png",
    image: "/brand/images/country-images/vanuatu.png",
    overview: "Vanuatu offers the world's fastest Citizenship by Investment Programme — with approvals in as little as 30 days. A zero-tax jurisdiction with visa-free access to 130+ countries, it is the preferred choice for applicants requiring the quickest second passport.",
    visaTypes: [
      {
        type: "Development Support Programme (DSP)",
        duration: "Permanent",
        processing: "30–60 days",
        cost: "USD 130,000 (single) / USD 180,000 (family of 4)",
        renewable: false,
        visaFree: "130+ countries",
        eligibility: "18+ years, clean background",
        description: "The fastest official citizenship by investment programme in the world. Non-refundable contribution to the Vanuatu government fund with permanent citizenship upon approval.",
        documents: ["Valid passport (apostilled)", "Birth certificate", "Police clearance", "Bank reference letter", "Source of funds declaration", "Medical certificate", "Passport photos (6)", "Application forms"],
        notes: ["No residency or physical presence required", "No tax on income, capital gains, or inheritance", "Dual citizenship fully permitted", "Passport valid for 10 years — renewable"],
      },
    ],
    generalDocs: ["All current and previous passports", "Full birth certificate with parents listed", "Net worth statement"],
    advisoryNote: "Vanuatu is our fastest-processed programme. 111 Group has approved clients in under 45 days using our priority processing track.",
  },
  "Malta": {
    flag: "/brand/images/country-flags-3d/dominica.png",
    image: "/brand/images/expandable-cards/citizenship.jpg",
    overview: "Malta's Citizenship by Naturalisation for Exceptional Services by Direct Investment (CES) is the only EU citizenship by investment programme offering full EU citizenship — including the right to live, work, and travel across all 27 EU member states.",
    visaTypes: [
      {
        type: "Citizenship by Investment — CES Programme",
        duration: "Permanent",
        processing: "12–14 months",
        cost: "EUR 600,000 (after 36 months residency) or EUR 750,000 (after 12 months)",
        renewable: false,
        visaFree: "185+ countries (EU passport)",
        eligibility: "Non-EU nationals, 18+, clean background, financially fit",
        description: "Malta's CES programme grants full EU citizenship through a combination of government contribution, real estate, and philanthropic donation. It is the most premium citizenship programme globally.",
        documents: ["Valid passport (all nationalities)", "Birth certificate (apostilled)", "Marriage/divorce certificates", "Police clearance (all countries of residence in last 10 years)", "Medical certificate", "Source of funds declaration", "Tax returns (last 3 years)", "Bank statements (6 months)", "Reference letters (2 professional)", "Affidavit of good character"],
        notes: ["EUR 10,000 philanthropic donation required", "EUR 700,000+ real estate purchase OR EUR 16,000/year rental for 5 years", "12 or 36 months prior Malta residency required", "Full EU passport — live, work, and study in any EU country"],
      },
    ],
    generalDocs: ["All passports held", "Detailed CV and professional background", "Proof of global residential history (last 10 years)"],
    advisoryNote: "Malta CES is one of our flagship programmes. 111 Group manages the full pre-screening, due diligence, and Malta residency phase prior to naturalisation.",
  },
  "Portugal": {
    flag: "/brand/images/country-flags-3d/dominica.png",
    image: "/brand/images/expandable-cards/legal.jpg",
    overview: "Portugal's Golden Visa remains one of Europe's most popular residency by investment programmes, offering a pathway to EU residency and citizenship in 5 years — with just 7 days minimum stay per year.",
    visaTypes: [
      {
        type: "Golden Visa — Investment Fund",
        duration: "2 years (renewable to 5 years)",
        processing: "6–12 months",
        cost: "EUR 500,000 minimum fund subscription",
        renewable: true,
        visaFree: "Schengen access + 185+ countries after citizenship",
        eligibility: "Non-EU nationals with qualifying investment",
        description: "Investment in approved Portuguese investment funds qualifies for the Golden Visa. After 5 years, applicants can apply for permanent residency or Portuguese citizenship.",
        documents: ["Valid passport", "Clean criminal record certificate", "Proof of investment (fund subscription)", "Portuguese NIF (tax number)", "Portuguese bank account", "Health insurance valid in Portugal", "Proof of residential address", "Biometric data submission at SEF/AIMA"],
        notes: ["7 days minimum stay in year 1, 14 days in subsequent 2-year periods", "Family reunification — spouse, children, parents included", "Citizenship application possible after 5 years of legal residency", "NHR (Non-Habitual Resident) tax regime available"],
      },
    ],
    generalDocs: ["Valid passport", "Criminal record (apostilled)", "Proof of health insurance for Portugal"],
    advisoryNote: "Our Lisbon partners manage NIF registration, bank account setup, and AIMA appointment scheduling — the full Portugal Golden Visa journey.",
  },
};

/* ─── Fallback for destinations not in our data ── */
function getFallbackData(destination: string) {
  return {
    flag: "/brand/images/country-flags-3d/dominica.png",
    image: "/brand/images/expandable-cards/citizenship.jpg",
    overview: `${destination} offers various immigration and residency pathways for foreign nationals. Our advisors can provide detailed, personalised information based on your specific nationality and investment goals.`,
    visaTypes: [
      {
        type: "General Entry Visa",
        duration: "30–90 days",
        processing: "5–15 business days",
        cost: "Varies by nationality",
        renewable: true,
        visaFree: "N/A",
        eligibility: "Varies by nationality",
        description: `Entry visa for ${destination}. Requirements vary significantly by nationality. Our advisors will provide exact requirements for your specific situation.`,
        documents: ["Valid passport (6+ months validity)", "Completed visa application form", "Passport-sized photographs", "Proof of accommodation", "Return flight booking", "Bank statements / proof of funds", "Travel insurance"],
        notes: ["Requirements vary by nationality — consult our advisors for exact details", "Processing times may vary by season", "Embassy appointments may be required"],
      },
    ],
    generalDocs: ["Valid passport", "Passport photos", "Application form"],
    advisoryNote: `Our advisors specialise in ${destination} visa applications and can provide a personalised assessment for your specific nationality and purpose of travel.`,
  };
}

const STATUS_COLORS: Record<string, string> = {
  "Visa Free": "bg-emerald-100 text-emerald-700",
  "Visa on Arrival": "bg-blue-100 text-blue-700",
  "e-Visa": "bg-amber-100 text-amber-700",
  "Visa Required": "bg-red-100 text-red-700",
};

/* ─── Visa access map (nationality → destination → status) ── */
const ACCESS_STATUS: Record<string, Record<string, string>> = {
  British: { "United Arab Emirates": "Visa Free", "Turkey": "e-Visa", "Jordan": "Visa on Arrival", "Grenada": "Visa Free", "Saint Kitts and Nevis": "Visa Free" },
  American: { "United Arab Emirates": "Visa Free", "Turkey": "e-Visa", "Jordan": "Visa on Arrival", "Grenada": "Visa Free" },
  Indian: { "United Arab Emirates": "Visa Required", "Turkey": "e-Visa", "Jordan": "Visa on Arrival", "Grenada": "Visa Required" },
  Egyptian: { "United Arab Emirates": "Visa Required", "Turkey": "e-Visa", "Jordan": "Visa Free", "Grenada": "Visa Required" },
  Jordanian: { "United Arab Emirates": "Visa Free", "Turkey": "Visa Free", "Jordan": "N/A", "Grenada": "Visa Required" },
  Saudi: { "United Arab Emirates": "Visa Free", "Turkey": "Visa Free", "Jordan": "Visa Free", "Grenada": "Visa Free" },
};

function getAccessStatus(nationality: string, destination: string): string {
  return ACCESS_STATUS[nationality]?.[destination] ?? "Visa Required";
}

/* ─── Component ──────────────────────────────────────────── */
export default function VisaResults() {
  const params = useSearchParams();
  const router = useRouter();

  const nationality = params.get("nationality") ?? "";
  const destination = params.get("destination") ?? "";
  const visaType = params.get("visaType") ?? "";
  const purpose = params.get("purpose") ?? "";

  const data = VISA_DATA[destination] ?? getFallbackData(destination);
  const accessStatus = getAccessStatus(nationality, destination);
  const statusStyle = STATUS_COLORS[accessStatus] ?? "bg-gray-100 text-gray-600";

  const filteredTypes = visaType
    ? data.visaTypes.filter((v) => v.type.toLowerCase().includes(visaType.toLowerCase()))
    : data.visaTypes;
  const displayTypes = filteredTypes.length > 0 ? filteredTypes : data.visaTypes;

  return (
    <>
      {/* ── Header breadcrumb bar ── */}
      <section className="bg-bg border-b border-line pt-24 pb-6">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-[0.72rem] text-fg-muted mb-5">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/visa-information" className="hover:text-brand transition-colors">Visa Information</Link>
            <span>/</span>
            <span className="text-fg font-medium">{destination}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-line">
                  <Image src={data.flag} alt={destination} fill className="object-cover" unoptimized />
                </div>
                <h1 className="font-display text-[1.6rem] font-semibold text-fg tracking-tight">
                  {nationality} → {destination}
                </h1>
                <span className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] ${statusStyle}`}>
                  {accessStatus}
                </span>
              </div>
              {(visaType || purpose) && (
                <div className="flex flex-wrap gap-2">
                  {visaType && (
                    <span className="rounded-full bg-bg-elev border border-line px-3 py-1 text-[0.68rem] text-fg-soft">
                      {visaType}
                    </span>
                  )}
                  {purpose && (
                    <span className="rounded-full bg-bg-elev border border-line px-3 py-1 text-[0.68rem] text-fg-soft">
                      {purpose}
                    </span>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-[0.75rem] font-semibold text-[color:var(--color-brand)] hover:gap-3 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Modify Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="bg-bg py-10 pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

            {/* ── Left column ── */}
            <div className="flex flex-col gap-8">

              {/* Overview */}
              <div className="rounded-2xl bg-bg-elev p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-36 w-full overflow-hidden rounded-xl mb-5">
                    <Image src={data.image} alt={destination} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <p className="text-white font-display text-[1.4rem] font-semibold">{destination}</p>
                      <p className="text-white/60 text-[0.72rem] mt-0.5">Visa & Residency Information</p>
                    </div>
                  </div>
                </div>
                <h2 className="font-display text-[1.1rem] font-semibold text-fg mb-3">Overview</h2>
                <p className="text-[0.85rem] text-fg-soft leading-relaxed">{data.overview}</p>
              </div>

              {/* Visa types */}
              {displayTypes.map((v, i) => (
                <div key={i} className="rounded-2xl bg-bg-elev overflow-hidden">
                  {/* Type header */}
                  <div className="bg-[#0A0B0E] dark:bg-bg-soft px-8 py-5 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-[1rem] font-semibold text-white dark:text-fg">{v.type}</h3>
                    <span className="rounded-full bg-[color:var(--color-brand)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white">
                      {v.visaFree} visa-free
                    </span>
                  </div>

                  <div className="p-8 flex flex-col gap-7">
                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: "Duration", value: v.duration },
                        { label: "Processing Time", value: v.processing },
                        { label: "Investment / Cost", value: v.cost },
                        { label: "Renewable", value: v.renewable ? "Yes" : "No" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-bg p-4">
                          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-fg-muted mb-1">{stat.label}</p>
                          <p className="text-[0.82rem] font-semibold text-fg">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-fg-muted mb-2">About this visa</h4>
                      <p className="text-[0.85rem] text-fg-soft leading-relaxed">{v.description}</p>
                    </div>

                    {/* Eligibility */}
                    <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4">
                      <svg className="shrink-0 mt-0.5 text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                      </svg>
                      <div>
                        <p className="text-[0.72rem] font-semibold text-amber-700 mb-0.5">Eligibility</p>
                        <p className="text-[0.78rem] text-amber-700/80">{v.eligibility}</p>
                      </div>
                    </div>

                    {/* Documents checklist */}
                    <div>
                      <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-fg-muted mb-3">Required Documents</h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {v.documents.map((doc, di) => (
                          <div key={di} className="flex items-start gap-2.5">
                            <div className="mt-0.5 w-4 h-4 rounded border-2 border-[color:var(--color-brand)] flex items-center justify-center shrink-0">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <p className="text-[0.78rem] text-fg-soft">{doc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {v.notes.length > 0 && (
                      <div>
                        <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-fg-muted mb-3">Important Notes</h4>
                        <ul className="flex flex-col gap-2">
                          {v.notes.map((note, ni) => (
                            <li key={ni} className="flex items-start gap-2.5 text-[0.78rem] text-fg-soft">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[color:var(--color-brand)] shrink-0" />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* General documents */}
              <div className="rounded-2xl bg-bg-elev p-8">
                <h3 className="font-display text-[1rem] font-semibold text-fg mb-4">General Document Requirements</h3>
                <p className="text-[0.78rem] text-fg-soft mb-4">These documents are typically required for all application types to {destination}:</p>
                <ul className="flex flex-col gap-2">
                  {data.generalDocs.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[0.78rem] text-fg-soft">
                      <svg className="shrink-0 text-[color:var(--color-brand)]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right sidebar ── */}
            <div className="flex flex-col gap-6">

              {/* Advisory card */}
              <div className="rounded-2xl bg-[#0A0B0E] dark:bg-bg-elev p-7 flex flex-col gap-5">
                <div className="w-10 h-10 rounded-full bg-[color:var(--color-brand)] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-[1rem] font-semibold text-white mb-2">Speak to an Advisor</h3>
                  <p className="text-[0.78rem] text-white/60 leading-relaxed">{data.advisoryNote}</p>
                </div>
                <div className="border-t border-white/10" />
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-brand)] py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity"
                >
                  Book Free Consultation
                </a>
                <a
                  href="https://wa.me/97100000000"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3.5 text-[0.75rem] font-semibold text-white/70 hover:border-white/30 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.429a.5.5 0 00.514.571l5.741-1.505A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.031-1.386l-.361-.214-3.741.981.998-3.651-.235-.374A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>

              {/* Processing timeline */}
              <div className="rounded-2xl bg-bg-elev p-7">
                <h3 className="text-[0.82rem] font-semibold text-fg mb-5">Typical Timeline</h3>
                <div className="flex flex-col gap-0">
                  {[
                    { step: "Consultation", time: "Day 1" },
                    { step: "Document Collection", time: "Week 1–2" },
                    { step: "Application Submission", time: "Week 3" },
                    { step: "Government Processing", time: displayTypes[0]?.processing ?? "Varies" },
                    { step: "Approval & Issuance", time: "Final stage" },
                  ].map((s, i, arr) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-[color:var(--color-brand)] shrink-0 mt-1" />
                        {i < arr.length - 1 && <div className="w-px flex-1 bg-line my-1" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-[0.78rem] font-medium text-fg">{s.step}</p>
                        <p className="text-[0.68rem] text-fg-muted">{s.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5">
                <p className="text-[0.68rem] text-amber-700 leading-relaxed">
                  <strong>Disclaimer:</strong> Visa requirements and fees change frequently. This information is for guidance only and was last reviewed by our advisory team. Always confirm current requirements with an official source or our advisors before applying.
                </p>
              </div>

              {/* Search again */}
              <Link
                href="/visa-information"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-bg-elev py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-fg hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
              >
                Search Another Destination
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

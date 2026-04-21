"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "immigration", label: "Immigration & Citizenship" },
  { id: "legal", label: "Legal Advisory" },
  { id: "administrative", label: "Administrative & Utility" },
  { id: "real-estate", label: "Real Estate" },
];

const SERVICES = [
  /* ── Immigration & Citizenship ── */
  {
    id: "cbi",
    category: "immigration",
    icon: "/old-assets/old-brand-assets/CBI_edited.png",
    title: "Citizenship by Investment",
    desc: "Acquire a second passport through a qualifying investment in a government-approved fund or real estate. We manage the full application lifecycle.",
    highlights: ["Caribbean programmes from USD 100K", "EU options available", "Family inclusion", "Visa-free to 150+ countries"],
    tag: "Most Popular",
    href: "/services/citizenship-by-investment",
  },
  {
    id: "rbi",
    category: "immigration",
    icon: "/old-assets/old-brand-assets/Residency%2520by%2520Investment15.png",
    title: "Residency by Investment",
    desc: "Secure long-term residency in your chosen country through real estate, business, or fund investments — without surrendering your current citizenship.",
    highlights: ["UAE Golden Visa", "Portugal NHR", "Greece Golden Visa", "Jordan Residency"],
    tag: null,
    href: "/services/residency-by-investment",
  },
  {
    id: "immigration",
    category: "immigration",
    icon: "/old-assets/old-brand-assets/Immigration8.png",
    title: "Immigration",
    desc: "End-to-end immigration assistance covering visa applications, entry permits, status changes, and long-term residency processing for individuals and families.",
    highlights: ["Family sponsorship", "Employment visas", "Investor visas", "Status renewals"],
    tag: null,
    href: "/services/immigration-services",
  },
  {
    id: "post-citizenship",
    category: "immigration",
    icon: "/old-assets/old-brand-assets/Post%2520Citizenship11.png",
    title: "Post Citizenship",
    desc: "After you receive your new citizenship or residency, 111 Group continues to support you — from banking and relocation to tax optimisation and family integration.",
    highlights: ["Bank account opening", "Relocation support", "Tax residency planning", "Ongoing compliance"],
    tag: null,
    href: "/services/post-citizenship-advisory",
  },
  {
    id: "new-baby-born-citizenship",
    category: "immigration",
    icon: "/old-assets/old-brand-assets/CBI_edited.png",
    title: "New Baby Born Citizenship",
    desc: "Specialised support for newborn citizenship registration, passport processing, and legal documentation based on parental nationality and jurisdiction.",
    highlights: ["Birth registration", "Citizenship filing", "Passport issuance", "Dual nationality guidance"],
    tag: null,
    href: "/services/new-baby-born-citizenship",
  },

  /* ── Legal Advisory ── */
  {
    id: "arbitration",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Arbitration%2520and%2520Mediation2.png",
    title: "Alternate Dispute Resolution (Arbitration & Mediation)",
    desc: "Alternative dispute resolution services for commercial, civil, and investment disputes, including arbitration and mediation led by certified practitioners.",
    highlights: ["International arbitration", "DIFC & ADGM proceedings", "Commercial mediation", "Settlement negotiations"],
    tag: null,
    href: "/services/arbitration-mediation",
  },
  {
    id: "competition",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Competition%2520Law%2520and%2520Anti-Trust4.png",
    title: "Competition Law & Anti-Trust",
    desc: "Advisory and representation on competition law compliance, merger filings, investigations, and anti-trust litigation across GCC and international jurisdictions.",
    highlights: ["Merger clearance", "Cartel investigations", "Dominance & abuse", "Regulatory filings"],
    tag: null,
    href: "/services/competition-law",
  },
  {
    id: "corporate-ma",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Competition%2520Law%2520and%2520Anti-Trust4.png",
    title: "Corporate / M&A",
    desc: "Legal advisory on mergers, acquisitions, joint ventures, restructuring, and cross-border corporate transactions in the UAE and internationally.",
    highlights: ["M&A transactions", "JV structuring", "Share purchase deals", "Corporate restructuring"],
    tag: null,
    href: "/services/corporate-ma",
  },
  {
    id: "employment",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Employment%2520%26%2520Administrative%2520Law7.png",
    title: "Employment & Administrative Law",
    desc: "Comprehensive employment law services covering contracts, terminations, labour disputes, and administrative law proceedings — for both employers and employees.",
    highlights: ["Employment contracts", "MOHRE disputes", "Wrongful termination", "Labour compliance"],
    tag: null,
    href: "/services/employment-law",
  },
  {
    id: "private-wealth",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Private%2520Wealth%2520%26%2520Family%2520Business12.png",
    title: "Private Wealth & Family Business",
    desc: "Bespoke wealth structuring, succession planning, and family governance services designed to preserve and grow multi-generational wealth.",
    highlights: ["Succession planning", "Family constitutions", "Trust structures", "Asset protection"],
    tag: null,
    href: "/services/private-wealth",
  },
  {
    id: "ip",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Intellectual%2520Property9.png",
    title: "Intellectual Property",
    desc: "Registration, protection, and enforcement of trademarks, patents, copyrights, and trade secrets across UAE and international markets.",
    highlights: ["Trademark registration", "Patent filing", "IP enforcement", "Licensing agreements"],
    tag: null,
    href: "/services/intellectual-property",
  },
  {
    id: "data-privacy",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Personal%2520Data%2520Protection%2520%26%2520Privacy%2520law10.png",
    title: "Personal Data Protection & Privacy Law",
    desc: "Advisory on UAE Federal Data Protection Law (PDPL), GDPR compliance, privacy policies, data breach response, and DPO services.",
    highlights: ["PDPL compliance", "GDPR advisory", "Data audits", "Privacy policies"],
    tag: null,
    href: "/services/data-protection",
  },
  {
    id: "regulatory",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Regulatory%2520Compliance%2520%26%2520Enforcement14.png",
    title: "Regulatory Compliance & Enforcement",
    desc: "End-to-end regulatory compliance consulting for businesses operating in the UAE — including licensing, inspections, and enforcement response.",
    highlights: ["Licensing advisory", "Compliance audits", "Enforcement defence", "Regulatory filings"],
    tag: null,
    href: "/services/regulatory-compliance",
  },
  {
    id: "shipping",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Shipping%2520and%2520Maritime16.png",
    title: "Shipping & Maritime Law",
    desc: "Specialised legal services for the maritime and shipping sector, including vessel registration, cargo disputes, charter agreements, and port state control.",
    highlights: ["Vessel registration", "Cargo disputes", "Charter party review", "P&I club advisory"],
    tag: null,
    href: "/services/shipping-maritime",
  },
  {
    id: "tax",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Tax%2520and%2520Revenue17.png",
    title: "Tax & Revenue",
    desc: "Strategic tax planning for individuals and businesses, including VAT compliance, corporate tax advisory, and international tax structuring.",
    highlights: ["UAE corporate tax", "VAT compliance", "International tax", "Transfer pricing"],
    tag: null,
    href: "/services/tax-revenue",
  },
  {
    id: "tech-media",
    category: "legal",
    icon: "/old-assets/old-brand-assets/Technology%2520Media%2520%26%2520Telco18.png",
    title: "Technology, Media & Telco",
    desc: "Legal advisory for technology companies, media entities, and telecom operators — covering contracts, disputes, licensing, and regulatory compliance.",
    highlights: ["SaaS & tech contracts", "Media licensing", "Telco regulation", "Fintech advisory"],
    tag: null,
    href: "/services/technology-media-telco",
  },

  /* ── Administrative & Utility ── */
  {
    id: "document-attestation",
    category: "administrative",
    icon: "/old-assets/old-brand-assets/Legal%2520Document%2520Attestation6.png",
    title: "Document Attestation",
    desc: "Official attestation, apostille, and notarisation services for personal and corporate documents for UAE and international use.",
    highlights: ["MOJ attestation", "MOFA legalisation", "Apostille services", "Certified processing"],
    tag: null,
    href: "/services/document-attestation",
  },
  {
    id: "passport-renewal",
    category: "administrative",
    icon: "/old-assets/old-brand-assets/Passport_edited.png",
    title: "Passport Renewal",
    desc: "End-to-end support for passport renewal applications, document preparation, appointment booking, and submission guidance.",
    highlights: ["Application prep", "Appointment support", "Document review", "Urgent processing"],
    tag: null,
    href: "/services/passport-renewal",
  },
  {
    id: "visa-application",
    category: "administrative",
    icon: "/old-assets/old-brand-assets/Passport_edited.png",
    title: "Visa Application",
    desc: "Professional handling of tourist, business, transit, and long-stay visa applications with compliance-focused documentation support.",
    highlights: ["Tourist visas", "Business visas", "Transit visas", "Long-stay visas"],
    tag: null,
    href: "/services/visa-application",
  },
  {
    id: "translation",
    category: "administrative",
    icon: "/old-assets/old-brand-assets/Legal%2520Document%2520Attestation6.png",
    title: "Translation",
    desc: "Certified legal and official document translation services for immigration, legal, governmental, and corporate requirements.",
    highlights: ["Certified translation", "Legal documents", "Multi-language support", "Fast turnaround"],
    tag: null,
    href: "/services/translation",
  },

  /* ── Real Estate ── */
  {
    id: "real-estate",
    category: "real-estate",
    icon: "/old-assets/old-brand-assets/Real%2520Estate13.png",
    title: "Real Estate Advisory",
    desc: "Expert guidance on residential and commercial real estate transactions in the UAE and internationally — from acquisition strategy to title transfer.",
    highlights: ["Dubai market advisory", "Off-plan purchases", "Commercial properties", "Title deed processing"],
    tag: "Featured",
    href: "/services/real-estate-advisory",
  },
];

export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = SERVICES.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory;
    const q = query.toLowerCase();
    const matchesSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.highlights.some((h) => h.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services-grid" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="eyebrow eyebrow-gold mb-3">Our Services</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
              Everything Under One Roof
            </h2>
          </div>
          <p className="text-[0.85rem] text-fg-soft max-w-xs leading-relaxed">
            {SERVICES.length} specialised practice areas across immigration, legal, administrative, and real estate services.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6 relative max-w-xl">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search services — e.g. citizenship, arbitration, tax…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 rounded-xl bg-bg-elev pl-11 pr-10 text-[0.85rem] text-fg placeholder:text-fg-muted outline-none border border-transparent focus:border-[color:var(--color-brand)] transition-colors shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Category filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition-all ${
                activeCategory === cat.id
                  ? "bg-[color:var(--color-brand)] text-white shadow-sm"
                  : "bg-bg-elev text-fg-soft hover:bg-bg-soft"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        {query && (
          <p className="mb-6 text-[0.78rem] text-fg-muted">
            {filtered.length === 0
              ? `No services found for "${query}"`
              : `${filtered.length} service${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        )}

        {/* Services grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="mb-4 text-fg-muted" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <p className="text-[0.9rem] font-medium text-fg mb-1">No services match your search</p>
            <p className="text-[0.78rem] text-fg-muted mb-5">Try a different keyword or browse by category</p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("all"); }}
              className="rounded-lg border border-line px-5 py-2 text-[0.75rem] font-semibold text-fg hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <Link
              key={s.id}
              href={(s as { href?: string }).href ?? "#contact"}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-black/5 dark:bg-white/6 p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Arrow CTA — top right */}
              <span className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white transition-transform duration-200 group-hover:translate-x-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </span>

              {/* Icon */}
              <div className="mb-5">
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={140}
                  height={140}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-[1.05rem] font-semibold leading-snug text-fg group-hover:text-brand transition-colors">{s.title}</h3>

              {/* Description */}
              <p className="flex-1 text-[0.85rem] leading-relaxed text-fg-soft">{s.desc}</p>
            </Link>
          ))}
        </div>
        )}

      </div>
    </section>
  );
}

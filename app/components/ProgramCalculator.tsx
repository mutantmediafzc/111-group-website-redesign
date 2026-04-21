"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type MemberRole = "Main Applicant" | "Spouse" | "Child" | "Parent" | "Sibling";

interface Member {
  id: number;
  role: MemberRole;
  nationality: string;
  age: string;
}

interface InvestmentOption {
  label: string;
  from: number;
}

interface Program {
  country: string;
  flag: string;
  timeline: string;
  visaFree: string;
  options: InvestmentOption[];
}

// ── Data ───────────────────────────────────────────────────────────────────
const PROGRAMS: Program[] = [
  {
    country: "Grenada",
    flag: "🇬🇩",
    timeline: "4–6 months",
    visaFree: "140+ countries",
    options: [
      { label: "Real Estate Investment", from: 220000 },
      { label: "National Transformation Fund (NTF)", from: 150000 },
    ],
  },
  {
    country: "Dominica",
    flag: "🇩🇲",
    timeline: "4–6 months",
    visaFree: "140+ countries",
    options: [
      { label: "Real Estate Investment", from: 200000 },
      { label: "Economic Diversification Fund (EDF)", from: 100000 },
    ],
  },
  {
    country: "Saint Lucia",
    flag: "🇱🇨",
    timeline: "3–6 months",
    visaFree: "145+ countries",
    options: [
      { label: "Real Estate Investment", from: 300000 },
      { label: "Enterprise Projects", from: 3500000 },
      { label: "Government Bond Investment", from: 500000 },
      { label: "National Economic Fund (NEF)", from: 100000 },
    ],
  },
  {
    country: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    timeline: "4–6 months",
    visaFree: "150+ countries",
    options: [
      { label: "Real Estate Investment", from: 325000 },
      { label: "Sustainable Growth Fund (SGF)", from: 250000 },
      { label: "Public Benefit Option", from: 250000 },
    ],
  },
  {
    country: "Antigua and Barbuda",
    flag: "🇦🇬",
    timeline: "3–5 months",
    visaFree: "150+ countries",
    options: [
      { label: "Real Estate Investment", from: 300000 },
      { label: "National Development Fund (NDF)", from: 100000 },
      { label: "Business Investment", from: 1500000 },
      { label: "University of the West Indies Fund (UWI)", from: 150000 },
    ],
  },
  {
    country: "Vanuatu",
    flag: "🇻🇺",
    timeline: "1–2 months",
    visaFree: "130+ countries",
    options: [
      { label: "Government Fund", from: 130000 },
    ],
  },
  {
    country: "São Tomé and Príncipe",
    flag: "��",
    timeline: "3–5 months",
    visaFree: "70+ countries",
    options: [
      { label: "Single Applicant", from: 50000 },
    ],
  },
];

const NATIONALITIES = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentinian",
  "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahraini", "Bangladeshi",
  "Belarusian", "Belgian", "Bolivian", "Bosnian", "Brazilian", "British", "Bulgarian",
  "Cambodian", "Cameroonian", "Canadian", "Chilean", "Chinese", "Colombian", "Croatian",
  "Cuban", "Czech", "Danish", "Dutch", "Egyptian", "Emirati", "Ethiopian", "Finnish",
  "French", "Georgian", "German", "Ghanaian", "Greek", "Hungarian", "Indian", "Indonesian",
  "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Japanese", "Jordanian", "Kazakhstani",
  "Kenyan", "Korean", "Kuwaiti", "Lebanese", "Libyan", "Malaysian", "Mexican", "Moroccan",
  "Namibian", "Nigerian", "Norwegian", "Omani", "Pakistani", "Palestinian", "Peruvian",
  "Philippine", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Saudi",
  "Serbian", "Singaporean", "South African", "Spanish", "Sri Lankan", "Sudanese",
  "Swedish", "Swiss", "Syrian", "Taiwanese", "Thai", "Tunisian", "Turkish", "Ukrainian",
  "Venezuelan", "Vietnamese", "Yemeni", "Zimbabwean",
];

const ROLES: MemberRole[] = ["Spouse", "Child", "Parent", "Sibling"];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

let nextId = 2;

// ── Component ──────────────────────────────────────────────────────────────
export default function ProgramCalculator() {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, role: "Main Applicant", nationality: "", age: "" },
  ]);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      { id: nextId++, role: "Spouse", nationality: "", age: "" },
    ]);
  };

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMember = (id: number, field: keyof Member, value: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const activeProgram = PROGRAMS.find((p) => p.country === selectedProgram) ?? null;
  const activeOption = activeProgram?.options.find((o) => o.label === selectedOption) ?? null;

  const selectProgram = (country: string) => {
    if (selectedProgram === country) {
      setSelectedProgram(null);
      setSelectedOption(null);
    } else {
      setSelectedProgram(country);
      setSelectedOption(null);
    }
  };

  return (
    <section id="calculator" className="relative bg-bg-elev py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-brand text-sm">✦</span>
            <span className="eyebrow eyebrow-gold tracking-[0.22em]">Program Calculator</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
            Find Your Ideal<br />
            <em className="italic text-brand">Program in Seconds.</em>
          </h2>
          <p className="max-w-md text-[0.9rem] leading-relaxed text-fg-soft">
            Add your family members, select your nationality, and choose a program — we&apos;ll show you your investment estimate.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ── Left: Family + Programs ── */}
          <div className="rounded-2xl bg-bg p-8 flex flex-col gap-8">

            {/* Family Members */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-[1.15rem] font-semibold text-fg">Family Members</h3>
                  <p className="mt-0.5 text-[0.78rem] text-fg-soft">Add all applicants including the main applicant.</p>
                </div>
                <button
                  onClick={addMember}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-brand)] px-3.5 py-2 text-[0.72rem] font-semibold text-[color:var(--color-brand)] hover:bg-[color:var(--color-brand)] hover:text-[#0A0B0E] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  Add Family Member
                </button>
              </div>
              <div className="border-t border-line mb-5" />

              <div className="flex flex-col gap-3">
                {members.map((m) => (
                  <div key={m.id} className={m.role === "Main Applicant" ? "" : "rounded-xl border border-line bg-bg p-4"}>
                    {/* Role label + remove */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[1.15rem] font-semibold text-fg">
                        {m.role}
                      </span>
                      {m.role !== "Main Applicant" && (
                        <button
                          onClick={() => removeMember(m.id)}
                          className="text-fg-muted hover:text-red-500 transition-colors text-[0.72rem]"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Relation — only for non-main */}
                      {m.role !== "Main Applicant" && (
                        <div className="relative">
                          <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none">Relation</label>
                          <select
                            value={m.role}
                            onChange={(e) => updateMember(m.id, "role", e.target.value)}
                            className="w-full h-14 rounded-lg border-0 bg-bg-elev pt-5 pb-0 px-3 text-[0.82rem] font-light text-fg outline-none"
                          >
                            {ROLES.map((r) => <option key={r}>{r}</option>)}
                          </select>
                        </div>
                      )}
                      {/* Nationality */}
                      <div className="relative">
                        <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none">Nationality</label>
                        <select
                          value={m.nationality}
                          onChange={(e) => updateMember(m.id, "nationality", e.target.value)}
                          className="w-full h-14 rounded-lg border-0 bg-bg-elev pt-5 pb-0 px-3 text-[0.82rem] font-light text-fg outline-none"
                        >
                          <option value="">Select country</option>
                          {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                      {/* Age */}
                      <div className="relative">
                        <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none">Age</label>
                        <input
                          type="number"
                          min={0}
                          max={120}
                          placeholder=""
                          value={m.age}
                          onChange={(e) => updateMember(m.id, "age", e.target.value)}
                          className="w-full h-14 rounded-lg border-0 bg-bg-elev pt-5 pb-0 px-3 text-[0.82rem] font-light text-fg outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Choose Program */}
            <div>
              <h3 className="font-display text-[1.15rem] font-semibold text-fg mb-1">Choose Program</h3>
              <p className="text-[0.78rem] text-fg-soft mb-5">Select a country, then pick an investment route.</p>

              <div className="grid grid-cols-2 gap-3">
                {/* Country dropdown */}
                <div className="relative">
                  <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none z-10">Country</label>
                  <select
                    value={selectedProgram ?? ""}
                    onChange={(e) => selectProgram(e.target.value)}
                    className="w-full h-14 rounded-lg border-0 bg-bg-elev pt-5 pb-0 px-3 text-[0.82rem] text-fg outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select country</option>
                    {PROGRAMS.map((p) => (
                      <option key={p.country} value={p.country}>{p.flag} {p.country}</option>
                    ))}
                  </select>
                </div>

                {/* Investment option dropdown */}
                <div className="relative">
                  <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none z-10">Investment Route</label>
                  <select
                    value={selectedOption ?? ""}
                    onChange={(e) => setSelectedOption(e.target.value || null)}
                    disabled={!activeProgram}
                    className="w-full h-14 rounded-lg border-0 bg-bg-elev pt-5 pb-0 px-3 text-[0.82rem] text-fg outline-none appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="">Select route</option>
                    {activeProgram?.options.map((opt) => (
                      <option key={opt.label} value={opt.label}>
                        {opt.label} — From {fmt(opt.from)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* CTA + Advisor */}
            <div className="mt-auto pt-6 border-t border-line grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Left — text + button */}
              <div className="flex flex-col justify-between gap-4">
                <div>
                  <p className="font-semibold text-fg text-[0.9rem]">Not sure where to start?</p>
                  <p className="mt-0.5 text-[0.78rem] text-fg-soft">Book a free consultation with our experts.</p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--color-brand)] px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-brand)] hover:bg-[color:var(--color-brand)] hover:text-[#0A0B0E] transition-colors w-fit whitespace-nowrap"
                >
                  Talk to an Expert
                </a>
              </div>

              {/* Right — Advisor card */}
              <div className="rounded-xl bg-bg-elev p-4 flex flex-col gap-4">
                {/* Advisor info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-bg-soft">
                    <img
                      src="/brand/images/avatar/financial-advisor.jpg"
                      alt="Senior Advisor"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-[0.85rem] font-semibold text-fg leading-tight">Daniel Harman</p>
                    <p className="text-[0.72rem] text-fg-soft leading-snug">Senior Citizenship &amp;<br/>Residency Advisor</p>
                  </div>
                </div>

                {/* Contact icons */}
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-fg-muted mb-2">Contact us your way</p>
                  <div className="flex gap-2">
                    {/* WhatsApp */}
                    <a href="https://wa.me/97100000000" target="_blank" rel="noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-soft hover:bg-bg transition-colors text-fg-soft"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    </a>
                    {/* Telegram */}
                    <a href="https://t.me/111group" target="_blank" rel="noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-soft hover:bg-bg transition-colors text-fg-soft"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </a>
                    {/* Phone */}
                    <a href="tel:+97100000000"
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-soft hover:bg-bg transition-colors text-fg-soft"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Summary ── */}
          <div className="flex flex-col gap-4">

            {/* Selected program summary */}
            {activeProgram && activeOption ? (
              <div className="rounded-2xl bg-[#1C1F22] p-8 text-white shadow-sm">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">Your Selection</div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeProgram.flag}</span>
                  <div>
                    <h4 className="font-display text-[1.3rem] font-semibold leading-tight">{activeProgram.country}</h4>
                    <p className="text-[0.75rem] text-white/50 mt-0.5">{activeOption.label}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-white/5 px-6 py-5 text-center">
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-white/35 mb-2">Estimated Investment</div>
                  <div className="font-display text-[2.4rem] font-semibold text-[color:var(--color-brand)] leading-none">
                    {fmt(activeOption.from)}
                  </div>
                  <div className="mt-1 text-[0.72rem] text-white/35">starting from · subject to family size</div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <div className="text-[0.63rem] uppercase tracking-[0.12em] text-white/35 mb-1">Processing Time</div>
                    <div className="text-[0.9rem] font-semibold">{activeProgram.timeline}</div>
                  </div>
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <div className="text-[0.63rem] uppercase tracking-[0.12em] text-white/35 mb-1">Visa-Free Access</div>
                    <div className="text-[0.9rem] font-semibold">{activeProgram.visaFree}</div>
                  </div>
                </div>

                {/* Applicants summary */}
                {members.some((m) => m.nationality || m.age) && (
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <div className="text-[0.65rem] uppercase tracking-[0.14em] text-white/35 mb-3">Applicants</div>
                    <div className="flex flex-col gap-2">
                      {members.map((m) => (
                        <div key={m.id} className="flex items-center justify-between text-[0.8rem]">
                          <span className="text-white/70">{m.role}{m.nationality ? ` · ${m.nationality}` : ""}</span>
                          <span className="text-white/40">{m.age ? `Age ${m.age}` : "—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href="#contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity"
                >
                  Apply for This Program
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#1C1F22] p-8 text-white shadow-sm flex flex-col items-center justify-center text-center gap-4" style={{ minHeight: "320px" }}>
                <div className="text-5xl opacity-30">🌍</div>
                <div>
                  <p className="text-[1rem] font-semibold text-white/70">Your estimate will appear here</p>
                  <p className="mt-1 text-[0.8rem] text-white/35">Fill in your details and select a program<br/>to see the investment breakdown.</p>
                </div>
              </div>
            )}

            {/* Info cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-bg p-5 shadow-sm">
                <div className="text-2xl mb-3">⚡</div>
                <p className="font-semibold text-fg text-[0.9rem]">Fast-track options available</p>
                <p className="mt-1 text-[0.78rem] text-fg-soft">Some programs offer accelerated processing in as little as 45 days.</p>
              </div>
              <div className="rounded-2xl bg-bg p-5 shadow-sm">
                <div className="text-2xl mb-3">🔒</div>
                <p className="font-semibold text-fg text-[0.9rem]">100% confidential</p>
                <p className="mt-1 text-[0.78rem] text-fg-soft">All enquiries are handled with full discretion by our certified legal team.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

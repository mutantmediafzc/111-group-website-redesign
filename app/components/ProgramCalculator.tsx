"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

// ── Types ──────────────────────────────────────────────────────────────────
type MemberRole = "Main Applicant" | "Spouse" | "Child" | "Parent" | "Sibling";

interface Member {
  id: number;
  role: MemberRole;
  nationality: string;
  age: string;
}

interface Fees {
  dueDiligencePer16: number;
  processingPer18: number;
  oathPer18: number;
  applicationPerApplicant: number;
  passportPer16: number;
}

interface InvestmentOption {
  label: string;
  from: number;
  fees: Fees;
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
      { label: "Real Estate Investment", from: 350000, fees: { dueDiligencePer16: 5000, processingPer18: 1500, oathPer18: 20, applicationPerApplicant: 1500, passportPer16: 350 } },
      { label: "National Transformation Fund (NTF)", from: 150000, fees: { dueDiligencePer16: 5000, processingPer18: 1500, oathPer18: 20, applicationPerApplicant: 1500, passportPer16: 350 } },
    ],
  },
  {
    country: "Dominica",
    flag: "🇩🇲",
    timeline: "4–6 months",
    visaFree: "140+ countries",
    options: [
      { label: "Real Estate Investment", from: 200000, fees: { dueDiligencePer16: 7500, processingPer18: 1000, oathPer18: 0, applicationPerApplicant: 1000, passportPer16: 250 } },
      { label: "Economic Diversification Fund (EDF)", from: 100000, fees: { dueDiligencePer16: 7500, processingPer18: 1000, oathPer18: 0, applicationPerApplicant: 1000, passportPer16: 250 } },
    ],
  },
  {
    country: "Saint Lucia",
    flag: "🇱🇨",
    timeline: "3–6 months",
    visaFree: "145+ countries",
    options: [
      { label: "Real Estate Investment", from: 300000, fees: { dueDiligencePer16: 7500, processingPer18: 2000, oathPer18: 0, applicationPerApplicant: 2000, passportPer16: 500 } },
      { label: "Enterprise Projects", from: 3500000, fees: { dueDiligencePer16: 7500, processingPer18: 2000, oathPer18: 0, applicationPerApplicant: 2000, passportPer16: 500 } },
      { label: "Government Bond Investment", from: 500000, fees: { dueDiligencePer16: 7500, processingPer18: 2000, oathPer18: 0, applicationPerApplicant: 2000, passportPer16: 500 } },
      { label: "National Economic Fund (NEF)", from: 100000, fees: { dueDiligencePer16: 7500, processingPer18: 2000, oathPer18: 0, applicationPerApplicant: 2000, passportPer16: 500 } },
    ],
  },
  {
    country: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    timeline: "4–6 months",
    visaFree: "150+ countries",
    options: [
      { label: "Real Estate Investment", from: 325000, fees: { dueDiligencePer16: 7500, processingPer18: 1000, oathPer18: 0, applicationPerApplicant: 750, passportPer16: 300 } },
      { label: "Sustainable Growth Fund (SGF)", from: 250000, fees: { dueDiligencePer16: 7500, processingPer18: 1000, oathPer18: 0, applicationPerApplicant: 750, passportPer16: 300 } },
      { label: "Public Benefit Option", from: 250000, fees: { dueDiligencePer16: 7500, processingPer18: 1000, oathPer18: 0, applicationPerApplicant: 750, passportPer16: 300 } },
    ],
  },
  {
    country: "Antigua and Barbuda",
    flag: "🇦🇬",
    timeline: "3–5 months",
    visaFree: "150+ countries",
    options: [
      { label: "Real Estate Investment", from: 300000, fees: { dueDiligencePer16: 7500, processingPer18: 1500, oathPer18: 0, applicationPerApplicant: 1500, passportPer16: 300 } },
      { label: "National Development Fund (NDF)", from: 100000, fees: { dueDiligencePer16: 7500, processingPer18: 1500, oathPer18: 0, applicationPerApplicant: 1500, passportPer16: 300 } },
      { label: "Business Investment", from: 1500000, fees: { dueDiligencePer16: 7500, processingPer18: 1500, oathPer18: 0, applicationPerApplicant: 1500, passportPer16: 300 } },
      { label: "University of the West Indies Fund (UWI)", from: 150000, fees: { dueDiligencePer16: 7500, processingPer18: 1500, oathPer18: 0, applicationPerApplicant: 1500, passportPer16: 300 } },
    ],
  },
  {
    country: "Vanuatu",
    flag: "🇻🇺",
    timeline: "1–2 months",
    visaFree: "130+ countries",
    options: [
      { label: "Government Fund", from: 130000, fees: { dueDiligencePer16: 5000, processingPer18: 0, oathPer18: 0, applicationPerApplicant: 2000, passportPer16: 300 } },
    ],
  },
  {
    country: "São Tomé and Príncipe",
    flag: "🇸🇹",
    timeline: "3–5 months",
    visaFree: "70+ countries",
    options: [
      { label: "Single Applicant", from: 50000, fees: { dueDiligencePer16: 3000, processingPer18: 500, oathPer18: 0, applicationPerApplicant: 500, passportPer16: 200 } },
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

/* ── Age Stepper ──────────────────────────────────────────────────────────── */
function AgeStepper({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const num = parseInt(value) || 0;
  const dec = () => onChange(String(Math.max(0, num - 1)));
  const inc = () => onChange(String(Math.min(120, num + 1)));
  return (
    <div className="relative h-14 rounded-lg bg-bg-elev shadow-sm flex items-center overflow-hidden">
      <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none z-10">Age</label>
      <button
        type="button"
        onClick={dec}
        className="absolute left-3 bottom-2 flex h-6 w-6 items-center justify-center rounded-md bg-bg text-fg-muted hover:bg-[color:var(--color-brand)] hover:text-white transition-all text-sm font-bold leading-none"
      >−</button>
      <input
        type="number"
        min={0}
        max={120}
        value={value}
        onChange={(e) => {
          const v = Math.min(120, Math.max(0, parseInt(e.target.value) || 0));
          onChange(String(v));
        }}
        className="w-full h-full bg-transparent pt-5 pb-1 text-center text-[0.9rem] font-semibold text-fg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="—"
      />
      <button
        type="button"
        onClick={inc}
        className="absolute right-3 bottom-2 flex h-6 w-6 items-center justify-center rounded-md bg-bg text-fg-muted hover:bg-[color:var(--color-brand)] hover:text-white transition-all text-sm font-bold leading-none"
      >+</button>
    </div>
  );
}

/* ── Count-up hook ────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 700) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else { fromRef.current = target; setDisplay(target); }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return display;
}

/* ── Dynamic trust signals ────────────────────────────────────────────────── */
const TRUST_SIGNALS: Record<string, { icon: string; title: string; body: string }[]> = {
  Vanuatu: [
    { icon: "⚡", title: "30–60 day processing", body: "Vanuatu is the world's fastest CBI program — passport in hand within 60 days." },
    { icon: "🔒", title: "100% confidential", body: "All enquiries are handled with full discretion by our certified legal team." },
  ],
  Dominica: [
    { icon: "🏆", title: "Ranked #1 for value", body: "Dominica is consistently ranked the best-value CBI program by the IMI Index." },
    { icon: "🔒", title: "100% confidential", body: "All enquiries are handled with full discretion by our certified legal team." },
  ],
  Grenada: [
    { icon: "🇺🇸", title: "US E-2 Treaty access", body: "Grenada is the only Caribbean passport that unlocks the US E-2 Treaty Investor Visa." },
    { icon: "🔒", title: "100% confidential", body: "All enquiries are handled with full discretion by our certified legal team." },
  ],
  default: [
    { icon: "⚡", title: "Fast-track options available", body: "Some programs offer accelerated processing in as little as 45 days." },
    { icon: "🔒", title: "100% confidential", body: "All enquiries are handled with full discretion by our certified legal team." },
  ],
};

/* ── Step indicator ───────────────────────────────────────────────────────── */
function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Family" },
    { n: 2, label: "Program" },
    { n: 3, label: "Results" },
  ];
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold transition-all duration-300 ${
            step >= s.n
              ? "bg-[color:var(--color-brand)] text-white"
              : "bg-bg-elev text-fg-muted"
          }`}>
            <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem] font-bold ${step >= s.n ? "bg-white/20" : "bg-bg-soft"}`}>{s.n}</span>
            {s.label}
          </div>
          {i < steps.length - 1 && (
            <div className={`hidden sm:block h-px w-6 transition-all duration-300 ${step > s.n ? "bg-[color:var(--color-brand)]" : "bg-line"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function ProgramCalculator() {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, role: "Main Applicant", nationality: "", age: "" },
  ]);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalMounted, setModalMounted] = useState(false);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Mobile results modal
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"results" | "contact">("results");
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setModalMounted(true); }, []);

  const openMobileModal = useCallback(() => {
    const { gsap } = require("gsap");
    setMobileView("results");
    setMobileModalOpen(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      gsap.set(mobileOverlayRef.current, { display: "flex" });
      gsap.fromTo(mobileOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(mobileContentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", delay: 0.05 });
    });
  }, []);

  const closeMobileModal = useCallback(() => {
    const { gsap } = require("gsap");
    gsap.to(mobileContentRef.current, { opacity: 0, y: 30, duration: 0.22, ease: "power3.in" });
    gsap.to(mobileOverlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in", delay: 0.1, onComplete: () => {
      gsap.set(mobileOverlayRef.current, { display: "none" });
      document.body.style.overflow = "";
      setMobileModalOpen(false);
    }});
  }, []);

  const openModal = useCallback(() => {
    const { gsap } = require("gsap");
    document.body.style.overflow = "hidden";
    gsap.set(modalOverlayRef.current, { display: "flex" });
    gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(modalContentRef.current, { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 });
  }, []);

  const closeModal = useCallback(() => {
    const { gsap } = require("gsap");
    gsap.to(modalContentRef.current, { opacity: 0, scale: 0.95, y: 12, duration: 0.25, ease: "power3.in" });
    gsap.to(modalOverlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", delay: 0.1, onComplete: () => {
      gsap.set(modalOverlayRef.current, { display: "none" });
      document.body.style.overflow = "";
    }});
  }, []);

  const addMember = () =>
    setMembers((prev) => [...prev, { id: nextId++, role: "Spouse", nationality: "", age: "" }]);

  const removeMember = (id: number) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  const updateMember = (id: number, field: keyof Member, value: string) =>
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));

  const activeProgram = PROGRAMS.find((p) => p.country === selectedProgram) ?? null;
  const activeOption = activeProgram?.options.find((o) => o.label === selectedOption) ?? null;

  const selectProgram = (country: string) => {
    setSelectedProgram(country || null);
    setSelectedOption(null);
  };

  const reset = () => {
    setMembers([{ id: 1, role: "Main Applicant", nationality: "", age: "" }]);
    setSelectedProgram(null);
    setSelectedOption(null);
    setPulse(false);
    nextId = 2;
  };

  /* Pulse on estimate change */
  const prevEstimate = useRef<number | null>(null);
  useEffect(() => {
    if (!activeOption) return;
    if (prevEstimate.current !== null && prevEstimate.current !== activeOption.from) {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }
    prevEstimate.current = activeOption.from;
  }, [activeOption]);

  const animatedValue = useCountUp(activeOption?.from ?? 0);

  /* Step derived from state */
  const step: 1 | 2 | 3 = activeProgram && activeOption ? 3 : selectedProgram ? 2 : 1;

  const trustSignals = TRUST_SIGNALS[selectedProgram ?? "default"] ?? TRUST_SIGNALS.default;

  /* ── Fee calculation ──────────────────────────────────────── */
  const calcFees = useCallback(() => {
    if (!activeOption) return null;
    const f = activeOption.fees;
    const age16plus = members.filter(m => parseInt(m.age) >= 16).length;
    const age18plus = members.filter(m => parseInt(m.age) >= 18).length;
    const total = members.length;

    const ddFee     = f.dueDiligencePer16 * age16plus;
    const procFee   = f.processingPer18   * age18plus;
    const oathFee   = f.oathPer18         * age18plus;
    const appFee    = f.applicationPerApplicant * total;
    const stage1    = ddFee + procFee + oathFee + appFee;

    const passportFee = f.passportPer16 * age16plus;
    const stage2Total = activeOption.from + passportFee;

    const grandTotal = stage1 + stage2Total;

    return {
      stage1Items: [
        { label: `Due Diligence Fee (per person 16+) × ${age16plus}`, val: ddFee },
        { label: `Processing Fee (per person 18+) × ${age18plus}`, val: procFee },
        ...(oathFee > 0 ? [{ label: `Oath of Allegiance (per person 18+) × ${age18plus}`, val: oathFee }] : []),
        { label: `Application Fee (per applicant) × ${total}`, val: appFee },
      ].filter(i => i.val > 0),
      stage1,
      stage2Items: [
        { label: "Investment Amount", val: activeOption.from },
        { label: `Passport Fee (per person 16+) × ${age16plus}`, val: passportFee },
      ].filter(i => i.val > 0),
      stage2Total,
      grandTotal,
    };
  }, [activeOption, members]);

  const feeBreakdown = calcFees();

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

          {/* ── Left: Family + Programs + Advisor ── */}
          <div className="flex flex-col gap-4">
          <div className="relative rounded-2xl bg-bg flex flex-col overflow-hidden shadow-md">

            {/* Scrollable inner content */}
            <div className="flex flex-col gap-8 p-8 flex-1">

            {/* Step indicator + Reset */}
            <div className="flex flex-col items-center gap-2">
              <StepIndicator step={step} />
              {(step > 1 || members[0].nationality || members[0].age) && (
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.7rem] font-medium text-fg-muted hover:text-fg hover:bg-bg-elev transition-all group"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-180 transition-transform duration-300"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Reset
                </button>
              )}
            </div>

            {/* ① Family Members */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-brand)]/15 text-[color:var(--color-brand)] text-[0.65rem] font-bold shrink-0">1</span>
                <h3 className="font-display text-[1.1rem] font-semibold text-fg">Family Members</h3>
              </div>
              <p className="ml-9 text-[0.76rem] text-fg-soft mb-5">Add all applicants including the main applicant.</p>

              <div className="flex flex-col gap-3">
                {members.map((m, idx) => (
                  <div
                    key={m.id}
                    className={`transition-all duration-300 animate-in slide-in-from-top-2 fade-in ${
                      m.role === "Main Applicant" ? "rounded-xl border border-line bg-bg p-4" : "rounded-xl border border-line bg-bg p-4"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.8rem] font-semibold text-fg">{m.role}</span>
                        {m.role === "Main Applicant" && (
                          <span className="rounded-full bg-[color:var(--color-brand)]/10 px-2 py-0.5 text-[0.58rem] font-semibold text-[color:var(--color-brand)] uppercase tracking-wide">Primary</span>
                        )}
                      </div>
                      {m.role !== "Main Applicant" && (
                        <button
                          onClick={() => removeMember(m.id)}
                          className="flex items-center gap-1 text-fg-muted hover:text-red-400 transition-colors text-[0.7rem] group"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:scale-110 transition-transform"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {m.role !== "Main Applicant" && (
                        <div className="relative">
                          <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none">Relation</label>
                          <select
                            value={m.role}
                            onChange={(e) => updateMember(m.id, "role", e.target.value)}
                            className="w-full h-14 rounded-lg border-0 bg-bg-elev shadow-sm pt-5 pb-0 px-3 text-[0.82rem] font-light text-fg outline-none cursor-pointer"
                          >
                            {ROLES.map((r) => <option key={r}>{r}</option>)}
                          </select>
                        </div>
                      )}
                      <div className={`relative ${m.role === "Main Applicant" ? "col-span-1" : ""}`}>
                        <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none z-10">Nationality</label>
                        <select
                          value={m.nationality}
                          onChange={(e) => updateMember(m.id, "nationality", e.target.value)}
                          className="w-full h-14 rounded-lg border-0 bg-bg-elev shadow-sm pt-5 pb-0 px-3 text-[0.82rem] font-light text-fg outline-none cursor-pointer"
                        >
                          <option value="">Select…</option>
                          {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                      <AgeStepper
                        value={m.age}
                        onChange={(v) => updateMember(m.id, "age", v)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline add member CTA */}
              <button
                onClick={addMember}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-line hover:border-[color:var(--color-brand)] hover:bg-[color:var(--color-brand)]/5 py-3 text-[0.76rem] font-semibold text-fg-muted hover:text-[color:var(--color-brand)] transition-all group"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-90 transition-transform duration-200"><path d="M12 5v14M5 12h14"/></svg>
                Add Family Member
              </button>
            </div>

            {/* ② Choose Program */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-brand)]/15 text-[color:var(--color-brand)] text-[0.65rem] font-bold shrink-0">2</span>
                <h3 className="font-display text-[1.1rem] font-semibold text-fg">Choose Program</h3>
              </div>
              <p className="ml-9 text-[0.76rem] text-fg-soft mb-5">Select a country, then pick an investment route.</p>

              {/* Country dropdown */}
              <div className="relative mb-3">
                <label className="absolute left-3 top-2.5 text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted pointer-events-none z-10">Country</label>
                <select
                  value={selectedProgram ?? ""}
                  onChange={(e) => selectProgram(e.target.value)}
                  className="w-full h-14 rounded-lg border-0 bg-bg-elev shadow-sm pt-5 pb-0 px-3 text-[0.82rem] text-fg outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select country</option>
                  {PROGRAMS.map((p) => (
                    <option key={p.country} value={p.country}>{p.flag} {p.country}</option>
                  ))}
                </select>
              </div>

              {/* Route cards — full width, no truncation */}
              {activeProgram && (
                <div className="flex flex-col gap-2">
                  <label className="text-[0.6rem] font-light uppercase tracking-[0.08em] text-fg-muted">Investment Route</label>
                  {activeProgram.options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedOption(opt.label)}
                      className={`w-full flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all ${
                        selectedOption === opt.label
                          ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/8"
                          : "border-line bg-bg-elev hover:border-[color:var(--color-brand)]/40"
                      }`}
                    >
                      <span className={`text-[0.82rem] font-medium ${selectedOption === opt.label ? "text-fg" : "text-fg-soft"}`}>{opt.label}</span>
                      <span className={`text-[0.78rem] font-semibold shrink-0 ml-3 ${selectedOption === opt.label ? "text-[color:var(--color-brand)]" : "text-fg-muted"}`}>
                        from {fmt(opt.from)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            </div>{/* end inner content */}

            {/* Mobile: Calculate sticky CTA — hidden on lg+ */}
            {activeOption && (
              <div className="lg:hidden px-6 pb-6">
                <button
                  type="button"
                  onClick={openMobileModal}
                  className="relative w-full overflow-hidden rounded-xl bg-[color:var(--color-brand)] py-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white flex items-center justify-center gap-2 group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  View My Estimate
                </button>
              </div>
            )}
          </div>{/* end main card */}

            {/* CTA + Advisor — separate card below */}
            <div className="rounded-2xl bg-white border border-line shadow-md px-8 py-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              <div className="rounded-xl bg-white border border-line p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-bg-soft">
                    <img src="/brand/images/avatar/financial-advisor.jpg" alt="Senior Advisor" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div>
                    <p className="text-[0.85rem] font-semibold text-fg leading-tight">Daniel Harman</p>
                    <p className="text-[0.72rem] text-fg-soft leading-snug">Senior Citizenship &amp;<br/>Residency Advisor</p>
                  </div>
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-fg-muted mb-2">Contact us your way</p>
                  <div className="flex gap-2">
                    <a href="https://wa.me/97100000000" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-soft hover:bg-bg transition-colors text-fg-soft">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </a>
                    <a href="https://t.me/111group" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-soft hover:bg-bg transition-colors text-fg-soft">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </a>
                    <a href="tel:+97100000000" className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-soft hover:bg-bg transition-colors text-fg-soft">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* end left column wrapper */}

          {/* ── Right: Summary (desktop only) ── */}
          <div className="hidden lg:flex flex-col gap-4">

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

                {/* Total estimate */}
                <div className={`relative mt-6 rounded-xl bg-white/5 px-6 py-5 text-center transition-all duration-300 ${pulse ? "ring-2 ring-[color:var(--color-brand)] bg-[color:var(--color-brand)]/10" : ""}`}>
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-white/35 mb-2">Total Estimated Cost</div>
                  <div className="font-display text-[2.4rem] font-semibold text-[color:var(--color-brand)] leading-none tabular-nums">
                    {feeBreakdown ? fmt(feeBreakdown.grandTotal) : fmt(animatedValue)}
                  </div>
                  <div className="mt-1 text-[0.72rem] text-white/35">all fees included · based on {members.length} applicant{members.length > 1 ? "s" : ""}</div>
                  {pulse && (
                    <div className="absolute top-2 right-3 flex items-center gap-1 text-[0.6rem] font-semibold text-[color:var(--color-brand)] animate-pulse">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)]" />
                      Updated
                    </div>
                  )}
                </div>

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <div className="text-[0.63rem] uppercase tracking-[0.12em] text-white/35 mb-1">Processing Time</div>
                    <div className="text-[0.88rem] font-semibold">{activeProgram.timeline}</div>
                  </div>
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <div className="text-[0.63rem] uppercase tracking-[0.12em] text-white/35 mb-1">Visa-Free Access</div>
                    <div className="text-[0.88rem] font-semibold">{activeProgram.visaFree}</div>
                  </div>
                </div>

                {/* Stage 1 — Mandatory Fees */}
                {feeBreakdown && (
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <div className="text-[0.65rem] uppercase tracking-[0.14em] text-white/35 mb-3">Stage 1 — Mandatory Fees</div>
                    <div className="flex flex-col gap-1.5 mb-3">
                      {feeBreakdown.stage1Items.map((item) => (
                        <div key={item.label} className="flex items-start justify-between gap-3">
                          <span className="text-[0.75rem] text-white/55 leading-snug">{item.label}</span>
                          <span className="text-[0.75rem] font-semibold text-white/80 shrink-0">{fmt(item.val)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                      <span className="text-[0.72rem] font-semibold text-white/50">Stage 1 Total</span>
                      <span className="text-[0.78rem] font-bold text-white">{fmt(feeBreakdown.stage1)}</span>
                    </div>
                  </div>
                )}

                {/* Stage 2 — Investment Cost */}
                {feeBreakdown && (
                  <div className="mt-4 border-t border-white/10 pt-5">
                    <div className="text-[0.65rem] uppercase tracking-[0.14em] text-white/35 mb-3">Stage 2 — Investment Cost</div>
                    <div className="flex flex-col gap-1.5 mb-3">
                      {feeBreakdown.stage2Items.map((item) => (
                        <div key={item.label} className="flex items-start justify-between gap-3">
                          <span className="text-[0.75rem] text-white/55 leading-snug">{item.label}</span>
                          <span className="text-[0.75rem] font-semibold text-white/80 shrink-0">{fmt(item.val)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                      <span className="text-[0.72rem] font-semibold text-white/50">Stage 2 Total</span>
                      <span className="text-[0.78rem] font-bold text-white">{fmt(feeBreakdown.stage2Total)}</span>
                    </div>
                  </div>
                )}

                {/* Grand total bar */}
                {feeBreakdown && (
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-[color:var(--color-brand)]/15 border border-[color:var(--color-brand)]/30 px-4 py-3">
                    <span className="text-[0.78rem] font-bold text-[color:var(--color-brand)]">Grand Total</span>
                    <span className="font-display text-[1.15rem] font-bold text-[color:var(--color-brand)] tabular-nums">{fmt(feeBreakdown.grandTotal)}</span>
                  </div>
                )}

                {/* Applicants */}
                {members.some((m) => m.nationality || m.age) && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="text-[0.65rem] uppercase tracking-[0.14em] text-white/35 mb-2">Applicants</div>
                    <div className="flex flex-col gap-1.5">
                      {members.map((m) => (
                        <div key={m.id} className="flex items-center justify-between text-[0.78rem]">
                          <span className="text-white/60">{m.role}{m.nationality ? ` · ${m.nationality}` : ""}</span>
                          <span className="text-white/35">{m.age ? `Age ${m.age}` : "—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA with shimmer */}
                <button
                  type="button"
                  onClick={openModal}
                  className="relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                  Apply for This Program
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#1C1F22] p-8 text-white shadow-sm flex flex-col items-center justify-center text-center gap-5" style={{ minHeight: "320px" }}>
                {/* Animated progress hint */}
                <div className="flex items-center gap-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className={`h-1.5 rounded-full transition-all duration-500 ${
                      (n === 1 && step >= 1) || (n === 2 && step >= 2) || (n === 3 && step >= 3)
                        ? "bg-[color:var(--color-brand)] w-8"
                        : "bg-white/10 w-5"
                    }`} />
                  ))}
                </div>
                <div className="text-5xl opacity-20">🌍</div>
                <div>
                  <p className="text-[1rem] font-semibold text-white/70">
                    {step === 1 ? "Start with your family details" : step === 2 ? "Now pick your program & route" : "Your estimate will appear here"}
                  </p>
                  <p className="mt-1 text-[0.8rem] text-white/35">
                    {step === 1 ? "Fill in nationality and ages above." : step === 2 ? "Select a country and an investment route." : "Fill in your details and select a program."}
                  </p>
                </div>
              </div>
            )}

            {/* ── Application Modal ── */}
          {modalMounted && createPortal(
            <div
              ref={modalOverlayRef}
              className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
              <div
                ref={modalContentRef}
                className="relative flex w-full max-w-[860px] overflow-hidden rounded-2xl shadow-2xl"
                style={{ maxHeight: "90vh" }}
              >
                {/* Left image panel */}
                <div className="relative hidden md:flex w-[42%] shrink-0 flex-col overflow-hidden bg-[#111316]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeProgram ? `/brand/images/country-images/${activeProgram.country.toLowerCase().replace(/ /g, "-").replace(/[^a-z-]/g, "")}.png` : "/brand/images/avatar/cta.jpg"}
                    alt={activeProgram?.country ?? "Destination"}
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/brand/images/avatar/cta.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="relative mt-auto p-8">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-3xl">{activeProgram?.flag}</span>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/50">{activeProgram?.country}</span>
                    </div>
                    <h3 className="text-[1.35rem] font-semibold leading-snug text-white">
                      Your Future,<br />Without Borders.
                    </h3>
                    <p className="mt-2 text-[0.78rem] text-white/50 leading-relaxed">
                      {activeOption?.label} · {activeProgram?.timeline} processing
                    </p>
                  </div>
                </div>

                {/* Right form panel */}
                <div className="flex flex-1 flex-col overflow-y-auto bg-[#1C1F22] px-8 py-10">
                  <button
                    onClick={closeModal}
                    aria-label="Close"
                    className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>

                  <div className="mb-7">
                    <h2 className="text-[1.6rem] font-semibold leading-tight text-white">Apply for This Program</h2>
                    <p className="mt-1.5 text-[0.8rem] font-light text-white/45 leading-relaxed">
                      Our advisors will contact you within 24 hours to begin your application.
                    </p>
                  </div>

                  {/* Pre-filled program summary */}
                  {activeProgram && activeOption && (
                    <div className="mb-5 rounded-xl bg-white/5 border border-white/8 px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/35 mb-0.5">Selected Program</p>
                        <p className="text-[0.88rem] font-semibold text-white">{activeProgram.flag} {activeProgram.country} — {activeOption.label}</p>
                      </div>
                      <span className="text-[0.82rem] font-bold text-[color:var(--color-brand)] shrink-0 ml-4">{feeBreakdown ? fmt(feeBreakdown.grandTotal) : fmt(activeOption.from)}</span>
                    </div>
                  )}

                  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                    {/* Name row */}
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input type="text" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent peer" />
                        <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">First Name</label>
                      </div>
                      <div className="relative flex-1">
                        <input type="text" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent peer" />
                        <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Last Name</label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input type="email" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent peer" />
                      <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Email Address</label>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-2">
                      <div className="relative w-[140px] shrink-0">
                        <select defaultValue="+971" className="h-full w-full appearance-none rounded-lg border border-white/10 bg-white px-3 pb-3 pt-6 text-[0.85rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all cursor-pointer">
                          {[{code:"+971",name:"🇦🇪 UAE"},{code:"+1",name:"🇺🇸 USA"},{code:"+44",name:"🇬🇧 UK"},{code:"+966",name:"🇸🇦 KSA"},{code:"+91",name:"🇮🇳 India"},{code:"+92",name:"🇵🇰 Pakistan"}].map(c => (
                            <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                          ))}
                        </select>
                        <span className="absolute left-3 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Code</span>
                      </div>
                      <div className="relative flex-1">
                        <input type="tel" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent peer" />
                        <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Mobile Number</label>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea rows={3} placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent resize-none peer" />
                      <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Message (optional)</label>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85"
                    >
                      Submit Application
                    </button>
                  </form>

                  <p className="mt-5 text-center text-[0.74rem] font-light text-white/30">
                    By submitting you agree to our{" "}
                    <a href="/privacy" className="underline underline-offset-2 hover:text-white/60 transition-colors">Privacy Policy</a>.
                    All enquiries are 100% confidential.
                  </p>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* ── Mobile Results Modal ── */}
          {modalMounted && createPortal(
            <div
              ref={mobileOverlayRef}
              className="fixed inset-0 z-[210] hidden items-end justify-center bg-black/70 backdrop-blur-sm"
            >
              <div
                ref={mobileContentRef}
                className="relative w-full max-w-lg rounded-t-2xl bg-[#1C1F22] text-white overflow-y-auto"
                style={{ maxHeight: "88vh" }}
              >
                {/* Handle + close */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/8">
                  <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                    {mobileView === "results" ? "Your Estimate" : "Contact Us"}
                  </p>
                  <button onClick={closeMobileModal} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors ml-auto">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>

                {mobileView === "results" && feeBreakdown && activeProgram && activeOption ? (
                  <div className="px-6 py-5 flex flex-col gap-4">
                    {/* Program header */}
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activeProgram.flag}</span>
                      <div>
                        <p className="font-semibold text-white text-[1rem]">{activeProgram.country}</p>
                        <p className="text-[0.74rem] text-white/45">{activeOption.label}</p>
                      </div>
                    </div>

                    {/* Total */}
                    <div className={`rounded-xl bg-white/5 px-5 py-4 text-center ${pulse ? "ring-2 ring-[color:var(--color-brand)]" : ""}`}>
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/35 mb-1">Total Estimated Cost</p>
                      <p className="font-display text-[2rem] font-semibold text-[color:var(--color-brand)] tabular-nums">{fmt(feeBreakdown.grandTotal)}</p>
                      <p className="text-[0.7rem] text-white/30 mt-0.5">all fees · {members.length} applicant{members.length > 1 ? "s" : ""}</p>
                    </div>

                    {/* Stage 1 */}
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.14em] text-white/35 mb-2">Stage 1 — Mandatory Fees</p>
                      <div className="flex flex-col gap-1.5">
                        {feeBreakdown.stage1Items.map(item => (
                          <div key={item.label} className="flex items-start justify-between gap-2">
                            <span className="text-[0.73rem] text-white/50 leading-snug">{item.label}</span>
                            <span className="text-[0.73rem] font-semibold text-white/75 shrink-0">{fmt(item.val)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between rounded-lg bg-white/5 px-3 py-2">
                        <span className="text-[0.7rem] font-semibold text-white/40">Stage 1 Total</span>
                        <span className="text-[0.75rem] font-bold text-white">{fmt(feeBreakdown.stage1)}</span>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.14em] text-white/35 mb-2">Stage 2 — Investment Cost</p>
                      <div className="flex flex-col gap-1.5">
                        {feeBreakdown.stage2Items.map(item => (
                          <div key={item.label} className="flex items-start justify-between gap-2">
                            <span className="text-[0.73rem] text-white/50 leading-snug">{item.label}</span>
                            <span className="text-[0.73rem] font-semibold text-white/75 shrink-0">{fmt(item.val)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between rounded-lg bg-white/5 px-3 py-2">
                        <span className="text-[0.7rem] font-semibold text-white/40">Stage 2 Total</span>
                        <span className="text-[0.75rem] font-bold text-white">{fmt(feeBreakdown.stage2Total)}</span>
                      </div>
                    </div>

                    {/* Grand total */}
                    <div className="flex items-center justify-between rounded-xl bg-[color:var(--color-brand)]/15 border border-[color:var(--color-brand)]/30 px-4 py-3">
                      <span className="text-[0.78rem] font-bold text-[color:var(--color-brand)]">Grand Total</span>
                      <span className="font-display text-[1.1rem] font-bold text-[color:var(--color-brand)] tabular-nums">{fmt(feeBreakdown.grandTotal)}</span>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => setMobileView("contact")}
                      className="w-full rounded-xl bg-[color:var(--color-brand)] py-4 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity"
                    >
                      Apply for This Program →
                    </button>
                    <p className="text-center text-[0.7rem] text-white/25 pb-2">Tap above to begin your application</p>
                  </div>
                ) : mobileView === "contact" ? (
                  <div className="px-6 py-5 flex flex-col gap-4">
                    {/* Back */}
                    <button type="button" onClick={() => setMobileView("results")} className="flex items-center gap-1.5 text-[0.72rem] text-white/40 hover:text-white/70 transition-colors w-fit">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                      Back to estimate
                    </button>

                    {/* Program pill */}
                    {activeProgram && activeOption && (
                      <div className="rounded-xl bg-white/5 border border-white/8 px-4 py-3 flex items-center justify-between">
                        <p className="text-[0.82rem] font-semibold text-white">{activeProgram.flag} {activeProgram.country} — {activeOption.label}</p>
                        <span className="text-[0.78rem] font-bold text-[color:var(--color-brand)] shrink-0 ml-3">{feeBreakdown ? fmt(feeBreakdown.grandTotal) : fmt(activeOption.from)}</span>
                      </div>
                    )}

                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input type="text" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent" />
                          <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">First Name</label>
                        </div>
                        <div className="relative flex-1">
                          <input type="text" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent" />
                          <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Last Name</label>
                        </div>
                      </div>
                      <div className="relative">
                        <input type="email" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent" />
                        <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Email Address</label>
                      </div>
                      <div className="relative">
                        <input type="tel" placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent" />
                        <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Mobile Number</label>
                      </div>
                      <div className="relative">
                        <textarea rows={2} placeholder=" " className="w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent resize-none" />
                        <label className="absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">Message (optional)</label>
                      </div>
                      <button type="submit" className="w-full rounded-xl bg-[color:var(--color-brand)] py-4 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-85 transition-opacity">
                        Submit Application
                      </button>
                    </form>
                    <p className="text-center text-[0.7rem] text-white/25 pb-2">All enquiries are 100% confidential.</p>
                  </div>
                ) : (
                  <div className="px-6 py-10 text-center text-white/40">
                    <p className="text-[0.9rem]">Select a program first to see your estimate.</p>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}

          {/* Dynamic trust signals */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {trustSignals.map((ts) => (
                <div key={ts.title} className="rounded-2xl bg-bg p-5 shadow-sm transition-all duration-300">
                  <div className="text-2xl mb-3">{ts.icon}</div>
                  <p className="font-semibold text-fg text-[0.9rem]">{ts.title}</p>
                  <p className="mt-1 text-[0.78rem] text-fg-soft">{ts.body}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

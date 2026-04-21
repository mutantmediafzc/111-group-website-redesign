"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const PROGRAMS = [
  { country: "Grenada", flag: "🇬🇩", image: "/brand/images/country-images/grenada.png", tag: "Caribbean", minInvestment: "USD 150,000", processing: "4–6 months", visaFree: "140+ countries", highlights: ["Only Caribbean passport with US E-2 Treaty Investor Visa", "Includes spouse, children & parents", "No residency requirement", "Dual citizenship permitted"] },
  { country: "Saint Kitts & Nevis", flag: "🇰🇳", image: "/brand/images/country-images/saint-kitts-and-nevis.png", tag: "Caribbean", minInvestment: "USD 250,000", processing: "4–6 months", visaFree: "150+ countries", highlights: ["World's oldest CBI program (est. 1984)", "Accelerated Application Process available", "No residency requirement", "Dual citizenship permitted"] },
  { country: "Dominica", flag: "🇩🇲", image: "/brand/images/country-images/dominica.png", tag: "Caribbean", minInvestment: "USD 100,000", processing: "4–6 months", visaFree: "140+ countries", highlights: ["Most affordable CBI program globally", "Ranked #1 for value by IMI", "No residency requirement", "Family of four from USD 175,000"] },
  { country: "Saint Lucia", flag: "🇱🇨", image: "/brand/images/country-images/saint-lucia.png", tag: "Caribbean", minInvestment: "USD 100,000", processing: "3–6 months", visaFree: "145+ countries", highlights: ["Multiple investment routes", "Government bond option (returnable)", "Includes full family", "No tax on worldwide income"] },
  { country: "Vanuatu", flag: "🇻🇺", image: "/brand/images/country-images/vanuatu.png", tag: "Pacific", minInvestment: "USD 130,000", processing: "30–60 days", visaFree: "130+ countries", highlights: ["Fastest passport program in the world", "No income, capital gains or inheritance tax", "No residency requirement", "Passport delivered within 60 days"] },
  { country: "Antigua & Barbuda", flag: "🇦🇬", image: "/brand/images/country-images/antigua.png", tag: "Caribbean", minInvestment: "USD 100,000", processing: "3–5 months", visaFree: "150+ countries", highlights: ["UWI fund option from USD 150,000", "Includes spouse, children & parents", "No worldwide income tax", "Dual citizenship permitted"] },
];

const BENEFITS = [
  { icon: "🌍", title: "Global Mobility", desc: "Visa-free or visa-on-arrival access to 130–150+ countries including the UK, EU Schengen zone, and Singapore." },
  { icon: "👨‍👩‍👧‍👦", title: "Family Inclusion", desc: "Include spouse, children, and in many programs dependent parents under a single application." },
  { icon: "💰", title: "Tax Optimisation", desc: "Zero tax on worldwide income, capital gains, inheritance, and wealth in most Caribbean jurisdictions." },
  { icon: "🛡️", title: "Political Security", desc: "A second citizenship is the ultimate Plan B — safeguarding your family's freedom regardless of world events." },
  { icon: "📈", title: "Investment Return", desc: "Real estate routes offer rental yields and capital appreciation while your passport opens new doors." },
  { icon: "✅", title: "No Residency Required", desc: "Citizenship is granted on the basis of your qualifying investment — no relocation required." },
];

const STEPS = [
  { num: "01", title: "Free Consultation", desc: "Our advisor reviews your profile, goals, and budget to recommend the ideal citizenship program for your family.", duration: "Day 1" },
  { num: "02", title: "Program Selection & Due Diligence", desc: "We prepare a full due diligence file and select the optimal investment route — donation fund or real estate.", duration: "Week 1–2" },
  { num: "03", title: "Document Preparation", desc: "Our certified legal team compiles, authenticates, and translates every document required by the government.", duration: "Week 2–4" },
  { num: "04", title: "Investment & Application Submission", desc: "We execute the qualifying investment and submit a complete application package directly to the citizenship unit.", duration: "Week 4–6" },
  { num: "05", title: "Government Processing", desc: "The citizenship unit conducts background checks. We maintain direct liaison with authorities throughout.", duration: "1–6 months" },
  { num: "06", title: "Passport Issuance", desc: "Upon approval, we coordinate oath of allegiance (where required), passport collection, and secure delivery.", duration: "Final stage" },
];

const FAQS = [
  { q: "What is the minimum investment required?", a: "Costs vary by program. Dominica, Antigua & Barbuda, and Saint Lucia start at USD 100,000. Vanuatu starts at USD 130,000 but offers the fastest processing at 30–60 days." },
  { q: "Do I need to visit the country to obtain citizenship?", a: "Most Caribbean CBI programs require no physical presence. 111 Group manages all procedures remotely through a power of attorney in most cases." },
  { q: "Can my family be included?", a: "Yes. All programs include a spouse and dependent children. Several — including Grenada and Antigua — also permit dependent parents and grandparents." },
  { q: "How long does the process take?", a: "Timelines range from 30–60 days (Vanuatu) to 3–6 months for Caribbean programs. 111 Group coordinates every stage to minimise delays." },
  { q: "Is citizenship by investment legal?", a: "Yes. All CBI programs we offer are fully sovereign, government-authorised schemes, regularly audited by international due diligence bodies." },
  { q: "Will my current citizenship be affected?", a: "Most Caribbean nations permit dual or multiple citizenship. Your home country may have restrictions — our advisors will guide you confidentially." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="text-[0.88rem] font-semibold text-fg">{q}</span>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${open ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-white rotate-45" : "border-line text-fg-muted"}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      {open && <p className="pb-5 text-[0.82rem] text-fg-soft leading-relaxed">{a}</p>}
    </div>
  );
}

const COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bolivia","Bosnia","Brazil","Bulgaria","Cambodia","Cameroon","Canada","Chile","China","Colombia","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Dominican Republic","DR Congo","Ecuador","Egypt","El Salvador","Estonia","Ethiopia","Finland","France","Georgia","Germany","Ghana","Greece","Guatemala","Honduras","Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kosovo","Kuwait","Kyrgyzstan","Latvia","Lebanon","Libya","Lithuania","Luxembourg","Malaysia","Mali","Malta","Mexico","Moldova","Mongolia","Montenegro","Morocco","Myanmar","Nepal","Netherlands","New Zealand","Nicaragua","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palestine","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zimbabwe"];

const inputCls = "w-full rounded-lg border border-white/10 bg-white/8 px-4 pb-3 pt-6 text-[0.88rem] text-white outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40 transition-all placeholder:text-transparent peer";
const labelCls = "absolute left-4 top-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/40 pointer-events-none";
const selectCls = "w-full appearance-none rounded-lg border border-white/10 bg-white/8 px-4 pb-3 pt-6 text-[0.88rem] text-white outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40 transition-all cursor-pointer";

let _cachedNav: HTMLElement | null = null;
function getNav() {
  if (!_cachedNav) _cachedNav = document.querySelector("header");
  return _cachedNav;
}
function lockScroll() {
  document.body.style.overflow = "hidden";
  const nav = getNav();
  if (nav) { nav.style.opacity = "0"; nav.style.pointerEvents = "none"; }
}
function unlockScroll() {
  document.body.style.overflow = "";
  const nav = getNav();
  if (nav) { nav.style.opacity = ""; nav.style.pointerEvents = ""; }
}

function useModal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const open = useCallback(() => {
    lockScroll();
    gsap.set(overlayRef.current, { display: "flex" });
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(contentRef.current, { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 });
  }, []);
  const close = useCallback(() => {
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: 12, duration: 0.25, ease: "power3.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", delay: 0.1, onComplete: () => { gsap.set(overlayRef.current, { display: "none" }); unlockScroll(); } });
  }, []);
  return { overlayRef, contentRef, open, close };
}

function SidebarBtn({ onClick, href, label, sub, gold, icon }: { onClick?: () => void; href?: string; label: string; sub?: string; gold?: boolean; icon: React.ReactNode }) {
  const cls = `flex items-center gap-3 rounded-xl px-4 py-3 transition-all group cursor-pointer ${gold ? "bg-[color:var(--color-brand)] hover:opacity-90" : "bg-bg border border-line hover:border-[color:var(--color-brand)]"}`;
  const inner = (
    <>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${gold ? "bg-white/15 text-white" : "bg-bg-soft text-[color:var(--color-brand)]"}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className={`text-[0.78rem] font-semibold leading-tight ${gold ? "text-white" : "text-fg"}`}>{label}</p>
        {sub && <p className={`text-[0.66rem] mt-0.5 ${gold ? "text-white/70" : "text-fg-muted"}`}>{sub}</p>}
      </div>
      <svg className={`ml-auto shrink-0 transition-transform group-hover:translate-x-0.5 ${gold ? "text-white/70" : "text-fg-muted"}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </>
  );
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
  return <a href={href ?? "#"} className={cls}>{inner}</a>;
}

function QuotationModal({ overlayRef, contentRef, close }: { overlayRef: React.RefObject<HTMLDivElement | null>; contentRef: React.RefObject<HTMLDivElement | null>; close: () => void }) {
  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div ref={contentRef} className="relative flex w-full max-w-[860px] overflow-hidden rounded-2xl shadow-2xl" style={{ maxHeight: "88vh" }}>
        {/* Left image */}
        <div className="relative hidden md:flex w-[38%] shrink-0 flex-col overflow-hidden bg-[#111316]">
          <Image src="/brand/images/expandable-cards/citizenship.jpg" alt="" fill sizes="340px" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="relative mt-auto p-8">
            <h3 className="text-[1.3rem] font-semibold leading-snug text-white">Get Your Personalised<br/>Price Quote.</h3>
            <p className="mt-2 text-[0.76rem] text-white/50 leading-relaxed">Our advisors will respond within 24 hours with a full cost breakdown for your family.</p>
          </div>
        </div>
        {/* Right form */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-[#1C1F22] px-8 py-10">
          <button onClick={close} aria-label="Close" className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="mb-7">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)] mb-1">Citizenship by Investment</p>
            <h2 className="text-[1.55rem] font-semibold leading-tight text-white">Pricing Request</h2>
            <p className="mt-1.5 text-[0.78rem] font-light text-white/45">Fill in your details and we&apos;ll send a full quote tailored to your family size and chosen program.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative"><input type="text" placeholder=" " className={inputCls} /><label className={labelCls}>First Name</label></div>
              <div className="relative"><input type="text" placeholder=" " className={inputCls} /><label className={labelCls}>Last Name</label></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative"><input type="email" placeholder=" " className={inputCls} /><label className={labelCls}>Email</label></div>
              <div className="relative"><input type="tel" placeholder=" " className={inputCls} /><label className={labelCls}>Mobile</label></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <select className={selectCls} defaultValue="">
                  <option value="" disabled>Select</option>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <label className={labelCls}>Country</label>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
              </div>
              <div className="relative">
                <select className={selectCls} defaultValue="">
                  <option value="" disabled>Select</option>
                  {["Citizenship by Investment","Residency by Investment","Immigration Services","Post-Citizenship Advisory","Passport & Visa","Other"].map((t) => <option key={t}>{t}</option>)}
                </select>
                <label className={labelCls}>Application Type</label>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
              </div>
            </div>
            <button type="submit" className="mt-2 w-full rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function QualificationModal({ overlayRef, contentRef, close }: { overlayRef: React.RefObject<HTMLDivElement | null>; contentRef: React.RefObject<HTMLDivElement | null>; close: () => void }) {
  const [step, setStep] = useState(1);
  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div ref={contentRef} className="relative flex w-full max-w-[860px] rounded-2xl shadow-2xl" style={{ height: "88vh", maxHeight: "700px" }}>
        {/* Left image */}
        <div className="relative hidden md:flex w-[38%] shrink-0 flex-col overflow-hidden rounded-l-2xl bg-[#111316]">
          <Image src="/brand/images/expandable-cards/citizenship.jpg" alt="" fill sizes="340px" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="relative mt-auto p-8">
            <div className="flex gap-2 mb-5">
              {[1,2].map((n) => <div key={n} className={`h-1 flex-1 rounded-full transition-all ${step >= n ? "bg-[color:var(--color-brand)]" : "bg-white/20"}`} />)}
            </div>
            <h3 className="text-[1.3rem] font-semibold leading-snug text-white">Qualification<br/>Check.</h3>
            <p className="mt-2 text-[0.76rem] text-white/50 leading-relaxed">A quick assessment to confirm which programs you qualify for — free and confidential.</p>
          </div>
        </div>
        {/* Right panel — close btn fixed, content scrolls, buttons pinned at bottom */}
        <div className="flex flex-1 flex-col min-h-0 rounded-r-2xl bg-[#1C1F22]">
          {/* Close */}
          <button onClick={close} aria-label="Close" className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {step === 1 ? (
            /* Step 1 — short enough to not need scroll */
            <div className="flex flex-col flex-1 overflow-y-auto px-8 py-10">
              <div className="mb-7">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)] mb-1">Step 1 of 2</p>
                <h2 className="text-[1.55rem] font-semibold leading-tight text-white">Your Details</h2>
                <p className="mt-1.5 text-[0.78rem] font-light text-white/45">We need a few details to personalise your eligibility assessment.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative"><input type="text" placeholder=" " required className={inputCls} /><label className={labelCls}>First Name *</label></div>
                  <div className="relative"><input type="text" placeholder=" " required className={inputCls} /><label className={labelCls}>Last Name *</label></div>
                </div>
                <div className="relative"><input type="email" placeholder=" " required className={inputCls} /><label className={labelCls}>Email *</label></div>
                <div className="relative"><input type="tel" placeholder=" " required className={inputCls} /><label className={labelCls}>Mobile *</label></div>
                <div className="relative">
                  <select className={selectCls} defaultValue="" required>
                    <option value="" disabled>Select</option>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <label className={labelCls}>Country *</label>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
                </div>
                <button type="submit" className="mt-2 w-full rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85">Next Step →</button>
              </form>
            </div>
          ) : (
            /* Step 2 — header pinned, questions scroll, buttons pinned */
            <>
              <div className="px-8 pt-10 pb-4 shrink-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)] mb-1">Step 2 of 2</p>
                <h2 className="text-[1.55rem] font-semibold leading-tight text-white">Qualification Questions</h2>
                <p className="mt-1.5 text-[0.78rem] font-light text-white/45">Answer honestly — your responses help us match you to the right program.</p>
              </div>
              <div className="flex-1 overflow-y-auto px-8 pb-4">
                <div className="flex flex-col gap-4">
                  {[
                    "Is there a goal other than the goal of freedom of travel to obtain citizenship?",
                    "What is the work of the head of the family?",
                    "Is there an important country that the client would like to enter without a visa?",
                    "Is there a previous case of visa rejection, especially the Schengen visa, Britain, America, and Canada?",
                    "Nationality of all family members?",
                    "The ages of the family members if they wish to apply for citizenship with the family?",
                  ].map((q, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <label className="text-[0.74rem] font-medium text-white/70 leading-relaxed">{q}</label>
                      <textarea rows={1} className="w-full rounded-lg border border-white/10 bg-white/8 px-4 py-2.5 text-[0.83rem] text-white outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40 transition-all resize-none placeholder:text-white/20" placeholder="Your answer..." />
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 flex gap-3 px-8 py-5 border-t border-white/8">
                <button type="button" onClick={() => setStep(1)} className="flex-1 rounded-lg border border-white/15 py-3 text-[0.76rem] font-semibold text-white/60 hover:text-white hover:border-white/30 transition-all">← Back</button>
                <button type="button" onClick={() => { close(); setStep(1); }} className="flex-[2] rounded-lg bg-[color:var(--color-brand)] py-3 text-[0.76rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85">Submit Assessment</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CitizenshipByInvestmentPage() {
  const [activeRegion, setActiveRegion] = useState("All");
  const regions = ["All", "Caribbean", "Pacific"];
  const filtered = activeRegion === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.tag === activeRegion);

  const quoteModal = useModal();
  const qualModal = useModal();

  return (
    <>
      {/* Modals */}
      <QuotationModal overlayRef={quoteModal.overlayRef} contentRef={quoteModal.contentRef} close={quoteModal.close} />
      <QualificationModal overlayRef={qualModal.overlayRef} contentRef={qualModal.contentRef} close={qualModal.close} />

      {/* Hero */}
      <section className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/brand/images/expandable-cards/citizenship.jpg" alt="Citizenship by Investment" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/88" />
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10 pb-16 pt-40">
          <div className="flex items-center gap-2 text-[0.67rem] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/80 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/80">Citizenship by Investment</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[color:var(--color-brand)]">✦</span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">Citizenship by Investment</span>
              </div>
              <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-5">
                Acquire a Second<br/>Passport. Unlock the World.
              </h1>
              <p className="text-[1rem] text-white/65 leading-relaxed max-w-lg">
                Secure citizenship in 30 days to 6 months through a qualifying investment. Access visa-free travel to 130–150+ countries, protect your family's future, and benefit from tax-neutral jurisdictions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:min-w-[200px]">
              {[{ val: "6", label: "Programs" }, { val: "30 days", label: "Fastest" }, { val: "150+", label: "Visa-Free" }, { val: "100%", label: "Certified" }].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/8 backdrop-blur-sm border border-white/10 px-4 py-3">
                  <p className="font-display text-[1.5rem] font-semibold text-[color:var(--color-brand)] leading-none">{s.val}</p>
                  <p className="mt-1 text-[0.63rem] uppercase tracking-[0.1em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="bg-bg">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">

            {/* Left content */}
            <div className="flex flex-col gap-16 min-w-0">

              {/* Programs */}
              <section id="programs">
                <p className="eyebrow eyebrow-gold mb-2">Programs We Offer</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-3">Choose Your Path to a Second Passport</h2>
                <p className="text-[0.88rem] text-fg-soft max-w-xl leading-relaxed mb-7">Six fully government-authorised citizenship programs across the Caribbean and Pacific, each with distinct investment routes, timelines, and travel benefits.</p>
                <div className="flex gap-2 mb-7">
                  {regions.map((r) => (
                    <button key={r} onClick={() => setActiveRegion(r)} className={`rounded-full px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition-all ${activeRegion === r ? "bg-[color:var(--color-brand)] text-white" : "bg-bg-elev text-fg-soft hover:bg-bg-soft"}`}>{r}</button>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {filtered.map((p) => (
                    <div key={p.country} className="group rounded-2xl bg-bg-elev overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={p.image} alt={p.country} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                        <div className="absolute bottom-4 left-5 flex items-center gap-2">
                          <span className="text-2xl">{p.flag}</span>
                          <h3 className="font-display text-[1.1rem] font-semibold text-white">{p.country}</h3>
                        </div>
                        <span className="absolute top-4 right-4 rounded-full bg-[color:var(--color-brand)] px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white">{p.tag}</span>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-3 gap-2 mb-5">
                          {[{ label: "Min. Investment", val: p.minInvestment }, { label: "Processing", val: p.processing }, { label: "Visa-Free", val: p.visaFree }].map((stat) => (
                            <div key={stat.label} className="rounded-lg bg-bg p-2.5">
                              <p className="text-[0.54rem] font-semibold uppercase tracking-[0.08em] text-fg-muted mb-1">{stat.label}</p>
                              <p className="text-[0.74rem] font-semibold text-fg leading-tight">{stat.val}</p>
                            </div>
                          ))}
                        </div>
                        <ul className="flex flex-col gap-1.5 mb-5">
                          {p.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-[0.74rem] text-fg-soft">
                              <svg className="shrink-0 mt-0.5 text-[color:var(--color-brand)]" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <a href="#contact" className="inline-flex items-center gap-1.5 text-[0.74rem] font-semibold text-[color:var(--color-brand)] hover:gap-2.5 transition-all">
                          Get a Quote <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              <section id="benefits">
                <p className="eyebrow eyebrow-gold mb-2">Why Get a Second Passport?</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-3">Benefits of Citizenship by Investment</h2>
                <p className="text-[0.88rem] text-fg-soft max-w-xl leading-relaxed mb-8">A second citizenship delivers freedom, security, and opportunity through a single qualifying investment.</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {BENEFITS.map((b) => (
                    <div key={b.title} className="rounded-2xl bg-bg-elev p-6">
                      <div className="text-2xl mb-3">{b.icon}</div>
                      <h3 className="font-semibold text-fg text-[0.88rem] mb-2">{b.title}</h3>
                      <p className="text-[0.76rem] text-fg-soft leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Steps */}
              <section id="steps">
                <p className="eyebrow eyebrow-gold mb-2">Steps & Procedure</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-3">How the Process Works</h2>
                <p className="text-[0.88rem] text-fg-soft max-w-xl leading-relaxed mb-10">From first consultation to passport in hand — 111 Group manages every step with complete transparency.</p>
                <div className="flex flex-col gap-0">
                  {STEPS.map((s, i) => (
                    <div key={s.num} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white text-[0.68rem] font-bold">{s.num}</div>
                        {i < STEPS.length - 1 && <div className="w-px flex-1 bg-line my-2" />}
                      </div>
                      <div className="pb-8 mt-1.5">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3 className="font-display text-[0.95rem] font-semibold text-fg">{s.title}</h3>
                          <span className="rounded-full bg-bg px-2.5 py-0.5 text-[0.58rem] font-medium text-fg-muted">{s.duration}</span>
                        </div>
                        <p className="text-[0.8rem] text-fg-soft leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Qualification Check — expandable panel */}
              <section id="qualification" className="rounded-2xl bg-bg-elev border border-line overflow-hidden">
                <div className="flex items-center justify-between gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-0.5">Free Assessment</p>
                      <h2 className="font-display text-[1rem] font-semibold text-fg leading-tight">Qualification Check — Are You Eligible?</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => qualModal.open()}
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-brand)] px-5 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity"
                  >
                    Start Check
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <div className="border-t border-line px-6 py-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { icon: "🕐", title: "5 Minutes", desc: "Quick questionnaire, no commitment" },
                    { icon: "🔒", title: "Fully Confidential", desc: "Your data is never shared" },
                    { icon: "✅", title: "Expert Review", desc: "Advisor responds within 24 hours" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="text-[0.78rem] font-semibold text-fg">{item.title}</p>
                        <p className="text-[0.72rem] text-fg-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq">
                <p className="eyebrow eyebrow-gold mb-2">FAQ</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-8">Frequently Asked Questions</h2>
                <div className="rounded-2xl bg-bg-elev px-7">
                  {FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
                </div>
              </section>
            </div>

            {/* Sticky Sidebar */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-bg-elev p-5">
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">Quick Access</p>
                <div className="flex flex-col gap-2">
                  <SidebarBtn gold onClick={() => quoteModal.open()} label="Access to Service" sub="Start your application" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} />
                  <SidebarBtn onClick={() => quoteModal.open()} label="Ask for Quotation" sub="Get pricing for your family" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>} />
                  <SidebarBtn onClick={() => qualModal.open()} label="Qualification Check" sub="Free eligibility assessment" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>} />
                  <SidebarBtn href="#steps" label="Steps & Procedure" sub="Our 6-step process" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>} />
                  <SidebarBtn href="tel:+97100000000" label="Call Us" sub="+971 00 000 0000" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016 17.91l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>} />
                </div>
              </div>

              <div className="rounded-2xl bg-bg-elev p-5">
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">On this page</p>
                <nav className="flex flex-col gap-0.5">
                  {[{ href: "#programs", label: "Programs" }, { href: "#benefits", label: "Benefits" }, { href: "#steps", label: "Steps & Procedure" }, { href: "#qualification", label: "Qualification Check" }, { href: "#faq", label: "FAQ" }].map((item) => (
                    <a key={item.href} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-[0.76rem] text-fg-soft hover:text-fg hover:bg-bg transition-all">
                      <span className="w-1 h-1 rounded-full bg-[color:var(--color-brand)] shrink-0" />{item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="rounded-2xl bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/20 p-5">
                <p className="text-[0.72rem] font-semibold text-[color:var(--color-brand)] mb-2">Free Consultation</p>
                <p className="text-[0.76rem] text-fg-soft leading-relaxed mb-4">Speak with a certified 111 Group advisor. We'll recommend the best program for your goals, budget, and nationality — at no cost.</p>
                <a href="#contact" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-brand)] py-3 text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity">
                  Book Free Call
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

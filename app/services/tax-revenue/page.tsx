"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
const BENEFITS = [
  { icon: "🏢", title: "Corporate Tax Advisory", desc: "Advisory on UAE Corporate Tax (CT) obligations, registration, filing, and compliance for mainland and free zone entities." },
  { icon: "📊", title: "VAT Compliance", desc: "UAE VAT registration, return filing, reclaim support, and FTA audit representation." },
  { icon: "🌍", title: "International Tax Planning", desc: "Cross-border tax structuring, treaty analysis, and international tax advisory for HNWIs and corporates." },
  { icon: "🔍", title: "Transfer Pricing", desc: "Transfer pricing documentation, country-by-country reporting, and inter-company agreement advisory." },
  { icon: "📋", title: "FTA Disputes", desc: "Representation in FTA audits, disputes, voluntary disclosures, and reconsideration applications." },
  { icon: "💰", title: "Tax Residency Certificates", desc: "UAE Tax Residency Certificate applications for individuals and entities for treaty benefit claims." },
];
const STEPS = [
  { num: "01", title: "Tax Assessment", desc: "We review your business structure, activities, and transactions to identify tax obligations and planning opportunities.", duration: "Week 1" },
  { num: "02", title: "Registration", desc: "We manage UAE Corporate Tax and VAT registration with the Federal Tax Authority on your behalf.", duration: "Week 1–2" },
  { num: "03", title: "Compliance Setup", desc: "We implement a compliance calendar, accounting procedures, and record-keeping framework for ongoing compliance.", duration: "Week 2–4" },
  { num: "04", title: "Return Filing", desc: "We prepare and file all required CT and VAT returns accurately and on time with the FTA.", duration: "Periodic" },
  { num: "05", title: "Audit Support", desc: "In the event of an FTA audit, we manage all correspondence, document production, and representation.", duration: "As required" },
  { num: "06", title: "Ongoing Advisory", desc: "We monitor tax law changes and advise on required structural or compliance adjustments proactively.", duration: "Continuous" },
];
const FAQS = [
  { q: "Does the UAE now have corporate tax?", a: "Yes. UAE Federal Corporate Tax came into effect for financial years starting on or after 1 June 2023. Businesses are taxed at 0% on taxable income up to AED 375,000 and 9% above that threshold." },
  { q: "Do free zone companies pay corporate tax in the UAE?", a: "Free zone entities may qualify for a 0% CT rate on qualifying income if they meet the conditions of a Qualifying Free Zone Person. We advise on eligibility and compliance requirements." },
  { q: "When must UAE businesses register for Corporate Tax?", a: "All UAE businesses must register for CT with the FTA, regardless of whether they expect to be taxable. We manage the registration process and advise on deadlines." },
  { q: "Does 111 Group handle VAT disputes with the FTA?", a: "Yes. We represent businesses in FTA audits, assessments, reconsideration requests, and disputes before the Tax Disputes Resolution Committee." },
  { q: "Can 111 Group obtain a UAE Tax Residency Certificate?", a: "Yes. We prepare and submit UAE Tax Residency Certificate applications for individuals and companies needing certificates to claim double tax treaty benefits internationally." },
];
const inputCls = "w-full rounded-lg border border-white/10 bg-white/8 px-4 pb-3 pt-6 text-[0.88rem] text-white outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40 transition-all placeholder:text-transparent peer";
const labelCls = "absolute left-4 top-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/40 pointer-events-none";
let _n: HTMLElement | null = null;
function gN() { if (!_n) _n = document.querySelector("header"); return _n; }
function lS() { document.body.style.overflow = "hidden"; const n = gN(); if (n) { n.style.opacity = "0"; n.style.pointerEvents = "none"; } }
function uS() { document.body.style.overflow = ""; const n = gN(); if (n) { n.style.opacity = ""; n.style.pointerEvents = ""; } }
function useModal() {
  const oR = useRef<HTMLDivElement>(null); const cR = useRef<HTMLDivElement>(null);
  const open = useCallback(() => { lS(); gsap.set(oR.current, { display: "flex" }); gsap.fromTo(oR.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }); gsap.fromTo(cR.current, { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1 }); }, []);
  const close = useCallback(() => { gsap.to(cR.current, { opacity: 0, scale: 0.95, y: 12, duration: 0.25 }); gsap.to(oR.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => { gsap.set(oR.current, { display: "none" }); uS(); } }); }, []);
  return { overlayRef: oR, contentRef: cR, open, close };
}
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (<div className="border-b border-line last:border-0"><button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-5 text-left"><span className="text-[0.88rem] font-semibold text-fg">{q}</span><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${open ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-white rotate-45" : "border-line text-fg-muted"}`}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg></span></button>{open && <p className="pb-5 text-[0.82rem] text-fg-soft leading-relaxed">{a}</p>}</div>);
}
function SB({ onClick, href, label, sub, gold, icon }: { onClick?: () => void; href?: string; label: string; sub?: string; gold?: boolean; icon: React.ReactNode }) {
  const cls = `flex items-center gap-3 rounded-xl px-4 py-3 transition-all group cursor-pointer ${gold ? "bg-[color:var(--color-brand)] hover:opacity-90" : "bg-bg border border-line hover:border-[color:var(--color-brand)]"}`;
  const inner = (<><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${gold ? "bg-white/15 text-white" : "bg-bg-soft text-[color:var(--color-brand)]"}`}>{icon}</span><div className="min-w-0 flex-1"><p className={`text-[0.78rem] font-semibold leading-tight ${gold ? "text-white" : "text-fg"}`}>{label}</p>{sub && <p className={`text-[0.66rem] mt-0.5 ${gold ? "text-white/70" : "text-fg-muted"}`}>{sub}</p>}</div><svg className={`ml-auto shrink-0 ${gold ? "text-white/70" : "text-fg-muted"}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg></>);
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
  return <a href={href ?? "#"} className={cls}>{inner}</a>;
}
function Modal({ overlayRef, contentRef, close, title }: { overlayRef: React.RefObject<HTMLDivElement | null>; contentRef: React.RefObject<HTMLDivElement | null>; close: () => void; title: string }) {
  return (<div ref={overlayRef} className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4"><div ref={contentRef} className="relative flex w-full max-w-[680px] overflow-hidden rounded-2xl shadow-2xl bg-[#1C1F22]" style={{ maxHeight: "88vh" }}><div className="flex flex-1 flex-col overflow-y-auto px-8 py-10"><button onClick={close} aria-label="Close" className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button><div className="mb-7"><p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)] mb-1">{title}</p><h2 className="text-[1.55rem] font-semibold leading-tight text-white">Request a Consultation</h2></div><form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><div className="relative"><input type="text" placeholder=" " className={inputCls} /><label className={labelCls}>First Name</label></div><div className="relative"><input type="text" placeholder=" " className={inputCls} /><label className={labelCls}>Last Name</label></div></div><div className="relative"><input type="email" placeholder=" " className={inputCls} /><label className={labelCls}>Email</label></div><div className="relative"><input type="tel" placeholder=" " className={inputCls} /><label className={labelCls}>Mobile</label></div><div className="relative"><textarea rows={3} placeholder=" " className={`${inputCls} resize-none`} /><label className={labelCls}>How can we help?</label></div><button type="submit" className="mt-2 w-full rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85">Submit Request</button></form></div></div></div>);
}
export default function TaxRevenuePage() {
  const modal = useModal();
  return (
    <>
      <Modal overlayRef={modal.overlayRef} contentRef={modal.contentRef} close={modal.close} title="Tax & Revenue Advisory" />
      <section className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0"><Image src="/brand/images/expandable-cards/legal.jpg" alt="Tax & Revenue Advisory" fill className="object-cover object-center" priority /><div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/88" /></div>
        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10 pb-16 pt-40">
          <div className="flex items-center gap-2 text-[0.67rem] text-white/50 mb-6"><Link href="/" className="hover:text-white/80 transition-colors">Home</Link><span>/</span><Link href="/services" className="hover:text-white/80 transition-colors">Services</Link><span>/</span><span className="text-white/80">Tax & Revenue Advisory</span></div>
          <div className="max-w-2xl"><div className="flex items-center gap-2 mb-4"><span className="text-[color:var(--color-brand)]">✦</span><span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">Real Estate & Wealth</span></div>
            <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-5">UAE Tax Compliance<br/>& Advisory.</h1>
            <p className="text-[1rem] text-white/65 leading-relaxed max-w-lg">Corporate Tax, VAT, international tax planning, and FTA dispute advisory for businesses and individuals operating in the UAE — from registration to ongoing compliance.</p>
          </div>
        </div>
      </section>
      <div className="bg-bg"><div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-14 lg:py-20"><div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-16 min-w-0">
          <section id="benefits"><p className="eyebrow eyebrow-gold mb-2">What We Offer</p><h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-3">Our Tax Services</h2><p className="text-[0.88rem] text-fg-soft max-w-xl leading-relaxed mb-8">End-to-end tax compliance, planning, and dispute resolution for UAE businesses and individuals.</p><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{BENEFITS.map((b) => (<div key={b.title} className="rounded-2xl bg-bg-elev p-6"><div className="text-2xl mb-3">{b.icon}</div><h3 className="font-semibold text-fg text-[0.88rem] mb-2">{b.title}</h3><p className="text-[0.76rem] text-fg-soft leading-relaxed">{b.desc}</p></div>))}</div></section>
          <section id="steps"><p className="eyebrow eyebrow-gold mb-2">Steps & Procedure</p><h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-3">How the Process Works</h2><p className="text-[0.88rem] text-fg-soft max-w-xl leading-relaxed mb-10">From tax assessment to continuous compliance — we manage your full UAE tax position.</p><div className="flex flex-col gap-0">{STEPS.map((s, i) => (<div key={s.num} className="flex gap-5"><div className="flex flex-col items-center"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white text-[0.68rem] font-bold">{s.num}</div>{i < STEPS.length - 1 && <div className="w-px flex-1 bg-line my-2" />}</div><div className="pb-8 mt-1.5"><div className="flex items-center gap-3 mb-1.5"><h3 className="font-display text-[0.95rem] font-semibold text-fg">{s.title}</h3><span className="rounded-full bg-bg px-2.5 py-0.5 text-[0.58rem] font-medium text-fg-muted">{s.duration}</span></div><p className="text-[0.8rem] text-fg-soft leading-relaxed">{s.desc}</p></div></div>))}</div></section>
          <section id="faq"><p className="eyebrow eyebrow-gold mb-2">FAQ</p><h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-8">Frequently Asked Questions</h2><div className="rounded-2xl bg-bg-elev px-7">{FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}</div></section>
        </div>
        <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-bg-elev p-5"><p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">Quick Access</p><div className="flex flex-col gap-2"><SB gold onClick={() => modal.open()} label="Access to Service" sub="Start your tax review" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} /><SB onClick={() => modal.open()} label="Ask for Quotation" sub="Get pricing details" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>} /><SB href="tel:+97100000000" label="Call Us" sub="+971 00 000 0000" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016 17.91l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>} /></div></div>
          <div className="rounded-2xl bg-bg-elev p-5"><p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">On this page</p><nav className="flex flex-col gap-0.5">{[{ href: "#benefits", label: "Our Services" }, { href: "#steps", label: "Steps & Procedure" }, { href: "#faq", label: "FAQ" }].map((item) => (<a key={item.href} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-[0.76rem] text-fg-soft hover:text-fg hover:bg-bg transition-all"><span className="w-1 h-1 rounded-full bg-[color:var(--color-brand)] shrink-0" />{item.label}</a>))}</nav></div>
          <div className="rounded-2xl bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/20 p-5"><p className="text-[0.72rem] font-semibold text-[color:var(--color-brand)] mb-2">Free Consultation</p><p className="text-[0.76rem] text-fg-soft leading-relaxed mb-4">Speak with a UAE tax specialist — free and confidential.</p><a href="#contact" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-brand)] py-3 text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity">Book Free Call</a></div>
        </aside>
      </div></div></div>
    </>
  );
}

"use client";

import { useState, useCallback } from "react";

const STEPS = [
  {
    number: "01",
    title: "Initial Consultation",
    desc: "We begin with a free, no-obligation call to understand your goals, timeline, and current situation — then outline the best pathway forward.",
    duration: "Free · 30 min",
  },
  {
    number: "02",
    title: "Strategy & Planning",
    desc: "Our team prepares a tailored service plan, identifies the optimal jurisdiction or programme, and provides a clear cost and timeline breakdown.",
    duration: "1–3 business days",
  },
  {
    number: "03",
    title: "Documentation",
    desc: "We collect, review, and certify all required documents — coordinating with legal specialists, notaries, and government offices on your behalf.",
    duration: "1–4 weeks",
  },
  {
    number: "04",
    title: "Submission & Processing",
    desc: "Your application is submitted through official channels. We actively monitor progress and liaise directly with authorities to ensure smooth processing.",
    duration: "1 business day",
  },
  {
    number: "05",
    title: "Approval & Delivery",
    desc: "Upon approval, we coordinate all final steps — from oath ceremonies and passport issuance to permit collection and post-approval advisory.",
    duration: "5–10 business days",
  },
];

const VISIBLE = 3;
const GAP_REM = 1.25;

const DIFFERENTIATORS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "100% Certified",
    desc: "All advisors hold recognised certifications in immigration and legal practice.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Fast Turnaround",
    desc: "Expedited processing available on select programmes in as little as 45 days.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "Strictly Confidential",
    desc: "All client data is protected under NDA and encrypted storage protocols.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "Family Included",
    desc: "Spouse, children, and dependents can be included in most programmes.",
  },
];

export default function ServicesProcess() {
  const [index, setIndex] = useState(0);
  const maxIndex = STEPS.length - VISIBLE;
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, maxIndex)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  return (
    <>
      {/* Section 1 — How We Work */}
      <section className="bg-bg-elev py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          {/* Centered header */}
          <div className="mb-14 text-center">
            <p className="eyebrow eyebrow-gold mb-3">How We Work</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
              A Seamless Process,<br/>From Start to Finish.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[0.9rem] text-fg-soft leading-relaxed">
              From your first enquiry to final approval — 111 Group manages every stage so you can focus on what matters.
            </p>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateX(calc(-${(index * 100) / VISIBLE}% - ${index * GAP_REM}rem))` }}
            >
              {STEPS.map((s) => (
                <div
                  key={s.number}
                  className="w-full shrink-0 sm:w-1/2 lg:w-1/3"
                  style={{ paddingRight: `${GAP_REM}rem` }}
                >
                  <div className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-xl bg-[#f3f4f6] p-6 dark:bg-[#1f2126]">
                    <div className="relative z-10">
                      <span className="inline-flex rounded-[4px] bg-[#303238] px-2.5 py-1.5 text-[0.72rem] font-medium leading-none text-white">
                        {s.duration}
                      </span>
                      <h3 className="mt-4 max-w-[75%] font-display text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[#0e1014] dark:text-white">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-[78%] text-[0.88rem] leading-relaxed text-[#4b4f56] dark:text-white/60">
                        {s.desc}
                      </p>
                    </div>
                    <span
                      className="pointer-events-none absolute -bottom-6 -right-2 font-display text-[9.5rem] font-semibold leading-none text-[color:var(--color-brand)]"
                      aria-hidden="true"
                    >
                      {String(Number(s.number))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              disabled={index === 0}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-fg transition-colors hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-fg transition-colors hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 — Why 111 Group */}
      <section className="bg-bg pt-24 pb-10 lg:pt-32 lg:pb-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          {/* Centered header */}
          <div className="mb-14 text-center">
            <p className="eyebrow eyebrow-gold mb-3">Why 111 Group</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
              Built on Trust.<br/>Driven by Results.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="flex flex-col rounded-2xl bg-bg-elev p-7 min-h-[200px]">
                <div className="text-fg-muted">{d.icon}</div>
                <h3 className="mt-8 font-display text-[1.05rem] font-medium text-fg">{d.title}</h3>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-fg-soft">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useCallback } from "react";

const STEPS = [
  {
    number: "01",
    title: "Free Consultation",
    desc: "Book a no-obligation call with a certified 111 Group advisor. We review your nationality, goals, and preferred destinations to recommend the best pathway.",
    duration: "30 minutes",
  },
  {
    number: "02",
    title: "Eligibility Assessment",
    desc: "We conduct a thorough review of your background, financial standing, and documentation to confirm eligibility and identify the optimal visa or citizenship programme.",
    duration: "1–3 business days",
  },
  {
    number: "03",
    title: "Document Preparation",
    desc: "Our legal team prepares, reviews, and certifies all required documents — from source of funds declarations to police clearances and biometric submissions.",
    duration: "1–4 weeks",
  },
  {
    number: "04",
    title: "Application Submission",
    desc: "We submit your complete application to the relevant authority on your behalf, including all supporting materials and investment documentation.",
    duration: "1 business day",
  },
  {
    number: "05",
    title: "Due Diligence & Processing",
    desc: "Government authorities conduct background checks and review your application. We liaise directly with the relevant agencies to track progress and respond to any queries.",
    duration: "45 days – 6 months",
  },
  {
    number: "06",
    title: "Approval & Passport Delivery",
    desc: "Upon approval, we coordinate your oath of allegiance (if required), passport issuance, and secure delivery — completing your journey to a new identity.",
    duration: "5–10 business days",
  },
];

const VISIBLE = 3;
const GAP_REM = 1.25; // gap-5 = 1.25rem

export default function VisaHowItWorks() {
  const [index, setIndex] = useState(0);
  const maxIndex = STEPS.length - VISIBLE;

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, maxIndex)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  return (
    <section className="bg-bg-elev py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Centered Header */}
        <div className="mb-14 text-center">
          <p className="eyebrow eyebrow-gold mb-3">How It Works</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
            Your Journey, Step by Step.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.9rem] text-fg-soft leading-relaxed">
            From your first question to passport in hand — 111 Group manages every stage of your application so you can focus on what matters.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(calc(-${(index * 100) / VISIBLE}% - ${index * GAP_REM}rem))`,
              }}
            >
              {STEPS.map((s) => (
                <div
                  key={s.number}
                  className="w-full shrink-0 px-0 sm:w-1/2 lg:w-1/3"
                  style={{ paddingRight: `${GAP_REM}rem` }}
                >
                  <div className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-xl bg-[#f3f4f6] p-6">
                    <div className="relative z-10">
                      <span className="inline-flex rounded-[4px] bg-[#303238] px-2.5 py-1.5 text-[0.72rem] font-medium leading-none text-white">
                        {s.duration}
                      </span>

                      <h3 className="mt-4 max-w-[75%] font-display text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[#0e1014]">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-[78%] text-[0.88rem] leading-relaxed text-[#4b4f56]">
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
      </div>
    </section>
  );
}

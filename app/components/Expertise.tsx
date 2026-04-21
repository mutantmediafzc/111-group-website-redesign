"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INVESTMENT_SERVICES, PRACTICE_AREAS } from "../lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".expertise-header > *", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".practice-line", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: { trigger: ".practice-list", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="expertise" className="relative border-t border-line bg-bg-soft py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="expertise-header flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow eyebrow-gold flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-[color:var(--color-brand)]" />
              02 — Expertise
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[1] tracking-[-0.02em]">
              A complete practice<br />
              <em className="italic text-brand">for the borderless class.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-fg-soft">
            From second citizenships and residency programs to corporate mandates,
            dispute resolution and wealth structuring — one firm, across eighteen
            disciplines and forty-plus jurisdictions.
          </p>
        </div>

        {/* Investment services — interactive editorial gallery */}
        <div className="mt-20 grid grid-cols-12 gap-6 lg:gap-10">
          {/* Index list */}
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow mb-6">Flagship programmes</div>
            <ul className="divide-y divide-[color:var(--color-line)] border-y border-line">
              {INVESTMENT_SERVICES.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.code}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-center justify-between gap-6 py-5 text-left transition-all ${
                        isActive ? "pl-4" : ""
                      }`}
                    >
                      <div className="flex min-w-0 items-baseline gap-5">
                        <span className={`font-mono text-[0.7rem] ${isActive ? "text-brand" : "text-fg-muted"}`}>
                          {s.code}
                        </span>
                        <span
                          className={`font-display text-xl md:text-2xl lg:text-[1.6rem] font-light tracking-tight transition-colors ${
                            isActive ? "text-brand" : "text-fg"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                      <span
                        className={`shrink-0 transition-all ${
                          isActive ? "w-10 text-brand" : "w-6 text-fg-muted"
                        }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 40 8" className="h-2 w-full">
                          <line
                            x1="0" y1="4" x2="40" y2="4"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                          <polyline points="34,0 40,4 34,8" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Detail panel */}
          <div className="col-span-12 lg:col-span-7">
            <div className="sticky top-28 border border-line bg-bg-elev p-8 lg:p-12">
              <div className="flex items-start justify-between gap-6">
                <div className="eyebrow eyebrow-gold">
                  Programme · {INVESTMENT_SERVICES[active].abbr}
                </div>
                <div className="font-mono text-[0.7rem] text-fg-muted">
                  {INVESTMENT_SERVICES[active].code} / {String(INVESTMENT_SERVICES.length).padStart(2, "0")}
                </div>
              </div>

              <h3 className="mt-6 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.05] tracking-[-0.02em]">
                {INVESTMENT_SERVICES[active].title}
              </h3>

              <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-fg-soft">
                {INVESTMENT_SERVICES[active].body}
              </p>

              {/* Decorative key facts */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
                <KeyFact label="Advisory" value="Bespoke" />
                <KeyFact label="Jurisdictions" value="40+" />
                <KeyFact label="Confidentiality" value="Absolute" />
              </div>

              <div className="mt-10 flex items-center gap-4">
                <a href="#contact" className="btn-gold">Request Briefing</a>
                <a href="#contact" className="eyebrow link-underline text-fg-muted">View eligibility</a>
              </div>
            </div>
          </div>
        </div>

        {/* Practice areas — editorial column */}
        <div className="practice-list mt-28 grid grid-cols-12 gap-6 border-t border-line pt-16 lg:gap-10">
          <div className="col-span-12 lg:col-span-3">
            <div className="eyebrow mb-4">Full-service practice</div>
            <h3 className="font-display text-3xl font-light leading-tight">
              Fourteen disciplines.<br />
              <em className="italic text-brand">One firm.</em>
            </h3>
          </div>

          <ul className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {PRACTICE_AREAS.map((p, i) => (
              <li
                key={p}
                className="practice-line group flex items-baseline justify-between gap-4 border-b border-line py-5 transition-colors hover:border-[color:var(--color-brand)]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.7rem] text-fg-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-light group-hover:text-brand transition-colors">
                    {p}
                  </span>
                </div>
                <span className="text-brand opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function KeyFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <div className="mt-2 font-display text-xl font-light">{value}</div>
    </div>
  );
}

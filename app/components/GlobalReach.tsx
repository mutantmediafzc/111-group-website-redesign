"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REGIONS } from "../lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalReach() {
  const ref = useRef<HTMLElement>(null);
  const [activeRegion, setActiveRegion] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reach-headline > *", {
        opacity: 0, y: 30, duration: 1, stagger: 0.08, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".reach-country", {
        opacity: 0, y: 10, duration: 0.5, stagger: 0.03,
        scrollTrigger: { trigger: ".reach-list", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const totalCountries = REGIONS.reduce((a, r) => a + r.countries.length, 0);

  return (
    <section
      ref={ref}
      id="global"
      className="relative border-y border-line bg-[color:var(--color-charcoal-800)] py-24 text-[color:var(--color-ivory)] lg:py-36"
    >
      {/* Background: archival world grid */}
      <div aria-hidden className="absolute inset-0 opacity-[0.08]">
        <svg className="h-full w-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill="#F5F3EC" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="reach-headline grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow eyebrow-gold flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-[color:var(--color-brand)]" />
              04 — Global Reach
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.05] tracking-[-0.02em]">
              A map of <em className="italic text-brand">passports,</em><br />
              permissions &amp; peace of mind.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 self-end">
            <p className="max-w-lg text-[1rem] leading-relaxed text-[color:var(--color-ivory)]/70">
              We advise across {totalCountries}+ jurisdictions — from Europe&apos;s
              residency programmes and the Caribbean&apos;s CBI economies to the
              Gulf&apos;s Golden Visa regimes. Each programme is advised in its
              native legal context.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 border-t border-[color:var(--color-ivory)]/15 pt-10 lg:gap-10">
          {/* Region selector */}
          <nav className="col-span-12 lg:col-span-3">
            <div className="eyebrow text-[color:var(--color-ivory)]/60 mb-4">By region</div>
            <ul className="space-y-1">
              {REGIONS.map((r, i) => {
                const active = i === activeRegion;
                return (
                  <li key={r.region}>
                    <button
                      onMouseEnter={() => setActiveRegion(i)}
                      onClick={() => setActiveRegion(i)}
                      className={`group flex w-full items-center justify-between border-l-2 py-3 pl-4 text-left transition-all ${
                        active
                          ? "border-[color:var(--color-brand)] text-brand"
                          : "border-transparent text-[color:var(--color-ivory)]/70 hover:text-[color:var(--color-ivory)]"
                      }`}
                    >
                      <span className="font-display text-lg font-light">{r.region}</span>
                      <span className="font-mono text-[0.7rem]">
                        {String(r.countries.length).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Country grid */}
          <div className="reach-list col-span-12 lg:col-span-9">
            <div className="mb-6 flex items-baseline justify-between">
              <div className="font-display text-2xl font-light">
                {REGIONS[activeRegion].region}
              </div>
              <div className="eyebrow text-[color:var(--color-ivory)]/60">
                {REGIONS[activeRegion].countries.length} jurisdictions
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-x-8 md:grid-cols-3">
              {REGIONS[activeRegion].countries.map((c, i) => (
                <li
                  key={c}
                  className="reach-country flex items-baseline gap-4 border-b border-[color:var(--color-ivory)]/10 py-4"
                >
                  <span className="font-mono text-[0.65rem] text-[color:var(--color-brand)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-light">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Marquee running strip */}
        <div className="mt-20 overflow-hidden border-y border-[color:var(--color-ivory)]/10 py-5">
          <div className="marquee-track flex gap-12 whitespace-nowrap text-brand">
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="flex gap-12">
                {REGIONS.flatMap((r) => r.countries).map((c, i) => (
                  <span key={`${j}-${i}`} className="font-display text-3xl font-light opacity-80">
                    {c} <span className="text-[color:var(--color-ivory)]/30 mx-4">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

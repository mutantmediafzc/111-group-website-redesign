"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOUNDER } from "../lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".founder-portrait", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".founder-line", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 65%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 lg:gap-10 lg:px-10">
        {/* Left — editorial portrait block */}
        <div className="col-span-12 lg:col-span-5">
          <div className="founder-portrait relative aspect-[4/5] overflow-hidden border border-line bg-bg-soft">
            {/* Stylised editorial placeholder (no stock photo) */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(120% 80% at 30% 20%, rgba(197,160,89,0.35), transparent 60%), radial-gradient(100% 80% at 80% 90%, rgba(26,27,30,0.65), transparent 60%)",
                }}
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-fg) 1px, transparent 1px)",
                  backgroundSize: "100% 6px",
                }}
              />
            </div>
            {/* Monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-display text-[13rem] font-light leading-none text-brand">
                T.
              </div>
            </div>
            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-line bg-bg-elev/80 p-5 backdrop-blur">
              <div>
                <div className="eyebrow eyebrow-gold">Founding Partner</div>
                <div className="font-display text-xl font-light">{FOUNDER.name}</div>
              </div>
              <div className="font-mono text-[0.65rem] text-fg-muted">
                DXB · ARE
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-6 flex items-center justify-between text-fg-muted">
            <div className="eyebrow">— Partnership</div>
            <svg width="120" height="30" viewBox="0 0 120 30" className="text-brand" aria-hidden>
              <path
                d="M2 20 Q 12 5, 22 18 T 46 18 T 70 14 Q 85 6, 100 22 L 118 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Right — prose */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="founder-line eyebrow eyebrow-gold flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-[color:var(--color-brand)]" />
            03 — The Partnership
          </div>
          <h2 className="founder-line mt-6 font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.05] tracking-[-0.02em]">
            A practice built<br />
            on outcomes, <em className="italic text-brand">not optics.</em>
          </h2>

          <p className="founder-line mt-8 max-w-xl text-[1.05rem] leading-relaxed text-fg-soft">
            The partnership is led by counsel with decades of measurable
            outcomes in second passports and residency permits. Every matter is
            handled with the discretion a private office expects — and the
            precision a regulatory file demands.
          </p>

          <ul className="mt-10 space-y-6">
            {FOUNDER.bio.map((b, i) => (
              <li key={i} className="founder-line flex gap-5 border-t border-line pt-6">
                <span className="font-mono text-[0.7rem] text-brand">0{i + 1}</span>
                <p className="text-sm leading-relaxed text-fg-soft">{b}</p>
              </li>
            ))}
          </ul>

          <div className="founder-line mt-10">
            <a href="#contact" className="link-underline eyebrow eyebrow-gold">
              Arrange a private introduction →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

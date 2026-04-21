"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const CARDS = [
  {
    id: 0,
    label: "Citizenship & Residency",
    eyebrow: "",
    title: "Citizenship &\nResidency",
    body: "We secure second passports and residency permits across 15+ investment programs — from Caribbean citizenship to European golden visas — tailored precisely to your profile and goals.",
    img: "/brand/images/expandable-cards/citizenship.jpg",
  },
  {
    id: 1,
    label: "Legal & Document Services",
    eyebrow: "",
    title: "Legal &\nDocument Services",
    body: "Our certified legal team handles everything from document attestation and visa applications to corporate law and contract drafting — ensuring full compliance at every stage.",
    img: "/brand/images/expandable-cards/legal.jpg",
  },
  {
    id: 2,
    label: "Wealth & Lifestyle Planning",
    eyebrow: "",
    title: "Wealth &\nLifestyle Planning",
    body: "Beyond borders, we help clients structure assets, establish businesses, and access premium lifestyle solutions — building a foundation that sustains generations.",
    img: "/brand/images/expandable-cards/financial.jpg",
  },
];

export default function Manifesto() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef<number | null>(null);

  /* On mount we set initial flex values via JS so they're equal thirds */
  const setCardWidth = useCallback((idx: number, value: string) => {
    const card = cardRefs.current[idx];
    if (card) gsap.to(card, { flexBasis: value, flexGrow: 0, flexShrink: 0, duration: 0.65, ease: "power3.inOut" });
  }, []);

  const expand = useCallback((idx: number) => {
    if (activeRef.current === idx) return;
    activeRef.current = idx;

    CARDS.forEach((_, i) => {
      const content = contentRefs.current[i];
      const label = labelRefs.current[i];

      if (i === idx) {
        setCardWidth(i, "56%");
        gsap.to(content, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.25 });
        gsap.to(label,   { opacity: 0, duration: 0.2 });
      } else {
        setCardWidth(i, "22%");
        gsap.to(content, { opacity: 0, y: 10, duration: 0.2 });
        gsap.to(label,   { opacity: 1, duration: 0.3, delay: 0.25 });
      }
    });
  }, [setCardWidth]);

  const reset = useCallback(() => {
    activeRef.current = null;
    CARDS.forEach((_, i) => {
      setCardWidth(i, "33.333%");
      gsap.to(contentRefs.current[i], { opacity: 0, y: 10, duration: 0.2 });
      gsap.to(labelRefs.current[i],   { opacity: 1, duration: 0.3, delay: 0.2 });
    });
  }, [setCardWidth]);

  return (
    <section id="about" className="relative bg-bg-elev pt-8 pb-24 lg:pt-10 lg:pb-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Section header — centered */}
        <div className="mb-14 flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2">
            <span className="text-brand text-sm">✦</span>
            <span className="eyebrow eyebrow-gold tracking-[0.22em]">What We Do</span>
          </div>
          <h2 className="font-display text-[clamp(1.6rem,3.2vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg whitespace-nowrap">
            One Firm. <em className="italic text-brand">Every Solution.</em>
          </h2>
          <p className="max-w-lg text-[0.9rem] leading-relaxed text-fg-soft">
            From citizenship and residency to legal services and wealth planning — 111 Group covers every dimension of your global journey.
          </p>
          <a
            href="/about"
            className="mt-2 inline-flex items-center gap-2 rounded-md border border-[color:var(--color-brand)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-brand)] hover:bg-[color:var(--color-brand)] hover:text-[#0A0B0E] transition-colors"
          >
            About Us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Accordion cards — fill full width */}
        <div
          ref={trackRef}
          className="flex gap-3 w-full overflow-hidden rounded-2xl"
          style={{ height: "520px" }}
          onMouseLeave={reset}
        >
          {CARDS.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative overflow-hidden rounded-2xl cursor-default min-w-0"
              style={{ flexBasis: "33.333%", flexGrow: 0, flexShrink: 0 }}
              onMouseEnter={() => expand(i)}
            >
              {/* Background image */}
              <Image
                src={c.img}
                alt={c.label}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                unoptimized
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

              {/* Collapsed horizontal label — bottom left */}
              <div
                ref={(el) => { labelRefs.current[i] = el; }}
                className="absolute bottom-8 left-6"
              >
                <span className="text-[1.35rem] font-semibold text-white/90 leading-snug">
                  {c.label}
                </span>
              </div>

              {/* Expanded content */}
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                className="absolute inset-x-0 bottom-0 px-8 pb-10 pt-16"
                style={{ opacity: 0, transform: "translateY(10px)" }}
              >
                <h3 className="font-display text-[1.6rem] font-semibold leading-tight text-white whitespace-pre-line">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-[340px] text-[0.85rem] leading-relaxed text-white/70">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

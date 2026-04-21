"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "cbi",
    title: "Citizenship by Investment",
    href: "/services/citizenship-by-investment",
    description:
      "Acquire a second passport through qualifying investment programs. Access visa-free travel, enhanced global mobility, and security for you and your family.",
    icon: "/old-assets/old-brand-assets/1727699404.png",
  },
  {
    id: "legal",
    title: "Legal",
    href: "/services/legal",
    description:
      "Full-service legal counsel across corporate, personal, and regulatory domains. From compliance and arbitration to IP, employment, and private wealth.",
    icon: "/old-assets/old-brand-assets/1727699398.png",
  },
  {
    id: "attestation",
    title: "Document Attestation",
    href: "/services/document-attestation",
    description:
      "Efficient authentication and attestation of legal documents for international use, ensuring compliance with government and embassy requirements worldwide.",
    icon: "/old-assets/old-brand-assets/1728041790.png",
  },
  {
    id: "visa",
    title: "Visa Information",
    href: "/services/visa-information",
    description:
      "Comprehensive guidance on tourist, investor, employment, and student visas across all major jurisdictions. We match you with the right pathway.",
    icon: "/old-assets/old-brand-assets/1770638694.png",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerChildren = section.querySelectorAll(".svc-header > *");
    const cards = section.querySelectorAll(".svc-card");
    const cta = section.querySelector(".svc-cta");
    const grid = section.querySelector(".svc-grid");
    const header = section.querySelector(".svc-header");

    gsap.set(headerChildren, { opacity: 0, y: 28 });
    gsap.set(cards, { opacity: 0, y: 40 });
    if (cta) gsap.set(cta, { opacity: 0, y: 20 });

    const st1 = ScrollTrigger.create({
      trigger: header,
      start: "top 78%",
      onEnter: () => gsap.to(headerChildren, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" }),
    });
    const st2 = ScrollTrigger.create({
      trigger: grid,
      start: "top 82%",
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }),
    });
    const st3 = ScrollTrigger.create({
      trigger: cta,
      start: "top 92%",
      onEnter: () => cta && gsap.to(cta, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }),
    });

    return () => { st1.kill(); st2.kill(); st3.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-bg-elev py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* ── Header ── */}
        <div className="svc-header mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-brand text-sm">✦</span>
            <span className="eyebrow eyebrow-gold tracking-[0.22em]">Our Services</span>
          </div>
          <h2 className="h-display mb-5 text-[clamp(2rem,4.5vw,3.6rem)] font-medium tracking-tight">
            Everything You Need,<br />
            <span className="text-brand italic">Under One Roof.</span>
          </h2>
          <p className="text-[1rem] leading-relaxed text-fg-soft">
            From securing a second passport to planning your family&apos;s global future —
            our expert team guides you through every step.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div className="svc-grid grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="svc-card group relative flex flex-col overflow-hidden rounded-2xl bg-black/5 dark:bg-white/6 p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-5">
                <Image src={s.icon} alt={s.title} width={140} height={140} unoptimized />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-[1.05rem] font-semibold leading-snug text-fg group-hover:text-brand transition-colors">
                {s.title}
              </h3>

              {/* Description */}
              <p className="flex-1 text-[0.85rem] leading-relaxed text-fg-soft">
                {s.description}
              </p>

              {/* Arrow CTA — top right */}
              <span className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white transition-transform duration-200 group-hover:translate-x-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="svc-cta mt-14 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-brand)] px-8 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white transition-all hover:opacity-90 hover:shadow-md"
          >
            Explore All Services
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}

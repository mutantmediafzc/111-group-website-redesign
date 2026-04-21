"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import CountryCarousel from "./CountryCarousel";

const STAT_PILLS = [
  { label: "15+ Investment Programs", icon: "/brand/icons/investment.svg" },
  { label: "8 Locations",             icon: "/brand/icons/location.svg"   },
  { label: "Certified Experts",       icon: "/brand/icons/expert.svg"     },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".gsap-reveal", { visibility: "visible" });
      gsap.set(".hero-cta-btn", { opacity: 0, y: 18 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 })
        .from(".hero-headline .word-span", { yPercent: 110, duration: 1.1, stagger: 0.06 }, "-=0.5")
        .from(".hero-pills", { y: 20, opacity: 0, duration: 0.8, stagger: 0.06 }, "-=0.7")
        .from(".hero-lede", { y: 24, opacity: 0, duration: 0.9 }, "-=0.7")
        .to(".hero-cta-btn", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.5");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const headline = "Your Future, Without Borders.";
  const words = headline.split(" ");

  return (
    <section ref={rootRef} className="relative overflow-hidden pb-0 pt-28 lg:pt-36">
      {/* Globe background image */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-bg" />
        <Image
          src="/brand/images/dotted-globe-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-center opacity-30 dark:opacity-20"
          priority
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 40%, var(--color-bg) 100%)",
          }}
        />
      </div>

      {/* Hero content — fully centered */}
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <div className="hero-eyebrow gsap-reveal mb-6 flex items-center gap-2">
          <span className="text-brand text-sm">✦</span>
          <span className="eyebrow eyebrow-gold tracking-[0.26em]">
            Start Your Journey
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline h-display mb-8 text-[clamp(2.6rem,7vw,5.5rem)] font-medium">
          {words.map((w, i) => (
            <span
              key={i}
              className="mr-[0.22em] inline-block overflow-hidden align-top gsap-reveal"
            >
              <span className="word-span inline-block">{w}</span>
            </span>
          ))}
        </h1>

        {/* Stat pills */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {STAT_PILLS.map((p) => (
            <div
              key={p.label}
              className="hero-pills gsap-reveal flex items-center gap-2 rounded-md bg-black/5 dark:bg-white/8 px-4 py-2 text-[0.78rem] font-medium text-fg-soft backdrop-blur-sm"
            >
              <Image src={p.icon} alt="" width={18} height={18} unoptimized />
              {p.label}
            </div>
          ))}
        </div>

        {/* H2 lede */}
        <p className="hero-lede gsap-reveal mb-8 max-w-[38rem] text-[1.05rem] leading-relaxed text-fg-soft">
          Secure your second citizenship or residency in 15+ countries. Expert legal guidance, from application to approval.
        </p>

        {/* CTA */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 pb-16">
          <a href="/services" className="hero-cta-btn btn-gold">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="hero-cta-btn btn-ghost">
            Talk to an Expert
          </a>
        </div>
      </div>

      {/* Country carousel — half-peeking cards */}
      <CountryCarousel />
    </section>
  );
}

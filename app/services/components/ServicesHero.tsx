"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesHero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!bgRef.current) return;
    const el = bgRef.current;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
          <Image
            src="/brand/images/expandable-cards/legal.jpg"
            alt="111 Group Services"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10 pb-16 pt-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[color:var(--color-brand)]">✦</span>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">
              Full-Service Practice
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-5">
            One Firm.<br/>Every Service You Need.
          </h1>
          <p className="text-[1rem] text-white/65 leading-relaxed mb-10 max-w-lg">
            From citizenship by investment to corporate legal advisory, 111 Group delivers end-to-end solutions across immigration, law, real estate, and wealth planning.
          </p>
        </div>

      </div>
    </section>
  );
}

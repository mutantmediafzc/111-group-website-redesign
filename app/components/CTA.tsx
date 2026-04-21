"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "../lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-line", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="cta-line eyebrow eyebrow-gold flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-[color:var(--color-brand)]" />
              05 — Engage
            </div>
            <h2 className="cta-line mt-6 font-display text-[clamp(2.5rem,6vw,6rem)] font-light leading-[0.98] tracking-[-0.025em]">
              Begin with a<br />
              <em className="italic text-brand">private</em> conversation.
            </h2>
            <p className="cta-line mt-8 max-w-lg text-[1.05rem] leading-relaxed text-fg-soft">
              We accept a limited number of new mandates each quarter. Outline
              your objective below and a partner will respond within one
              business day, confidentially.
            </p>

            <div className="cta-line mt-10 flex flex-wrap items-center gap-4">
              <a href={`mailto:${BRAND.contact.email}`} className="btn-gold">
                Request introduction
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href={`tel:${BRAND.contact.phone}`} className="btn-ghost">
                {BRAND.contact.phone}
              </a>
            </div>
          </div>

          {/* Contact card */}
          <aside className="cta-line col-span-12 lg:col-span-4 lg:col-start-9 border border-line bg-bg-elev p-8 lg:p-10">
            <div className="eyebrow mb-6">Chambers</div>
            <div className="space-y-5">
              <ContactRow label="Email" value={BRAND.contact.email} href={`mailto:${BRAND.contact.email}`} />
              <ContactRow label="Telephone" value={BRAND.contact.phone} href={`tel:${BRAND.contact.phone}`} />
              <ContactRow label="Chambers" value={BRAND.contact.address} />
              <ContactRow label="Hours" value="Sun–Thu · 09:00 – 18:00 GST" />
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
              <div className="eyebrow">Response</div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-brand)] opacity-60" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-[color:var(--color-brand)]" />
                </span>
                <span className="text-sm font-medium">Under 24 hours</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
      <span className="eyebrow shrink-0">{label}</span>
      <span className="font-display text-sm font-light text-right">{value}</span>
    </div>
  );
  return href ? (
    <a href={href} className="block group hover:text-brand transition-colors">{content}</a>
  ) : (
    <div>{content}</div>
  );
}

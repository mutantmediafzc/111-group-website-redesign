"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

type InfoItem = { title: string; desc: string; icon: string };
type StepItem = { num: string; title: string; desc: string; duration: string };
type FaqItem = { q: string; a: string };

type ServiceDetailTemplateProps = {
  title: string;
  categoryLabel: string;
  heroDescription: string;
  modalTitle: string;
  benefits: InfoItem[];
  steps: StepItem[];
  faqs: FaqItem[];
  heroImage?: string;
};

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/8 px-4 pb-3 pt-6 text-[0.88rem] text-white outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40 transition-all placeholder:text-transparent peer";
const labelCls =
  "absolute left-4 top-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/40 pointer-events-none";

let cachedHeader: HTMLElement | null = null;
function getHeader() {
  if (!cachedHeader) cachedHeader = document.querySelector("header");
  return cachedHeader;
}

function lockScroll() {
  document.body.style.overflow = "hidden";
  const header = getHeader();
  if (header) {
    header.style.opacity = "0";
    header.style.pointerEvents = "none";
  }
}

function unlockScroll() {
  document.body.style.overflow = "";
  const header = getHeader();
  if (header) {
    header.style.opacity = "";
    header.style.pointerEvents = "";
  }
}

function useModal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    lockScroll();
    gsap.set(overlayRef.current, { display: "flex" });
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.94, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const close = useCallback(() => {
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: 12, duration: 0.25, ease: "power3.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none" });
        unlockScroll();
      },
    });
  }, []);

  return { overlayRef, contentRef, open, close };
}

function FAQItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="text-[0.88rem] font-semibold text-fg">{q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
            open ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-white rotate-45" : "border-line text-fg-muted"
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      {open && <p className="pb-5 text-[0.82rem] text-fg-soft leading-relaxed">{a}</p>}
    </div>
  );
}

function Modal({
  overlayRef,
  contentRef,
  close,
  title,
}: {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  close: () => void;
  title: string;
}) {
  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div
        ref={contentRef}
        className="relative flex w-full max-w-[680px] overflow-hidden rounded-2xl shadow-2xl bg-[#1C1F22]"
        style={{ maxHeight: "88vh" }}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-8 py-10">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-7">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)] mb-1">{title}</p>
            <h2 className="text-[1.55rem] font-semibold leading-tight text-white">Request a Consultation</h2>
            <p className="mt-1.5 text-[0.78rem] font-light text-white/45">Fill in your details and an advisor will contact you within 24 hours.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <input type="text" placeholder=" " className={inputCls} />
                <label className={labelCls}>First Name</label>
              </div>
              <div className="relative">
                <input type="text" placeholder=" " className={inputCls} />
                <label className={labelCls}>Last Name</label>
              </div>
            </div>
            <div className="relative">
              <input type="email" placeholder=" " className={inputCls} />
              <label className={labelCls}>Email</label>
            </div>
            <div className="relative">
              <input type="tel" placeholder=" " className={inputCls} />
              <label className={labelCls}>Mobile</label>
            </div>
            <div className="relative">
              <textarea rows={3} placeholder=" " className={`${inputCls} resize-none`} />
              <label className={labelCls}>How can we help?</label>
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailTemplate({
  title,
  categoryLabel,
  heroDescription,
  modalTitle,
  benefits,
  steps,
  faqs,
  heroImage = "/brand/images/expandable-cards/legal.jpg",
}: ServiceDetailTemplateProps) {
  const modal = useModal();

  return (
    <>
      <Modal overlayRef={modal.overlayRef} contentRef={modal.contentRef} close={modal.close} title={modalTitle} />

      <section className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={title} fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/88" />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10 pb-16 pt-40">
          <div className="flex items-center gap-2 text-[0.67rem] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/80 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/80">{title}</span>
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[color:var(--color-brand)]">✦</span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">{categoryLabel}</span>
            </div>
            <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-5">
              {title}
            </h1>
            <p className="text-[1rem] text-white/65 leading-relaxed max-w-lg">{heroDescription}</p>
          </div>
        </div>
      </section>

      <div className="bg-bg">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-16 min-w-0">
              <section id="benefits">
                <p className="eyebrow eyebrow-gold mb-2">What We Offer</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-8">
                  Service Highlights
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {benefits.map((b) => (
                    <div key={b.title} className="rounded-2xl bg-bg-elev p-6">
                      <div className="text-2xl mb-3">{b.icon}</div>
                      <h3 className="font-semibold text-fg text-[0.88rem] mb-2">{b.title}</h3>
                      <p className="text-[0.76rem] text-fg-soft leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="steps">
                <p className="eyebrow eyebrow-gold mb-2">Steps & Procedure</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-10">
                  How the Process Works
                </h2>
                <div className="flex flex-col gap-0">
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white text-[0.68rem] font-bold">
                          {s.num}
                        </div>
                        {i < steps.length - 1 && <div className="w-px flex-1 bg-line my-2" />}
                      </div>
                      <div className="pb-8 mt-1.5">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3 className="font-display text-[0.95rem] font-semibold text-fg">{s.title}</h3>
                          <span className="rounded-full bg-bg px-2.5 py-0.5 text-[0.58rem] font-medium text-fg-muted">{s.duration}</span>
                        </div>
                        <p className="text-[0.8rem] text-fg-soft leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="faq">
                <p className="eyebrow eyebrow-gold mb-2">FAQ</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="rounded-2xl bg-bg-elev px-7">
                  {faqs.map((f) => (
                    <FAQItem key={f.q} q={f.q} a={f.a} />
                  ))}
                </div>
              </section>
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-bg-elev p-5">
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">Quick Access</p>
                <button
                  onClick={modal.open}
                  className="w-full rounded-xl bg-[color:var(--color-brand)] px-4 py-3 text-[0.78rem] font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Access to Service
                </button>
              </div>

              <div className="rounded-2xl bg-bg-elev p-5">
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">On this page</p>
                <nav className="flex flex-col gap-0.5">
                  {[
                    { href: "#benefits", label: "Service Highlights" },
                    { href: "#steps", label: "Steps & Procedure" },
                    { href: "#faq", label: "FAQ" },
                  ].map((item) => (
                    <a key={item.href} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-[0.76rem] text-fg-soft hover:text-fg hover:bg-bg transition-all">
                      <span className="w-1 h-1 rounded-full bg-[color:var(--color-brand)] shrink-0" />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

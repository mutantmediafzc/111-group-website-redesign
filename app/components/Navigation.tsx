"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useTheme } from "./ThemeProvider";
import LoginExpandable from "./LoginExpandable";
import { BRAND } from "../lib/content";

/* ─── Mega menu data ─────────────────────────────────────── */
const MEGA_MENUS: Record<string, MegaMenuData> = {
  Services: {
    allHref: "/#expertise",
    allLabel: "All Services",
    columns: [
      {
        heading: "Investment",
        items: [
          { label: "Citizenship by Investment", href: "/#expertise", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop" },
          { label: "Residence by Investment", href: "/#expertise", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=60&fit=crop" },
          { label: "Golden Visa", href: "/#expertise", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=80&h=60&fit=crop" },
        ],
      },
      {
        heading: "Advisory",
        items: [
          { label: "Passport Applications", href: "/#expertise" },
          { label: "Visa Applications", href: "/#expertise" },
          { label: "Post-Citizenship Advisory", href: "/#expertise" },
          { label: "Private Wealth Planning", href: "/#expertise" },
        ],
      },
    ],
    promo: {
      eyebrow: "Exclusive Offer",
      heading: "Start Your Global Journey",
      sub: "Book a free 30-min strategy session with our senior advisors.",
      cta: "Explore More",
      ctaHref: "#contact",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=300&fit=crop",
    },
  },
  "Real Estate": {
    allHref: "/#expertise",
    allLabel: "All Properties",
    columns: [
      {
        heading: "By Region",
        items: [
          { label: "Dubai — UAE", href: "/#expertise", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=80&h=60&fit=crop" },
          { label: "Greece — Golden Visa", href: "/#expertise", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=80&h=60&fit=crop" },
          { label: "Portugal — NHR", href: "/#expertise", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=60&fit=crop" },
        ],
      },
      {
        heading: "Property Types",
        items: [
          { label: "Luxury Residential", href: "/#expertise" },
          { label: "Commercial Assets", href: "/#expertise" },
          { label: "Off-Plan Projects", href: "/#expertise" },
        ],
      },
    ],
    promo: {
      eyebrow: "Featured Listing",
      heading: "Most Affordable EU Residency",
      sub: "Greece Golden Visa from €250,000",
      cta: "Explore More",
      ctaHref: "#contact",
      img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=300&fit=crop",
    },
  },
  Legal: {
    allHref: "/#expertise",
    allLabel: "All Practice Areas",
    columns: [
      {
        heading: "Corporate",
        items: [
          { label: "Regulatory Compliance", href: "/#expertise" },
          { label: "Competition & Anti-Trust", href: "/#expertise" },
          { label: "Technology & Media", href: "/#expertise" },
          { label: "Tax & Revenue", href: "/#expertise" },
        ],
      },
      {
        heading: "Personal",
        items: [
          { label: "Private Wealth", href: "/#expertise" },
          { label: "Intellectual Property", href: "/#expertise" },
          { label: "Employment Law", href: "/#expertise" },
          { label: "Document Attestation", href: "/#expertise" },
        ],
      },
    ],
    promo: {
      eyebrow: "Legal Excellence",
      heading: "18+ Practice Areas Under One Roof",
      sub: "From arbitration to data privacy — full-service counsel in Dubai.",
      cta: "Explore More",
      ctaHref: "#contact",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
    },
  },
  Immigration: {
    allHref: "/#global",
    allLabel: "All Programs",
    columns: [
      {
        heading: "Europe",
        items: [
          { label: "Greece", href: "/#global", img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=80&h=60&fit=crop" },
          { label: "Portugal", href: "/#global", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=60&fit=crop" },
          { label: "Malta", href: "/#global", img: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=80&h=60&fit=crop" },
        ],
      },
      {
        heading: "Other",
        items: [
          { label: "Turkey", href: "/#global" },
          { label: "UAE", href: "/#global" },
          { label: "Caribbean Islands", href: "/#global" },
          { label: "Jordan", href: "/#global" },
        ],
      },
    ],
    promo: {
      eyebrow: "Global Reach",
      heading: "40+ Jurisdictions Served",
      sub: "Our advisors have placed clients across 6 continents.",
      cta: "Explore More",
      ctaHref: "#global",
      img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=300&fit=crop",
    },
  },
  "About Us": {
    allHref: "/#about",
    allLabel: "About 111 Group",
    columns: [
      {
        heading: "Company",
        items: [
          { label: "Our Story", href: "/#about" },
          { label: "Leadership Team", href: "/#about" },
          { label: "Global Offices", href: "/#global" },
          { label: "Our Mission", href: "/#about" },
        ],
      },
      {
        heading: "Resources",
        items: [
          { label: "Case Studies", href: "/#insights" },
          { label: "Media & Press", href: "/#insights" },
          { label: "Insights & Reports", href: "/#insights" },
        ],
      },
    ],
    promo: {
      eyebrow: "Our Track Record",
      heading: "1,200+ Successful Applications",
      sub: "Trusted by high-net-worth families and global enterprises since 2018.",
      cta: "Explore More",
      ctaHref: "/#about",
      img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
    },
  },
};

interface MegaMenuItem { label: string; href: string; img?: string; }
interface MegaMenuColumn { heading: string; items: MegaMenuItem[]; }
interface MegaMenuPromo { eyebrow: string; heading: string; sub: string; cta: string; ctaHref: string; img: string; }
interface MegaMenuData { allHref: string; allLabel: string; columns: MegaMenuColumn[]; promo: MegaMenuPromo; }

const LEFT_NAV = ["Services", "Real Estate", "Legal", "Immigration"];
const VISA_HREF = "/visa-information";
const RIGHT_NAV = ["Become a Partner", "About Us"];

/* ─── Animated Mega Menu Panel ───────────────────────────── */
function MegaMenu({ data, onClose }: { data: MegaMenuData; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(panelRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.28 }
      )
      .fromTo(".mega-col",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.07 },
        "-=0.15"
      )
      .fromTo(".mega-link-item",
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.04 },
        "-=0.25"
      )
      .fromTo(".mega-promo",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35 },
        "-=0.4"
      );
    }, panelRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className="absolute left-0 right-0 top-full z-50"
    >
      <div className="border-b border-line bg-[color:var(--color-bg)] shadow-2xl ring-1 ring-black/6">
        <div className="mx-auto max-w-[1440px] px-6 py-5 lg:px-10">
          <Link
            href={data.allHref}
            onClick={onClose}
            className="mb-4 inline-flex items-center gap-2 text-[0.78rem] font-medium text-fg-soft hover:text-brand transition-colors"
          >
            {data.allLabel} →
          </Link>

          <div className="grid grid-cols-[1fr_1fr_260px] gap-8 border-t border-line pt-5">
            <div className="col-span-2 grid grid-cols-2 gap-8">
              {data.columns.map((col) => (
                <div key={col.heading} className="mega-col">
                  <div className="eyebrow mb-4">{col.heading}</div>
                  <ul className="flex flex-col gap-1">
                    {col.items.map((item) => (
                      <li key={item.label} className="mega-link-item">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group/link flex items-center gap-3 rounded-md p-2 hover:bg-black/4 dark:hover:bg-white/4 transition-colors"
                          onMouseEnter={(e) => {
                            gsap.to(e.currentTarget.querySelector(".arrow-icon"), { x: 3, opacity: 1, duration: 0.2, ease: "power2.out" });
                            gsap.to(e.currentTarget, { x: 3, duration: 0.2, ease: "power2.out" });
                          }}
                          onMouseLeave={(e) => {
                            gsap.to(e.currentTarget.querySelector(".arrow-icon"), { x: 0, opacity: 0, duration: 0.2 });
                            gsap.to(e.currentTarget, { x: 0, duration: 0.2 });
                          }}
                        >
                          {item.img && (
                            <div className="relative h-10 w-14 flex-none overflow-hidden rounded-md">
                              <Image src={item.img} alt={item.label} fill sizes="56px" className="object-cover" unoptimized />
                            </div>
                          )}
                          <span className="flex items-center gap-1.5 text-[0.84rem] font-medium text-fg group-hover/link:text-brand transition-colors">
                            {item.label}
                            <svg className="arrow-icon opacity-0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M13 5l7 7-7 7"/>
                            </svg>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Promo panel */}
            <div className="mega-promo relative overflow-hidden rounded-xl">
              <div className="absolute inset-0">
                <Image src={data.promo.img} alt={data.promo.heading} fill sizes="260px" className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />
              </div>
              <div className="relative flex h-full min-h-[230px] flex-col justify-end p-5">
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="text-[0.65rem]">🔥</span>
                  <span className="eyebrow eyebrow-gold text-[0.62rem]">{data.promo.eyebrow}</span>
                </div>
                <h3 className="mb-1 text-[0.95rem] font-semibold leading-snug text-white">{data.promo.heading}</h3>
                <p className="mb-4 text-[0.76rem] leading-relaxed text-white/70">{data.promo.sub}</p>
                <Link
                  href={data.promo.ctaHref}
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-brand)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#0A0B0E] hover:opacity-90 transition-opacity"
                >
                  {data.promo.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── NavItem with GSAP hover animations ────────────────── */
function NavItem({ label, active, onEnter, onLeave, transparent }: { label: string; active: boolean; onEnter: () => void; onLeave: () => void; transparent?: boolean; }) {
  const hasMega = !!MEGA_MENUS[label];
  const btnRef = useRef<HTMLButtonElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  const handleEnter = useCallback(() => {
    gsap.to(btnRef.current, { y: -2, duration: 0.18, ease: "power2.out" });
    if (chevronRef.current) gsap.to(chevronRef.current, { rotate: 180, duration: 0.22, ease: "power2.out" });
    onEnter();
  }, [onEnter]);

  const handleLeave = useCallback(() => {
    gsap.to(btnRef.current, { y: 0, duration: 0.18, ease: "power2.out" });
    if (chevronRef.current && !active) gsap.to(chevronRef.current, { rotate: 0, duration: 0.22, ease: "power2.out" });
    onLeave();
  }, [onLeave, active]);

  useEffect(() => {
    if (!active && chevronRef.current) {
      gsap.to(chevronRef.current, { rotate: 0, duration: 0.22, ease: "power2.out" });
    }
  }, [active]);

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative flex items-center gap-1 whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.08em] transition-colors ${
        active ? "text-brand" : transparent ? "text-white/80 hover:text-white" : "text-fg-soft hover:text-fg"
      }`}
    >
      {label}
      {hasMega && (
        <svg
          ref={chevronRef}
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
      {/* Active underline indicator */}
      <span
        className="absolute -bottom-1 left-0 h-[2px] bg-brand transition-all duration-300"
        style={{ width: active ? "100%" : "0%" }}
      />
    </button>
  );
}

/* ─── Mobile accordion item ──────────────────────────────── */
function MobileAccordion({ label, index, onClose }: { label: string; index: number; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const data = MEGA_MENUS[label];

  const toggle = useCallback(() => {
    if (!data) { onClose(); return; }
    const el = contentRef.current;
    if (!el) return;
    if (!open) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.3, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: "power3.in" });
    }
    setOpen((v) => !v);
  }, [open, data, onClose]);

  return (
    <div className="border-b border-line">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="eyebrow eyebrow-gold text-[0.6rem]">0{index + 1}</span>
          <span className="text-xl font-light tracking-tight">{label}</span>
        </span>
        {data && (
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        )}
      </button>
      {data && (
        <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
          <div className="pb-4">
            {data.columns.map((col) => (
              <div key={col.heading} className="mb-4">
                <div className="eyebrow mb-2 text-[0.6rem]">{col.heading}</div>
                <ul className="flex flex-col gap-1">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-1.5 text-[0.9rem] text-fg-soft hover:text-brand transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href={data.allHref}
              onClick={onClose}
              className="inline-flex items-center gap-1 text-[0.78rem] font-medium text-brand"
            >
              {data.allLabel} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Navigation() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [langOpen, setLangOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(drawer, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" });
      gsap.fromTo(drawer.querySelectorAll(".mob-item"), { x: 30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, duration: 0.35, ease: "power2.out", delay: 0.15 });
      // Animate hamburger → X
      gsap.to(bar1Ref.current, { y: 3.5, rotate: 45, duration: 0.25, ease: "power2.out" });
      gsap.to(bar2Ref.current, { y: -3.5, rotate: -45, duration: 0.25, ease: "power2.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(drawer, { x: "100%", duration: 0.35, ease: "power3.in" });
      gsap.to(bar1Ref.current, { y: 0, rotate: 0, duration: 0.25, ease: "power2.out" });
      gsap.to(bar2Ref.current, { y: 0, rotate: 0, duration: 0.25, ease: "power2.out" });
    }
  }, [mobileOpen]);

  const openMega = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (MEGA_MENUS[label]) setActiveMega(label);
  }, []);

  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const ALL_MOBILE_LINKS = [...LEFT_NAV, ...RIGHT_NAV];
  const shouldUseLightNav = (pathname.startsWith("/visa-information") || pathname.startsWith("/services")) && !scrolled && !activeMega;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || activeMega
            ? "backdrop-blur-xl bg-[color:var(--color-bg)]/90 border-b border-line shadow-sm"
            : "bg-transparent"
        }`}
        onMouseLeave={closeMega}
      >
        <div className="mx-auto flex max-w-[1440px] items-center px-6 py-1.5 lg:px-10">

          {/* ── Left nav ── */}
          <nav className="hidden flex-1 items-center gap-4 lg:flex">
            {LEFT_NAV.map((label) => (
              <NavItem
                key={label}
                label={label}
                active={activeMega === label}
                onEnter={() => openMega(label)}
                onLeave={closeMega}
                transparent={shouldUseLightNav}
              />
            ))}
            <Link
              href={VISA_HREF}
              className={`whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.08em] transition-colors ${
                shouldUseLightNav ? "text-white/80 hover:text-white" : "text-fg-soft hover:text-fg"
              }`}
            >
              Visa Information
            </Link>
          </nav>

          {/* ── Center logo ── */}
          <div className="flex flex-1 justify-start lg:justify-center">
            <Link href="/" aria-label={BRAND.name} onClick={() => setActiveMega(null)}>
              <Image src={BRAND.logo} alt={BRAND.name} height={72} width={200} unoptimized className="h-[72px] w-auto" />
            </Link>
          </div>

          {/* ── Right nav + actions ── */}
          <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
            <nav className="flex items-center gap-4">
              {RIGHT_NAV.map((label) => (
                <NavItem
                  key={label}
                  label={label}
                  active={activeMega === label}
                  onEnter={() => openMega(label)}
                  onLeave={closeMega}
                  transparent={shouldUseLightNav}
                />
              ))}
            </nav>

            <LoginExpandable />

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                aria-label="Select language"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-md transition-colors hover:text-brand bg-black/5 dark:bg-white/8 text-fg-soft"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-lg border border-line bg-bg-elev shadow-xl z-50">
                  {[
                    { code: "en", label: "English", flag: "🇬🇧" },
                    { code: "ar", label: "العربية", flag: "🇦🇪" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as "en" | "ar"); setLangOpen(false); }}
                      className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-[0.8rem] transition-colors hover:bg-bg-soft ${lang === l.code ? "text-brand font-semibold" : "text-fg"}`}
                    >
                      <span className="text-base leading-none">{l.flag}</span>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#contact"
              aria-label="Contact"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-md transition-colors hover:text-brand bg-black/5 dark:bg-white/8 text-fg-soft"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016 17.91l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </Link>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-md transition-colors hover:text-brand bg-black/5 dark:bg-white/8 text-fg-soft"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden ml-auto flex h-9 w-9 items-center justify-center rounded-md border border-line-strong"
          >
            <div className="flex flex-col gap-1.5">
              <span ref={bar1Ref} className="block h-px w-5 bg-current origin-center" />
              <span ref={bar2Ref} className="block h-px w-5 bg-current origin-center" />
            </div>
          </button>
        </div>

        {/* ── Mega menu panel ── */}
        {activeMega && MEGA_MENUS[activeMega] && (
          <div onMouseEnter={cancelClose}>
            <MegaMenu data={MEGA_MENUS[activeMega]} onClose={() => setActiveMega(null)} />
          </div>
        )}
      </header>

      {/* ── Mobile overlay backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer (slides from right) ── */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-[color:var(--color-bg)] shadow-2xl lg:hidden overflow-y-auto"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex flex-col px-6 pt-6 pb-12">
          {/* Drawer header */}
          <div className="mb-6 flex items-center justify-between">
            <Image src={BRAND.logo} alt={BRAND.name} height={48} width={130} unoptimized className="h-12 w-auto" />
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong text-fg-soft"
              aria-label="Close menu"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Accordion nav */}
          <nav>
            {ALL_MOBILE_LINKS.map((label, i) => (
              <div key={label} className="mob-item">
                <MobileAccordion label={label} index={i} onClose={() => setMobileOpen(false)} />
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-8 flex flex-col gap-3">
            <Link href="#login" onClick={() => setMobileOpen(false)} className="btn-gold justify-center">
              Log In
            </Link>
            <Link href="#contact" onClick={() => setMobileOpen(false)} className="btn-ghost justify-center">
              Contact Us
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
            <button onClick={toggle} className="eyebrow flex items-center gap-2 text-fg-soft">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

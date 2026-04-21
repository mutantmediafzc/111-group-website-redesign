"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "gsap";

const COUNTRY_CODES = [
  { code: "+971", name: "🇦🇪 UAE" },
  { code: "+1",   name: "🇺🇸 USA" },
  { code: "+44",  name: "🇬🇧 UK" },
  { code: "+966", name: "🇸🇦 Saudi Arabia" },
  { code: "+965", name: "🇰🇼 Kuwait" },
  { code: "+974", name: "🇶🇦 Qatar" },
  { code: "+973", name: "🇧🇭 Bahrain" },
  { code: "+968", name: "🇴🇲 Oman" },
  { code: "+20",  name: "🇪🇬 Egypt" },
  { code: "+962", name: "🇯🇴 Jordan" },
  { code: "+961", name: "🇱🇧 Lebanon" },
  { code: "+91",  name: "🇮🇳 India" },
  { code: "+92",  name: "🇵🇰 Pakistan" },
  { code: "+880", name: "🇧🇩 Bangladesh" },
  { code: "+63",  name: "🇵🇭 Philippines" },
  { code: "+33",  name: "🇫🇷 France" },
  { code: "+49",  name: "🇩🇪 Germany" },
  { code: "+7",   name: "🇷🇺 Russia" },
  { code: "+86",  name: "🇨🇳 China" },
];

const inputCls = "w-full rounded-lg border border-white/10 bg-white px-4 pb-3 pt-6 text-[0.9rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-transparent peer";
const labelCls = "absolute left-4 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none";

export default function LoginExpandable() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openPanel = useCallback(() => {
    document.body.style.overflow = "hidden";
    gsap.set(overlayRef.current, { display: "flex" });
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(contentRef.current,
      { opacity: 0, scale: 0.94, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const closePanel = useCallback(() => {
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: 12, duration: 0.25, ease: "power3.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none" });
        document.body.style.overflow = "";
      },
    });
  }, []);

  return (
    <>
      {/* Trigger button */}
      <a
        ref={btnRef}
        href="#"
        onClick={(e) => { e.preventDefault(); openPanel(); }}
        className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--color-brand)] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        Log In
      </a>

      {/* Backdrop */}
      {mounted && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          {/* Modal card — 2 col */}
          <div
            ref={contentRef}
            className="relative flex w-full max-w-[860px] overflow-hidden rounded-2xl shadow-2xl"
            style={{ maxHeight: "90vh" }}
          >

          {/* ── Left: image panel ── */}
          <div className="relative hidden md:flex w-[42%] shrink-0 flex-col overflow-hidden bg-[#111316]">
            <Image
              src="/brand/images/country-images/jordan.png"
              alt="Destination"
              fill
              sizes="360px"
              className="object-cover opacity-60"
              unoptimized
            />
            {/* dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Text pinned to bottom */}
            <div className="relative mt-auto p-8">
              <h3 className="text-[1.35rem] font-semibold leading-snug text-white">
                Your Future,<br />Without Borders.
              </h3>
              <p className="mt-2 text-[0.78rem] text-white/50 leading-relaxed">
                Secure your second citizenship or residency with expert guidance.
              </p>
            </div>
          </div>

          {/* ── Right: form panel ── */}
          <div className="flex flex-1 flex-col overflow-y-auto bg-[#1C1F22] px-8 py-10">
            {/* Close */}
            <button
              onClick={closePanel}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-[1.6rem] font-semibold leading-tight text-white">
                Welcome back!
              </h2>
              <p className="mt-1.5 text-[0.8rem] font-light text-white/45 leading-relaxed">
                Login to your account to access your dashboard
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">

              {/* Country code + mobile row */}
              <div className="flex gap-2">
                {/* Country code dropdown */}
                <div className="relative w-[140px] shrink-0">
                  <select
                    defaultValue="+971"
                    className="h-full w-full appearance-none rounded-lg border border-white/10 bg-white px-3 pb-3 pt-6 text-[0.85rem] text-gray-800 outline-none focus:ring-2 focus:ring-white/30 transition-all cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                    ))}
                  </select>
                  <span className="absolute left-3 top-2 text-[0.6rem] font-light uppercase tracking-[0.12em] text-gray-400 pointer-events-none">
                    Country Code
                  </span>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </span>
                </div>

                {/* Mobile number */}
                <div className="relative flex-1">
                  <input type="tel" placeholder=" " className={inputCls} />
                  <label className={labelCls}>Mobile Number</label>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input type="password" placeholder=" " className={inputCls} />
                  <label className={labelCls}>Password</label>
                </div>
                <div className="mt-1.5 flex justify-end">
                  <a href="#" className="text-[0.73rem] font-light text-white/40 hover:text-white transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Log In */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#0A0B0E] transition-opacity hover:opacity-85"
              >
                Log In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <span className="flex-1 h-px bg-white/10" />
                <span className="text-[0.7rem] font-light text-white/30 uppercase tracking-widest">or</span>
                <span className="flex-1 h-px bg-white/10" />
              </div>

              {/* Gmail */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/5 py-3 text-[0.78rem] font-medium text-white hover:bg-white/10 transition-colors"
              >
                <Image src="/brand/icons/social-icons/gmail.svg" alt="Gmail" width={18} height={18} unoptimized />
                Log in with Gmail
              </button>

              {/* UAE Pass */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/5 py-3 text-[0.78rem] font-medium text-white hover:bg-white/10 transition-colors"
              >
                <Image src="/brand/icons/social-icons/fingerprint-scan.svg" alt="UAE Pass" width={18} height={18} unoptimized style={{ filter: "brightness(0) invert(1)" }} />
                Log in with UAE Pass
              </button>

            </form>

            {/* Create account */}
            <p className="mt-6 text-center text-[0.76rem] font-light text-white/35">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="font-medium text-white hover:text-[color:var(--color-brand)] transition-colors underline underline-offset-2"
              >
                Create an account
              </a>
            </p>
          </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}

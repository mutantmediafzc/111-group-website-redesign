"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NATIONALITIES = [
  "Afghan", "Albanian", "Algerian", "American", "Argentinian", "Australian",
  "Austrian", "Bangladeshi", "Belgian", "Brazilian", "British", "Bulgarian",
  "Canadian", "Chilean", "Chinese", "Colombian", "Croatian", "Czech",
  "Danish", "Dutch", "Egyptian", "Emirati", "Ethiopian", "Finnish", "French",
  "German", "Greek", "Hungarian", "Indian", "Indonesian", "Iranian", "Iraqi",
  "Irish", "Israeli", "Italian", "Japanese", "Jordanian", "Kenyan", "Korean",
  "Lebanese", "Libyan", "Malaysian", "Mexican", "Moroccan", "New Zealander",
  "Nigerian", "Norwegian", "Pakistani", "Filipino", "Polish", "Portuguese",
  "Romanian", "Russian", "Saudi", "Serbian", "Singaporean", "South African",
  "Spanish", "Sri Lankan", "Swedish", "Swiss", "Syrian", "Thai", "Tunisian",
  "Turkish", "Ukrainian", "Venezuelan", "Vietnamese", "Yemeni",
];

const DESTINATIONS = [
  "Antigua and Barbuda", "Dominica", "Egypt", "Grenada", "Jordan",
  "Malta", "Portugal", "Saint Kitts and Nevis", "Saint Lucia",
  "São Tomé and Príncipe", "Turkey", "UAE", "Vanuatu",
];

const VISA_TYPES = [
  "Tourist Visa", "Investor Visa", "Residence Permit", "Golden Visa",
  "Citizenship by Investment", "Business Visa", "Student Visa", "Transit Visa",
];

const PURPOSES = [
  "Tourism & Leisure", "Business & Investment", "Residency", "Citizenship",
  "Education", "Family Reunification", "Employment",
];

export default function VisaHero() {
  const router = useRouter();
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [visaType, setVisaType] = useState("");
  const [purpose, setPurpose] = useState("");
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

  const canSearch = nationality && destination;

  const handleSearch = () => {
    if (!canSearch) return;
    const params = new URLSearchParams({
      nationality,
      destination,
      ...(visaType && { visaType }),
      ...(purpose && { purpose }),
    });
    router.push(`/visa-information/results?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[72vh] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
          <Image
            src="/brand/images/country-images/jordan.png"
            alt="Global travel"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
      </div>

      {/* Split layout */}
      <div className="relative flex-1 flex items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10 pt-32 pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-10">

            {/* Left — text */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[color:var(--color-brand)] text-sm">✦</span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Visa &amp; Passport Information
                </span>
              </div>
              <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-white mb-5">
                Your World,<br />Without Borders.
              </h1>
              <p className="text-[1rem] text-white/65 leading-relaxed max-w-md">
                Discover visa requirements, residency options, and citizenship pathways for over 40 destinations — guided by certified 111 Group advisors.
              </p>
            </div>

            {/* Right — form card */}
            <div className="w-full lg:w-[460px] shrink-0 rounded-2xl bg-white shadow-2xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-7 py-4">
                <p className="text-[1.05rem] font-normal text-gray-900 text-center">
                  Find your visa requirements
                </p>
              </div>
              <div className="p-7 pt-5">

              <div className="flex flex-col gap-3 mb-4">
                {/* Nationality */}
                <div className="relative">
                  <label className="absolute left-3.5 top-2 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-gray-400 pointer-events-none z-10">
                    Your Nationality
                  </label>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 pt-5 pb-0 px-3.5 text-[0.85rem] text-gray-800 outline-none appearance-none focus:border-[color:var(--color-brand)] focus:ring-0 transition-colors"
                  >
                    <option value="">Select</option>
                    {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>

                {/* Destination */}
                <div className="relative">
                  <label className="absolute left-3.5 top-2 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-gray-400 pointer-events-none z-10">
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 pt-5 pb-0 px-3.5 text-[0.85rem] text-gray-800 outline-none appearance-none focus:border-[color:var(--color-brand)] focus:ring-0 transition-colors"
                  >
                    <option value="">Select</option>
                    {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>

                {/* Visa Type */}
                <div className="relative">
                  <label className="absolute left-3.5 top-2 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-gray-400 pointer-events-none z-10">
                    Visa Type
                  </label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 pt-5 pb-0 px-3.5 text-[0.85rem] text-gray-800 outline-none appearance-none focus:border-[color:var(--color-brand)] focus:ring-0 transition-colors"
                  >
                    <option value="">Any</option>
                    {VISA_TYPES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>

                {/* Purpose */}
                <div className="relative">
                  <label className="absolute left-3.5 top-2 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-gray-400 pointer-events-none z-10">
                    Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 pt-5 pb-0 px-3.5 text-[0.85rem] text-gray-800 outline-none appearance-none focus:border-[color:var(--color-brand)] focus:ring-0 transition-colors"
                  >
                    <option value="">Any</option>
                    {PURPOSES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <button
                disabled={!canSearch}
                onClick={handleSearch}
                className="w-full rounded-xl bg-[color:var(--color-brand)] py-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Find Requirements →
              </button>

              <p className="mt-4 text-center text-[0.72rem] text-gray-400">
                Not sure?{" "}
                <a href="#contact" className="text-[color:var(--color-brand)] hover:underline">
                  Speak to an advisor
                </a>{" "}
                — free consultation, no commitment.
              </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

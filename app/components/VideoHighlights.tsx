"use client";

import Image from "next/image";
import { useState } from "react";

const VIDEOS = [
  {
    id: 1,
    title: "Inside 111 Group's Exclusive Dubai Investor Event | Citizenship & Residency by Investment",
    thumb: "/brand/images/expandable-cards/citizenship.jpg",
    tag: "111 GROUP TEAM\nIN DUBAI",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Grenada Citizenship by Investment: Real Estate Options & E-2 Visa Access Explained",
    thumb: "/brand/images/country-images/grenada.png",
    tag: "GRENADA\nCITIZENSHIP",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "UAE Golden Visa 2026: Who Qualifies & How to Apply | Complete Guide",
    thumb: "/brand/images/expandable-cards/financial.jpg",
    tag: "UAE GOLDEN\nVISA 2026",
    youtubeId: "dQw4w9WgXcQ",
  },
];

function PlayIcon() {
  return (
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all group-hover:scale-110 duration-300">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    </div>
  );
}

export default function VideoHighlights() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
            <span className="eyebrow eyebrow-gold tracking-[0.22em]">YouTube</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
            Video Highlights
          </h2>
          <p className="max-w-md text-[0.9rem] leading-relaxed text-fg-soft">
            Watch our latest videos on citizenship programmes, residency options, and expert insights from 111 Group advisors.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VIDEOS.map((v) => (
            <div key={v.id} className="group flex flex-col gap-3">
              {/* Thumbnail */}
              <div
                className="relative overflow-hidden rounded-2xl cursor-pointer bg-[#1C1F22]"
                style={{ aspectRatio: "16/10" }}
                onClick={() => setActive(active === v.id ? null : v.id)}
              >
                {active === v.id ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image
                      src={v.thumb}
                      alt={v.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    {/* Tag badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-[color:var(--color-brand)] px-3 py-1.5 rounded text-[0.72rem] font-bold text-[#0A0B0E] leading-tight whitespace-pre-line uppercase tracking-wide">
                        {v.tag}
                      </div>
                    </div>
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayIcon />
                    </div>
                  </>
                )}
              </div>

              {/* Title */}
              <p className="text-[0.875rem] font-medium text-fg leading-snug group-hover:text-[color:var(--color-brand)] transition-colors cursor-pointer"
                onClick={() => setActive(active === v.id ? null : v.id)}
              >
                {v.title}
              </p>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://www.youtube.com/@111group"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-elev px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-fg hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
          >
            View All
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}

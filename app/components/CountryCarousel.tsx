"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const COUNTRIES = [
  {
    name: "Antigua & Barbuda",
    type: "Citizenship",
    price: "from $100,000",
    img: "/brand/images/country-images/antigua.png",
    flag: "/brand/images/country-flags-3d/antigua.png",
    flagEmoji: "🇦🇬",
  },
  {
    name: "Dominica",
    type: "Citizenship",
    price: "from $100,000",
    img: "/brand/images/country-images/dominica.png",
    flag: "/brand/images/country-flags-3d/dominica.png",
    flagEmoji: "🇩🇲",
  },
  {
    name: "Egypt",
    type: "Citizenship",
    price: "from $250,000",
    img: "/brand/images/country-images/egypt.png",
    flag: "/brand/images/country-flags-3d/egypt.png",
    flagEmoji: "🇪🇬",
  },
  {
    name: "Grenada",
    type: "Citizenship",
    price: "from $150,000",
    img: "/brand/images/country-images/grenada.png",
    flag: "/brand/images/country-flags-3d/Grenada.png",
    flagEmoji: "🇬🇩",
  },
  {
    name: "Jordan",
    type: "Citizenship",
    price: "from $750,000",
    img: "/brand/images/country-images/jordan.png",
    flag: "/brand/images/country-flags-3d/jordan.png",
    flagEmoji: "🇯🇴",
  },
  {
    name: "St Kitts & Nevis",
    type: "Citizenship",
    price: "from $250,000",
    img: "/brand/images/country-images/saint-kitts-and-nevis.png",
    flag: "/brand/images/country-flags-3d/saint-kitts.png",
    flagEmoji: "🇰🇳",
  },
  {
    name: "Saint Lucia",
    type: "Citizenship",
    price: "from $100,000",
    img: "/brand/images/country-images/saint-lucia.png",
    flag: "/brand/images/country-flags-3d/st-lucia.png",
    flagEmoji: "🇱🇨",
  },
  {
    name: "Turkey",
    type: "Citizenship",
    price: "from $400,000",
    img: "/brand/images/country-images/turkey.png",
    flag: "/brand/images/country-flags-3d/turkety.png",
    flagEmoji: "🇹🇷",
  },
  {
    name: "Vanuatu",
    type: "Citizenship",
    price: "from $130,000",
    img: "/brand/images/country-images/vanuatu.png",
    flag: "/brand/images/country-flags-3d/vanuatu.png",
    flagEmoji: "🇻🇺",
  },
  {
    name: "Nauru",
    type: "Citizenship",
    price: "from $105,000",
    img: "/brand/images/country-images/nauru.png",
    flag: null,
    flagEmoji: "🇳🇷",
  },
  {
    name: "São Tomé & Príncipe",
    type: "Citizenship",
    price: "from $50,000",
    img: "/brand/images/country-images/sao-tome-and-principe.png",
    flag: null,
    flagEmoji: "🇸🇹",
  },
];

const ITEMS = [...COUNTRIES, ...COUNTRIES];

function CountryCard({ c }: { c: typeof COUNTRIES[0] }) {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.5, ease: "power2.out" });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  }, []);

  return (
    <a
      href="#contact"
      className="group relative flex-none h-[360px] overflow-hidden rounded-2xl cursor-pointer"
      style={{ textDecoration: "none", width: "var(--card-w, 280px)" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Country image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={c.img}
          alt={c.name}
          fill
          sizes="320px"
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Flag + type badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
        {c.flag ? (
          <div className="relative h-6 w-6 flex-none overflow-hidden rounded-full">
            <Image src={c.flag} alt={c.name} fill sizes="24px" className="object-cover" unoptimized />
          </div>
        ) : (
          <span className="text-lg leading-none">{c.flagEmoji}</span>
        )}
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/90">
          {c.type}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14">
        <div className="text-[1.1rem] font-bold text-white leading-tight">{c.name}</div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[0.88rem] text-white/75">{c.price}</span>
          <span className="text-white/50 group-hover:text-white transition-colors text-lg">›</span>
        </div>
      </div>
    </a>
  );
}

export default function CountryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ "--card-w": "calc((100vw - 5 * 16px) / 5)" } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className="flex gap-4 px-4"
        style={{
          animation: "carousel-scroll 70s linear infinite",
          width: "max-content",
        }}
      >
        {ITEMS.map((c, i) => (
          <CountryCard key={i} c={c} />
        ))}
      </div>

      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

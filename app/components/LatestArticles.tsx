"use client";

import Image from "next/image";

const ARTICLES = [
  {
    id: 1,
    tag: "Citizenship",
    country: "Grenada",
    date: "20 April 2026",
    title: "Grenada Citizenship by Investment: The Gateway to the US E-2 Visa",
    excerpt:
      "Grenada's citizenship programme remains one of the most strategically valuable in the Caribbean, offering holders a unique treaty with the United States that unlocks the E-2 investor visa.",
    image: "/brand/images/expandable-cards/citizenship.jpg",
    featured: true,
  },
  {
    id: 2,
    tag: "Residency",
    country: "UAE",
    date: "19 April 2026",
    title: "UAE Golden Visa: Everything You Need to Know in 2026",
    excerpt:
      "The UAE Golden Visa has evolved significantly. We break down the updated eligibility criteria, costs, and what it means for long-term residents and investors.",
    image: "/brand/images/country-images/turkey.png",
    featured: false,
  },
  {
    id: 3,
    tag: "Citizenship",
    country: "Saint Kitts",
    date: "18 April 2026",
    title: "Saint Kitts & Nevis Lowers SGF Threshold — What It Means for Applicants",
    excerpt:
      "The Sustainable Growth Fund option has been restructured, making Saint Kitts & Nevis more accessible than ever for solo applicants and families alike.",
    image: "/brand/images/country-images/saint-kitts-and-nevis.png",
    featured: false,
  },
  {
    id: 4,
    tag: "Wealth Planning",
    country: "Global",
    date: "17 April 2026",
    title: "Second Passport as a Wealth Planning Tool: A 2026 Perspective",
    excerpt:
      "High-net-worth families are increasingly treating citizenship by investment not just as mobility insurance, but as a cornerstone of multi-generational wealth structuring.",
    image: "/brand/images/expandable-cards/financial.jpg",
    featured: false,
  },
];

const fmt = (article: typeof ARTICLES[0]) =>
  `${article.country} · ${article.tag} · ${article.date}`;

export default function LatestArticles() {
  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  return (
    <section className="bg-bg-elev pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-brand text-sm">✦</span>
            <span className="eyebrow eyebrow-gold tracking-[0.22em]">Blog</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
            Read Latest Articles
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Featured — left large card */}
          <a href="#" className="group relative overflow-hidden rounded-2xl block">
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-bg-soft">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => {}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-[0.68rem] font-medium text-white/60 mb-2">{fmt(featured)}</p>
              <h3 className="font-display text-[1.35rem] font-semibold text-white leading-snug">
                {featured.title}
              </h3>
              <p className="mt-2 text-[0.8rem] text-white/70 leading-relaxed line-clamp-2">
                {featured.excerpt}
              </p>
            </div>
          </a>

          {/* Right column — 3 smaller cards */}
          <div className="flex flex-col gap-5">
            {rest.map((article) => (
              <a
                key={article.id}
                href="#"
                className="group flex items-start gap-5 rounded-2xl bg-bg p-4 hover:bg-bg-soft transition-colors"
              >
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[0.65rem] font-medium text-[color:var(--color-brand)] mb-1.5">
                    {fmt(article)}
                  </p>
                  <h3 className="font-display text-[0.95rem] font-semibold text-fg leading-snug group-hover:text-[color:var(--color-brand)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 text-[0.75rem] text-fg-soft leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                {/* Thumbnail */}
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-bg-soft">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* View all CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-fg hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
          >
            View All Articles
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}

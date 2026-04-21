import Link from "next/link";
import CountryCarousel from "../../components/CountryCarousel";

export default function VisaDestinations() {
  return (
    <section id="visa-destinations" className="bg-bg-elev py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-0">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl px-6 text-center lg:px-10">
          <p className="eyebrow eyebrow-gold mb-3">Popular Destinations</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
            Where Would You Like to Go?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.9rem] text-fg-soft leading-relaxed">
            Browse our most sought-after visa and citizenship programmes across 40+ destinations.
          </p>
        </div>

        <CountryCarousel />

        <div className="mt-12 flex justify-center px-6 lg:px-10">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-fg hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
          >
            View All Destinations
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

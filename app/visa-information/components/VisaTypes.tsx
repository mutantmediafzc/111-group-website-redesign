import Image from "next/image";

const TYPES = [
  {
    image: "/brand/images/country-images/dominica.png",
    badge: "Visit",
    title: "Tourist & Visit Visa",
    subtitle: "Short-stay options for tourism, family visits, and business trips.",
    points: ["Valid passport (6+ months)", "Return flight booking", "Travel insurance"],
  },
  {
    image: "/brand/images/country-images/egypt.png",
    badge: "Business",
    title: "Investor & Business Visa",
    subtitle: "Designed for entrepreneurs and investors expanding globally.",
    points: ["Business registration", "Proof of investment funds", "Source of funds declaration"],
  },
  {
    image: "/brand/images/country-images/jordan.png",
    badge: "Residency",
    title: "Residence Permit",
    subtitle: "Long-term legal residency with rights to live and work.",
    points: ["Investment or employment proof", "Clean criminal record", "Health insurance"],
  },
  {
    image: "/brand/images/country-images/turkey.png",
    badge: "Premium",
    title: "Golden Visa",
    subtitle: "Premium residency-by-investment with family inclusion benefits.",
    points: ["Real estate or fund investment", "Background check", "Family documentation"],
  },
  {
    image: "/brand/images/country-images/antigua.png",
    badge: "Citizenship",
    title: "Citizenship by Investment",
    subtitle: "Obtain full citizenship and a second passport via investment.",
    points: ["Qualifying investment", "Due diligence clearance", "Health and police clearance"],
  },
  {
    image: "/brand/images/country-images/saint-lucia.png",
    badge: "Education",
    title: "Student Visa",
    subtitle: "Study permits for accredited institutions with compliant documentation.",
    points: ["University acceptance letter", "Proof of tuition payment", "Accommodation proof"],
  },
];

export default function VisaTypes() {
  return (
    <section className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="eyebrow eyebrow-gold mb-3">Visa Categories</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
            Find the Right Visa Type
          </h2>
          <p className="mt-4 text-[0.9rem] text-fg-soft max-w-xl mx-auto leading-relaxed">
            From short visits to permanent residency, we handle every category — tailored to your goals and nationality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((t) => (
            <a
              key={t.title}
              href="#contact"
              className="group relative flex min-h-[420px] overflow-hidden rounded-2xl"
            >
              <Image
                src={t.image}
                alt={t.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/45 to-black/25" />

              <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                {t.badge}
              </div>

              <div className="relative mt-auto w-full p-6 text-white">
                <h3 className="font-display text-[1.45rem] font-semibold leading-tight">{t.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-white/80">{t.subtitle}</p>

                <ul className="mt-4 flex flex-col gap-2">
                  {t.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[0.84rem] text-white/88">
                      <span className="mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/95 text-[0.62rem] leading-none text-black">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-white">
                  Check Eligibility
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

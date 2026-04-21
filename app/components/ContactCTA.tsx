import Image from "next/image";

const BULLETS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Legally certified advisors",
    body: "Every application is handled by accredited citizenship and residency professionals with a proven track record.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "End-to-end in as little as 45 days",
    body: "From first consultation to passport delivery — we handle every step so you never have to navigate the process alone.",
  },
];

export default function ContactCTA() {
  return (
    <section className="bg-bg-elev py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl min-h-[280px] flex items-center">

          {/* Background image — full bleed */}
          <div className="absolute inset-0">
            <Image
              src="/brand/images/avatar/cta.jpg"
              alt="111 Group advisor"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Dark content card — floating right, inset from edges */}
          <div className="relative ml-auto mr-10 my-10 w-full max-w-[400px] bg-[#1C1F22]/95 backdrop-blur-sm rounded-2xl p-10 flex flex-col justify-center gap-6 shadow-[0_8px_48px_rgba(0,0,0,0.35)]">

            {/* Headline */}
            <div>
              <h2 className="font-display text-[1.9rem] font-semibold text-white leading-tight tracking-[-0.02em]">
                Move with certainty.<br />Live without limits.
              </h2>
            </div>

            <p className="text-[0.82rem] text-white/60 leading-relaxed">
              Whether you're planning a second citizenship, a residency for your family, or a strategic relocation — our advisors are ready to map your path forward.
            </p>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Bullets */}
            <ul className="flex flex-col gap-5">
              {BULLETS.map((b) => (
                <li key={b.title} className="flex gap-3.5 items-start">
                  <div className="shrink-0 mt-0.5 text-white">{b.icon}</div>
                  <div>
                    <p className="text-[0.85rem] font-semibold text-white">{b.title}</p>
                    <p className="text-[0.75rem] text-white/50 mt-0.5 leading-relaxed">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <a
              href="#contact"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#0A0B0E] hover:bg-[color:var(--color-brand)] transition-colors duration-300"
            >
              Book a Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

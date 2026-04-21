import Image from "next/image";

export default function ServicesCTA() {
  return (
    <section className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl min-h-[320px] flex items-center">

          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/brand/images/avatar/cta.jpg"
              alt="111 Group advisors"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>

          {/* Floating dark card */}
          <div className="relative ml-auto mr-10 my-10 w-full max-w-[420px] bg-[#1C1F22]/95 backdrop-blur-sm rounded-2xl p-10 flex flex-col gap-6">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)] mb-3">
                Get Started Today
              </p>
              <h2 className="font-display text-[1.8rem] font-semibold text-white leading-tight tracking-[-0.02em]">
                Not sure which service is right for you?
              </h2>
            </div>

            <p className="text-[0.82rem] text-white/60 leading-relaxed">
              Book a free 30-minute consultation with a senior 111 Group advisor. We'll assess your situation and recommend the most effective pathway — with no obligation.
            </p>

            <div className="border-t border-white/10" />

            <ul className="flex flex-col gap-3">
              {[
                "Personalised to your nationality & goals",
                "No commitment, no sales pressure",
                "Available via WhatsApp, Zoom, or phone",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.78rem] text-white/70">
                  <svg className="shrink-0 mt-0.5 text-[color:var(--color-brand)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bg-elev py-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-fg hover:bg-[color:var(--color-brand)] hover:text-white transition-colors duration-300"
            >
              Book Free Consultation
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

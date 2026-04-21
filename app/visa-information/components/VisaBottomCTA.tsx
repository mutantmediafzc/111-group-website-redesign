import Image from "next/image";

export default function VisaBottomCTA() {
  return (
    <section className="bg-bg-elev py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl min-h-[320px] flex items-center">

          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/brand/images/expandable-cards/legal.jpg"
              alt="Consultation"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>

          {/* Content */}
          <div className="relative mx-auto text-center px-6 py-16 max-w-2xl">
            <p className="eyebrow text-white/50 mb-4">Ready to Begin?</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-white leading-tight tracking-[-0.02em] mb-5">
              Your Second Passport<br/>Starts with One Conversation.
            </h2>
            <p className="text-[0.9rem] text-white/65 leading-relaxed mb-10 max-w-lg mx-auto">
              Book a free 30-minute strategy session with a certified 111 Group advisor. No commitment, no pressure — just clarity on your options.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-brand)] px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity"
              >
                Book Free Consultation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="tel:+97100000000"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white hover:border-white/60 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016 17.91l1.09-1.09a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

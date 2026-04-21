"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is the difference between a visa and a residence permit?",
    a: "A visa is a temporary authorisation to enter a country, typically for a defined purpose (tourism, business, study). A residence permit is a longer-term document allowing you to live in a country, often renewable and sometimes leading to permanent residency or citizenship.",
  },
  {
    q: "Can I hold dual citizenship?",
    a: "It depends on your current nationality. Many countries, including the UAE, Jordan, and several Caribbean nations, allow dual citizenship. However, some countries (e.g., India, China, Saudi Arabia) do not permit it. Our advisors assess your specific situation before recommending a programme.",
  },
  {
    q: "How long does the citizenship by investment process take?",
    a: "Timelines vary by programme. The fastest options, such as Vanuatu and Saint Kitts & Nevis's accelerated route, can be completed in as little as 45 days. Most Caribbean programmes take 3–6 months. We provide an estimated timeline during your free consultation.",
  },
  {
    q: "What documents are typically required for a visa application?",
    a: "Standard documents include a valid passport (minimum 6 months validity), passport-sized photos, proof of financial means, travel itinerary, accommodation proof, and travel insurance. Investment-based programmes also require source of funds declarations and due diligence documents.",
  },
  {
    q: "Do I need to relocate or physically move to get a second citizenship?",
    a: "Not necessarily. Most citizenship by investment programmes do not require you to relocate permanently. Some require a minimum physical presence — for example, Portugal's Golden Visa requires 7 days per year. Purely investment-based programmes like Grenada and Saint Kitts have no residency requirement.",
  },
  {
    q: "Can my family be included in my application?",
    a: "Yes. Most programmes extend to immediate family members, including spouse, dependent children (usually up to age 26 if in full-time education), and in some cases parents and grandparents. Additional government fees apply per dependent.",
  },
  {
    q: "What are the tax implications of a second citizenship or residency?",
    a: "Tax exposure depends on your country of current residence and the new jurisdiction. Some programmes, such as the UAE Golden Visa, offer a tax-efficient environment with no personal income tax. Our advisors work alongside tax specialists to ensure your structure is optimised.",
  },
  {
    q: "Is my personal information kept confidential?",
    a: "Absolutely. All client information is handled under strict confidentiality protocols and data protection compliance. 111 Group does not share client data with any third party without express consent, and all applications are submitted through encrypted, secure channels.",
  },
];

export default function VisaFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[380px_1fr]">

          {/* Left */}
          <div>
            <p className="eyebrow eyebrow-gold mb-4">FAQ</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-5">
              Frequently Asked Questions
            </h2>
            <p className="text-[0.85rem] text-fg-soft leading-relaxed mb-8">
              Can't find your answer? Our advisors are available 7 days a week for a free, no-obligation consultation.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--color-brand)] px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-brand)] hover:bg-[color:var(--color-brand)] hover:text-white transition-colors"
            >
              Ask an Advisor
            </a>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-line">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[0.9rem] font-medium text-fg leading-snug">{faq.q}</span>
                  <span className={`shrink-0 mt-0.5 text-[color:var(--color-brand)] transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open === i ? "300px" : "0px", opacity: open === i ? 1 : 0 }}
                >
                  <p className="pb-5 text-[0.82rem] text-fg-soft leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

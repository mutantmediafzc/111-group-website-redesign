import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

const benefits = [
  { icon: "📘", title: "Legal Translation", desc: "Certified translation of contracts, court documents, and legal instruments." },
  { icon: "🧾", title: "Official Documents", desc: "Translation support for civil, educational, and governmental documentation." },
  { icon: "🌐", title: "Multi-Language Coverage", desc: "Professional translation across major international language pairs." },
  { icon: "✅", title: "Certified Accuracy", desc: "Quality-controlled, compliance-ready translations accepted for official use." },
  { icon: "⚡", title: "Fast Turnaround", desc: "Priority processing available for urgent legal and immigration timelines." },
  { icon: "🔒", title: "Confidential Handling", desc: "Strict confidentiality and secure document processing standards." },
];

const steps = [
  { num: "01", title: "Scope Review", desc: "We review language pair, purpose, and certification requirements.", duration: "Day 1" },
  { num: "02", title: "Quotation & Timeline", desc: "You receive clear pricing and delivery timelines before work starts.", duration: "Day 1" },
  { num: "03", title: "Translation", desc: "Certified linguists translate the content with legal and technical accuracy.", duration: "Day 1–3" },
  { num: "04", title: "Quality Control", desc: "A second-pass review ensures consistency and compliance.", duration: "Day 2–4" },
  { num: "05", title: "Certification", desc: "Documents are prepared in certified format where required.", duration: "Day 3–5" },
  { num: "06", title: "Delivery", desc: "Final files are delivered digitally and/or physically as requested.", duration: "Final stage" },
];

const faqs = [
  { q: "Do you provide certified legal translation?", a: "Yes. We provide certified legal translations suitable for immigration, legal, and official submissions." },
  { q: "Can translated documents be attested?", a: "Yes. We can coordinate attestation and legalisation after translation if required." },
  { q: "What languages do you support?", a: "We support major global languages and can advise on availability for specific combinations." },
  { q: "Do you offer urgent translation?", a: "Yes. Priority and same-day options are available for eligible document types." },
  { q: "How is confidentiality handled?", a: "All files are processed under strict confidentiality controls and secure handling protocols." },
];

export default function TranslationPage() {
  return (
    <ServiceDetailTemplate
      title="Translation"
      categoryLabel="Administrative & Utility"
      heroDescription="Certified legal and official document translation services for immigration, legal, governmental, and corporate requirements."
      modalTitle="Translation"
      benefits={benefits}
      steps={steps}
      faqs={faqs}
    />
  );
}

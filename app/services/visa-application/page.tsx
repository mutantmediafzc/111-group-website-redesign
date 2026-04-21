import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

const benefits = [
  { icon: "✈️", title: "Tourist Visas", desc: "Assistance with short-stay tourist visa documentation and submission." },
  { icon: "💼", title: "Business Visas", desc: "Business and conference visa support for professionals and executives." },
  { icon: "🔁", title: "Transit Visas", desc: "Fast handling for transit visa applications and supporting paperwork." },
  { icon: "🏠", title: "Long-Stay Visas", desc: "Guidance for long-term, family, and purpose-specific visa categories." },
  { icon: "📋", title: "Compliance Review", desc: "Pre-submission compliance checks to improve approval outcomes." },
  { icon: "🧭", title: "End-to-End Guidance", desc: "From eligibility review to final submission and tracking support." },
];

const steps = [
  { num: "01", title: "Visa Type Assessment", desc: "We identify the best visa route based on travel purpose and profile.", duration: "Day 1" },
  { num: "02", title: "Checklist & Requirements", desc: "You receive a complete document checklist tailored to destination rules.", duration: "Day 1" },
  { num: "03", title: "Document Preparation", desc: "We review and prepare all required supporting documents.", duration: "Day 1–3" },
  { num: "04", title: "Application Filing", desc: "Submission is handled with strict compliance and accuracy.", duration: "Week 1" },
  { num: "05", title: "Processing Updates", desc: "We track progress and manage additional document requests.", duration: "Variable" },
  { num: "06", title: "Outcome & Next Steps", desc: "We guide you on visa issuance, entry use, and validity compliance.", duration: "Final stage" },
];

const faqs = [
  { q: "Which visa categories do you support?", a: "Tourist, business, transit, and multiple long-stay categories depending on destination regulations." },
  { q: "Can you help with urgent travel cases?", a: "Yes. For eligible destinations and visa classes, we offer expedited guidance and filing support." },
  { q: "Do you check documents before submission?", a: "Yes. We run a full compliance review to reduce rejection risk." },
  { q: "Can you support family visa applications?", a: "Yes. We handle individual and family submissions, including dependent documentation." },
  { q: "Do you provide post-approval support?", a: "Yes, including travel validity checks and compliance reminders." },
];

export default function VisaApplicationPage() {
  return (
    <ServiceDetailTemplate
      title="Visa Application"
      categoryLabel="Administrative & Utility"
      heroDescription="Professional handling of tourist, business, transit, and long-stay visa applications with compliance-focused documentation support."
      modalTitle="Visa Application"
      benefits={benefits}
      steps={steps}
      faqs={faqs}
    />
  );
}

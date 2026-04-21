import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

const benefits = [
  { icon: "🛂", title: "Application Preparation", desc: "Complete application prep and review to reduce delays and rejections." },
  { icon: "📅", title: "Appointment Support", desc: "Booking and scheduling support for embassy/consulate appointments." },
  { icon: "📄", title: "Document Validation", desc: "Verification of all required documents and forms before submission." },
  { icon: "⚡", title: "Urgent Processing", desc: "Fast-track advisory for urgent and emergency passport renewal cases." },
  { icon: "🌍", title: "Embassy Coordination", desc: "Direct liaison support with relevant embassy or consular channels." },
  { icon: "✅", title: "Status Tracking", desc: "Continuous updates and follow-up through final passport collection." },
];

const steps = [
  { num: "01", title: "Eligibility Check", desc: "We verify passport status, validity, and applicable renewal pathway.", duration: "Day 1" },
  { num: "02", title: "Document Checklist", desc: "You receive a tailored checklist based on nationality and location.", duration: "Day 1" },
  { num: "03", title: "Application Preparation", desc: "We complete and review all application forms and supporting documents.", duration: "Day 1–3" },
  { num: "04", title: "Appointment & Submission", desc: "We coordinate appointment booking and submission requirements.", duration: "Week 1" },
  { num: "05", title: "Processing Follow-Up", desc: "We monitor progress and address any additional requests quickly.", duration: "Variable" },
  { num: "06", title: "Passport Collection", desc: "We assist with final collection and handover guidance.", duration: "Final stage" },
];

const faqs = [
  { q: "How early should I renew my passport?", a: "We recommend starting at least 6 months before expiry, especially if travel or visa renewals are planned." },
  { q: "Can you help if my passport is already expired?", a: "Yes. We provide case-specific support for expired passports and urgent travel needs." },
  { q: "Do I need an in-person appointment?", a: "In many cases, yes. We help coordinate the correct appointment and submission channel." },
  { q: "Can I request urgent passport renewal?", a: "For eligible nationalities and circumstances, expedited options may be available." },
  { q: "Do you assist with children passport renewals?", a: "Yes, including minor-specific documentation and parental consent requirements." },
];

export default function PassportRenewalPage() {
  return (
    <ServiceDetailTemplate
      title="Passport Renewal"
      categoryLabel="Administrative & Utility"
      heroDescription="End-to-end support for passport renewal applications, document preparation, appointment booking, and submission guidance."
      modalTitle="Passport Renewal"
      benefits={benefits}
      steps={steps}
      faqs={faqs}
    />
  );
}

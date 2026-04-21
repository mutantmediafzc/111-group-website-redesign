import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

const benefits = [
  { icon: "👶", title: "Birth Registration", desc: "End-to-end newborn birth registration support with hospitals, authorities, and embassies." },
  { icon: "🛂", title: "Citizenship Filing", desc: "Preparation and submission of newborn citizenship applications based on parental eligibility." },
  { icon: "📄", title: "Passport Processing", desc: "Complete support for newborn passport applications and urgent travel documentation." },
  { icon: "🌍", title: "Dual Nationality Guidance", desc: "Advisory on dual citizenship rules, restrictions, and long-term compliance requirements." },
  { icon: "🏛️", title: "Embassy Liaison", desc: "Direct coordination with relevant embassies and consulates for smoother processing." },
  { icon: "✅", title: "Document Compliance", desc: "Legal verification and attestation support for all newborn identity documents." },
];

const steps = [
  { num: "01", title: "Eligibility Review", desc: "We assess parental nationality, residency status, and jurisdiction rules to define the correct pathway.", duration: "Day 1" },
  { num: "02", title: "Document Collection", desc: "We collect and verify required hospital, identity, and civil status documents.", duration: "Day 1–3" },
  { num: "03", title: "Birth Registration", desc: "We manage official birth registration and certificate issuance with relevant authorities.", duration: "Week 1" },
  { num: "04", title: "Citizenship Application", desc: "We prepare and submit citizenship documents with complete legal compliance.", duration: "Week 1–2" },
  { num: "05", title: "Passport Submission", desc: "We coordinate passport application, appointment, and submission.", duration: "Week 2" },
  { num: "06", title: "Issuance & Delivery", desc: "Upon approval, we support collection and secure delivery of final documents.", duration: "Final stage" },
];

const faqs = [
  { q: "Can my newborn obtain citizenship immediately?", a: "This depends on the nationality laws of the relevant country and parental status. We assess eligibility and advise the fastest valid route." },
  { q: "Do both parents need to be present for filing?", a: "Not always. In many cases, we can prepare legal authorisations and handle filings with limited physical presence." },
  { q: "How long does newborn passport processing take?", a: "Timelines vary by country and urgency tier, but we optimise processing and offer expedited support where available." },
  { q: "Can you help with embassy appointments?", a: "Yes, we coordinate with embassies/consulates and manage booking and submission requirements." },
  { q: "Do you handle attestation and translation too?", a: "Yes. We handle supporting services including attestation, certified translation, and legalisation." },
];

export default function NewBabyBornCitizenshipPage() {
  return (
    <ServiceDetailTemplate
      title="New Baby Born Citizenship"
      categoryLabel="Immigration & Citizenship"
      heroDescription="Specialised support for newborn citizenship registration, passport processing, and legal documentation based on parental nationality and jurisdiction."
      modalTitle="New Baby Born Citizenship"
      benefits={benefits}
      steps={steps}
      faqs={faqs}
    />
  );
}

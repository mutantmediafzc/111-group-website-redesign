import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

const benefits = [
  { icon: "🏛️", title: "MOJ Attestation", desc: "Ministry of Justice attestation for legal and official documentation." },
  { icon: "🌐", title: "MOFA Legalisation", desc: "Ministry of Foreign Affairs legalisation for international acceptance." },
  { icon: "📜", title: "Apostille Services", desc: "Apostille support for Hague Convention member countries." },
  { icon: "🔤", title: "Certified Translation", desc: "Translation by certified translators for legal and governmental use." },
  { icon: "🖋️", title: "Notarisation", desc: "Document notarisation through approved legal channels." },
  { icon: "🚚", title: "End-to-End Handling", desc: "Collection, processing, and delivery support with status tracking." },
];

const steps = [
  { num: "01", title: "Document Review", desc: "We review document type and destination requirements.", duration: "Day 1" },
  { num: "02", title: "Pre-Processing", desc: "Translation and notarisation are handled where required.", duration: "Day 1–3" },
  { num: "03", title: "MOJ Submission", desc: "We submit to Ministry of Justice and manage follow-up.", duration: "Week 1" },
  { num: "04", title: "MOFA / Embassy", desc: "We process legalisation with MOFA and applicable embassies.", duration: "Week 1–2" },
  { num: "05", title: "Final Verification", desc: "We verify completed attestation chain for acceptance.", duration: "Week 2" },
  { num: "06", title: "Delivery", desc: "Documents are securely delivered to you.", duration: "Final stage" },
];

const faqs = [
  { q: "What documents can be attested?", a: "Personal, educational, and corporate documents, including certificates, powers of attorney, and company papers." },
  { q: "How long does attestation usually take?", a: "Standard processing can take 1–3 weeks depending on document type and destination country." },
  { q: "Do I need notarisation before MOFA?", a: "For many documents, yes. We review and process the correct sequence for you." },
  { q: "Can you handle urgent requests?", a: "Yes, expedited handling is available for eligible document categories." },
  { q: "Do you provide pickup and delivery?", a: "Yes. We offer end-to-end handling including collection and secure return delivery." },
];

export default function DocumentAttestationPage() {
  return (
    <ServiceDetailTemplate
      title="Document Attestation"
      categoryLabel="Administrative & Utility"
      heroDescription="Official attestation, apostille, and notarisation services for personal and corporate documents for UAE and international use."
      modalTitle="Document Attestation"
      benefits={benefits}
      steps={steps}
      faqs={faqs}
    />
  );
}

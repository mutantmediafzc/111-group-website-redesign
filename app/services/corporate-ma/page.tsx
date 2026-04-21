import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

const benefits = [
  { icon: "🏢", title: "M&A Transactions", desc: "Legal structuring and execution support for mergers, acquisitions, and strategic exits." },
  { icon: "🤝", title: "Joint Ventures", desc: "JV formation, governance frameworks, and shareholder protection mechanisms." },
  { icon: "📑", title: "Due Diligence", desc: "Comprehensive legal due diligence to identify liabilities and negotiation leverage." },
  { icon: "📈", title: "Corporate Restructuring", desc: "Entity restructuring, spin-offs, and cross-border group optimisation." },
  { icon: "🧾", title: "Transaction Documents", desc: "Drafting and negotiation of SPA, SHA, term sheets, and ancillary agreements." },
  { icon: "🌍", title: "Cross-Border Advisory", desc: "Coordination of multi-jurisdiction transactions across GCC and international markets." },
];

const steps = [
  { num: "01", title: "Transaction Scoping", desc: "We define deal scope, objectives, risk profile, and preferred deal structure.", duration: "Week 1" },
  { num: "02", title: "Legal Due Diligence", desc: "Our team conducts due diligence across corporate, regulatory, and contractual exposure.", duration: "Week 1–3" },
  { num: "03", title: "Structuring & Term Sheet", desc: "We advise on the optimal legal structure and negotiate core commercial terms.", duration: "Week 2–4" },
  { num: "04", title: "Drafting & Negotiation", desc: "We draft and negotiate all transaction documents with counterparties.", duration: "Week 3–6" },
  { num: "05", title: "Regulatory Approvals", desc: "We coordinate required authority approvals and closing conditions.", duration: "Variable" },
  { num: "06", title: "Completion & Integration", desc: "We support closing, post-closing filings, and legal integration steps.", duration: "Final stage" },
];

const faqs = [
  { q: "Do you advise both buyers and sellers?", a: "Yes. We act for buyers, sellers, and investors with strict confidentiality and conflict checks." },
  { q: "Can you handle cross-border M&A deals?", a: "Yes. We routinely support multi-jurisdiction transactions and coordinate with local counsel where needed." },
  { q: "What is included in legal due diligence?", a: "Corporate structure, contracts, regulatory status, disputes, IP, employment, and compliance risks." },
  { q: "Do you also draft shareholder agreements?", a: "Yes. We draft and negotiate SHA/JV agreements with governance and exit protections." },
  { q: "Can you support post-acquisition restructuring?", a: "Absolutely. We assist with post-deal restructuring, governance updates, and integration compliance." },
];

export default function CorporateMAPage() {
  return (
    <ServiceDetailTemplate
      title="Corporate / M&A"
      categoryLabel="Legal Advisory"
      heroDescription="Legal advisory on mergers, acquisitions, joint ventures, restructuring, and cross-border corporate transactions in the UAE and internationally."
      modalTitle="Corporate / M&A"
      benefits={benefits}
      steps={steps}
      faqs={faqs}
    />
  );
}

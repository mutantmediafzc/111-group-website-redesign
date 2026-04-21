import ServicesHero from "./components/ServicesHero";
import ServicesGrid from "./components/ServicesGrid";
import ServicesProcess from "./components/ServicesProcess";
import ServicesCTA from "./components/ServicesCTA";

export const metadata = {
  title: "Services | 111 Group",
  description:
    "Explore the full range of 111 Group services — citizenship by investment, residency programmes, immigration, legal advisory, real estate, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesCTA />
    </>
  );
}

import VisaHero from "./components/VisaHero";
import VisaDestinations from "./components/VisaDestinations";
import VisaTypes from "./components/VisaTypes";
import VisaHowItWorks from "./components/VisaHowItWorks";
import VisaFAQ from "./components/VisaFAQ";
import VisaBottomCTA from "./components/VisaBottomCTA";

export const metadata = {
  title: "Visa & Passport Information | 111 Group",
  description:
    "Explore visa requirements, passport information, and residency options for over 40 destinations worldwide. Book a free consultation with 111 Group's certified advisors.",
};

export default function VisaInformationPage() {
  return (
    <>
      <VisaHero />
      <VisaDestinations />
      <VisaTypes />
      <VisaHowItWorks />
      <VisaFAQ />
      <VisaBottomCTA />
    </>
  );
}

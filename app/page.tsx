import Hero from "./components/Hero";
import Services from "./components/Services";
import Manifesto from "./components/Manifesto";
import ProgramCalculator from "./components/ProgramCalculator";
import LatestArticles from "./components/LatestArticles";
import ContactCTA from "./components/ContactCTA";
import VideoHighlights from "./components/VideoHighlights";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Manifesto />
      <ProgramCalculator />
      <LatestArticles />
      <ContactCTA />
      <VideoHighlights />
    </>
  );
}

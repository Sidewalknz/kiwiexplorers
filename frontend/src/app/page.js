import Hero from "../components/Hero";
import AgeGroupsSection from "../components/AgeGroupsSection";
import MissionStatementSection from "@/components/MissionStatementSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
    <Hero />
    <MissionStatementSection />
    <AgeGroupsSection />
    <LocationSection />
    <Footer />
    </>
  );
}

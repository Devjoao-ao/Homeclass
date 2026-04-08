import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FormSection from "@/components/sections/FormSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <ServicesSection />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}


import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import RealDataServicesSection from "@/components/RealDataServicesSection";
import RealDataPackages from "@/components/RealDataPackages";
import SimpleDynamicPricing from "@/components/SimpleDynamicPricing";
import RealDataGallery from "@/components/RealDataGallery";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Hero />
      <SearchSection />
      <RealDataPackages />
      <SimpleDynamicPricing />
      <RealDataServicesSection />
      <RealDataGallery />
      <FeaturesSection />
      <Footer />
      <SimpleAIAssistant />
    </div>
  );
};

export default Index;

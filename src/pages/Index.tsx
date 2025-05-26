
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import ServicesSection from "@/components/ServicesSection";
import SmartRecommendations from "@/components/SmartRecommendations";
import DynamicPricing from "@/components/DynamicPricing";
import GallerySection from "@/components/GallerySection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Hero />
      <SearchSection />
      <SmartRecommendations />
      <DynamicPricing />
      <ServicesSection />
      <GallerySection />
      <FeaturesSection />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;

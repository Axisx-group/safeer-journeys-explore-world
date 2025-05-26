
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import ServicesSection from "@/components/ServicesSection";
import SimpleSmartRecommendations from "@/components/SimpleSmartRecommendations";
import SimpleDynamicPricing from "@/components/SimpleDynamicPricing";
import GallerySection from "@/components/GallerySection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Hero />
      <SearchSection />
      <SimpleSmartRecommendations />
      <SimpleDynamicPricing />
      <ServicesSection />
      <GallerySection />
      <FeaturesSection />
      <Footer />
      <SimpleAIAssistant />
    </div>
  );
};

export default Index;

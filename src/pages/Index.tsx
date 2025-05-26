
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AdvancedSearchSection from "@/components/advanced/AdvancedSearchSection";
import SmartRecommendationEngine from "@/components/advanced/SmartRecommendationEngine";
import AITravelAssistant from "@/components/ai/AITravelAssistant";
import InteractiveServicesGrid from "@/components/enhanced/InteractiveServicesGrid";
import RealDataPackages from "@/components/RealDataPackages";
import TravelStatsSection from "@/components/enhanced/TravelStatsSection";
import TestimonialsSection from "@/components/enhanced/TestimonialsSection";
import BlogSection from "@/components/enhanced/BlogSection";
import NewsletterSection from "@/components/enhanced/NewsletterSection";
import EnhancedGallery from "@/components/advanced/EnhancedGallery";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import RealTimeFlightData from "@/components/RealTimeFlightData";
import AdvancedAIChat from "@/components/AdvancedAIChat";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* AI Assistant Toggle */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'ar' ? 'جرب مساعد السفر الذكي' : 'Try Our AI Travel Assistant'}
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            {language === 'ar' 
              ? 'أخبرنا عن نفسيتك وتفضيلاتك وسنجد لك الوجهة المثالية'
              : 'Tell us about your mood and preferences, and we\'ll find your perfect destination'
            }
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            <Bot className="h-5 w-5 mr-2" />
            {showAIAssistant 
              ? (language === 'ar' ? 'إخفاء المساعد' : 'Hide Assistant')
              : (language === 'ar' ? 'ابدأ المحادثة' : 'Start Conversation')
            }
          </Button>
        </div>
      </section>

      {/* AI Travel Assistant */}
      {showAIAssistant && (
        <section className="py-12 bg-gray-50">
          <AITravelAssistant />
        </section>
      )}

      {/* Real-time Flight Data */}
      <RealTimeFlightData />

      <AdvancedSearchSection />
      <SmartRecommendationEngine />
      <InteractiveServicesGrid />
      <RealDataPackages />
      <TravelStatsSection />
      <TestimonialsSection />
      <EnhancedGallery />
      <BlogSection />
      <NewsletterSection />
      <FeaturesSection />
      <Footer />
      
      {/* Live Support Chat */}
      <LiveChat />
      
      {/* Advanced AI Chat */}
      <AdvancedAIChat />
    </div>
  );
};

export default Index;

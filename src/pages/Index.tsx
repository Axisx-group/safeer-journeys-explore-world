
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnifiedSearchSection from "@/components/UnifiedSearchSection";
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
import RealTimeHotelData from "@/components/RealTimeHotelData";
import AdvancedAIChat from "@/components/AdvancedAIChat";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const Index = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Unified Search Section */}
      <UnifiedSearchSection />
      
      {/* AI Assistant Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-full border border-white/30">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-12 w-12 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'ar' ? 'جرب مساعد السفر الذكي' : 'Try Our AI Travel Assistant'}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'أخبرنا عن تفضيلاتك وسنجد لك أفضل الوجهات الأوروبية'
                : 'Tell us your preferences and we\'ll find the best European destinations for you'
              }
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
              >
                <Bot className="h-6 w-6 mr-3" />
                <span>
                  {showAIAssistant 
                    ? (language === 'ar' ? 'إخفاء المساعد' : 'Hide Assistant')
                    : (language === 'ar' ? 'ابدأ المحادثة' : 'Start Conversation')
                  }
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Travel Assistant */}
      {showAIAssistant && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <AITravelAssistant />
        </motion.section>
      )}

      {/* Main Services Sections */}
      <div className="space-y-0">
        <RealTimeFlightData />
        <RealTimeHotelData />
      </div>

      {/* Advanced Features */}
      <div className="space-y-0 bg-gray-50">
        <AdvancedSearchSection />
        <SmartRecommendationEngine />
      </div>

      {/* Services and Content */}
      <div className="space-y-0">
        <InteractiveServicesGrid />
        <RealDataPackages />
        <TravelStatsSection />
      </div>

      {/* Social Proof and Content */}
      <div className="space-y-0 bg-gray-50">
        <TestimonialsSection />
        <EnhancedGallery />
        <BlogSection />
      </div>

      {/* Footer Sections */}
      <div className="space-y-0">
        <NewsletterSection />
        <FeaturesSection />
      </div>

      <Footer />
      
      {/* Support Components */}
      <LiveChat />
      <AdvancedAIChat />
    </div>
  );
};

export default Index;

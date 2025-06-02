
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnifiedSearchSection from "@/components/UnifiedSearchSection";
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
import AdvancedAIChat from "@/components/AdvancedAIChat";
import SmartChatInterface from "@/components/ai/SmartChatInterface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Zap, Star } from "lucide-react";
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
      
      {/* Enhanced AI Assistant Section - Ultra Modern Design */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-32 sm:w-48 h-32 sm:h-48 bg-cyan-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-10 right-10 w-24 sm:w-36 h-24 sm:h-36 bg-pink-400/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 border border-white/10 rounded-full"
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Enhanced Central Icon */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="relative">
                {/* Multiple Glow Layers */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{
                    scale: [1.1, 0.9, 1.1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 rounded-full blur-xl"
                />
                
                <div className="relative bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-full border-2 border-white/30 shadow-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <Bot className="h-10 w-10 sm:h-16 sm:w-16 text-white" />
                  </motion.div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32"
                  >
                    <Sparkles className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" />
                    <Zap className="absolute top-1/2 -right-2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-300" />
                    <Star className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-4 w-4 sm:h-5 sm:w-5 text-pink-300" />
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight px-2"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {language === 'ar' ? 'جرب مساعد السفر الذكي' : 'Try Our AI Travel Assistant'}
              </span>
            </motion.h2>
            
            {/* Enhanced Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4"
            >
              <span className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                {language === 'ar' 
                  ? 'أخبرنا عن تفضيلاتك وسنجد لك أفضل الوجهات الأوروبية'
                  : 'Tell us your preferences and we\'ll find the best European destinations for you'
                }
              </span>
            </motion.p>
            
            {/* Enhanced Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300" />
              <Button 
                size="lg" 
                className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white px-10 sm:px-16 py-4 sm:py-6 text-base sm:text-xl font-black rounded-full shadow-2xl border-2 border-white/30 w-full sm:w-auto backdrop-blur-sm"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div
                    animate={{ rotate: showAIAssistant ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Bot className="h-5 w-5 sm:h-7 sm:w-7" />
                  </motion.div>
                  <span>
                    {showAIAssistant 
                      ? (language === 'ar' ? 'إخفاء المساعد' : 'Hide Assistant')
                      : (language === 'ar' ? 'ابدأ المحادثة' : 'Start Conversation')
                    }
                  </span>
                  <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 animate-pulse" />
                </div>
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
          className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <AITravelAssistant />
        </motion.section>
      )}

      {/* Advanced Features */}
      <div className="space-y-0 bg-gray-50">
        <SmartRecommendationEngine />
      </div>

      <div className="space-y-0">
        <InteractiveServicesGrid />
        <RealDataPackages />
        <TravelStatsSection />
      </div>

      <div className="space-y-0 bg-gray-50">
        <TestimonialsSection />
        <EnhancedGallery />
        <BlogSection />
      </div>

      <div className="space-y-0">
        <NewsletterSection />
        <FeaturesSection />
      </div>

      <Footer />
      
      <LiveChat />
      <AdvancedAIChat />
      <SmartChatInterface />
    </div>
  );
};

export default Index;

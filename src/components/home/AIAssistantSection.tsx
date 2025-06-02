
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Zap, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import AITravelAssistant from "@/components/ai/AITravelAssistant";

interface AIAssistantSectionProps {
  showAIAssistant: boolean;
  setShowAIAssistant: (show: boolean) => void;
}

const AIAssistantSection = ({ showAIAssistant, setShowAIAssistant }: AIAssistantSectionProps) => {
  const { language } = useLanguage();

  return (
    <>
      {/* Enhanced AI Assistant Section - Ultra Modern Design - Improved mobile layout */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-cyan-400/20 rounded-full blur-2xl sm:blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-10 right-10 w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 bg-pink-400/20 rounded-full blur-xl sm:blur-2xl"
          />
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 border border-white/10 rounded-full"
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
            {/* Enhanced Central Icon - Improved mobile sizing */}
            <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12">
              <div className="relative">
                {/* Multiple Glow Layers */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-xl sm:blur-2xl"
                />
                <motion.div
                  animate={{
                    scale: [1.1, 0.9, 1.1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 rounded-full blur-lg sm:blur-xl"
                />
                
                <div className="relative bg-white/10 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-full border-2 border-white/30 shadow-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <Bot className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-white" />
                  </motion.div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32"
                  >
                    <Sparkles className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-yellow-300" />
                    <Zap className="absolute top-1/2 -right-1 sm:-right-2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-cyan-300" />
                    <Star className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-pink-300" />
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Title - Improved mobile sizing and line breaks */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6 lg:mb-8 leading-tight px-2"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block">
                {language === 'ar' ? 'جرب مساعد السفر الذكي' : 'Try Our AI Travel Assistant'}
              </span>
            </motion.h2>
            
            {/* Enhanced Subtitle - Improved mobile sizing and responsiveness */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-100 mb-6 sm:mb-8 lg:mb-12 leading-relaxed max-w-3xl mx-auto px-4"
            >
              <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full border border-white/20 inline-block">
                {language === 'ar' 
                  ? 'أخبرنا عن تفضيلاتك وسنجد لك أفضل الوجهات الأوروبية'
                  : 'Tell us your preferences and we\'ll find the best European destinations for you'
                }
              </span>
            </motion.p>
            
            {/* Enhanced Button - Improved mobile sizing */}
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
                className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white px-6 sm:px-8 lg:px-10 xl:px-16 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-xl font-black rounded-full shadow-2xl border-2 border-white/30 w-full sm:w-auto backdrop-blur-sm max-w-sm mx-auto"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
              >
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <motion.div
                    animate={{ rotate: showAIAssistant ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 lg:h-7 lg:w-7" />
                  </motion.div>
                  <span className="text-xs sm:text-sm lg:text-base">
                    {showAIAssistant 
                      ? (language === 'ar' ? 'إخفاء المساعد' : 'Hide Assistant')
                      : (language === 'ar' ? 'ابدأ المحادثة' : 'Start Conversation')
                    }
                  </span>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 lg:h-6 lg:w-6 animate-pulse" />
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
          className="py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <AITravelAssistant />
        </motion.section>
      )}
    </>
  );
};

export default AIAssistantSection;

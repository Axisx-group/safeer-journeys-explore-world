
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/booking');
  };

  const handleDiscoverOffers = () => {
    navigate('/offers');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-[20s] ease-linear hover:scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        
        {/* Modern Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-800/80 to-indigo-900/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-blue-900/20"></div>
        
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -20, -40, -20, 0],
              opacity: [0.4, 0.8, 0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full blur-xl opacity-50"
            />
            <div className="relative bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-full border border-white/20">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Globe className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Title - Improved mobile sizing */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="block text-white mb-1 sm:mb-2"
          >
            {t('heroTitle')}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(45deg, #fbbf24, #f97316, #ec4899)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            ur trvl
          </motion.span>
        </motion.h1>
        
        {/* Enhanced Subtitle - Improved mobile sizing */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 font-light"
        >
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20">
            {t('heroSubtitle')}
          </span>
        </motion.p>

        {/* Enhanced Buttons - Improved mobile layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className={`flex flex-col gap-3 sm:gap-4 justify-center items-center sm:flex-row ${language === 'ar' ? 'space-x-reverse' : ''}`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group w-full sm:w-auto"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300" />
            <Button 
              size="lg" 
              className="relative bg-gradient-to-r from-yellow-500 via-orange-600 to-pink-600 hover:from-yellow-600 hover:via-orange-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-2xl rounded-full border-2 border-white/30 w-full sm:w-auto min-w-[180px] sm:min-w-[200px] backdrop-blur-sm"
              onClick={handleStartJourney}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                <span className="font-extrabold">{t('startJourney')}</span>
                <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </div>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group w-full sm:w-auto"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="relative border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold backdrop-blur-md bg-white/10 w-full sm:w-auto min-w-[180px] sm:min-w-[200px] rounded-full transition-all duration-300"
              onClick={handleDiscoverOffers}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-bold">{t('discoverOffers')}</span>
              </div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats with Glassmorphism - Improved mobile grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {[
            { number: "1000+", label: t('hotels_count'), color: "from-yellow-400 to-orange-500" },
            { number: "500+", label: t('destinations_count'), color: "from-orange-500 to-pink-500" },
            { number: "50K+", label: t('happy_clients'), color: "from-pink-500 to-purple-500" },
            { number: "24/7", label: t('customer_support'), color: "from-purple-500 to-blue-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 group-hover:bg-white/20 transition-all duration-300" />
              <div className="relative p-3 sm:p-4 md:p-6">
                <div className={`text-lg sm:text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                  {stat.number}
                </div>
                <div className="text-blue-100 text-xs sm:text-sm md:text-base font-medium leading-tight">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

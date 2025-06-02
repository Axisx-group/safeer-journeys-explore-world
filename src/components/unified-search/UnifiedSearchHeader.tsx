
import { Sparkles, Search, Globe, Heart, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const UnifiedSearchHeader = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      {/* Add CSS for gradient animation */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-12 sm:mb-16 lg:mb-20"
      >
        {/* Enhanced Central Icon with 3D Effect - Improved mobile sizing */}
        <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
          <div className="relative">
            {/* Multiple Animated Glow Layers */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full blur-2xl sm:blur-3xl scale-125 sm:scale-150"
            />
            <motion.div
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-xl sm:blur-2xl scale-110 sm:scale-125"
            />
            
            {/* Main Icon Container with Glassmorphism */}
            <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/30">
              {/* Floating Icons Orbit */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                {/* Central Search Icon */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute z-10"
                >
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white drop-shadow-lg" />
                </motion.div>
                
                {/* Orbiting Elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-2 border-white/20 rounded-full"
                >
                  <Sparkles className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 h-3 w-3 sm:h-4 sm:w-4 text-yellow-300" />
                  <Globe className="absolute top-1/2 -right-1 sm:-right-2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-blue-300" />
                  <Heart className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 h-3 w-3 sm:h-4 sm:w-4 text-pink-300" />
                  <Star className="absolute top-1/2 -left-1 sm:-left-2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-purple-300" />
                </motion.div>
                
                {/* Inner Sparkles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                >
                  <Zap className="absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-2 sm:h-3 sm:w-3 text-orange-300" />
                  <Zap className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-2 sm:h-3 sm:w-3 text-cyan-300" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Title with Advanced Typography - Improved mobile sizing */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight px-2"
        >
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="block"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
              backgroundSize: "400% 400%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 8s ease infinite"
            }}
          >
            {isArabic ? 'ابحث واحجز' : 'Search & Book'}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="block mt-1 sm:mt-2"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #667eea 100%)",
              backgroundSize: "400% 400%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 8s ease infinite reverse"
            }}
          >
            {isArabic ? 'كل ما تحتاجه' : 'Everything You Need'}
          </motion.span>
        </motion.h2>

        {/* Enhanced Subtitle with Glassmorphism - Improved mobile sizing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-block bg-white/10 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full border border-white/20 shadow-2xl">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 font-medium">
              <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                {isArabic ? 'طيران، فنادق، وسيارات في مكان واحد' : 'Flights, Hotels, and Cars in One Place'}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Enhanced Feature Badges with Advanced Animations - Improved mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6"
        >
          {[
            { 
              text: isArabic ? 'أفضل الأسعار' : 'Best Prices', 
              gradient: 'from-emerald-400 via-green-500 to-teal-600',
              icon: Star,
              delay: 0
            },
            { 
              text: isArabic ? 'حجز سريع' : 'Quick Booking', 
              gradient: 'from-blue-400 via-cyan-500 to-indigo-600',
              icon: Zap,
              delay: 0.1
            },
            { 
              text: isArabic ? 'دعم متميز' : 'Premium Support', 
              gradient: 'from-purple-400 via-pink-500 to-rose-600',
              icon: Heart,
              delay: 0.2
            }
          ].map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.3 + badge.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${badge.gradient} rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300`} />
                <div className={`relative bg-gradient-to-r ${badge.gradient} text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-full text-xs sm:text-sm lg:text-base font-bold shadow-xl border-2 border-white/30 backdrop-blur-sm flex items-center gap-1 sm:gap-2`}>
                  <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  <span>{badge.text}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};

export default UnifiedSearchHeader;

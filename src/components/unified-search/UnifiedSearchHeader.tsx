
import { Sparkles, Search, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const UnifiedSearchHeader = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center mb-16"
    >
      {/* Enhanced icon animation */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Multiple glow layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse scale-150"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse delay-500 scale-125"></div>
          
          {/* Main icon container */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 rounded-3xl shadow-2xl border-4 border-white/30">
            {/* Rotating icons */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute"
              >
                <Search className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute"
              >
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </motion.div>
              
              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-20 h-20"
              >
                <Globe className="absolute top-0 left-1/2 transform -translate-x-1/2 h-4 w-4 text-blue-300" />
                <Heart className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-4 w-4 text-pink-300" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced title with gradient animation */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl md:text-7xl font-black mb-6 leading-tight"
      >
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
          {isArabic ? 'ابحث واحجز' : 'Search & Book'}
        </span>
        <br />
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          {isArabic ? 'كل ما تحتاجه' : 'Everything You Need'}
        </span>
      </motion.h2>

      {/* Enhanced subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed"
      >
        <span className="bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
          {isArabic ? 'طيران، فنادق، وسيارات في مكان واحد' : 'Flights, Hotels, and Cars in One Place'}
        </span>
      </motion.p>

      {/* Enhanced feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        {[
          { text: isArabic ? 'أفضل الأسعار' : 'Best Prices', color: 'from-green-500 to-emerald-600' },
          { text: isArabic ? 'حجز سريع' : 'Quick Booking', color: 'from-blue-500 to-cyan-600' },
          { text: isArabic ? 'دعم متميز' : 'Premium Support', color: 'from-purple-500 to-pink-600' }
        ].map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className={`bg-gradient-to-r ${badge.color} text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30`}
          >
            {badge.text}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default UnifiedSearchHeader;

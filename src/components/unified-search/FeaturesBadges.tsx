
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesBadges = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-8 flex justify-center"
    >
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">
            {isArabic ? 'أسعار حقيقية ومباشرة' : 'Real-time Prices'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/50">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          <span className="font-medium">
            {isArabic ? 'حجز فوري مؤكد' : 'Instant Booking'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200/50">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-600"></div>
          <span className="font-medium">
            {isArabic ? 'دعم 24/7' : '24/7 Support'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesBadges;

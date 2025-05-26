
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const UnifiedSearchHeader = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
            <Sparkles className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        {isArabic ? 'ابحث واحجز كل ما تحتاجه' : 'Search & Book Everything You Need'}
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {isArabic ? 'طيران، فنادق، وسيارات في مكان واحد' : 'Flights, Hotels, and Cars in One Place'}
      </p>
    </motion.div>
  );
};

export default UnifiedSearchHeader;

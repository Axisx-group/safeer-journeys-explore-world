
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FlightOffersHeader = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
        <span className="text-2xl">✈️</span>
        {isArabic ? 'عروض الطيران المميزة' : 'Featured Flight Offers'}
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {isArabic 
          ? 'اكتشف أفضل عروض الطيران إلى أجمل المدن الأوروبية'
          : 'Discover the best flight deals to Europe\'s most beautiful cities'
        }
      </p>
    </motion.div>
  );
};

export default FlightOffersHeader;

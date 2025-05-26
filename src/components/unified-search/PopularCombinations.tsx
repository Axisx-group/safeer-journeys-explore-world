
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface PopularCombinationsProps {
  onCombinationSelect: (flights: boolean, hotels: boolean, cars: boolean) => void;
}

const PopularCombinations = ({ onCombinationSelect }: PopularCombinationsProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const combinations = [
    { name: 'طيران + فندق', nameEn: 'Flight + Hotel', color: 'from-blue-500 to-purple-500', services: ['flights', 'hotels'] },
    { name: 'فندق + سيارة', nameEn: 'Hotel + Car', color: 'from-purple-500 to-indigo-500', services: ['hotels', 'cars'] },
    { name: 'باقة كاملة', nameEn: 'Complete Package', color: 'from-green-500 to-blue-500', services: ['flights', 'hotels', 'cars'] },
    { name: 'طيران فقط', nameEn: 'Flights Only', color: 'from-blue-500 to-cyan-500', services: ['flights'] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-12 text-center"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {isArabic ? 'باقات شائعة' : 'Popular Combinations'}
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {combinations.map((combo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onCombinationSelect(
                combo.services.includes('flights'),
                combo.services.includes('hotels'),
                combo.services.includes('cars')
              );
            }}
            className={`bg-gradient-to-r ${combo.color} text-white px-6 py-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 font-medium`}
          >
            {isArabic ? combo.name : combo.nameEn}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PopularCombinations;


import React from 'react';
import { Hotel } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const SearchFormHeader = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
          <Hotel className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {isArabic ? "ابحث عن الفنادق الأوروبية" : "Search European Hotels"}
          </h3>
          <p className="text-gray-600 text-sm">
            {isArabic ? "اكتشف أفضل الفنادق في أوروبا" : "Discover the best hotels in Europe"}
          </p>
        </div>
      </div>
      <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        {isArabic ? "فنادق أوروبية" : "European Hotels"}
      </Badge>
    </div>
  );
};

export default SearchFormHeader;

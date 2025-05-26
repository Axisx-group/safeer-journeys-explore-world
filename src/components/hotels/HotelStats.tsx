
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HotelStatsProps {
  currentCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

const HotelStats = ({ currentCount, totalCount, currentPage, totalPages }: HotelStatsProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="text-sm text-gray-600 mb-4">
      {isArabic ? 
        `عرض ${currentCount} من ${totalCount} فندق - الصفحة ${currentPage} من ${totalPages}` :
        `Showing ${currentCount} of ${totalCount} hotels - Page ${currentPage} of ${totalPages}`
      }
    </div>
  );
};

export default HotelStats;

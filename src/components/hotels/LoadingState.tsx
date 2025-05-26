
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LoadingState = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">
        {isArabic ? "جاري جلب فنادق Booking.com..." : "Fetching Booking.com hotels..."}
      </p>
    </div>
  );
};

export default LoadingState;

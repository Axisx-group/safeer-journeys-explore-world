
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HotelHeader = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {isArabic ? 'فنادق أوروبا من Booking.com' : 'European Hotels from Booking.com'}
      </h2>
      <p className="text-xl text-gray-600 mb-4">
        {isArabic ? 'اكتشف آلاف الفنادق الأوروبية مع أحدث الأسعار والمعلومات' : 'Discover thousands of European hotels with latest prices and information'}
      </p>
      
      <div className="flex justify-center items-center gap-2 text-blue-600 mb-4">
        <span className="text-lg font-semibold">
          {isArabic ? '🏨 فنادق Booking.com الحقيقية' : '🏨 Real Booking.com Hotels'}
        </span>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
          {isArabic ? 'بيانات مباشرة' : 'Live Data'}
        </span>
      </div>
    </div>
  );
};

export default HotelHeader;

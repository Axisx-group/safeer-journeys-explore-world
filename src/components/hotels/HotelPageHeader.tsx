
import { useLanguage } from "@/contexts/LanguageContext";

const HotelPageHeader = () => {
  const { language } = useLanguage();

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {language === 'ar' ? 'أفضل الفنادق الأوروبية' : 'Best European Hotels'}
      </h1>
      <p className="text-xl text-gray-600 mb-6">
        {language === 'ar' 
          ? 'اكتشف آلاف الفنادق الأوروبية مع أحدث الأسعار والعروض المميزة'
          : 'Discover thousands of European hotels with latest prices and exclusive offers'
        }
      </p>
      
      <div className="flex justify-center items-center gap-2 text-blue-600">
        <span className="text-lg font-semibold">
          {language === 'ar' ? '🏨 فنادق أوروبا الحقيقية' : '🏨 Real European Hotels'}
        </span>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
          {language === 'ar' ? 'بيانات مباشرة' : 'Live Data'}
        </span>
        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {language === 'ar' ? 'مئات الفنادق' : 'Hundreds of Hotels'}
        </span>
      </div>
    </div>
  );
};

export default HotelPageHeader;

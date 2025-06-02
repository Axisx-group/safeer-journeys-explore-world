
import { useLanguage } from "@/contexts/LanguageContext";

const HotelLoadingState = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">
        {language === 'ar' ? "جاري جلب الفنادق من Booking.com..." : "Fetching hotels from Booking.com..."}
      </p>
    </div>
  );
};

export default HotelLoadingState;

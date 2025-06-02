
import { Star, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const BookingHeader = () => {
  const { language } = useLanguage();
  const { userProfile } = useAuth();
  const isArabic = language === 'ar';

  return (
    <div className="bg-gradient-to-r from-[#003580] to-[#0057b8] text-white rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-6 w-6" />
            <span className="text-sm font-medium">
              {isArabic ? 'حجز موثوق' : 'Trusted Booking'}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isArabic ? `أهلاً وسهلاً ${userProfile?.first_name || ''}!` : `Hello ${userProfile?.first_name || ''}!`}
          </h1>
          <p className="text-blue-100">
            {isArabic ? 'أحجز رحلتك القادمة بسهولة وأمان' : 'Book your next trip easily and securely'}
          </p>
        </div>
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-4">
            <Star className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">
              {isArabic ? 'تقييم ممتاز' : 'Excellent Rating'}
            </p>
            <p className="text-xs text-blue-200">9.2/10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;

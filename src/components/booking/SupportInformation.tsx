
import { Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SupportInformation = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Phone className="h-8 w-8 text-[#003580]" />
            <div className="text-left">
              <h4 className="font-bold text-[#003580] text-lg">
                {isArabic ? 'هل تحتاج مساعدة؟' : 'Need assistance?'}
              </h4>
              <p className="text-gray-700 text-sm">
                {isArabic 
                  ? 'فريق الدعم متاح 24/7 لمساعدتك في حجزك'
                  : 'Our support team is available 24/7 to help with your booking'
                }
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <span className="bg-[#003580] text-white px-4 py-2 rounded-full">
              📞 +966 11 123 4567
            </span>
            <span className="bg-green-600 text-white px-4 py-2 rounded-full">
              💬 {isArabic ? 'دردشة مباشرة' : 'Live Chat'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportInformation;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Thermometer, 
  Star, 
  Sun,
  Shield,
  CreditCard,
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Destination } from "@/hooks/useDestinations";

interface DestinationQuickInfoProps {
  destination: Destination;
}

const DestinationQuickInfo = ({ destination }: DestinationQuickInfoProps) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'ar' ? 'معلومات سريعة' : 'Quick Info'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-sm">
              {language === 'ar' ? 'متوسط الحرارة' : 'Avg Temperature'}
            </span>
          </div>
          <span className="font-semibold">{destination.average_temperature}°C</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sun className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm">
              {language === 'ar' ? 'أفضل وقت' : 'Best Season'}
            </span>
          </div>
          <span className="font-semibold">{destination.best_season}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm">
              {language === 'ar' ? 'تقييم الأمان' : 'Safety Rating'}
            </span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < (destination.safety_rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm">
              {language === 'ar' ? 'العملة' : 'Currency'}
            </span>
          </div>
          <span className="font-semibold">{destination.currency}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm">
              {language === 'ar' ? 'تأشيرة مطلوبة' : 'Visa Required'}
            </span>
          </div>
          <span className="font-semibold">
            {destination.visa_required 
              ? (language === 'ar' ? 'نعم' : 'Yes')
              : (language === 'ar' ? 'لا' : 'No')
            }
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationQuickInfo;


import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HotelEmptyStateProps {
  onFetchNewData: () => void;
  isFetching: boolean;
}

const HotelEmptyState = ({ onFetchNewData, isFetching }: HotelEmptyStateProps) => {
  const { language } = useLanguage();

  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <div className="text-gray-500 mb-4">
        <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold mb-2">
          {language === 'ar' ? "لا توجد فنادق متاحة" : "No hotels available"}
        </h3>
        <p className="text-sm mb-4">
          {language === 'ar' ? "اضغط على 'جلب فنادق جديدة' لتحديث البيانات" : "Click 'Fetch New Hotels' to update data"}
        </p>
        <Button onClick={onFetchNewData} disabled={isFetching}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
          {language === 'ar' ? "جلب الفنادق" : "Fetch Hotels"}
        </Button>
      </div>
    </div>
  );
};

export default HotelEmptyState;

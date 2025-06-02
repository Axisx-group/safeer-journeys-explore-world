
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HotelFiltersActionsProps {
  onClearFilters: () => void;
  onFetchNewData: () => void;
  isFetching: boolean;
}

const HotelFiltersActions = ({ onClearFilters, onFetchNewData, isFetching }: HotelFiltersActionsProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <X className="h-4 w-4" />
        {isArabic ? 'مسح الفلاتر' : 'Clear Filters'}
      </Button>
      
      <Button 
        onClick={onFetchNewData}
        disabled={isFetching}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg"
      >
        <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
        {isArabic ? 'جلب فنادق جديدة' : 'Fetch New Hotels'}
      </Button>
    </div>
  );
};

export default HotelFiltersActions;

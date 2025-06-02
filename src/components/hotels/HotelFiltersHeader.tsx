
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HotelFiltersHeaderProps {
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
}

const HotelFiltersHeader = ({ showAdvanced, onToggleAdvanced }: HotelFiltersHeaderProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          {isArabic ? 'فلترة الفنادق' : 'Filter Hotels'}
        </h3>
      </div>
      <Button
        variant="outline"
        onClick={onToggleAdvanced}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        {isArabic ? 'فلاتر متقدمة' : 'Advanced Filters'}
      </Button>
    </div>
  );
};

export default HotelFiltersHeader;

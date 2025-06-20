
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdvancedHotelFiltersProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    minRating: number;
  };
  onUpdateFilter: (key: string, value: any) => void;
}

const AdvancedHotelFilters = ({ filters, onUpdateFilter }: AdvancedHotelFiltersProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="border-t border-gray-200 pt-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="text-lg">💰</span>
            {isArabic ? `نطاق السعر: €${filters.minPrice} - €${filters.maxPrice}` : `Price Range: €${filters.minPrice} - €${filters.maxPrice}`}
          </Label>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) => {
              onUpdateFilter('minPrice', min);
              onUpdateFilter('maxPrice', max);
            }}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-600" />
            {isArabic ? `الحد الأدنى للتقييم: ${filters.minRating}★` : `Minimum Rating: ${filters.minRating}★`}
          </Label>
          <Slider
            value={[filters.minRating]}
            onValueChange={([rating]) => onUpdateFilter('minRating', rating)}
            max={10}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedHotelFilters;

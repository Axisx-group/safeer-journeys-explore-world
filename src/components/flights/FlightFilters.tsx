
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { RotateCcw } from 'lucide-react';

interface FlightFiltersProps {
  filters: {
    maxPrice: number;
    airline: string;
    stops: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
  flightCount: number;
}

const FlightFilters = ({ filters, onFiltersChange, flightCount }: FlightFiltersProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      maxPrice: 5000,
      airline: '',
      stops: 'all',
      sortBy: 'price'
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {isArabic ? 'المرشحات' : 'Filters'}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="text-xs"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            {isArabic ? 'إعادة تعيين' : 'Reset'}
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          {isArabic ? `${flightCount} رحلة` : `${flightCount} flights`}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            {isArabic ? 'الحد الأقصى للسعر' : 'Max Price'}
          </Label>
          <div className="px-2">
            <Slider
              value={[filters.maxPrice]}
              onValueChange={(value) => handleFilterChange('maxPrice', value[0])}
              max={5000}
              min={100}
              step={50}
              className="w-full"
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            €{filters.maxPrice}
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {isArabic ? 'ترتيب حسب' : 'Sort by'}
          </Label>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">
                {isArabic ? 'السعر' : 'Price'}
              </SelectItem>
              <SelectItem value="duration">
                {isArabic ? 'المدة' : 'Duration'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stops */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {isArabic ? 'التوقفات' : 'Stops'}
          </Label>
          <Select value={filters.stops} onValueChange={(value) => handleFilterChange('stops', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {isArabic ? 'جميع الرحلات' : 'All flights'}
              </SelectItem>
              <SelectItem value="direct">
                {isArabic ? 'رحلات مباشرة' : 'Direct flights'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Airline */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {isArabic ? 'شركة الطيران' : 'Airline'}
          </Label>
          <Input
            placeholder={isArabic ? 'البحث عن شركة طيران' : 'Search airline'}
            value={filters.airline}
            onChange={(e) => handleFilterChange('airline', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightFilters;

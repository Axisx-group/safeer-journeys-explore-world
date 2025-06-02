
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RefreshCw, Filter, X, MapPin, Calendar, Users, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface EnhancedHotelFiltersProps {
  filters: {
    searchTerm: string;
    country: string;
    city: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    rooms: number;
    minPrice: number;
    maxPrice: number;
    minRating: number;
  };
  onFiltersChange: (filters: any) => void;
  onFetchNewData: () => void;
  isFetching: boolean;
}

const europeanCountries = [
  { code: 'ES', name: 'Spain', nameAr: 'إسبانيا' },
  { code: 'FR', name: 'France', nameAr: 'فرنسا' },
  { code: 'IT', name: 'Italy', nameAr: 'إيطاليا' },
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا' },
  { code: 'UK', name: 'United Kingdom', nameAr: 'المملكة المتحدة' },
  { code: 'NL', name: 'Netherlands', nameAr: 'هولندا' },
  { code: 'PT', name: 'Portugal', nameAr: 'البرتغال' },
  { code: 'GR', name: 'Greece', nameAr: 'اليونان' },
  { code: 'AT', name: 'Austria', nameAr: 'النمسا' },
  { code: 'CH', name: 'Switzerland', nameAr: 'سويسرا' }
];

const europeanCities = [
  { name: 'Madrid', nameAr: 'مدريد', country: 'ES' },
  { name: 'Barcelona', nameAr: 'برشلونة', country: 'ES' },
  { name: 'Paris', nameAr: 'باريس', country: 'FR' },
  { name: 'Rome', nameAr: 'روما', country: 'IT' },
  { name: 'Milan', nameAr: 'ميلان', country: 'IT' },
  { name: 'Berlin', nameAr: 'برلين', country: 'DE' },
  { name: 'London', nameAr: 'لندن', country: 'UK' },
  { name: 'Amsterdam', nameAr: 'أمستردام', country: 'NL' },
  { name: 'Lisbon', nameAr: 'لشبونة', country: 'PT' },
  { name: 'Athens', nameAr: 'أثينا', country: 'GR' },
  { name: 'Vienna', nameAr: 'فيينا', country: 'AT' },
  { name: 'Zurich', nameAr: 'زيورخ', country: 'CH' }
];

const EnhancedHotelFilters = ({ filters, onFiltersChange, onFetchNewData, isFetching }: EnhancedHotelFiltersProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      country: '',
      city: '',
      checkInDate: new Date().toISOString().split('T')[0],
      checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      guests: 2,
      rooms: 1,
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0
    });
  };

  const filteredCities = filters.country 
    ? europeanCities.filter(city => city.country === filters.country)
    : europeanCities;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
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
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {isArabic ? 'فلاتر متقدمة' : 'Advanced Filters'}
        </Button>
      </div>

      {/* Basic Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search Term */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            {isArabic ? 'البحث' : 'Search'}
          </Label>
          <Input
            type="text"
            placeholder={isArabic ? 'ابحث عن فندق أو مدينة...' : 'Search hotels or cities...'}
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            {isArabic ? 'البلد' : 'Country'}
          </Label>
          <Select value={filters.country} onValueChange={(value) => updateFilter('country', value)}>
            <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-green-500 rounded-lg">
              <SelectValue placeholder={isArabic ? 'اختر البلد' : 'Select Country'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{isArabic ? 'جميع البلدان' : 'All Countries'}</SelectItem>
              {europeanCountries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {isArabic ? country.nameAr : country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            {isArabic ? 'المدينة' : 'City'}
          </Label>
          <Select value={filters.city} onValueChange={(value) => updateFilter('city', value)}>
            <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500 rounded-lg">
              <SelectValue placeholder={isArabic ? 'اختر المدينة' : 'Select City'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{isArabic ? 'جميع المدن' : 'All Cities'}</SelectItem>
              {filteredCities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {isArabic ? city.nameAr : city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-600" />
            {isArabic ? 'النزلاء' : 'Guests'}
          </Label>
          <Select value={filters.guests.toString()} onValueChange={(value) => updateFilter('guests', parseInt(value))}>
            <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-orange-500 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {isArabic ? (num === 1 ? 'نزيل' : 'نزلاء') : (num === 1 ? 'Guest' : 'Guests')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600" />
            {isArabic ? 'تاريخ الوصول' : 'Check-in Date'}
          </Label>
          <Input
            type="date"
            value={filters.checkInDate}
            onChange={(e) => updateFilter('checkInDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="h-11 border-2 border-gray-200 focus:border-green-500 rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            {isArabic ? 'تاريخ المغادرة' : 'Check-out Date'}
          </Label>
          <Input
            type="date"
            value={filters.checkOutDate}
            onChange={(e) => updateFilter('checkOutDate', e.target.value)}
            min={filters.checkInDate || new Date().toISOString().split('T')[0]}
            className="h-11 border-2 border-gray-200 focus:border-purple-500 rounded-lg"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
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
                  updateFilter('minPrice', min);
                  updateFilter('maxPrice', max);
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
                onValueChange={([rating]) => updateFilter('minRating', rating)}
                max={10}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>

          {/* Rooms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="text-lg">🏠</span>
              {isArabic ? 'عدد الغرف' : 'Number of Rooms'}
            </Label>
            <Select value={filters.rooms.toString()} onValueChange={(value) => updateFilter('rooms', parseInt(value))}>
              <SelectTrigger className="w-full md:w-48 h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {isArabic ? (num === 1 ? 'غرفة' : 'غرف') : (num === 1 ? 'Room' : 'Rooms')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={clearFilters}
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
    </div>
  );
};

export default EnhancedHotelFilters;


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { europeanCountries, europeanCities } from "./hotelFiltersData";

interface BasicHotelFiltersProps {
  filters: {
    searchTerm: string;
    country: string;
    city: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
  };
  onUpdateFilter: (key: string, value: any) => void;
}

const BasicHotelFilters = ({ filters, onUpdateFilter }: BasicHotelFiltersProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const filteredCities = filters.country && filters.country !== 'all'
    ? europeanCities.filter(city => city.country === filters.country)
    : europeanCities;

  return (
    <>
      {/* Enhanced Global Search - Single Line Search */}
      <div className="mb-6">
        <Label className="text-lg font-bold text-gray-800 flex items-center gap-3 mb-3">
          <Search className="h-5 w-5 text-blue-600" />
          {isArabic ? 'بحث شامل في جميع الفنادق' : 'Global Hotel Search'}
        </Label>
        <div className="relative">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 ${isArabic ? 'right-4' : 'left-4'}`} />
          <Input
            type="text"
            placeholder={isArabic ? 'ابحث في اسم الفندق، المدينة، البلد، المرافق...' : 'Search hotels, cities, countries, amenities...'}
            value={filters.searchTerm}
            onChange={(e) => onUpdateFilter('searchTerm', e.target.value)}
            className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-blue-500 rounded-lg text-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white/90`}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {isArabic ? 
            'اكتب أي شيء: اسم الفندق، المدينة، البلد، المرافق (WiFi، مسبح، سبا...)' :
            'Type anything: hotel name, city, country, amenities (WiFi, pool, spa...)'
          }
        </p>
      </div>

      {/* Basic Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Country */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            {isArabic ? 'البلد' : 'Country'}
          </Label>
          <Select value={filters.country} onValueChange={(value) => onUpdateFilter('country', value)}>
            <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-green-500 rounded-lg">
              <SelectValue placeholder={isArabic ? 'اختر البلد' : 'Select Country'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isArabic ? 'جميع البلدان' : 'All Countries'}</SelectItem>
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
          <Select value={filters.city} onValueChange={(value) => onUpdateFilter('city', value)}>
            <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500 rounded-lg">
              <SelectValue placeholder={isArabic ? 'اختر المدينة' : 'Select City'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isArabic ? 'جميع المدن' : 'All Cities'}</SelectItem>
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
          <Select value={filters.guests.toString()} onValueChange={(value) => onUpdateFilter('guests', parseInt(value))}>
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
            onChange={(e) => onUpdateFilter('checkInDate', e.target.value)}
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
            onChange={(e) => onUpdateFilter('checkOutDate', e.target.value)}
            min={filters.checkInDate || new Date().toISOString().split('T')[0]}
            className="h-11 border-2 border-gray-200 focus:border-purple-500 rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default BasicHotelFilters;

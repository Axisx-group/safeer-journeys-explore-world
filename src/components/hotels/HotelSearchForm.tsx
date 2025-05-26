
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCities, europeanCurrencies } from '@/constants/europeanData';

interface HotelSearchFormProps {
  searchParams: {
    city: string;
    check_in_date: string;
    check_out_date: string;
    currency?: string;
  };
  onSearchParamsChange: (params: any) => void;
  onSearch: () => void;
  onFetchNewData: () => void;
  isLoading: boolean;
  isFetching: boolean;
}

const HotelSearchForm: React.FC<HotelSearchFormProps> = ({
  searchParams,
  onSearchParamsChange,
  onSearch,
  onFetchNewData,
  isLoading,
  isFetching
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [cityInput, setCityInput] = useState(searchParams.city);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCityInputChange = (value: string) => {
    setCityInput(value);
    
    if (value.length > 0) {
      const filtered = europeanCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10);
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setCityInput(city);
    onSearchParamsChange(prev => ({ ...prev, city }));
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    onSearchParamsChange(prev => ({ ...prev, city: cityInput }));
    onSearch();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">
            {isArabic ? "المدينة" : "City"}
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder={isArabic ? "ابحث عن مدينة أوروبية..." : "Search European city..."}
              value={cityInput}
              onChange={(e) => handleCityInputChange(e.target.value)}
              onFocus={() => cityInput.length > 0 && setShowSuggestions(true)}
              className="w-full"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            
            {showSuggestions && filteredCities.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {isArabic ? "تاريخ الوصول" : "Check-in Date"}
          </label>
          <Input
            type="date"
            value={searchParams.check_in_date}
            onChange={(e) => onSearchParamsChange(prev => ({ ...prev, check_in_date: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {isArabic ? "تاريخ المغادرة" : "Check-out Date"}
          </label>
          <Input
            type="date"
            value={searchParams.check_out_date}
            onChange={(e) => onSearchParamsChange(prev => ({ ...prev, check_out_date: e.target.value }))}
            min={searchParams.check_in_date || new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {isArabic ? "العملة" : "Currency"}
          </label>
          <Select 
            value={searchParams.currency || 'EUR'} 
            onValueChange={(value) => onSearchParamsChange(prev => ({ ...prev, currency: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={isArabic ? "اختر العملة" : "Select Currency"} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {europeanCurrencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center space-x-2">
                    <span>{currency.symbol}</span>
                    <span>{isArabic ? currency.nameAr : currency.name}</span>
                    <span className="text-gray-500">({currency.code})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 flex flex-col justify-end">
          <Button 
            onClick={handleSearch} 
            disabled={isLoading || isFetching}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                {isArabic ? "جاري البحث..." : "Searching..."}
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                {isArabic ? "بحث" : "Search"}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={onFetchNewData} 
          disabled={isFetching}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          {isArabic ? "تحديث البيانات" : "Update Data"}
        </Button>
      </div>
    </div>
  );
};

export default HotelSearchForm;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Search, Hotel, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCities } from '@/constants/europeanCities';
import { europeanCurrencies } from '@/constants/europeanData';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
              <Hotel className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {isArabic ? "ابحث عن الفنادق الأوروبية" : "Search European Hotels"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isArabic ? "اكتشف أفضل الفنادق في أوروبا" : "Discover the best hotels in Europe"}
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            {isArabic ? "فنادق أوروبية" : "European Hotels"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              {isArabic ? "المدينة" : "City"}
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder={isArabic ? "اختر مدينة أوروبية..." : "Choose European city..."}
                value={cityInput}
                onChange={(e) => handleCityInputChange(e.target.value)}
                onFocus={() => cityInput.length > 0 && setShowSuggestions(true)}
                className="w-full h-12 pr-4 pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              {showSuggestions && filteredCities.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors flex items-center gap-2"
                      onClick={() => handleCitySelect(city)}
                    >
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              {isArabic ? "تاريخ الوصول" : "Check-in"}
            </label>
            <Input
              type="date"
              value={searchParams.check_in_date}
              onChange={(e) => onSearchParamsChange(prev => ({ ...prev, check_in_date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full h-12 border-2 border-gray-200 focus:border-green-500 rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              {isArabic ? "تاريخ المغادرة" : "Check-out"}
            </label>
            <Input
              type="date"
              value={searchParams.check_out_date}
              onChange={(e) => onSearchParamsChange(prev => ({ ...prev, check_out_date: e.target.value }))}
              min={searchParams.check_in_date || new Date().toISOString().split('T')[0]}
              className="w-full h-12 border-2 border-gray-200 focus:border-purple-500 rounded-lg"
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
              <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-xl z-50 rounded-lg">
                {europeanCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center space-x-2">
                      <span>{currency.symbol}</span>
                      <span>{isArabic ? currency.nameAr : currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col justify-end">
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || isFetching}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg"
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

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isArabic ? 
              "🏨 اكتشف أفضل الفنادق الأوروبية بأسعار تنافسية" :
              "🏨 Discover the best European hotels at competitive prices"
            }
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={onFetchNewData} 
          disabled={isFetching}
          className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin text-blue-600' : 'text-gray-600'}`} />
          <span>{isArabic ? "تحديث البيانات" : "Update Data"}</span>
        </Button>
      </div>
    </div>
  );
};

export default HotelSearchForm;

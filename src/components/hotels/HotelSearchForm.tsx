
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Search, Hotel, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCities, europeanCurrencies } from '@/constants/europeanData';
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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 rounded-2xl shadow-2xl p-8 border border-green-100/50 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="flex items-center justify-between mb-8 relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full">
                <Hotel className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {isArabic ? "ابحث عن الفنادق الأوروبية" : "Search European Hotels"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isArabic ? "اكتشف أفضل الفنادق بأجود الخدمات" : "Discover the best hotels with premium services"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-green-500" />
            </motion.div>
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 px-4 py-1 font-semibold">
              {isArabic ? "فنادق أوروبية" : "European Hotels"}
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-4 py-1 font-semibold">
              {isArabic ? "خدمة مميزة" : "Premium Service"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3 relative"
          >
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              {isArabic ? "المدينة" : "City"}
            </label>
            <div className="relative group">
              <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <Input
                type="text"
                placeholder={isArabic ? "ابحث عن مدينة أوروبية..." : "Search European city..."}
                value={cityInput}
                onChange={(e) => handleCityInputChange(e.target.value)}
                onFocus={() => cityInput.length > 0 && setShowSuggestions(true)}
                className="w-full h-14 pr-12 pl-4 border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
              
              {showSuggestions && filteredCities.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto backdrop-blur-sm">
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-green-50 cursor-pointer text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                      onClick={() => handleCitySelect(city)}
                    >
                      <MapPin className="h-4 w-4 text-green-600" />
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              {isArabic ? "تاريخ الوصول" : "Check-in Date"}
            </label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                type="date"
                value={searchParams.check_in_date}
                onChange={(e) => onSearchParamsChange(prev => ({ ...prev, check_in_date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-14 pl-12 pr-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              {isArabic ? "تاريخ المغادرة" : "Check-out Date"}
            </label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              <Input
                type="date"
                value={searchParams.check_out_date}
                onChange={(e) => onSearchParamsChange(prev => ({ ...prev, check_out_date: e.target.value }))}
                min={searchParams.check_in_date || new Date().toISOString().split('T')[0]}
                className="w-full h-14 pl-12 pr-4 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            <label className="text-sm font-bold text-gray-700">
              {isArabic ? "العملة" : "Currency"}
            </label>
            <Select 
              value={searchParams.currency || 'EUR'} 
              onValueChange={(value) => onSearchParamsChange(prev => ({ ...prev, currency: value }))}
            >
              <SelectTrigger className="w-full h-14 border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder={isArabic ? "اختر العملة" : "Select Currency"} />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 shadow-xl z-50 rounded-xl">
                {europeanCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} className="hover:bg-indigo-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{currency.symbol}</span>
                      <span className="font-medium">{isArabic ? currency.nameAr : currency.name}</span>
                      <span className="text-gray-500 text-sm">({currency.code})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-3 flex flex-col justify-end"
          >
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || isFetching}
              className="w-full h-14 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              {isLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-3 animate-spin relative z-10" />
                  <span className="relative z-10">{isArabic ? "جاري البحث..." : "Searching..."}</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-3 relative z-10" />
                  <span className="relative z-10">{isArabic ? "بحث" : "Search"}</span>
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {isFetching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-3 text-green-600 text-sm bg-green-50 px-6 py-3 rounded-full border border-green-200">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="font-medium">
                {isArabic ? "جلب أحدث بيانات الفنادق..." : "Fetching latest hotel data..."}
              </span>
            </div>
          </motion.div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-full border border-gray-200">
            {isArabic ? 
              "🏨 اكتشف أفضل الفنادق الأوروبية مع خدمات مميزة وأسعار تنافسية" :
              "🏨 Discover the best European hotels with premium services and competitive prices"
            }
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center"
      >
        <Button 
          variant="outline" 
          onClick={onFetchNewData} 
          disabled={isFetching}
          className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          <RefreshCw className={`h-5 w-5 ${isFetching ? 'animate-spin text-blue-600' : 'text-gray-600'}`} />
          <span className="font-medium">{isArabic ? "تحديث البيانات" : "Update Data"}</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default HotelSearchForm;

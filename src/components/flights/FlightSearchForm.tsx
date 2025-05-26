
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Plane, Sparkles, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { worldCities } from '@/constants/worldCities';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface FlightSearchFormProps {
  searchParams: {
    departure_city: string;
    arrival_city: string;
    departure_date: string;
  };
  onSearchParamsChange: (params: any) => void;
  onSearch: () => void;
  isLoading: boolean;
  isFetching: boolean;
  dataSource?: string;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  searchParams,
  onSearchParamsChange,
  onSearch,
  isLoading,
  isFetching,
  dataSource
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-2xl p-8 border border-blue-100/50 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Plane className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isArabic ? "ابحث واحجز رحلتك" : "Search & Book Your Flight"}
            </h3>
            <p className="text-gray-600 text-sm">
              {isArabic ? "أفضل الأسعار مع الحجز المباشر" : "Best prices with direct booking"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5 text-blue-500" />
          </motion.div>
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-4 py-1 font-semibold">
            {isArabic ? "حجز مباشر" : "Direct Booking"}
          </Badge>
          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 px-4 py-1 font-semibold">
            {isArabic ? "أفضل الأسعار" : "Best Prices"}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            {isArabic ? "مدينة المغادرة" : "Departure City"}
          </label>
          <div className="relative group">
            <select
              value={searchParams.departure_city}
              onChange={(e) => onSearchParamsChange(prev => ({ ...prev, departure_city: e.target.value }))}
              className="w-full h-14 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 appearance-none cursor-pointer group-hover:border-blue-300"
            >
              {worldCities.map(city => (
                <option key={city.code} value={city.ar}>
                  {isArabic ? city.ar : city.en}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            {isArabic ? "مدينة الوصول" : "Arrival City"}
          </label>
          <div className="relative group">
            <select
              value={searchParams.arrival_city}
              onChange={(e) => onSearchParamsChange(prev => ({ ...prev, arrival_city: e.target.value }))}
              className="w-full h-14 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 appearance-none cursor-pointer group-hover:border-purple-300"
            >
              {worldCities.map(city => (
                <option key={city.code} value={city.ar}>
                  {isArabic ? city.ar : city.en}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600" />
            {isArabic ? "تاريخ المغادرة" : "Departure Date"}
          </label>
          <div className="relative group">
            <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
            <Input
              type="date"
              value={searchParams.departure_date}
              onChange={(e) => onSearchParamsChange(prev => ({ ...prev, departure_date: e.target.value }))}
              className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm`}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3 flex flex-col justify-end"
        >
          <Button 
            onClick={onSearch} 
            disabled={isLoading || isFetching}
            className="h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            {isLoading ? (
              <>
                <RefreshCw className="h-5 w-5 mr-3 animate-spin relative z-10" />
                <span className="relative z-10">{isArabic ? "جاري البحث..." : "Searching..."}</span>
              </>
            ) : (
              <>
                <Plane className="h-5 w-5 mr-3 relative z-10" />
                <span className="relative z-10">{isArabic ? "بحث واحجز" : "Search & Book"}</span>
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
          <div className="inline-flex items-center gap-3 text-blue-600 text-sm bg-blue-50 px-6 py-3 rounded-full border border-blue-200">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="font-medium">
              {isArabic ? "جلب أحدث الأسعار والرحلات المتاحة..." : "Fetching latest prices and available flights..."}
            </span>
          </div>
        </motion.div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full border border-gray-200">
          {isArabic ? 
            "🎯 نوفر لك أفضل الأسعار وخدمة الحجز المباشر بضمان الجودة والموثوقية" :
            "🎯 We provide you with the best prices and direct booking service with quality and reliability guarantee"
          }
        </p>
      </div>
    </motion.div>
  );
};

export default FlightSearchForm;

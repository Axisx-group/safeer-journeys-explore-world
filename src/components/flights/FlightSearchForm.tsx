
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Plane } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { worldCities } from '@/constants/worldCities';
import { Badge } from '@/components/ui/badge';

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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {isArabic ? "البحث عن الرحلات" : "Flight Search"}
          </h3>
        </div>
        {dataSource && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {dataSource.includes('skyscanner') ? 'Skyscanner + Booking.com' : 
             dataSource.includes('booking') ? 'Booking.com' : 
             dataSource}
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {isArabic ? "مدينة المغادرة" : "Departure City"}
          </label>
          <select
            value={searchParams.departure_city}
            onChange={(e) => onSearchParamsChange(prev => ({ ...prev, departure_city: e.target.value }))}
            className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            {worldCities.map(city => (
              <option key={city.code} value={city.ar}>
                {isArabic ? city.ar : city.en}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {isArabic ? "مدينة الوصول" : "Arrival City"}
          </label>
          <select
            value={searchParams.arrival_city}
            onChange={(e) => onSearchParamsChange(prev => ({ ...prev, arrival_city: e.target.value }))}
            className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            {worldCities.map(city => (
              <option key={city.code} value={city.ar}>
                {isArabic ? city.ar : city.en}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {isArabic ? "تاريخ المغادرة" : "Departure Date"}
          </label>
          <Input
            type="date"
            value={searchParams.departure_date}
            onChange={(e) => onSearchParamsChange(prev => ({ ...prev, departure_date: e.target.value }))}
            className="h-11"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="space-y-2 flex flex-col justify-end">
          <Button 
            onClick={onSearch} 
            disabled={isLoading || isFetching}
            className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                {isArabic ? "جاري البحث..." : "Searching..."}
              </>
            ) : (
              <>
                <Plane className="h-4 w-4 mr-2" />
                {isArabic ? "بحث" : "Search"}
              </>
            )}
          </Button>
        </div>
      </div>
      
      {isFetching && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 text-sm">
            <RefreshCw className="h-4 w-4 animate-spin" />
            {isArabic ? "جلب أحدث البيانات من Skyscanner..." : "Fetching latest data from Skyscanner..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearchForm;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { worldCities } from '@/constants/worldCities';

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
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  searchParams,
  onSearchParamsChange,
  onSearch,
  isLoading,
  isFetching
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {isArabic ? "مدينة المغادرة" : "Departure City"}
        </label>
        <select
          value={searchParams.departure_city}
          onChange={(e) => onSearchParamsChange(prev => ({ ...prev, departure_city: e.target.value }))}
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
          className="h-10"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <div className="space-y-2 flex flex-col justify-end">
        <Button 
          onClick={onSearch} 
          disabled={isLoading || isFetching}
          className="h-10 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {isArabic ? "جاري البحث..." : "Searching..."}
            </>
          ) : (
            isArabic ? "بحث" : "Search"
          )}
        </Button>
      </div>
    </div>
  );
};

export default FlightSearchForm;


import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import SearchFormHeader from './SearchFormHeader';
import CitySearchInput from './CitySearchInput';
import DateRangeInputs from './DateRangeInputs';
import CurrencyDropdown from './CurrencyDropdown';
import SearchButton from './SearchButton';

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

  const handleCityChange = (city: string) => {
    onSearchParamsChange(prev => ({ ...prev, city }));
  };

  const handleCheckInChange = (date: string) => {
    onSearchParamsChange(prev => ({ ...prev, check_in_date: date }));
  };

  const handleCheckOutChange = (date: string) => {
    onSearchParamsChange(prev => ({ ...prev, check_out_date: date }));
  };

  const handleCurrencyChange = (currency: string) => {
    onSearchParamsChange(prev => ({ ...prev, currency }));
  };

  const handleSearch = () => {
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
        <SearchFormHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <CitySearchInput
            value={searchParams.city}
            onChange={handleCityChange}
          />
          
          <DateRangeInputs
            checkInDate={searchParams.check_in_date}
            checkOutDate={searchParams.check_out_date}
            onCheckInChange={handleCheckInChange}
            onCheckOutChange={handleCheckOutChange}
          />

          <CurrencyDropdown
            value={searchParams.currency || 'EUR'}
            onChange={handleCurrencyChange}
          />
          
          <SearchButton
            onSearch={handleSearch}
            isLoading={isLoading}
            isFetching={isFetching}
          />
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

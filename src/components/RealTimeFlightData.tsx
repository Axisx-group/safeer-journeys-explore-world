
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFlightOperations } from '@/hooks/useFlightOperations';
import FlightSearchForm from '@/components/flights/FlightSearchForm';
import FlightCard from '@/components/flights/FlightCard';

const RealTimeFlightData = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchParams, setSearchParams] = useState({
    departure_city: 'الرياض',
    arrival_city: 'مدريد',
    departure_date: '2025-06-01',
  });

  const {
    flights,
    isLoading,
    isFetching,
    dataSource,
    handleSearch,
    handleFetchNewData
  } = useFlightOperations();

  // Auto-load flights on component mount
  useEffect(() => {
    handleFetchNewData();
  }, []);

  const onSearch = () => {
    handleSearch(searchParams);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isArabic ? 'الرحلات المتاحة' : 'Available Flights'}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {isArabic ? 'اكتشف أفضل الرحلات من Skyscanner وBooking.com بأسعار مناسبة' : 'Discover the best flights from Skyscanner & Booking.com at great prices'}
          </p>
          
          {/* Skyscanner Reference */}
          <div className="flex justify-center items-center gap-2 text-blue-600">
            <span className="text-sm">
              {isArabic ? 'مدعوم من' : 'Powered by'}
            </span>
            <a 
              href="https://www.skyscanner.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold hover:text-blue-800 transition-colors"
            >
              Skyscanner <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-sm text-gray-400">+</span>
            <a 
              href="https://www.booking.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold hover:text-blue-800 transition-colors"
            >
              Booking.com <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <FlightSearchForm
            searchParams={searchParams}
            onSearchParamsChange={setSearchParams}
            onSearch={onSearch}
            isLoading={isLoading}
            isFetching={isFetching}
            dataSource={dataSource}
          />

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleFetchNewData} 
              disabled={isFetching}
              className="flex items-center gap-2 bg-white hover:bg-gray-50"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              {isArabic ? "تحديث البيانات" : "Update Data"}
            </Button>
          </div>

          {isLoading || isFetching ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid gap-4">
              {flights?.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
              
              {flights?.length === 0 && (
                <div className="text-center p-8 text-gray-500 bg-white rounded-lg">
                  {isArabic ? "لا توجد رحلات متاحة لهذا البحث" : "No flights available for this search"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealTimeFlightData;

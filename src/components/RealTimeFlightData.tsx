
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFlightOperations } from '@/hooks/useFlightOperations';
import FlightSearchForm from '@/components/flights/FlightSearchForm';
import FlightCard from '@/components/flights/FlightCard';
import FlightBookingModal from '@/components/flights/FlightBookingModal';
import { Flight } from '@/hooks/useFlights';

const RealTimeFlightData = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchParams, setSearchParams] = useState({
    departure_city: 'الرياض',
    arrival_city: 'مدريد',
    departure_date: '2025-06-01',
  });

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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

  const handleFlightBook = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isArabic ? 'احجز رحلتك الآن' : 'Book Your Flight Now'}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {isArabic ? 'اكتشف أفضل الرحلات واحجز مباشرة من موقعنا بأسعار تنافسية' : 'Discover the best flights and book directly from our site at competitive prices'}
          </p>
          
          {/* مؤشر مصدر البيانات */}
          <div className="flex justify-center items-center gap-2 text-blue-600">
            <span className="text-sm">
              {isArabic ? 'البيانات من' : 'Data powered by'}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">Skyscanner</span>
              <span className="text-sm text-gray-400">+</span>
              <span className="text-sm font-semibold">Booking.com</span>
            </div>
            <span className="text-sm">
              {isArabic ? '• احجز من موقعنا مباشرة' : '• Book directly with us'}
            </span>
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
                <FlightCard 
                  key={flight.id} 
                  flight={flight}
                />
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

      {/* نافذة الحجز */}
      {selectedFlight && (
        <FlightBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedFlight(null);
          }}
          flight={selectedFlight}
        />
      )}
    </section>
  );
};

export default RealTimeFlightData;


import React, { useState, useEffect } from 'react';
import { useHotels, useHotelSearch } from '@/hooks/useHotels';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import HotelSearchForm from '@/components/hotels/HotelSearchForm';
import HotelHeader from '@/components/hotels/HotelHeader';
import HotelStats from '@/components/hotels/HotelStats';
import HotelCard from '@/components/hotels/HotelCard';
import HotelPagination from '@/components/hotels/HotelPagination';
import LoadingState from '@/components/hotels/LoadingState';
import EmptyHotelsState from '@/components/hotels/EmptyHotelsState';

const RealTimeHotelData = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchParams, setSearchParams] = useState({
    city: 'مدريد', // Use Arabic city name since API returns Arabic names
    check_in_date: '2025-06-15',
    check_out_date: '2025-06-18',
    currency: 'EUR',
    page: 1,
    limit: 100 // Increased limit to get more hotels
  });

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  console.log('Current search params:', searchParams);

  // Remove city filter since API returns all European cities
  const { data: hotelResponse, isLoading, refetch, error } = useHotels({
    check_in_date: searchParams.check_in_date,
    check_out_date: searchParams.check_out_date,
    page: searchParams.page,
    limit: searchParams.limit
  });
  const { refetch: fetchNewHotels, isLoading: isFetching, error: fetchError } = useHotelSearch({
    ...searchParams,
    limit: 200 // Fetch even more hotels from API
  });

  // Auto-fetch hotels on component mount
  useEffect(() => {
    if (isInitialLoad) {
      handleFetchNewData();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  const handleSearch = () => {
    console.log('Searching hotels with params:', searchParams);
    setSearchParams(prev => ({ ...prev, page: 1 }));
    refetch();
  };

  const handleFetchNewData = async () => {
    try {
      console.log('Fetching new hotel data from Booking.com API...');
      const result = await fetchNewHotels();
      console.log('Fetch result:', result);
      
      // Wait a bit longer for database to be updated
      setTimeout(() => {
        console.log('Refetching from database...');
        refetch();
      }, 3000);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hotels = hotelResponse?.hotels || [];
  
  // Filter hotels by city on frontend since we get all European cities
  const filteredHotels = hotels.filter(hotel => {
    if (searchParams.city === 'مدريد') {
      return hotel.city === 'مدريد' || hotel.city === 'Madrid';
    }
    return hotel.city.toLowerCase().includes(searchParams.city.toLowerCase());
  });
  
  // Calculate total pages based on filtered hotels and assume more data exists
  const totalFilteredCount = filteredHotels.length > 0 ? Math.max(200, filteredHotels.length * 3) : 0;
  const totalPages = Math.ceil(totalFilteredCount / searchParams.limit);

  console.log('Current component state:', {
    hotels: hotels.length,
    filteredHotels: filteredHotels.length,
    totalPages,
    totalFilteredCount,
    hotelResponse,
    isLoading,
    isFetching,
    error,
    fetchError,
    isInitialLoad
  });

  // Show loading state during initial load or when fetching
  const isLoadingState = isLoading || isFetching || isInitialLoad;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <HotelHeader />

        <div className="space-y-8">
          <HotelSearchForm
            searchParams={searchParams}
            onSearchParamsChange={setSearchParams}
            onSearch={handleSearch}
            onFetchNewData={handleFetchNewData}
            isLoading={isLoading}
            isFetching={isFetching}
          />

          {error && (
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600 font-medium">
                {isArabic ? "خطأ في جلب البيانات" : "Error fetching data"}
              </p>
              <p className="text-sm text-red-500 mt-1">{error.message}</p>
            </div>
          )}

          {fetchError && (
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-600 font-medium">
                {isArabic ? "خطأ في جلب البيانات الجديدة" : "Error fetching new data"}
              </p>
              <p className="text-sm text-yellow-500 mt-1">{fetchError.message}</p>
            </div>
          )}

          {isLoadingState ? (
            <LoadingState />
          ) : (
            <div className="space-y-6">
              {filteredHotels.length > 0 && (
                <HotelStats
                  currentCount={filteredHotels.length}
                  totalCount={totalFilteredCount}
                  currentPage={searchParams.page}
                  totalPages={totalPages}
                />
              )}

              {filteredHotels.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredHotels.map((hotel) => (
                      <HotelCard 
                        key={hotel.id} 
                        hotel={hotel} 
                        currency={searchParams.currency}
                      />
                    ))}
                  </div>

                  <HotelPagination
                    currentPage={searchParams.page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <EmptyHotelsState onFetchData={handleFetchNewData} />
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                {isArabic ? 
                  "🚀 بيانات حية من Booking.com - يتم تحديث الفنادق تلقائياً" :
                  "🚀 Live data from Booking.com - Hotels updated automatically"
                }
              </p>
              <p className="text-sm text-blue-600 mt-1">
                {isArabic ? 
                  "استخدم زر 'جلب فنادق جديدة' للحصول على أحدث العروض (حتى 200 فندق)" :
                  "Use 'Fetch New Hotels' button to get latest offers (up to 200 hotels)"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeHotelData;

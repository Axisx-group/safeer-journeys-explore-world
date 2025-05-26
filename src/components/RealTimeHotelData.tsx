
import React, { useState } from 'react';
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
    city: 'مدريد', // Default to Madrid (European city)
    check_in_date: '2025-06-15',
    check_out_date: '2025-06-18',
    currency: 'EUR',
    page: 1,
    limit: 20
  });

  console.log('Current search params:', searchParams);

  const { data: hotelResponse, isLoading, refetch, error } = useHotels(searchParams);
  const { refetch: fetchNewHotels, isLoading: isFetching, error: fetchError } = useHotelSearch(searchParams);

  const handleSearch = () => {
    console.log('Searching hotels with params:', searchParams);
    setSearchParams(prev => ({ ...prev, page: 1 }));
    refetch();
  };

  const handleFetchNewData = async () => {
    try {
      console.log('Fetching new hotel data...');
      const result = await fetchNewHotels();
      console.log('Fetch result:', result);
      
      setTimeout(() => {
        console.log('Refetching from database...');
        refetch();
      }, 2000);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hotels = hotelResponse?.hotels || [];
  const totalPages = Math.ceil((hotelResponse?.total || 0) / searchParams.limit);

  console.log('Current component state:', {
    hotels: hotels.length,
    hotelResponse,
    isLoading,
    isFetching,
    error,
    fetchError
  });

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

          {isLoading || isFetching ? (
            <LoadingState />
          ) : (
            <div className="space-y-6">
              {hotels.length > 0 && (
                <HotelStats
                  currentCount={hotels.length}
                  totalCount={hotelResponse?.total || 0}
                  currentPage={searchParams.page}
                  totalPages={totalPages}
                />
              )}

              {hotels.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {hotels.map((hotel) => (
                      <HotelCard 
                        key={hotel.id} 
                        hotel={hotel} 
                        currency={searchParams.currency}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <HotelPagination
                      currentPage={searchParams.page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <EmptyHotelsState onFetchData={handleFetchNewData} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealTimeHotelData;

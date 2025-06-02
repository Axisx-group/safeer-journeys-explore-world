
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useHotels, useHotelSearch } from "@/hooks/useHotels";
import HotelPageHeader from "@/components/hotels/HotelPageHeader";
import EnhancedHotelFilters from "@/components/hotels/EnhancedHotelFilters";
import HotelGridStats from "@/components/hotels/HotelGridStats";
import HotelGrid from "@/components/hotels/HotelGrid";
import HotelPaginationControls from "@/components/hotels/HotelPaginationControls";
import HotelLoadingState from "@/components/hotels/HotelLoadingState";
import HotelEmptyState from "@/components/hotels/HotelEmptyState";

const HotelsPage = () => {
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 12;
  
  const [filters, setFilters] = useState({
    searchTerm: '',
    country: 'all',
    city: 'all',
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guests: 2,
    rooms: 1,
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0
  });

  // Convert filters for the API call, handling 'all' values
  const apiFilters = {
    searchTerm: filters.searchTerm,
    country: filters.country === 'all' ? '' : filters.country,
    city: filters.city === 'all' ? '' : filters.city,
    check_in_date: filters.checkInDate,
    check_out_date: filters.checkOutDate,
    min_price: filters.minPrice,
    max_price: filters.maxPrice,
    min_rating: filters.minRating,
    page: currentPage,
    limit: hotelsPerPage
  };

  const { data: hotelResponse, isLoading, refetch } = useHotels(apiFilters);
  
  const { refetch: fetchNewHotels, isLoading: isFetching } = useHotelSearch({
    city: filters.city === 'all' || !filters.city ? 'مدريد' : filters.city,
    check_in_date: filters.checkInDate,
    check_out_date: filters.checkOutDate,
    limit: 100 // Reduced from 200 for faster response
  });

  useEffect(() => {
    if (isInitialLoad) {
      handleFetchNewData();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleBookNow = (hotel: any) => {
    console.log('Hotel Book Now clicked:', hotel.id);
    console.log('Hotel details:', hotel);
    
    navigate('/booking', { 
      state: { 
        hotelId: hotel.id,
        bookingType: 'hotel',
        hotelName: hotel.name,
        hotelCity: hotel.city,
        hotelCountry: hotel.country,
        hotelPrice: hotel.price_per_night,
        hotelCurrency: hotel.currency,
        checkInDate: filters.checkInDate,
        checkOutDate: filters.checkOutDate,
        guests: filters.guests,
        rooms: filters.rooms
      }
    });
  };

  const handleFetchNewData = async () => {
    try {
      console.log('Fetching new hotel data...');
      await fetchNewHotels();
      
      // Reduced timeout for faster refresh
      setTimeout(() => {
        console.log('Refetching from database...');
        refetch();
      }, 2000);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const hotels = hotelResponse?.hotels || [];
  const totalHotels = hotelResponse?.total || 0;
  const totalPages = Math.ceil(totalHotels / hotelsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoadingState = isLoading || isFetching || isInitialLoad;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <HotelPageHeader />

        <EnhancedHotelFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onFetchNewData={handleFetchNewData}
          isFetching={isFetching}
        />

        {isLoadingState ? (
          <HotelLoadingState />
        ) : hotels.length === 0 ? (
          <HotelEmptyState 
            onFetchNewData={handleFetchNewData} 
            isFetching={isFetching} 
          />
        ) : (
          <>
            <HotelGridStats
              currentCount={hotels.length}
              totalCount={totalHotels}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            <HotelGrid 
              hotels={hotels} 
              onBookNow={handleBookNow} 
            />

            {totalPages > 1 && (
              <HotelPaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default HotelsPage;

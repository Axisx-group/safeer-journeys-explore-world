
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useHotels, useHotelSearch } from "@/hooks/useHotels";
import HotelPageHeader from "@/components/hotels/HotelPageHeader";
import HotelFilters from "@/components/hotels/HotelFilters";
import HotelGridStats from "@/components/hotels/HotelGridStats";
import HotelGrid from "@/components/hotels/HotelGrid";
import HotelPaginationControls from "@/components/hotels/HotelPaginationControls";
import HotelLoadingState from "@/components/hotels/HotelLoadingState";
import HotelEmptyState from "@/components/hotels/HotelEmptyState";

const HotelsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 12;
  
  const [searchParams, setSearchParams] = useState({
    city: 'مدريد',
    check_in_date: '2025-06-15',
    check_out_date: '2025-06-18',
    page: 1,
    limit: 150
  });

  const { data: hotelResponse, isLoading, refetch } = useHotels({
    check_in_date: searchParams.check_in_date,
    check_out_date: searchParams.check_out_date,
    page: searchParams.page,
    limit: searchParams.limit
  });
  
  const { refetch: fetchNewHotels, isLoading: isFetching } = useHotelSearch({
    ...searchParams,
    limit: 200
  });

  useEffect(() => {
    if (isInitialLoad) {
      handleFetchNewData();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

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
        checkInDate: searchParams.check_in_date,
        checkOutDate: searchParams.check_out_date
      }
    });
  };

  const handleFetchNewData = async () => {
    try {
      console.log('Fetching new hotel data...');
      await fetchNewHotels();
      
      setTimeout(() => {
        console.log('Refetching from database...');
        refetch();
      }, 3000);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const hotels = hotelResponse?.hotels || [];
  
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const endIndex = startIndex + hotelsPerPage;
  const currentHotels = filteredHotels.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoadingState = isLoading || isFetching || isInitialLoad;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <HotelPageHeader />

        <HotelFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFetchNewData={handleFetchNewData}
          isFetching={isFetching}
        />

        {isLoadingState ? (
          <HotelLoadingState />
        ) : filteredHotels.length === 0 ? (
          <HotelEmptyState 
            onFetchNewData={handleFetchNewData} 
            isFetching={isFetching} 
          />
        ) : (
          <>
            <HotelGridStats
              currentCount={currentHotels.length}
              totalCount={filteredHotels.length}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            <HotelGrid 
              hotels={currentHotels} 
              onBookNow={handleBookNow} 
            />

            <HotelPaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default HotelsPage;

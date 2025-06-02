import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Wifi, Car, Coffee, Waves, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useHotels, useHotelSearch } from "@/hooks/useHotels";

const HotelsPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 12;
  
  const [searchParams, setSearchParams] = useState({
    city: 'مدريد', // Use Arabic city name
    check_in_date: '2025-06-15',
    check_out_date: '2025-06-18',
    page: 1,
    limit: 150 // Increased limit to fetch more hotels
  });

  // Fetch hotels from database - remove city filter to get all hotels
  const { data: hotelResponse, isLoading, refetch } = useHotels({
    check_in_date: searchParams.check_in_date,
    check_out_date: searchParams.check_out_date,
    page: searchParams.page,
    limit: searchParams.limit
  });
  
  // Fetch new hotels from API with higher limit
  const { refetch: fetchNewHotels, isLoading: isFetching } = useHotelSearch({
    ...searchParams,
    limit: 200 // Fetch up to 200 hotels from API
  });

  // Auto-fetch on component mount
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
      
      // Refetch from database after API call with longer delay
      setTimeout(() => {
        console.log('Refetching from database...');
        refetch();
      }, 3000);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
      case 'free parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
      case 'fine dining':
        return <Coffee className="h-4 w-4" />;
      case 'pool':
      case 'spa':
        return <Waves className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  // Generate different fallback images based on hotel ID
  const getFallbackImage = (hotelId: string) => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    ];
    
    const index = hotelId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbackImages.length;
    return fallbackImages[index];
  };

  const hotels = hotelResponse?.hotels || [];
  
  // Filter hotels by search term and show all European cities
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'أفضل الفنادق من Booking.com' : 'Best Hotels from Booking.com'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {language === 'ar' 
              ? 'اكتشف آلاف الفنادق الأوروبية مع أحدث الأسعار من Booking.com (حتى 200 فندق)'
              : 'Discover thousands of European hotels with latest prices from Booking.com (up to 200 hotels)'
            }
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="max-w-md">
              <Input
                type="text"
                placeholder={language === 'ar' ? 'ابحث عن فندق أو مدينة...' : 'Search for hotels or cities...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={handleFetchNewData}
              disabled={isFetching}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              {language === 'ar' ? 'جلب فنادق جديدة' : 'Fetch New Hotels'}
            </Button>
          </div>

          <div className="flex justify-center items-center gap-2 text-blue-600">
            <span className="text-lg font-semibold">
              {language === 'ar' ? '🏨 فنادق Booking.com الحقيقية' : '🏨 Real Booking.com Hotels'}
            </span>
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {language === 'ar' ? 'بيانات مباشرة' : 'Live Data'}
            </span>
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {language === 'ar' ? 'حتى 200 فندق' : 'Up to 200 hotels'}
            </span>
          </div>
        </div>

        {isLoadingState ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">
              {language === 'ar' ? "جاري جلب الفنادق من Booking.com..." : "Fetching hotels from Booking.com..."}
            </p>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="text-gray-500 mb-4">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? "لا توجد فنادق متاحة" : "No hotels available"}
              </h3>
              <p className="text-sm mb-4">
                {language === 'ar' ? "اضغط على 'جلب فنادق جديدة' لتحديث البيانات" : "Click 'Fetch New Hotels' to update data"}
              </p>
              <Button onClick={handleFetchNewData} disabled={isFetching}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                {language === 'ar' ? "جلب الفنادق" : "Fetch Hotels"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600">
                {language === 'ar' 
                  ? `عرض ${currentHotels.length} من ${filteredHotels.length} فندق - الصفحة ${currentPage} من ${totalPages}`
                  : `Showing ${currentHotels.length} of ${filteredHotels.length} hotels - Page ${currentPage} of ${totalPages}`
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentHotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    {hotel.image_urls && hotel.image_urls[0] ? (
                      <img 
                        src={hotel.image_urls[0]} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = getFallbackImage(hotel.id);
                        }}
                      />
                    ) : (
                      <img 
                        src={getFallbackImage(hotel.id)}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center bg-white px-2 py-1 rounded">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < (hotel.star_rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg line-clamp-1">{hotel.name}</h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          €{Math.round(hotel.price_per_night)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {language === 'ar' ? 'لليلة' : 'per night'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hotel.city}, {hotel.country}</span>
                    </div>

                    {hotel.guest_rating && (
                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{hotel.guest_rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          {language === 'ar' ? 'تقييم الضيوف' : 'Guest Rating'}
                        </span>
                      </div>
                    )}
                    
                    {hotel.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {hotel.description}
                      </p>
                    )}
                    
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {hotel.amenities.slice(0, 4).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1">{amenity}</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={() => handleBookNow(hotel)}
                    >
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {language === 'ar' ? 'السابق' : 'Previous'}
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, currentPage - 2) + i;
                    if (pageNum <= totalPages) {
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          onClick={() => handlePageChange(pageNum)}
                          className="w-10 h-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default HotelsPage;

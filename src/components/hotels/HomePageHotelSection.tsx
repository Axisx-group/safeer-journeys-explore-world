import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Calendar, Euro } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHotels, useHotelSearch } from "@/hooks/useHotels";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePageHotelSection = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // European countries for filtering
  const countries = [
    { code: 'all', name: 'All Destinations', nameAr: 'جميع الوجهات' },
    { code: 'ES', name: 'Spain', nameAr: 'إسبانيا' },
    { code: 'FR', name: 'France', nameAr: 'فرنسا' },
    { code: 'IT', name: 'Italy', nameAr: 'إيطاليا' },
    { code: 'DE', name: 'Germany', nameAr: 'ألمانيا' },
    { code: 'UK', name: 'United Kingdom', nameAr: 'المملكة المتحدة' },
    { code: 'NL', name: 'Netherlands', nameAr: 'هولندا' },
    { code: 'PT', name: 'Portugal', nameAr: 'البرتغال' },
    { code: 'GR', name: 'Greece', nameAr: 'اليونان' }
  ];

  // Hotel search filters
  const apiFilters = {
    country: selectedCountry === 'all' ? '' : selectedCountry,
    check_in_date: new Date().toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    page: 1,
    limit: 6
  };

  const { data: hotelResponse, isLoading, refetch } = useHotels(apiFilters);
  const { refetch: fetchNewHotels } = useHotelSearch({
    city: 'مدريد',
    check_in_date: apiFilters.check_in_date,
    check_out_date: apiFilters.check_out_date,
    page: 1,
    limit: 50
  });

  // Auto-fetch hotels on component mount if no data
  useEffect(() => {
    const hotels = hotelResponse?.hotels || [];
    if (isInitialLoad && hotels.length === 0) {
      console.log('No hotels found, fetching from API...');
      handleFetchNewData();
      setIsInitialLoad(false);
    }
  }, [hotelResponse, isInitialLoad]);

  const handleFetchNewData = async () => {
    try {
      console.log('Fetching new hotel data...');
      await fetchNewHotels();
      // Wait for data to be saved then refetch
      setTimeout(() => {
        refetch();
      }, 2000);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const hotels = hotelResponse?.hotels || [];

  const handleCountryFilter = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  const handleBookNow = (hotel: any) => {
    navigate('/hotels', { 
      state: { 
        prefilledFilters: {
          searchTerm: hotel.city,
          country: selectedCountry,
          checkInDate: apiFilters.check_in_date,
          checkOutDate: apiFilters.check_out_date
        }
      }
    });
  };

  const getValidImageUrl = (imageUrls: string[] | undefined, hotelId: string, index: number) => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];

    if (!imageUrls || imageUrls.length === 0) {
      // Use combination of hotel ID hash and array index to ensure different images
      const hashValue = hotelId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const imageIndex = (hashValue + index * 7) % fallbackImages.length;
      return fallbackImages[imageIndex];
    }

    const primaryUrl = imageUrls[0];
    
    // Check if it's an Unsplash URL that needs parameters
    if (primaryUrl.includes('images.unsplash.com') && !primaryUrl.includes('ixlib=')) {
      // Add required Unsplash parameters
      const urlBase = primaryUrl.split('?')[0];
      return `${urlBase}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
    }
    
    return primaryUrl;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <span className="text-2xl">🏨</span>
            {isArabic ? 'أفضل الفنادق الأوروبية' : 'Best European Hotels'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isArabic 
              ? 'اكتشف فنادق رائعة في أجمل المدن الأوروبية بأفضل الأسعار'
              : 'Discover amazing hotels in Europe\'s most beautiful cities at the best prices'
            }
          </p>
        </motion.div>

        {/* Country Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {countries.map((country) => (
            <Button
              key={country.code}
              variant={selectedCountry === country.code ? "default" : "outline"}
              onClick={() => handleCountryFilter(country.code)}
              className="rounded-full px-6 py-2 transition-all duration-300"
            >
              {isArabic ? country.nameAr : country.name}
            </Button>
          ))}
        </div>

        {/* Hotels Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          // Empty state with action to fetch data
          <div className="text-center py-12">
            <div className="text-gray-500 mb-6">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">
                {isArabic ? "لا توجد فنادق متاحة حالياً" : "No hotels available currently"}
              </h3>
              <p className="text-sm mb-6">
                {isArabic ? "اضغط على الزر أدناه لجلب أحدث عروض الفنادق من Booking.com" : "Click the button below to fetch latest hotel offers from Booking.com"}
              </p>
            </div>
            <Button onClick={handleFetchNewData} size="lg" className="bg-blue-600 hover:bg-blue-700">
              {isArabic ? "جلب الفنادق" : "Fetch Hotels"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                  <div className="relative">
                    <img 
                      src={getValidImageUrl(hotel.image_urls, hotel.id, index)}
                      alt={hotel.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const fallbackImages = [
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                        ];
                        const hashValue = hotel.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                        const imageIndex = (hashValue + index * 7) % fallbackImages.length;
                        e.currentTarget.src = fallbackImages[imageIndex];
                      }}
                    />
                    
                    {/* Match Score Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-blue-600 text-white flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {Math.floor(Math.random() * 20) + 75}% {isArabic ? 'مطابقة' : 'Match'}
                      </Badge>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-600 text-white flex items-center gap-1">
                        <Euro className="h-3 w-3" />
                        {hotel.price_per_night}
                      </Badge>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/70 text-white backdrop-blur-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {hotel.city}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {hotel.city}, {hotel.country}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          {[...Array(Math.min(5, Math.floor(hotel.guest_rating || 4)))].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          {hotel.guest_rating?.toFixed(1) || '4.2'}
                        </p>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                      <div className="text-center">
                        <Calendar className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                        <p className="font-semibold">{isArabic ? 'متاح' : 'Available'}</p>
                      </div>
                      <div className="text-center">
                        <Users className="h-4 w-4 mx-auto mb-1 text-green-500" />
                        <p className="font-semibold">{isArabic ? '٢ ضيوف' : '2 Guests'}</p>
                      </div>
                      <div className="text-center">
                        <Star className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                        <p className="font-semibold">{hotel.star_rating || 4}★</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hotel.free_wifi && (
                        <Badge variant="secondary" className="text-xs">
                          {isArabic ? 'واي فاي' : 'WiFi'}
                        </Badge>
                      )}
                      {hotel.pool && (
                        <Badge variant="secondary" className="text-xs">
                          {isArabic ? 'مسبح' : 'Pool'}
                        </Badge>
                      )}
                      {hotel.free_parking && (
                        <Badge variant="secondary" className="text-xs">
                          {isArabic ? 'موقف' : 'Parking'}
                        </Badge>
                      )}
                    </div>

                    {/* Actions - Only Book Now button */}
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleBookNow(hotel)}
                    >
                      {isArabic ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to action */}
        {hotels.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/hotels')} 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3"
            >
              {isArabic ? 'عرض جميع الفنادق' : 'View All Hotels'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePageHotelSection;

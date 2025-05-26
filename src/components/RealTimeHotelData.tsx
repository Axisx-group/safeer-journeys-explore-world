
import React, { useState, useEffect } from 'react';
import { useHotels, useHotelSearch } from '@/hooks/useHotels';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Coffee, Waves, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import HotelSearchForm from '@/components/hotels/HotelSearchForm';

const RealTimeHotelData = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchParams, setSearchParams] = useState({
    city: 'مدريد',
    check_in_date: '2025-06-15',
    check_out_date: '2025-06-18',
    currency: 'EUR'
  });

  const { data: hotels, isLoading, refetch } = useHotels(searchParams);
  const { refetch: fetchNewHotels, isLoading: isFetching } = useHotelSearch();

  // Auto-load hotels on component mount
  useEffect(() => {
    handleFetchNewData();
  }, []);

  const handleSearch = () => {
    console.log('Searching hotels with params:', searchParams);
    refetch();
  };

  const handleFetchNewData = async () => {
    try {
      console.log('Fetching new hotel data...');
      await fetchNewHotels();
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'free parking':
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
      case 'swiss cuisine':
      case 'fine dining':
        return <Coffee className="h-4 w-4" />;
      case 'pool':
      case 'spa':
        return <Waves className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const currencySymbols = {
      'EUR': '€',
      'GBP': '£',
      'CHF': 'CHF',
      'CZK': 'Kč',
      'NOK': 'kr',
      'SEK': 'kr',
      'DKK': 'kr',
      'PLN': 'zł',
      'HUF': 'Ft',
      'RON': 'lei',
      'BGN': 'лв',
      'HRK': 'kn',
      'RSD': 'RSD',
      'RUB': '₽',
      'UAH': '₴',
      'TRY': '₺'
    };
    
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${Math.round(price)}`;
  };

  console.log('Hotels data:', hotels);
  console.log('Is loading:', isLoading);
  console.log('Is fetching:', isFetching);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isArabic ? 'فنادق أوروبا المميزة' : 'Premium European Hotels'}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {isArabic ? 'اكتشف أفضل الفنادق في أوروبا مع خدمات استثنائية' : 'Discover the best hotels in Europe with exceptional services'}
          </p>
          
          {/* مؤشر البيانات المباشرة */}
          <div className="flex justify-center items-center gap-2 text-blue-600 mb-4">
            <span className="text-lg font-semibold">
              {isArabic ? '🏨 فنادق أوروبية حقيقية' : '🏨 Real European Hotels'}
            </span>
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {isArabic ? 'بيانات محدثة' : 'Live Data'}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <HotelSearchForm
            searchParams={searchParams}
            onSearchParamsChange={setSearchParams}
            onSearch={handleSearch}
            onFetchNewData={handleFetchNewData}
            isLoading={isLoading}
            isFetching={isFetching}
          />

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleFetchNewData} 
              disabled={isFetching}
              className="flex items-center gap-2 bg-white hover:bg-gray-50"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              {isArabic ? "تحديث بيانات الفنادق" : "Update Hotel Data"}
            </Button>
          </div>

          {isLoading || isFetching ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">
                {isArabic ? "جاري جلب بيانات الفنادق الأوروبية..." : "Fetching European hotel data..."}
              </p>
            </div>
          ) : (
            <>
              {hotels && hotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hotels.map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                      <div className="relative h-48">
                        {hotel.image_urls && hotel.image_urls[0] ? (
                          <img 
                            src={hotel.image_urls[0]} 
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <MapPin className="h-12 w-12 text-blue-400" />
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2">
                          <div className="flex items-center bg-white px-2 py-1 rounded shadow-md">
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
                              {formatPrice(hotel.price_per_night, hotel.currency || searchParams.currency)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {isArabic ? 'لليلة' : 'per night'}
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
                              {isArabic ? 'تقييم الضيوف' : 'Guest Rating'}
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
                        
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                          {isArabic ? 'احجز الآن' : 'Book Now'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-gray-500 mb-4">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">
                      {isArabic ? "لا توجد فنادق متاحة" : "No hotels available"}
                    </h3>
                    <p className="text-sm">
                      {isArabic ? "جرب البحث عن مدينة أخرى أو اضغط على تحديث البيانات" : "Try searching for another city or click refresh data"}
                    </p>
                  </div>
                  <Button onClick={handleFetchNewData} className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {isArabic ? "تحديث البيانات" : "Refresh Data"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealTimeHotelData;

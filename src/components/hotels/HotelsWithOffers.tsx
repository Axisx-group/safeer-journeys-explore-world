
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Users, Euro, Percent, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHotels } from "@/hooks/useHotels";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HotelsWithOffers = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  // Get hotels with special pricing filters for offers
  const apiFilters = {
    max_price: 150, // Focus on discounted hotels
    check_in_date: new Date().toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    page: 1,
    limit: 4
  };

  const { data: hotelResponse, isLoading } = useHotels(apiFilters);
  const hotels = hotelResponse?.hotels || [];

  // Add offer data to hotels
  const hotelsWithOffers = hotels.map((hotel, index) => ({
    ...hotel,
    originalPrice: Math.round(hotel.price_per_night * 1.3), // Calculate original price
    discountPercentage: [20, 25, 30, 35][index % 4], // Rotate discount percentages
    offerType: ['مميز', 'عرض محدود', 'خصم خاص', 'الأكثر طلباً'][index % 4],
    offerTypeEn: ['Featured', 'Limited Time', 'Special Discount', 'Most Popular'][index % 4]
  }));

  const handleBookNow = (hotel: any) => {
    navigate('/hotels', { 
      state: { 
        prefilledFilters: {
          searchTerm: hotel.city,
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
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];

    if (!imageUrls || imageUrls.length === 0) {
      const hashValue = hotelId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const imageIndex = (hashValue + index * 3) % fallbackImages.length;
      return fallbackImages[imageIndex];
    }

    const primaryUrl = imageUrls[0];
    
    if (primaryUrl.includes('images.unsplash.com') && !primaryUrl.includes('ixlib=')) {
      const urlBase = primaryUrl.split('?')[0];
      return `${urlBase}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
    }
    
    return primaryUrl;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <span className="text-2xl">🎯</span>
            {isArabic ? 'العروض المميزة' : 'Featured Offers'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isArabic 
              ? 'اكتشف أفضل عروضنا السياحية بأسعار مخفضة لفترة محدودة'
              : 'Discover our best travel deals with discounted prices for a limited time'
            }
          </p>
        </motion.div>

        {/* Hotels Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {hotelsWithOffers.slice(0, 4).map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                  <div className="relative h-64">
                    <img 
                      src={getValidImageUrl(hotel.image_urls, hotel.id, index)} 
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const fallbackImages = [
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                        ];
                        const hashValue = hotel.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                        const imageIndex = (hashValue + index * 3) % fallbackImages.length;
                        e.currentTarget.src = fallbackImages[imageIndex];
                      }}
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-600 text-white flex items-center gap-1 text-sm px-3 py-1">
                        <Percent className="h-4 w-4" />
                        {hotel.discountPercentage}% {isArabic ? 'خصم' : 'OFF'}
                      </Badge>
                    </div>

                    {/* Offer Type Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600 text-white flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {isArabic ? hotel.offerType : hotel.offerTypeEn}
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
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {hotel.name}
                      </h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
                        <MapPin className="h-3 w-3" />
                        {hotel.city}, {hotel.country}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(Math.min(5, Math.floor(hotel.guest_rating || 4)))].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {hotel.guest_rating?.toFixed(1) || '4.2'}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-red-600">
                            €{Math.round(hotel.price_per_night)}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            €{hotel.originalPrice}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {isArabic ? 'لليلة الواحدة' : 'per night'}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {isArabic ? 'عرض محدود' : 'Limited'}
                        </Badge>
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

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold" 
                      size="lg"
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
      </div>
    </section>
  );
};

export default HotelsWithOffers;

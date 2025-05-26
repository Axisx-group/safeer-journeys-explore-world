
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';
import { Hotel } from '@/hooks/useHotels';
import { useLanguage } from '@/contexts/LanguageContext';

interface HotelCardProps {
  hotel: Hotel;
  currency: string;
}

const HotelCard = ({ hotel, currency }: HotelCardProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
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
              {formatPrice(hotel.price_per_night, hotel.currency || currency)}
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
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
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
  );
};

export default HotelCard;

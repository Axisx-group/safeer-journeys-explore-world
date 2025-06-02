
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Hotel } from "@/hooks/useHotels";

interface HotelGridProps {
  hotels: Hotel[];
  onBookNow: (hotel: Hotel) => void;
}

const HotelGrid = ({ hotels, onBookNow }: HotelGridProps) => {
  const { language } = useLanguage();

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

  const getFallbackImage = (hotelId: string) => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ];
    
    const index = hotelId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbackImages.length;
    return fallbackImages[index];
  };

  const getValidImageUrl = (imageUrls: string[] | undefined, hotelId: string) => {
    if (!imageUrls || imageUrls.length === 0) {
      return getFallbackImage(hotelId);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <img 
              src={getValidImageUrl(hotel.image_urls, hotel.id)} 
              alt={hotel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = getFallbackImage(hotel.id);
              }}
            />
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
              onClick={() => onBookNow(hotel)}
            >
              {language === 'ar' ? 'احجز الآن' : 'Book Now'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HotelGrid;

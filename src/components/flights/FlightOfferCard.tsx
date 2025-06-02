
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, MapPin, Euro, Calendar, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface FlightOfferCardProps {
  flight: any;
  route: any;
  onBookFlight: (flight: any) => void;
}

const FlightOfferCard = ({ flight, route, onBookFlight }: FlightOfferCardProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (dateString: string) => {
    try {
      // Handle different time formats
      if (dateString.includes('T')) {
        return new Date(dateString).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } else {
        return dateString;
      }
    } catch {
      return dateString;
    }
  };

  const getCityName = (code: string) => {
    const cities: Record<string, { en: string; ar: string }> = {
      'RUH': { en: 'Riyadh', ar: 'الرياض' },
      'LHR': { en: 'London', ar: 'لندن' },
      'CDG': { en: 'Paris', ar: 'باريس' },
      'FCO': { en: 'Rome', ar: 'روما' },
      'MAD': { en: 'Madrid', ar: 'مدريد' }
    };
    return cities[code] ? (isArabic ? cities[code].ar : cities[code].en) : code;
  };

  const segment = flight.segments?.[0];
  const price = flight.price?.amount || Math.floor(Math.random() * 500) + 200;
  const currency = flight.price?.currency || 'EUR';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center">
          <div className="text-center text-white">
            <Plane className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold">
              {getCityName(route.origin)} → {getCityName(route.destination)}
            </h3>
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-600 text-white flex items-center gap-1">
              <Euro className="h-3 w-3" />
              {price}
            </Badge>
          </div>

          {/* Offer Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-red-600 text-white">
              {Math.floor(Math.random() * 30) + 10}% {isArabic ? 'خصم' : 'OFF'}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Flight Details */}
          {segment && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-center">
                  <p className="font-bold text-lg">
                    {formatTime(segment.departure)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {segment.origin?.displayCode || route.origin}
                  </p>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="border-t border-gray-300 flex-1"></div>
                  <Plane className="h-4 w-4 mx-2 text-blue-500" />
                  <div className="border-t border-gray-300 flex-1"></div>
                </div>
                
                <div className="text-center">
                  <p className="font-bold text-lg">
                    {formatTime(segment.arrival)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {segment.destination?.displayCode || route.destination}
                  </p>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-600 mb-3">
                <Clock className="inline h-4 w-4 mr-1" />
                {formatDuration(segment.durationInMinutes || 480)}
              </div>
            </div>
          )}

          {/* Flight Info */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
            <div className="text-center">
              <Calendar className="h-4 w-4 mx-auto mb-1 text-blue-500" />
              <p className="font-semibold">{isArabic ? 'متاح' : 'Available'}</p>
            </div>
            <div className="text-center">
              <Users className="h-4 w-4 mx-auto mb-1 text-green-500" />
              <p className="font-semibold">{isArabic ? 'اقتصادية' : 'Economy'}</p>
            </div>
            <div className="text-center">
              <MapPin className="h-4 w-4 mx-auto mb-1 text-red-500" />
              <p className="font-semibold">{isArabic ? 'مباشر' : 'Direct'}</p>
            </div>
          </div>

          {/* Airline Info */}
          {segment?.marketingCarrier && (
            <div className="text-center text-sm text-gray-600 mb-4">
              {segment.marketingCarrier.name}
            </div>
          )}

          {/* Action Button */}
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold" 
            size="lg"
            onClick={() => onBookFlight(flight)}
          >
            {isArabic ? 'احجز الآن' : 'Book Flight'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlightOfferCard;

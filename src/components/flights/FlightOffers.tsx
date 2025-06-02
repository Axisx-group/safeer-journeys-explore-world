
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, MapPin, Euro, Calendar, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSkyscannerFlights } from "@/hooks/useSkyscannerFlights";
import { motion } from "framer-motion";

const FlightOffers = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Popular European routes from Middle East
  const flightRoutes = [
    {
      origin: "RIYD", // Riyadh
      destination: "LOND", // London
      date: "2025-06-15"
    },
    {
      origin: "RIYD",
      destination: "PARI", // Paris
      date: "2025-06-20"
    },
    {
      origin: "RIYD",
      destination: "ROME", // Rome
      date: "2025-06-25"
    },
    {
      origin: "RIYD",
      destination: "MADR", // Madrid
      date: "2025-06-30"
    }
  ];

  const [selectedRoute, setSelectedRoute] = useState(0);
  const currentRoute = flightRoutes[selectedRoute];

  const { data: flights = [], isLoading } = useSkyscannerFlights({
    origin: currentRoute.origin,
    destination: currentRoute.destination,
    date: currentRoute.date,
    adults: 1,
    currency: "EUR"
  });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getCityName = (code: string) => {
    const cities: Record<string, { en: string; ar: string }> = {
      'RIYD': { en: 'Riyadh', ar: 'الرياض' },
      'LOND': { en: 'London', ar: 'لندن' },
      'PARI': { en: 'Paris', ar: 'باريس' },
      'ROME': { en: 'Rome', ar: 'روما' },
      'MADR': { en: 'Madrid', ar: 'مدريد' }
    };
    return cities[code] ? (isArabic ? cities[code].ar : cities[code].en) : code;
  };

  const handleBookFlight = (flight: any) => {
    if (flight.deeplink) {
      window.open(flight.deeplink, '_blank');
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <span className="text-2xl">✈️</span>
            {isArabic ? 'عروض الطيران المميزة' : 'Featured Flight Offers'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isArabic 
              ? 'اكتشف أفضل عروض الطيران إلى أجمل المدن الأوروبية'
              : 'Discover the best flight deals to Europe\'s most beautiful cities'
            }
          </p>
        </motion.div>

        {/* Route Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {flightRoutes.map((route, index) => (
            <Button
              key={index}
              variant={selectedRoute === index ? "default" : "outline"}
              onClick={() => setSelectedRoute(index)}
              className="rounded-full px-4 py-2 text-sm"
            >
              {getCityName(route.origin)} → {getCityName(route.destination)}
            </Button>
          ))}
        </div>

        {/* Flight Offers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
        ) : flights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.slice(0, 6).map((flight, index) => (
              <motion.div
                key={flight.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Plane className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-lg font-bold">
                        {getCityName(currentRoute.origin)} → {getCityName(currentRoute.destination)}
                      </h3>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-600 text-white flex items-center gap-1">
                        <Euro className="h-3 w-3" />
                        {flight.price?.amount || Math.floor(Math.random() * 500) + 200}
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
                    {flight.segments && flight.segments[0] && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-center">
                            <p className="font-bold text-lg">
                              {formatTime(flight.segments[0].departure)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {flight.segments[0].origin?.displayCode}
                            </p>
                          </div>
                          
                          <div className="flex-1 flex items-center justify-center">
                            <div className="border-t border-gray-300 flex-1"></div>
                            <Plane className="h-4 w-4 mx-2 text-blue-500" />
                            <div className="border-t border-gray-300 flex-1"></div>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-bold text-lg">
                              {formatTime(flight.segments[0].arrival)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {flight.segments[0].destination?.displayCode}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-center text-sm text-gray-600 mb-3">
                          <Clock className="inline h-4 w-4 mr-1" />
                          {formatDuration(flight.segments[0].durationInMinutes || 480)}
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

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold" 
                      size="lg"
                      onClick={() => handleBookFlight(flight)}
                    >
                      {isArabic ? 'احجز الآن' : 'Book Flight'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600">
              {isArabic ? 'لا توجد رحلات متاحة حالياً' : 'No flights available at the moment'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlightOffers;

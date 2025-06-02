
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      id: "london",
      name: { en: "London", ar: "لندن" },
      origin: "RIYD",
      destination: "LOND",
      date: "2025-06-15"
    },
    {
      id: "paris",
      name: { en: "Paris", ar: "باريس" },
      origin: "RIYD",
      destination: "PARI",
      date: "2025-06-20"
    },
    {
      id: "rome",
      name: { en: "Rome", ar: "روما" },
      origin: "RIYD",
      destination: "ROME",
      date: "2025-06-25"
    },
    {
      id: "madrid",
      name: { en: "Madrid", ar: "مدريد" },
      origin: "RIYD",
      destination: "MADR",
      date: "2025-06-30"
    }
  ];

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

  const FlightCard = ({ flight, route }: { flight: any; route: any }) => (
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
  );

  const TabContent = ({ route }: { route: any }) => {
    const { data: flights = [], isLoading } = useSkyscannerFlights({
      origin: route.origin,
      destination: route.destination,
      date: route.date,
      adults: 1,
      currency: "EUR"
    });

    if (isLoading) {
      return (
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
      );
    }

    if (flights.length === 0) {
      return (
        <div className="text-center py-12">
          <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-600">
            {isArabic ? 'لا توجد رحلات متاحة حالياً' : 'No flights available at the moment'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flights.slice(0, 6).map((flight, index) => (
          <FlightCard key={flight.id || index} flight={flight} route={route} />
        ))}
      </div>
    );
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

        {/* Tabs for different destinations */}
        <Tabs defaultValue="london" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm p-1 rounded-full">
            {flightRoutes.map((route) => (
              <TabsTrigger 
                key={route.id} 
                value={route.id}
                className="rounded-full px-6 py-3 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                {isArabic ? route.name.ar : route.name.en}
              </TabsTrigger>
            ))}
          </TabsList>

          {flightRoutes.map((route) => (
            <TabsContent key={route.id} value={route.id} className="mt-8">
              <TabContent route={route} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FlightOffers;

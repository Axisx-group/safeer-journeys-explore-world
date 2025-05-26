import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flight } from '@/hooks/useFlights';
import { useNavigate } from 'react-router-dom';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Flight Book Now clicked:', flight.id);
    navigate('/booking', { 
      state: { 
        flightData: flight,
        bookingType: 'flight'
      }
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-600" />
            <span>{flight.airline}</span>
            {flight.flight_number && (
              <Badge variant="outline">{flight.flight_number}</Badge>
            )}
          </div>
          <div className="text-2xl font-bold text-green-600">
            {flight.price} {flight.currency}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <div className="font-semibold">{flight.departure_city}</div>
              <div className="text-sm text-gray-500">{flight.departure_airport}</div>
              {flight.departure_time && (
                <div className="text-sm">{flight.departure_time}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                {flight.duration_minutes && `${Math.floor(flight.duration_minutes / 60)}س ${flight.duration_minutes % 60}د`}
              </div>
              <div className="text-sm">
                {flight.is_direct ? (
                  <Badge className="bg-green-100 text-green-800">
                    {isArabic ? "مباشر" : "Direct"}
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    {flight.stops} {isArabic ? "توقف" : "stops"}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <div className="font-semibold">{flight.arrival_city}</div>
              <div className="text-sm text-gray-500">{flight.arrival_airport}</div>
              {flight.arrival_time && (
                <div className="text-sm">{flight.arrival_time}</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {isArabic ? "الدرجة:" : "Class:"} {flight.class_type}
            {flight.available_seats && (
              <span className="ml-2">
                {isArabic ? "متاح:" : "Available:"} {flight.available_seats}
              </span>
            )}
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleBookNow}
          >
            {isArabic ? "احجز الآن" : "Book Now"}
          </Button>
        </div>
        
        <div className="mt-2 text-center">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            {isArabic ? "🎯 حجز مباشر من موقعنا" : "🎯 Direct booking from our website"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;

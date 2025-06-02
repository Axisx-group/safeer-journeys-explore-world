
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSkyscannerFlights } from "@/hooks/useSkyscannerFlights";
import FlightOfferCard from "./FlightOfferCard";

interface FlightTabContentProps {
  route: any;
  onBookFlight: (flight: any) => void;
}

const FlightTabContent = ({ route, onBookFlight }: FlightTabContentProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

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
        <FlightOfferCard 
          key={flight.id || index} 
          flight={flight} 
          route={route} 
          onBookFlight={onBookFlight}
        />
      ))}
    </div>
  );
};

export default FlightTabContent;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Clock, Euro } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import FlightOfferCard from './FlightOfferCard';

interface FlightGridProps {
  flights: any[];
  isLoading: boolean;
  searchParams: any;
}

const FlightGrid = ({ flights, isLoading, searchParams }: FlightGridProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {isArabic ? 'لا توجد رحلات' : 'No Flights Found'}
          </h3>
          <p className="text-gray-500">
            {isArabic 
              ? 'جرب تغيير معايير البحث أو المرشحات'
              : 'Try adjusting your search criteria or filters'
            }
          </p>
        </div>
      </div>
    );
  }

  const handleBookFlight = (flight: any) => {
    if (flight.deeplink) {
      window.open(flight.deeplink, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {isArabic ? `${flights.length} رحلة متاحة` : `${flights.length} flights available`}
        </h2>
        <div className="text-sm text-gray-600">
          {isArabic ? 'مرتبة حسب السعر' : 'Sorted by price'}
        </div>
      </div>

      {/* Flight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {flights.map((flight, index) => (
          <motion.div
            key={flight.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FlightOfferCard
              flight={flight}
              route={{
                origin: searchParams.origin,
                destination: searchParams.destination,
                name: { en: 'Flight', ar: 'رحلة' }
              }}
              onBookFlight={handleBookFlight}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlightGrid;

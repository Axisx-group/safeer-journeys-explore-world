
import React, { useState, useEffect } from 'react';
import { useFlights, useFlightSearch } from '@/hooks/useFlights';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, MapPin, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const RealTimeFlightData = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchParams, setSearchParams] = useState({
    departure_city: '',
    arrival_city: '',
    departure_date: '',
  });

  const { data: flights, isLoading, refetch } = useFlights(searchParams);
  const { refetch: fetchNewFlights, isLoading: isFetching } = useFlightSearch();

  // Auto-load flights on component mount
  useEffect(() => {
    handleFetchNewData();
  }, []);

  const handleSearch = () => {
    refetch();
  };

  const handleFetchNewData = async () => {
    try {
      await fetchNewFlights();
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isArabic ? 'الرحلات المتاحة' : 'Available Flights'}
          </h2>
          <p className="text-xl text-gray-600">
            {isArabic ? 'اكتشف أفضل الرحلات بأسعار مناسبة' : 'Discover the best flights at great prices'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow">
            <Input
              placeholder={isArabic ? "المدينة المغادرة" : "Departure City"}
              value={searchParams.departure_city}
              onChange={(e) => setSearchParams(prev => ({ ...prev, departure_city: e.target.value }))}
              className="flex-1"
            />
            <Input
              placeholder={isArabic ? "مدينة الوصول" : "Arrival City"}
              value={searchParams.arrival_city}
              onChange={(e) => setSearchParams(prev => ({ ...prev, arrival_city: e.target.value }))}
              className="flex-1"
            />
            <Input
              type="date"
              value={searchParams.departure_date}
              onChange={(e) => setSearchParams(prev => ({ ...prev, departure_date: e.target.value }))}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isArabic ? "بحث" : "Search"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleFetchNewData} 
              disabled={isFetching}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              {isArabic ? "تحديث البيانات" : "Update Data"}
            </Button>
          </div>

          {isLoading || isFetching ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid gap-4">
              {flights?.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow bg-white">
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
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        {isArabic ? "احجز الآن" : "Book Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {flights?.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  {isArabic ? "لا توجد رحلات متاحة" : "No flights available"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealTimeFlightData;


import React, { useState, useEffect } from 'react';
import { useFlights, useFlightSearch } from '@/hooks/useFlights';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, MapPin, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const RealTimeFlightData = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [searchParams, setSearchParams] = useState({
    departure_city: 'الرياض',
    arrival_city: 'جدة',
    departure_date: '2025-06-01',
  });

  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Auto-load flights on component mount
  useEffect(() => {
    handleFetchNewData();
  }, []);

  const handleSearch = async () => {
    if (!searchParams.departure_city || !searchParams.arrival_city || !searchParams.departure_date) {
      console.log('Missing search parameters');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Searching with params:', searchParams);
      
      // First try to fetch fresh data from API
      await fetchFromAPI();
      
      // Then fetch from database
      let query = supabase
        .from('flights')
        .select('*')
        .order('price', { ascending: true });

      if (searchParams.departure_city) {
        query = query.eq('departure_city', searchParams.departure_city);
      }
      if (searchParams.arrival_city) {
        query = query.eq('arrival_city', searchParams.arrival_city);
      }
      if (searchParams.departure_date) {
        query = query.eq('departure_date', searchParams.departure_date);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Database error:', error);
      } else {
        console.log('Search results:', data);
        setFlights(data || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFromAPI = async () => {
    try {
      setIsFetching(true);
      console.log('Fetching from API with params:', searchParams);
      
      const { data, error } = await supabase.functions.invoke('fetch-flights', {
        body: { 
          searchParams: searchParams
        }
      });
      
      if (error) {
        console.error('API fetch error:', error);
      } else {
        console.log('API response:', data);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleFetchNewData = async () => {
    await fetchFromAPI();
    
    // Wait a moment for the data to be inserted, then fetch from database
    setTimeout(async () => {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('price', { ascending: true })
        .limit(10);
      
      if (!error && data) {
        setFlights(data);
      }
    }, 1000);
  };

  const saudiCities = [
    'الرياض',
    'جدة', 
    'الدمام',
    'مكة',
    'المدينة',
    'الطائف',
    'أبها',
    'تبوك',
    'القصيم',
    'حائل'
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {isArabic ? "مدينة المغادرة" : "Departure City"}
              </label>
              <select
                value={searchParams.departure_city}
                onChange={(e) => setSearchParams(prev => ({ ...prev, departure_city: e.target.value }))}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {saudiCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {isArabic ? "مدينة الوصول" : "Arrival City"}
              </label>
              <select
                value={searchParams.arrival_city}
                onChange={(e) => setSearchParams(prev => ({ ...prev, arrival_city: e.target.value }))}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {saudiCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {isArabic ? "تاريخ المغادرة" : "Departure Date"}
              </label>
              <Input
                type="date"
                value={searchParams.departure_date}
                onChange={(e) => setSearchParams(prev => ({ ...prev, departure_date: e.target.value }))}
                className="h-10"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2 flex flex-col justify-end">
              <Button 
                onClick={handleSearch} 
                disabled={isLoading || isFetching}
                className="h-10 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    {isArabic ? "جاري البحث..." : "Searching..."}
                  </>
                ) : (
                  isArabic ? "بحث" : "Search"
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
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
                  {isArabic ? "لا توجد رحلات متاحة لهذا البحث" : "No flights available for this search"}
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


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
    arrival_city: 'مدريد',
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

  const worldCities = [
    // European Cities (Focus)
    { ar: 'مدريد', en: 'Madrid', code: 'MAD' },
    { ar: 'برشلونة', en: 'Barcelona', code: 'BCN' },
    { ar: 'إشبيلية', en: 'Seville', code: 'SVQ' },
    { ar: 'إسطنبول', en: 'Istanbul', code: 'IST' },
    { ar: 'روما', en: 'Rome', code: 'ROM' },
    { ar: 'باريس', en: 'Paris', code: 'PAR' },
    { ar: 'لندن', en: 'London', code: 'LON' },
    { ar: 'برلين', en: 'Berlin', code: 'BER' },
    { ar: 'أمستردام', en: 'Amsterdam', code: 'AMS' },
    { ar: 'فيينا', en: 'Vienna', code: 'VIE' },
    { ar: 'براغ', en: 'Prague', code: 'PRG' },
    { ar: 'بودابست', en: 'Budapest', code: 'BUD' },
    { ar: 'وارسو', en: 'Warsaw', code: 'WAW' },
    { ar: 'زيورخ', en: 'Zurich', code: 'ZUR' },
    { ar: 'جنيف', en: 'Geneva', code: 'GVA' },
    { ar: 'ميلان', en: 'Milan', code: 'MIL' },
    { ar: 'فلورنسا', en: 'Florence', code: 'FLR' },
    { ar: 'البندقية', en: 'Venice', code: 'VCE' },
    { ar: 'أثينا', en: 'Athens', code: 'ATH' },
    { ar: 'لشبونة', en: 'Lisbon', code: 'LIS' },
    { ar: 'بورتو', en: 'Porto', code: 'OPO' },
    { ar: 'ستوكهولم', en: 'Stockholm', code: 'STO' },
    { ar: 'كوبنهاغن', en: 'Copenhagen', code: 'CPH' },
    { ar: 'أوسلو', en: 'Oslo', code: 'OSL' },
    { ar: 'هلسنكي', en: 'Helsinki', code: 'HEL' },
    { ar: 'بروكسل', en: 'Brussels', code: 'BRU' },
    { ar: 'دبلن', en: 'Dublin', code: 'DUB' },
    { ar: 'إدنبرة', en: 'Edinburgh', code: 'EDI' },
    { ar: 'مانشستر', en: 'Manchester', code: 'MAN' },
    { ar: 'ليون', en: 'Lyon', code: 'LYS' },
    { ar: 'نيس', en: 'Nice', code: 'NCE' },
    { ar: 'مرسيليا', en: 'Marseille', code: 'MRS' },
    { ar: 'مونيخ', en: 'Munich', code: 'MUC' },
    { ar: 'فرانكفورت', en: 'Frankfurt', code: 'FRA' },
    { ar: 'هامبورغ', en: 'Hamburg', code: 'HAM' },
    
    // Middle East & Saudi Cities
    { ar: 'الرياض', en: 'Riyadh', code: 'RUH' },
    { ar: 'جدة', en: 'Jeddah', code: 'JED' },
    { ar: 'الدمام', en: 'Dammam', code: 'DMM' },
    { ar: 'مكة', en: 'Mecca', code: 'JED' },
    { ar: 'المدينة', en: 'Medina', code: 'MED' },
    { ar: 'الطائف', en: 'Taif', code: 'TIF' },
    { ar: 'أبها', en: 'Abha', code: 'AHB' },
    { ar: 'تبوك', en: 'Tabuk', code: 'TUU' },
    { ar: 'القصيم', en: 'Qassim', code: 'ELQ' },
    { ar: 'حائل', en: 'Hail', code: 'HAS' },
    { ar: 'دبي', en: 'Dubai', code: 'DXB' },
    { ar: 'أبو ظبي', en: 'Abu Dhabi', code: 'AUH' },
    { ar: 'الدوحة', en: 'Doha', code: 'DOH' },
    { ar: 'الكويت', en: 'Kuwait', code: 'KWI' },
    { ar: 'المنامة', en: 'Manama', code: 'BAH' },
    { ar: 'مسقط', en: 'Muscat', code: 'MCT' },
    { ar: 'بيروت', en: 'Beirut', code: 'BEY' },
    { ar: 'عمان', en: 'Amman', code: 'AMM' },
    { ar: 'القاهرة', en: 'Cairo', code: 'CAI' },
    { ar: 'الإسكندرية', en: 'Alexandria', code: 'ALY' },
    { ar: 'أنقرة', en: 'Ankara', code: 'ESB' },
    { ar: 'إزمير', en: 'Izmir', code: 'ADB' },
    { ar: 'أنطاليا', en: 'Antalya', code: 'AYT' },
    
    // North America
    { ar: 'نيويورك', en: 'New York', code: 'NYC' },
    { ar: 'لوس أنجلوس', en: 'Los Angeles', code: 'LAX' },
    { ar: 'شيكاغو', en: 'Chicago', code: 'CHI' },
    { ar: 'ميامي', en: 'Miami', code: 'MIA' },
    { ar: 'لاس فيغاس', en: 'Las Vegas', code: 'LAS' },
    { ar: 'سان فرانسيسكو', en: 'San Francisco', code: 'SFO' },
    { ar: 'تورونتو', en: 'Toronto', code: 'YYZ' },
    { ar: 'فانكوفر', en: 'Vancouver', code: 'YVR' },
    { ar: 'مونتريال', en: 'Montreal', code: 'YUL' },
    
    // Asia
    { ar: 'طوكيو', en: 'Tokyo', code: 'NRT' },
    { ar: 'أوساكا', en: 'Osaka', code: 'KIX' },
    { ar: 'سيول', en: 'Seoul', code: 'ICN' },
    { ar: 'بكين', en: 'Beijing', code: 'PEK' },
    { ar: 'شنغهاي', en: 'Shanghai', code: 'PVG' },
    { ar: 'هونغ كونغ', en: 'Hong Kong', code: 'HKG' },
    { ar: 'سنغافورة', en: 'Singapore', code: 'SIN' },
    { ar: 'كوالالمبور', en: 'Kuala Lumpur', code: 'KUL' },
    { ar: 'بانكوك', en: 'Bangkok', code: 'BKK' },
    { ar: 'جاكرتا', en: 'Jakarta', code: 'CGK' },
    { ar: 'مانيلا', en: 'Manila', code: 'MNL' },
    { ar: 'مومباي', en: 'Mumbai', code: 'BOM' },
    { ar: 'دلهي', en: 'Delhi', code: 'DEL' },
    { ar: 'بنغالور', en: 'Bangalore', code: 'BLR' },
    { ar: 'كراتشي', en: 'Karachi', code: 'KHI' },
    { ar: 'إسلام آباد', en: 'Islamabad', code: 'ISB' },
    { ar: 'لاهور', en: 'Lahore', code: 'LHE' },
    
    // Australia & Oceania
    { ar: 'سيدني', en: 'Sydney', code: 'SYD' },
    { ar: 'ملبورن', en: 'Melbourne', code: 'MEL' },
    { ar: 'بريسبان', en: 'Brisbane', code: 'BNE' },
    { ar: 'بيرث', en: 'Perth', code: 'PER' },
    { ar: 'أوكلاند', en: 'Auckland', code: 'AKL' },
    
    // Africa
    { ar: 'كيب تاون', en: 'Cape Town', code: 'CPT' },
    { ar: 'جوهانسبرغ', en: 'Johannesburg', code: 'JNB' },
    { ar: 'الدار البيضاء', en: 'Casablanca', code: 'CMN' },
    { ar: 'الرباط', en: 'Rabat', code: 'RBA' },
    { ar: 'مراكش', en: 'Marrakech', code: 'RAK' },
    { ar: 'تونس', en: 'Tunis', code: 'TUN' },
    { ar: 'الجزائر', en: 'Algiers', code: 'ALG' },
    { ar: 'لاغوس', en: 'Lagos', code: 'LOS' },
    { ar: 'نيروبي', en: 'Nairobi', code: 'NBO' },
    { ar: 'أديس أبابا', en: 'Addis Ababa', code: 'ADD' },
    
    // South America
    { ar: 'ساو باولو', en: 'São Paulo', code: 'SAO' },
    { ar: 'ريو دي جانيرو', en: 'Rio de Janeiro', code: 'GIG' },
    { ar: 'بوينس آيريس', en: 'Buenos Aires', code: 'EZE' },
    { ar: 'ليما', en: 'Lima', code: 'LIM' },
    { ar: 'بوغوتا', en: 'Bogotá', code: 'BOG' },
    { ar: 'كاراكاس', en: 'Caracas', code: 'CCS' },
    { ar: 'سانتياغو', en: 'Santiago', code: 'SCL' }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isArabic ? 'الرحلات المتاحة' : 'Available Flights'}
          </h2>
          <p className="text-xl text-gray-600">
            {isArabic ? 'اكتشف أفضل الرحلات إلى جميع أنحاء العالم بأسعار مناسبة' : 'Discover the best flights to all around the world at great prices'}
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
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {worldCities.map(city => (
                  <option key={city.code} value={city.ar}>
                    {isArabic ? city.ar : city.en}
                  </option>
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
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {worldCities.map(city => (
                  <option key={city.code} value={city.ar}>
                    {isArabic ? city.ar : city.en}
                  </option>
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

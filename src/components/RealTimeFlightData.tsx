
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Plane, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface FlightData {
  id: string;
  from: string;
  to: string;
  price: number;
  currency: string;
  passengers: number;
  status: 'on-time' | 'delayed' | 'boarding' | 'departed';
  departure: string;
  arrival: string;
  airline: string;
  priceChange: number;
}

interface AirportStats {
  airport: string;
  city: string;
  country: string;
  totalPassengers: number;
  activeFlights: number;
  averageDelay: number;
}

const RealTimeFlightData = () => {
  const { language } = useLanguage();
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [airportStats, setAirportStats] = useState<AirportStats[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const generateFlightData = (): FlightData[] => {
      const routes = [
        { from: 'دبي (DXB)', to: 'لندن (LHR)', fromEn: 'Dubai (DXB)', toEn: 'London (LHR)' },
        { from: 'الرياض (RUH)', to: 'باريس (CDG)', fromEn: 'Riyadh (RUH)', toEn: 'Paris (CDG)' },
        { from: 'القاهرة (CAI)', to: 'نيويورك (JFK)', fromEn: 'Cairo (CAI)', toEn: 'New York (JFK)' },
        { from: 'الدوحة (DOH)', to: 'طوكيو (NRT)', fromEn: 'Doha (DOH)', toEn: 'Tokyo (NRT)' },
        { from: 'جدة (JED)', to: 'فرانكفورت (FRA)', fromEn: 'Jeddah (JED)', toEn: 'Frankfurt (FRA)' }
      ];

      const airlines = ['طيران الإمارات', 'الخطوط السعودية', 'مصر للطيران', 'الخطوط القطرية'];
      const statuses: Array<'on-time' | 'delayed' | 'boarding' | 'departed'> = ['on-time', 'delayed', 'boarding', 'departed'];

      return routes.map((route, index) => ({
        id: `FL${1000 + index}`,
        from: language === 'ar' ? route.from : route.fromEn,
        to: language === 'ar' ? route.to : route.toEn,
        price: Math.floor(Math.random() * 2000) + 800,
        currency: language === 'ar' ? 'ريال' : 'USD',
        passengers: Math.floor(Math.random() * 300) + 50,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        departure: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        arrival: new Date(Date.now() + Math.random() * 36 * 60 * 60 * 1000).toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        priceChange: (Math.random() - 0.5) * 200
      }));
    };

    const generateAirportStats = (): AirportStats[] => {
      const airports = [
        { airport: 'DXB', city: 'دبي', country: 'الإمارات', cityEn: 'Dubai', countryEn: 'UAE' },
        { airport: 'RUH', city: 'الرياض', country: 'السعودية', cityEn: 'Riyadh', countryEn: 'Saudi Arabia' },
        { airport: 'CAI', city: 'القاهرة', country: 'مصر', cityEn: 'Cairo', countryEn: 'Egypt' },
        { airport: 'DOH', city: 'الدوحة', country: 'قطر', cityEn: 'Doha', countryEn: 'Qatar' }
      ];

      return airports.map(airport => ({
        airport: airport.airport,
        city: language === 'ar' ? airport.city : airport.cityEn,
        country: language === 'ar' ? airport.country : airport.countryEn,
        totalPassengers: Math.floor(Math.random() * 50000) + 10000,
        activeFlights: Math.floor(Math.random() * 200) + 50,
        averageDelay: Math.floor(Math.random() * 30)
      }));
    };

    const updateData = () => {
      setFlightData(generateFlightData());
      setAirportStats(generateAirportStats());
      setLoading(false);
    };

    updateData();
    const interval = setInterval(updateData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [language]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      case 'boarding': return 'bg-yellow-500';
      case 'departed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      'on-time': language === 'ar' ? 'في الموعد' : 'On Time',
      'delayed': language === 'ar' ? 'متأخر' : 'Delayed',
      'boarding': language === 'ar' ? 'صعود' : 'Boarding',
      'departed': language === 'ar' ? 'غادر' : 'Departed'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <AlertCircle className="h-4 w-4" />;
      case 'boarding': return <Clock className="h-4 w-4" />;
      case 'departed': return <Plane className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">
              {language === 'ar' ? 'جاري تحميل البيانات الحية...' : 'Loading live data...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'بيانات الطيران الحية' : 'Live Flight Data'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'تابع أحدث أسعار الطيران وحالة الرحلات وإحصائيات المطارات في الوقت الفعلي'
              : 'Track the latest flight prices, flight status, and airport statistics in real-time'
            }
          </p>
          <div className="flex items-center justify-center mt-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="ml-2 text-sm text-gray-500">
              {language === 'ar' ? 'بيانات حية' : 'Live Data'}
            </span>
          </div>
        </div>

        {/* Airport Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {airportStats.map((airport, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {airport.airport}
                </CardTitle>
                <p className="text-sm text-gray-600">{airport.city}, {airport.country}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {language === 'ar' ? 'المسافرون' : 'Passengers'}
                  </span>
                  <span className="font-semibold">{airport.totalPassengers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Plane className="h-4 w-4" />
                    {language === 'ar' ? 'الرحلات النشطة' : 'Active Flights'}
                  </span>
                  <span className="font-semibold">{airport.activeFlights}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {language === 'ar' ? 'متوسط التأخير' : 'Avg Delay'}
                  </span>
                  <span className="font-semibold">{airport.averageDelay} {language === 'ar' ? 'دقيقة' : 'min'}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Flight Data */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Plane className="h-6 w-6 text-blue-600" />
              {language === 'ar' ? 'الرحلات الحية' : 'Live Flights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flightData.map((flight) => (
                <div key={flight.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{flight.id}</Badge>
                        <span className="text-sm text-gray-600">{flight.airline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <span>{flight.from}</span>
                        <Plane className="h-4 w-4 text-blue-600" />
                        <span>{flight.to}</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        {language === 'ar' ? 'المغادرة' : 'Departure'}
                      </div>
                      <div className="font-semibold">{flight.departure}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        {language === 'ar' ? 'الوصول' : 'Arrival'}
                      </div>
                      <div className="font-semibold">{flight.arrival}</div>
                    </div>
                    
                    <div className="text-center">
                      <Badge className={`${getStatusColor(flight.status)} text-white mb-2`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(flight.status)}
                          {getStatusText(flight.status)}
                        </span>
                      </Badge>
                      <div className="text-lg font-bold text-blue-600">
                        {flight.price.toLocaleString()} {flight.currency}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm">
                        {flight.priceChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-red-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500" />
                        )}
                        <span className={flight.priceChange > 0 ? 'text-red-500' : 'text-green-500'}>
                          {Math.abs(flight.priceChange).toFixed(0)} {flight.currency}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {flight.passengers} {language === 'ar' ? 'مسافر' : 'passengers'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RealTimeFlightData;

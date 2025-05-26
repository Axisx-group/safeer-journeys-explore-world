import { SearchParams, FlightData } from './types.ts';
import { cityToAirport, airlines } from './constants.ts';

export function generateFallbackFlights(searchParams: SearchParams): FlightData[] {
  const { departure_city, arrival_city, departure_date } = searchParams;
  
  // Global destinations with their airport codes
  const globalDestinations = [
    // Middle East
    { city: 'دبي', airport: 'DXB' },
    { city: 'أبوظبي', airport: 'AUH' },
    { city: 'الدوحة', airport: 'DOH' },
    { city: 'الكويت', airport: 'KWI' },
    { city: 'المنامة', airport: 'BAH' },
    { city: 'مسقط', airport: 'MCT' },
    { city: 'عمان', airport: 'AMM' },
    { city: 'بيروت', airport: 'BEY' },
    
    // Europe
    { city: 'لندن', airport: 'LHR' },
    { city: 'باريس', airport: 'CDG' },
    { city: 'مدريد', airport: 'MAD' },
    { city: 'برشلونة', airport: 'BCN' },
    { city: 'روما', airport: 'FCO' },
    { city: 'أمستردام', airport: 'AMS' },
    { city: 'فرانكفورت', airport: 'FRA' },
    { city: 'زيورخ', airport: 'ZUR' },
    { city: 'إسطنبول', airport: 'IST' },
    
    // Asia
    { city: 'طوكيو', airport: 'NRT' },
    { city: 'سيول', airport: 'ICN' },
    { city: 'بكين', airport: 'PEK' },
    { city: 'شنغهاي', airport: 'PVG' },
    { city: 'سنغافورة', airport: 'SIN' },
    { city: 'كوالالمبور', airport: 'KUL' },
    { city: 'بانكوك', airport: 'BKK' },
    { city: 'دلهي', airport: 'DEL' },
    { city: 'مومباي', airport: 'BOM' },
    
    // North America
    { city: 'نيويورك', airport: 'JFK' },
    { city: 'لوس أنجلوس', airport: 'LAX' },
    { city: 'شيكاغو', airport: 'ORD' },
    { city: 'تورونتو', airport: 'YYZ' },
    
    // Africa
    { city: 'القاهرة', airport: 'CAI' },
    { city: 'الدار البيضاء', airport: 'CMN' },
    { city: 'أديس أبابا', airport: 'ADD' },
    { city: 'جوهانسبرغ', airport: 'JNB' },
    
    // Oceania
    { city: 'سيدني', airport: 'SYD' },
    { city: 'ملبورن', airport: 'MEL' }
  ];

  // Saudi departure cities
  const saudiCities = [
    { city: 'الرياض', airport: 'RUH' },
    { city: 'جدة', airport: 'JED' },
    { city: 'الدمام', airport: 'DMM' }
  ];

  // Find departure city info
  const departureInfo = saudiCities.find(c => c.city === departure_city) || 
                       globalDestinations.find(c => c.city === departure_city) || 
                       saudiCities[0];
  
  // Find arrival city info or use provided one
  const arrivalInfo = globalDestinations.find(c => c.city === arrival_city) || 
                     saudiCities.find(c => c.city === arrival_city) || 
                     globalDestinations[0];

  const flights: FlightData[] = [];
  
  // Generate 8-12 flights with global airlines and various currencies
  for (let i = 0; i < 10; i++) {
    const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
    const randomDestination = globalDestinations[Math.floor(Math.random() * globalDestinations.length)];
    const finalDestination = arrival_city ? arrivalInfo : randomDestination;
    
    // Dynamic pricing based on destination region
    let basePrice, currency;
    
    // Determine currency and price range based on destination
    if (['دبي', 'أبوظبي', 'الدوحة', 'الكويت', 'المنامة', 'مسقط'].includes(finalDestination.city)) {
      // GCC destinations - SAR
      basePrice = 400 + Math.floor(Math.random() * 800); // 400-1200 SAR
      currency = 'SAR';
    } else if (['لندن', 'باريس', 'مدريد', 'روما', 'أمستردام', 'فرانكفورت', 'زيورخ'].includes(finalDestination.city)) {
      // European destinations - EUR
      basePrice = 120 + Math.floor(Math.random() * 400); // 120-520 EUR
      currency = 'EUR';
    } else if (['نيويورك', 'لوس أنجلوس', 'شيكاغو', 'تورونتو'].includes(finalDestination.city)) {
      // North American destinations - USD
      basePrice = 150 + Math.floor(Math.random() * 600); // 150-750 USD
      currency = 'USD';
    } else if (['طوكيو', 'سيول', 'سنغافورة', 'كوالالمبور', 'بانكوك'].includes(finalDestination.city)) {
      // Asian destinations - USD
      basePrice = 200 + Math.floor(Math.random() * 500); // 200-700 USD
      currency = 'USD';
    } else {
      // Other destinations - USD
      basePrice = 180 + Math.floor(Math.random() * 450); // 180-630 USD
      currency = 'USD';
    }

    const priceVariation = Math.floor(Math.random() * 100) - 50; // -50 to +50
    const finalPrice = Math.max(100, basePrice + priceVariation);

    const departureHour = 6 + Math.floor(Math.random() * 16); // 6 AM to 10 PM
    const departureMinute = Math.floor(Math.random() * 60);
    const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
    
    const flightDuration = 180 + Math.floor(Math.random() * 600); // 3-13 hours
    const arrivalTotalMinutes = (departureHour * 60 + departureMinute + flightDuration) % 1440;
    const arrivalHour = Math.floor(arrivalTotalMinutes / 60);
    const arrivalMin = arrivalTotalMinutes % 60;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}`;

    const stops = Math.random() > 0.6 ? 1 : 0; // 60% direct flights
    const isDirectFlight = stops === 0;

    flights.push({
      flight_number: `${randomAirline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
      departure_airport: departureInfo.airport,
      arrival_airport: finalDestination.airport,
      departure_city: departureInfo.city,
      arrival_city: finalDestination.city,
      departure_date,
      departure_time: departureTime,
      arrival_time: arrivalTime,
      airline: randomAirline,
      price: finalPrice,
      currency: currency,
      duration_minutes: flightDuration,
      stops,
      is_direct: isDirectFlight,
      class_type: Math.random() > 0.8 ? 'business' : 'economy',
      available_seats: Math.floor(Math.random() * 50) + 10
    });
  }

  return flights.sort((a, b) => a.price - b.price);
}

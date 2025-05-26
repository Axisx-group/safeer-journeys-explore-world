
import { SearchParams, FlightData } from './types.ts';
import { cityToAirport, airlines } from './constants.ts';

export function generateFallbackFlights(searchParams: SearchParams): FlightData[] {
  const { departure_city, arrival_city, departure_date } = searchParams;
  
  // European destinations with their airport codes
  const europeanDestinations = [
    { city: 'مدريد', airport: 'MAD' },
    { city: 'برشلونة', airport: 'BCN' },
    { city: 'باريس', airport: 'CDG' },
    { city: 'لندن', airport: 'LHR' },
    { city: 'روما', airport: 'FCO' },
    { city: 'أمستردام', airport: 'AMS' },
    { city: 'فرانكفورت', airport: 'FRA' },
    { city: 'زيورخ', airport: 'ZUR' },
    { city: 'إسطنبول', airport: 'IST' },
    { city: 'براغ', airport: 'PRG' },
    { city: 'بودابست', airport: 'BUD' },
    { city: 'وارسو', airport: 'WAW' },
    { city: 'ميلان', airport: 'MXP' },
    { city: 'أثينا', airport: 'ATH' },
    { city: 'لشبونة', airport: 'LIS' },
    { city: 'ستوكهولم', airport: 'ARN' },
    { city: 'كوبنهاغن', airport: 'CPH' },
    { city: 'أوسلو', airport: 'OSL' },
    { city: 'هلسنكي', airport: 'HEL' },
    { city: 'بروكسل', airport: 'BRU' },
    { city: 'دبلن', airport: 'DUB' },
    { city: 'فيينا', airport: 'VIE' },
    { city: 'برلين', airport: 'BER' }
  ];

  // Saudi departure cities
  const saudiCities = [
    { city: 'الرياض', airport: 'RUH' },
    { city: 'جدة', airport: 'JED' },
    { city: 'الدمام', airport: 'DMM' }
  ];

  // Find departure city info
  const departureInfo = saudiCities.find(c => c.city === departure_city) || saudiCities[0];
  
  // Find arrival city info or use provided one
  const arrivalInfo = europeanDestinations.find(c => c.city === arrival_city) || europeanDestinations[0];

  const flights: FlightData[] = [];
  
  // Generate 8-12 flights with European budget airlines and EUR prices
  for (let i = 0; i < 10; i++) {
    const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
    const randomDestination = europeanDestinations[Math.floor(Math.random() * europeanDestinations.length)];
    const finalDestination = arrival_city ? arrivalInfo : randomDestination;
    
    // Base prices in EUR for different routes
    const basePrice = 150 + Math.floor(Math.random() * 400); // 150-550 EUR
    const priceVariation = Math.floor(Math.random() * 100) - 50; // -50 to +50 EUR
    const finalPrice = Math.max(120, basePrice + priceVariation);

    const departureHour = 6 + Math.floor(Math.random() * 16); // 6 AM to 10 PM
    const departureMinute = Math.floor(Math.random() * 60);
    const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
    
    const flightDuration = 360 + Math.floor(Math.random() * 300); // 6-11 hours
    const arrivalTotalMinutes = (departureHour * 60 + departureMinute + flightDuration) % 1440;
    const arrivalHour = Math.floor(arrivalTotalMinutes / 60);
    const arrivalMin = arrivalTotalMinutes % 60;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}`;

    const stops = Math.random() > 0.7 ? 1 : 0; // 70% direct flights
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
      currency: 'EUR', // Always EUR for European flights
      duration_minutes: flightDuration,
      stops,
      is_direct: isDirectFlight,
      class_type: Math.random() > 0.8 ? 'business' : 'economy',
      available_seats: Math.floor(Math.random() * 50) + 10
    });
  }

  return flights.sort((a, b) => a.price - b.price);
}

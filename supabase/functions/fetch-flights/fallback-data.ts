
import { SearchParams, FlightData } from './types.ts';
import { cityToAirport, airlines } from './constants.ts';

export function generateFallbackFlights(searchParams: SearchParams): FlightData[] {
  console.log('Both APIs failed, using enhanced fallback data');
  
  const { departure_city, arrival_city, departure_date } = searchParams;
  const departureAirport = cityToAirport[departure_city] || 'RUH';
  const arrivalAirport = cityToAirport[arrival_city] || 'MAD';
  
  const basePrice = arrival_city === 'مدريد' ? 2800 : 
                   arrival_city === 'باريس' ? 3200 : 
                   arrival_city === 'لندن' ? 3500 : 1200;
  
  const flights: FlightData[] = [];
  
  for (let i = 0; i < 6; i++) {
    flights.push({
      flight_number: `SV${Math.floor(Math.random() * 9000 + 1000)}`,
      departure_airport: departureAirport,
      arrival_airport: arrivalAirport,
      departure_city,
      arrival_city,
      departure_date,
      departure_time: `${6 + i * 2}:${Math.floor(Math.random() * 6) * 10}`,
      arrival_time: `${14 + i * 2}:${Math.floor(Math.random() * 6) * 10}`,
      airline: airlines[i % airlines.length],
      price: basePrice + Math.floor(Math.random() * 800) - 400,
      currency: 'SAR',
      duration_minutes: arrival_city.includes('مدريد') || arrival_city.includes('باريس') || arrival_city.includes('لندن') ? 
                      420 + Math.floor(Math.random() * 120) : 90 + Math.floor(Math.random() * 60),
      stops: Math.random() > 0.7 ? 1 : 0,
      is_direct: Math.random() > 0.3,
      class_type: 'economy',
      available_seats: Math.floor(Math.random() * 50) + 10
    });
  }

  return flights;
}


import { SearchParams, FlightData } from './types.ts';

export function generateFallbackFlights(searchParams: SearchParams): FlightData[] {
  const { departure_city, arrival_city, departure_date } = searchParams;
  
  console.log('Generating fallback flight data for:', { departure_city, arrival_city, departure_date });
  
  const airlines = [
    'الخطوط السعودية',
    'طيران ناس',
    'طيران أديل', 
    'الخطوط الجوية الإسبانية',
    'طيران الإمارات',
    'الخطوط القطرية'
  ];

  const flightNumbers = [
    'SV401', 'XY205', 'F3801', 'IB3626', 'EK817', 'QR147',
    'SV403', 'XY207', 'F3803', 'IB3628', 'EK819', 'QR149'
  ];

  // Generate valid times (0-23 hours format)
  const generateValidTime = (baseHour: number, addMinutes: number = 0): string => {
    const hour = Math.min(23, Math.max(0, baseHour));
    const minute = addMinutes % 60;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const flights: FlightData[] = [];
  
  for (let i = 0; i < 8; i++) {
    const basePrice = 800 + (i * 150);
    const departureHour = 6 + (i * 2); // Start from 6 AM, every 2 hours
    const flightDuration = 420 + (i * 30); // 7-11 hours
    const arrivalHour = (departureHour + Math.floor(flightDuration / 60)) % 24;
    
    const flight: FlightData = {
      flight_number: flightNumbers[i] || `SV${400 + i}`,
      departure_airport: departure_city === 'الرياض' ? 'RUH' : 'JED',
      arrival_airport: arrival_city === 'مدريد' ? 'MAD' : 'BCN',
      departure_city,
      arrival_city,
      departure_date,
      departure_time: generateValidTime(departureHour),
      arrival_time: generateValidTime(arrivalHour, 30),
      airline: airlines[i % airlines.length],
      price: basePrice + Math.floor(Math.random() * 300),
      currency: 'SAR',
      duration_minutes: flightDuration,
      stops: i % 3 === 0 ? 0 : (i % 2 === 0 ? 1 : 2),
      is_direct: i % 3 === 0,
      class_type: i % 4 === 0 ? 'business' : 'economy',
      available_seats: 15 + Math.floor(Math.random() * 35)
    };
    
    flights.push(flight);
  }
  
  console.log('Generated fallback flights:', flights.length);
  return flights;
}

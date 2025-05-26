
import { SearchParams, FlightData } from './types.ts';

export function generateFallbackFlights(searchParams: SearchParams): FlightData[] {
  const { departure_city, arrival_city, departure_date } = searchParams;
  
  console.log('Generating fallback flight data for:', { departure_city, arrival_city, departure_date });
  
  const airlines = [
    'Ryanair',
    'EasyJet', 
    'Wizz Air',
    'Vueling',
    'Eurowings',
    'Norwegian Air',
    'Jet2',
    'Pegasus Airlines'
  ];

  const flightNumbers = [
    'FR2801', 'U22205', 'W63401', 'VY8626', 'EW817', 'DY147',
    'LS403', 'PC207', 'FR2803', 'U22207', 'W63403', 'VY8628'
  ];

  // Generate valid times (0-23 hours format)
  const generateValidTime = (baseHour: number, addMinutes: number = 0): string => {
    const hour = Math.min(23, Math.max(0, baseHour));
    const minute = addMinutes % 60;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const flights: FlightData[] = [];
  
  for (let i = 0; i < 8; i++) {
    const basePrice = 350 + (i * 80); // Lower prices for budget airlines
    const departureHour = 6 + (i * 2); // Start from 6 AM, every 2 hours
    const flightDuration = 300 + (i * 45); // 5-8.5 hours
    const arrivalHour = (departureHour + Math.floor(flightDuration / 60)) % 24;
    
    const flight: FlightData = {
      flight_number: flightNumbers[i] || `FR${2800 + i}`,
      departure_airport: departure_city === 'الرياض' ? 'RUH' : 'JED',
      arrival_airport: arrival_city === 'مدريد' ? 'MAD' : 'BCN',
      departure_city,
      arrival_city,
      departure_date,
      departure_time: generateValidTime(departureHour),
      arrival_time: generateValidTime(arrivalHour, 30),
      airline: airlines[i % airlines.length],
      price: basePrice + Math.floor(Math.random() * 200), // More affordable pricing
      currency: 'SAR',
      duration_minutes: flightDuration,
      stops: i % 4 === 0 ? 0 : (i % 2 === 0 ? 1 : 2),
      is_direct: i % 4 === 0,
      class_type: i % 6 === 0 ? 'business' : 'economy', // Mostly economy class
      available_seats: 20 + Math.floor(Math.random() * 40)
    };
    
    flights.push(flight);
  }
  
  console.log('Generated fallback flights:', flights.length);
  return flights;
}

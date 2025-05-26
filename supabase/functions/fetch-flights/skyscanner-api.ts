
import { SearchParams, FlightData } from './types.ts';
import { cityToAirport } from './constants.ts';

export async function fetchFromSkyscanner(searchParams: SearchParams, rapidApiKey: string): Promise<FlightData[]> {
  const { departure_city, arrival_city, departure_date } = searchParams;
  const departureAirport = cityToAirport[departure_city] || 'RUH';
  const arrivalAirport = cityToAirport[arrival_city] || 'MAD';

  const skyscannerUrl = `https://skyscanner80.p.rapidapi.com/api/v1/flights/search-one-way?fromId=${departureAirport}&toId=${arrivalAirport}&departDate=${departure_date}&adults=1&currency=SAR&market=SA&locale=ar-SA`;

  console.log('Calling Skyscanner API with URL:', skyscannerUrl);

  const response = await fetch(skyscannerUrl, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'skyscanner80.p.rapidapi.com',
      'X-RapidAPI-Key': rapidApiKey
    }
  });

  if (!response.ok) {
    throw new Error(`Skyscanner API failed with status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Skyscanner API response received:', data);

  const transformedFlights: FlightData[] = [];

  if (data?.data?.itineraries && Array.isArray(data.data.itineraries)) {
    for (const itinerary of data.data.itineraries.slice(0, 8)) {
      const leg = itinerary.legs?.[0];
      const segment = leg?.segments?.[0];
      
      if (leg && segment) {
        const transformedFlight: FlightData = {
          flight_number: segment.flightNumber || `SK${Math.floor(Math.random() * 9000 + 1000)}`,
          departure_airport: departureAirport,
          arrival_airport: arrivalAirport,
          departure_city,
          arrival_city,
          departure_date,
          departure_time: leg.departure?.slice(11, 16) || '08:00',
          arrival_time: leg.arrival?.slice(11, 16) || '10:00',
          airline: segment.marketingCarrier?.name || leg.carriers?.marketing?.[0]?.name || 'الخطوط السعودية',
          price: itinerary.price?.raw || Math.floor(Math.random() * 2000) + 800,
          currency: 'SAR',
          duration_minutes: leg.durationInMinutes || 420,
          stops: leg.stopCount || 0,
          is_direct: !leg.stopCount || leg.stopCount === 0,
          class_type: 'economy',
          available_seats: Math.floor(Math.random() * 50) + 10
        };
        
        transformedFlights.push(transformedFlight);
      }
    }
  }

  return transformedFlights;
}

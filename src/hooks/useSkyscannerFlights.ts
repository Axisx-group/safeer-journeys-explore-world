
import { useQuery } from '@tanstack/react-query';

export interface SkyscannerFlight {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  segments: Array<{
    origin: {
      name: string;
      displayCode: string;
    };
    destination: {
      name: string;
      displayCode: string;
    };
    departure: string;
    arrival: string;
    durationInMinutes: number;
    marketingCarrier: {
      name: string;
      alternateId: string;
    };
  }>;
  deeplink: string;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  date: string;
  adults?: number;
  currency?: string;
  locale?: string;
  market?: string;
  cabinClass?: string;
  countryCode?: string;
}

export const useSkyscannerFlights = (searchParams: FlightSearchParams) => {
  return useQuery({
    queryKey: ['skyscanner-flights', searchParams],
    queryFn: async () => {
      // Format the legs parameter
      const legs = JSON.stringify([{
        destination: searchParams.destination,
        origin: searchParams.origin,
        date: searchParams.date
      }]);

      const url = new URL('https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails');
      url.searchParams.append('legs', legs);
      url.searchParams.append('adults', String(searchParams.adults || 1));
      url.searchParams.append('currency', searchParams.currency || 'USD');
      url.searchParams.append('locale', searchParams.locale || 'en-US');
      url.searchParams.append('market', searchParams.market || 'en-US');
      url.searchParams.append('cabinClass', searchParams.cabinClass || 'economy');
      url.searchParams.append('countryCode', searchParams.countryCode || 'US');

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          'x-rapidapi-key': '5283cccec4mshe94884681afa7b2p1d7553jsn81838e7edc5b'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flight data');
      }

      const data = await response.json();
      console.log('Flight API Response:', data);
      
      // Transform the API response to our format
      const flights: SkyscannerFlight[] = data.data?.flights?.map((flight: any) => ({
        id: flight.id,
        price: {
          amount: flight.price?.amount || 0,
          currency: flight.price?.currency || 'USD'
        },
        segments: flight.segments || [],
        deeplink: flight.deeplink || ''
      })) || [];

      return flights;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });
};

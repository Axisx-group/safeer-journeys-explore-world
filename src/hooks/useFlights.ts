
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Flight {
  id: string;
  flight_number?: string;
  departure_airport: string;
  arrival_airport: string;
  departure_city: string;
  arrival_city: string;
  departure_date: string;
  return_date?: string;
  departure_time?: string;
  arrival_time?: string;
  airline: string;
  price: number;
  currency: string;
  duration_minutes?: number;
  stops: number;
  aircraft_type?: string;
  booking_url?: string;
  is_direct: boolean;
  class_type: string;
  available_seats?: number;
  created_at: string;
  updated_at: string;
}

export const useFlights = (searchParams?: {
  departure_city?: string;
  arrival_city?: string;
  departure_date?: string;
  return_date?: string;
  max_price?: number;
}) => {
  return useQuery({
    queryKey: ['flights', searchParams],
    queryFn: async () => {
      let query = supabase
        .from('flights')
        .select('*')
        .order('price', { ascending: true });

      if (searchParams?.departure_city) {
        query = query.eq('departure_city', searchParams.departure_city);
      }
      if (searchParams?.arrival_city) {
        query = query.eq('arrival_city', searchParams.arrival_city);
      }
      if (searchParams?.departure_date) {
        query = query.eq('departure_date', searchParams.departure_date);
      }
      if (searchParams?.return_date) {
        query = query.eq('return_date', searchParams.return_date);
      }
      if (searchParams?.max_price) {
        query = query.lte('price', searchParams.max_price);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Flight[];
    },
  });
};

export const useFlightSearch = () => {
  return useMutation({
    mutationFn: async (searchParams: {
      departure_city?: string;
      arrival_city?: string;
      departure_date?: string;
      return_date?: string;
    }) => {
      console.log('Searching for flights with params:', searchParams);
      
      // Call the edge function to fetch fresh data from external APIs
      const { data, error } = await supabase.functions.invoke('fetch-flights', {
        body: { searchParams }
      });
      
      if (error) {
        console.error('Flight search error:', error);
        throw error;
      }
      
      console.log('Flight search response:', data);
      return data;
    },
  });
};

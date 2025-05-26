
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  star_rating?: number;
  guest_rating?: number;
  price_per_night: number;
  currency: string;
  check_in_date: string;
  check_out_date: string;
  room_type?: string;
  amenities?: string[];
  description?: string;
  image_urls?: string[];
  booking_url?: string;
  free_wifi: boolean;
  free_parking: boolean;
  pool: boolean;
  gym: boolean;
  spa: boolean;
  restaurant: boolean;
  created_at: string;
  updated_at: string;
}

export const useHotels = (searchParams?: {
  city?: string;
  country?: string;
  check_in_date?: string;
  check_out_date?: string;
  max_price?: number;
  min_rating?: number;
}) => {
  return useQuery({
    queryKey: ['hotels', searchParams],
    queryFn: async () => {
      let query = supabase
        .from('hotels')
        .select('*')
        .order('guest_rating', { ascending: false });

      if (searchParams?.city) {
        query = query.eq('city', searchParams.city);
      }
      if (searchParams?.country) {
        query = query.eq('country', searchParams.country);
      }
      if (searchParams?.check_in_date) {
        query = query.eq('check_in_date', searchParams.check_in_date);
      }
      if (searchParams?.check_out_date) {
        query = query.eq('check_out_date', searchParams.check_out_date);
      }
      if (searchParams?.max_price) {
        query = query.lte('price_per_night', searchParams.max_price);
      }
      if (searchParams?.min_rating) {
        query = query.gte('guest_rating', searchParams.min_rating);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Hotel[];
    },
  });
};

export const useHotelSearch = () => {
  return useQuery({
    queryKey: ['hotel-search'],
    queryFn: async () => {
      // This will call the edge function to fetch fresh data from Booking.com
      const { data, error } = await supabase.functions.invoke('fetch-hotels', {
        body: { 
          searchParams: {
            city: 'الرياض',
            check_in_date: '2024-03-15',
            check_out_date: '2024-03-17'
          }
        }
      });
      
      if (error) throw error;
      return data;
    },
    enabled: false, // Only run when manually triggered
  });
};

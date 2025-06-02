
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

export interface HotelSearchResponse {
  hotels: Hotel[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  source: string;
}

export interface HotelFilters {
  searchTerm?: string;
  country?: string;
  city?: string;
  check_in_date?: string;
  check_out_date?: string;
  guests?: number;
  rooms?: number;
  max_price?: number;
  min_price?: number;
  min_rating?: number;
  page?: number;
  limit?: number;
}

export const useHotels = (searchParams?: HotelFilters) => {
  return useQuery({
    queryKey: ['hotels', searchParams],
    queryFn: async () => {
      console.log('Fetching hotels with search params:', searchParams);
      
      let query = supabase
        .from('hotels')
        .select('*', { count: 'exact' })
        .order('guest_rating', { ascending: false });

      // Apply filters
      if (searchParams?.searchTerm) {
        query = query.or(`name.ilike.%${searchParams.searchTerm}%,city.ilike.%${searchParams.searchTerm}%,country.ilike.%${searchParams.searchTerm}%`);
      }
      
      if (searchParams?.country && searchParams.country !== 'all') {
        // Map country codes to country names for filtering
        const countryMapping: { [key: string]: string[] } = {
          'ES': ['Spain', 'إسبانيا'],
          'FR': ['France', 'فرنسا'],
          'IT': ['Italy', 'إيطاليا'],
          'DE': ['Germany', 'ألمانيا'],
          'UK': ['United Kingdom', 'المملكة المتحدة'],
          'NL': ['Netherlands', 'هولندا'],
          'PT': ['Portugal', 'البرتغال'],
          'GR': ['Greece', 'اليونان'],
          'AT': ['Austria', 'النمسا'],
          'CH': ['Switzerland', 'سويسرا']
        };
        
        const countryNames = countryMapping[searchParams.country] || [];
        if (countryNames.length > 0) {
          query = query.in('country', countryNames);
        }
      }
      
      if (searchParams?.city && searchParams.city !== 'all') {
        query = query.eq('city', searchParams.city);
      }
      
      if (searchParams?.check_in_date) {
        query = query.eq('check_in_date', searchParams.check_in_date);
      }
      
      if (searchParams?.check_out_date) {
        query = query.eq('check_out_date', searchParams.check_out_date);
      }
      
      if (searchParams?.min_price !== undefined) {
        query = query.gte('price_per_night', searchParams.min_price);
      }
      
      if (searchParams?.max_price !== undefined) {
        query = query.lte('price_per_night', searchParams.max_price);
      }
      
      if (searchParams?.min_rating !== undefined && searchParams.min_rating > 0) {
        query = query.gte('guest_rating', searchParams.min_rating);
      }

      // Apply pagination
      const page = searchParams?.page || 1;
      const limit = searchParams?.limit || 20;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, error, count } = await query;
      
      console.log('Hotels query result:', { data, error, count });
      
      if (error) {
        console.error('Error fetching hotels:', error);
        throw error;
      }
      
      return {
        hotels: data as Hotel[],
        total: count || 0,
        page: page,
        limit: limit,
        hasMore: (data?.length || 0) === limit,
        source: 'database'
      } as HotelSearchResponse;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 3,
    refetchOnMount: true,
  });
};

export const useHotelSearch = (searchParams?: HotelFilters) => {
  return useQuery({
    queryKey: ['hotel-search', searchParams],
    queryFn: async () => {
      console.log('Calling fetch-hotels function with params:', searchParams);
      
      const { data, error } = await supabase.functions.invoke('fetch-hotels', {
        body: { 
          searchParams: {
            city: searchParams?.city || 'مدريد',
            check_in_date: searchParams?.check_in_date || '2025-06-15',
            check_out_date: searchParams?.check_out_date || '2025-06-18',
            page: searchParams?.page || 1,
            limit: searchParams?.limit || 50
          }
        }
      });
      
      console.log('fetch-hotels function result:', { data, error });
      
      if (error) {
        console.error('Error calling fetch-hotels function:', error);
        throw error;
      }
      
      return data;
    },
    enabled: false,
    retry: 2,
  });
};

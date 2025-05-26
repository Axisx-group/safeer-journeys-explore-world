
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Flight } from '@/hooks/useFlights';

export const useFlightOperations = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [dataSource, setDataSource] = useState<string>('');

  const handleSearch = async (searchParams: {
    departure_city: string;
    arrival_city: string;
    departure_date: string;
  }) => {
    if (!searchParams.departure_city || !searchParams.arrival_city || !searchParams.departure_date) {
      console.log('Missing search parameters');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Searching with params:', searchParams);
      
      // First try to fetch fresh data from Skyscanner/Booking.com APIs
      await fetchFromAPI(searchParams);
      
      // Then fetch from database
      let query = supabase
        .from('flights')
        .select('*')
        .order('price', { ascending: true });

      if (searchParams.departure_city) {
        query = query.eq('departure_city', searchParams.departure_city);
      }
      if (searchParams.arrival_city) {
        query = query.eq('arrival_city', searchParams.arrival_city);
      }
      if (searchParams.departure_date) {
        query = query.eq('departure_date', searchParams.departure_date);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Database error:', error);
      } else {
        console.log('Search results:', data);
        setFlights(data || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFromAPI = async (searchParams: {
    departure_city: string;
    arrival_city: string;
    departure_date: string;
  }) => {
    try {
      setIsFetching(true);
      console.log('Fetching from Skyscanner/Booking.com APIs with params:', searchParams);
      
      const { data, error } = await supabase.functions.invoke('fetch-flights', {
        body: { 
          searchParams: searchParams
        }
      });
      
      if (error) {
        console.error('API fetch error:', error);
      } else {
        console.log('API response:', data);
        setDataSource(data?.source || 'unknown');
      }
    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleFetchNewData = async () => {
    const defaultParams = {
      departure_city: 'الرياض',
      arrival_city: 'مدريد',
      departure_date: '2025-06-01',
    };

    await fetchFromAPI(defaultParams);
    
    // Wait a moment for the data to be inserted, then fetch from database
    setTimeout(async () => {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('price', { ascending: true })
        .limit(10);
      
      if (!error && data) {
        setFlights(data);
      }
    }, 1000);
  };

  return {
    flights,
    isLoading,
    isFetching,
    dataSource,
    handleSearch,
    handleFetchNewData,
    setFlights
  };
};

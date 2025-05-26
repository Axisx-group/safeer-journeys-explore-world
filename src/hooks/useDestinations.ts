
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Destination {
  id: string;
  name: string;
  name_ar: string;
  country: string;
  country_ar: string;
  description: string;
  description_ar: string;
  climate_type: string;
  best_season: string;
  mood_tags: string[];
  activity_types: string[];
  price_level: number;
  popularity_score: number;
  image_urls: string[];
  video_url?: string;
  coordinates: any;
  average_temperature: number;
  currency: string;
  visa_required: boolean;
  safety_rating: number;
  created_at: string;
  updated_at: string;
}

export const useDestinations = () => {
  return useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('popularity_score', { ascending: false });
      
      if (error) throw error;
      
      // Fallback images if data is missing or has broken URLs
      const processedData = data?.map(dest => ({
        ...dest,
        image_urls: dest.image_urls && dest.image_urls.length > 0 
          ? dest.image_urls 
          : [`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`]
      })) || [];
      
      return processedData as Destination[];
    },
  });
};

export const useDestinationsByMood = (moodTags: string[]) => {
  return useQuery({
    queryKey: ['destinations-by-mood', moodTags],
    queryFn: async () => {
      if (!moodTags.length) return [];
      
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .overlaps('mood_tags', moodTags)
        .order('popularity_score', { ascending: false });
      
      if (error) throw error;
      
      // Fallback images if data is missing or has broken URLs
      const processedData = data?.map(dest => ({
        ...dest,
        image_urls: dest.image_urls && dest.image_urls.length > 0 
          ? dest.image_urls 
          : [`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`]
      })) || [];
      
      return processedData as Destination[];
    },
    enabled: moodTags.length > 0,
  });
};

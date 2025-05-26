
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryItem {
  id: string;
  title: string;
  title_ar: string;
  image_url: string;
  destination: string;
  category: string;
  is_featured: boolean;
  created_at: string;
}

export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Process data to ensure working image URLs
      const processedData = data?.map(item => ({
        ...item,
        image_url: item.image_url || `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
      })) || [];
      
      return processedData as GalleryItem[];
    },
  });
};

export const useFeaturedGallery = () => {
  return useQuery({
    queryKey: ['featured-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Process data to ensure working image URLs
      const processedData = data?.map(item => ({
        ...item,
        image_url: item.image_url || `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
      })) || [];
      
      return processedData as GalleryItem[];
    },
  });
};

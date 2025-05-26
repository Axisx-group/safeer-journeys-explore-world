
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AdvancedBookingData {
  destination_id?: string;
  package_id?: string;
  departure_date: string;
  return_date: string;
  adults: number;
  children?: number;
  infants?: number;
  room_preferences?: any;
  flight_preferences?: any;
  special_requests?: string;
  total_amount: number;
  currency?: string;
  ai_recommended?: boolean;
  mood_based_selection?: boolean;
}

export interface AdvancedBooking {
  id: string;
  user_id: string;
  booking_reference: string;
  destination_id?: string;
  package_id?: string;
  departure_date: string;
  return_date: string;
  adults: number;
  children: number;
  infants: number;
  room_preferences?: any;
  flight_preferences?: any;
  special_requests?: string;
  total_amount: number;
  currency: string;
  payment_status: string;
  booking_status: string;
  ai_recommended: boolean;
  mood_based_selection: boolean;
  created_at: string;
  updated_at: string;
}

export const useAdvancedBookings = () => {
  return useQuery({
    queryKey: ['advanced-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('advanced_bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AdvancedBooking[];
    },
  });
};

export const useCreateAdvancedBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: AdvancedBookingData) => {
      const { data, error } = await supabase
        .from('advanced_bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('تم إنشاء الحجز بنجاح! سنرسل لك تفاصيل الحجز قريباً.');
      queryClient.invalidateQueries({ queryKey: ['advanced-bookings'] });
    },
    onError: (error) => {
      console.error('Error creating advanced booking:', error);
      toast.error('حدث خطأ في إنشاء الحجز. يرجى المحاولة مرة أخرى.');
    },
  });
};

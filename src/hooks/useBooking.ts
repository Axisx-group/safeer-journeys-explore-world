
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  departure_date: string;
  return_date: string;
  passengers: number;
  hotel_preference?: string;
  special_requests?: string;
  total_price?: number;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingData) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Error creating booking:', error);
      toast.error('حدث خطأ في إرسال طلب الحجز. يرجى المحاولة مرة أخرى.');
    },
  });
};

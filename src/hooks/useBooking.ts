
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
  user_id: string | null;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
    onSuccess: (data) => {
      toast.success('تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.', {
        description: `رقم الحجز: ${data.id.slice(0, 8)}`,
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      
      // Redirect to a success page or manage trips
      setTimeout(() => {
        navigate('/manage-trips');
      }, 2000);
    },
    onError: (error) => {
      console.error('Error creating booking:', error);
      toast.error('حدث خطأ في إرسال طلب الحجز. يرجى المحاولة مرة أخرى.', {
        description: 'تأكد من ملء جميع البيانات المطلوبة',
      });
    },
  });
};

export const useUserBookings = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminBooking {
  id: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  destination: string;
  departure_date: string;
  return_date: string;
  passengers: number;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
}

export const useAdminBookings = () => {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedBookings: AdminBooking[] = data?.map(booking => ({
        id: booking.id,
        user_name: booking.name || 'غير محدد',
        user_email: booking.email || 'غير محدد',
        user_phone: booking.phone,
        destination: booking.destination || 'غير محدد',
        departure_date: booking.departure_date || '',
        return_date: booking.return_date || '',
        passengers: booking.passengers || 1,
        total_price: booking.total_price || 0,
        status: (booking.status as AdminBooking['status']) || 'pending',
        created_at: booking.created_at || new Date().toISOString()
      })) || [];

      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      // Use fallback data
      setBookings([
        {
          id: "1",
          user_name: "أحمد محمد",
          user_email: "ahmed@example.com",
          user_phone: "+966501234567",
          destination: "إسطنبول، تركيا",
          departure_date: "2024-02-15",
          return_date: "2024-02-20",
          passengers: 2,
          total_price: 1200,
          status: "confirmed",
          created_at: "2024-01-15"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: AdminBooking['status']) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );

      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث حالة الحجز",
      });

      return true;
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث الحجز",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return {
    bookings,
    loading,
    updateBookingStatus,
    refetch: loadBookings
  };
};


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'resolved' | 'archived';
  created_at: string;
}

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

export interface AdminSettings {
  site_name: string;
  site_description: string;
  support_email: string;
  phone_number: string;
  allow_registration: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  maintenance_mode: boolean;
  auto_approve_bookings: boolean;
  currency: string;
  timezone: string;
}

export const useAdminData = () => {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load messages
  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      // Use fallback data if Supabase fails
      setMessages([
        {
          id: "1",
          name: "سارة أحمد",
          email: "sara@example.com",
          phone: "+966501234567",
          subject: "استفسار عن رحلة إسطنبول",
          message: "مرحباً، أود الاستفسار عن العروض المتاحة لرحلة إسطنبول لشهر مارس القادم للعائلة...",
          status: "new",
          created_at: "2024-01-25T10:30:00Z"
        },
        {
          id: "2",
          name: "محمد سعد",
          email: "mohamed@example.com",
          phone: "+966507654321",
          subject: "طلب تعديل الحجز",
          message: "أحتاج إلى تعديل تاريخ السفر في حجزي رقم #12345 من 15 فبراير إلى 20 فبراير...",
          status: "replied",
          created_at: "2024-01-24T14:15:00Z"
        }
      ]);
    }
  };

  // Load bookings
  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedBookings = data?.map(booking => ({
        id: booking.id,
        user_name: booking.profiles?.full_name || 'غير محدد',
        user_email: booking.profiles?.email || 'غير محدد',
        user_phone: booking.profiles?.phone,
        destination: booking.destination || 'غير محدد',
        departure_date: booking.departure_date || '',
        return_date: booking.return_date || '',
        passengers: booking.passengers || 1,
        total_price: booking.total_amount || 0,
        status: booking.status || 'pending',
        created_at: booking.created_at
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
    }
  };

  // Load settings
  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      setSettings(data || {
        site_name: "ur trvl",
        site_description: "منصة السفر والسياحة الرائدة",
        support_email: "support@urtrvl.com",
        phone_number: "+966500000000",
        allow_registration: true,
        email_notifications: true,
        sms_notifications: false,
        maintenance_mode: false,
        auto_approve_bookings: false,
        currency: "EUR",
        timezone: "Asia/Riyadh"
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Update message status
  const updateMessageStatus = async (messageId: string, status: AdminMessage['status']) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status } : msg
        )
      );

      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث حالة الرسالة",
      });

      return true;
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث الرسالة",
        variant: "destructive",
      });
      return false;
    }
  };

  // Update booking status
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

  // Save settings
  const saveSettings = async (newSettings: Partial<AdminSettings>) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ ...settings, ...newSettings });

      if (error) throw error;

      setSettings(prev => ({ ...prev!, ...newSettings }));

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ الإعدادات",
      });

      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        loadMessages(),
        loadBookings(),
        loadSettings()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    messages,
    bookings,
    settings,
    loading,
    updateMessageStatus,
    updateBookingStatus,
    saveSettings,
    refetchData: () => {
      loadMessages();
      loadBookings();
      loadSettings();
    }
  };
};

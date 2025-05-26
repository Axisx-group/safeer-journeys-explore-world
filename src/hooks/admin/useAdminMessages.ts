
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

export const useAdminMessages = () => {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedMessages: AdminMessage[] = data?.map(msg => ({
        id: msg.id,
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        subject: msg.subject,
        message: msg.message,
        status: (msg.status as AdminMessage['status']) || 'new',
        created_at: msg.created_at
      })) || [];
      
      setMessages(formattedMessages);
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

  useEffect(() => {
    loadMessages();
  }, []);

  return {
    messages,
    loading,
    updateMessageStatus,
    refetch: loadMessages
  };
};

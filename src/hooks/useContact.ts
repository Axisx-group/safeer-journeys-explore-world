
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const useCreateContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactData: ContactData) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([contactData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.');
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
    },
    onError: (error) => {
      console.error('Error creating contact message:', error);
      toast.error('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    },
  });
};

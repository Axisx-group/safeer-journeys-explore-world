
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ActiveSession {
  id: string;
  user_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  device_info?: any;
  last_activity: string;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
}

export const useActiveSessions = () => {
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('active_sessions')
        .select('*')
        .order('last_activity', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching active sessions:', error);
      toast({
        title: "خطأ في جلب الجلسات",
        description: "حدث خطأ أثناء جلب الجلسات النشطة",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const terminateSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('active_sessions')
        .update({ is_active: false })
        .eq('id', sessionId);

      if (error) throw error;
      
      toast({
        title: "تم إنهاء الجلسة",
        description: "تم إنهاء الجلسة بنجاح",
      });
      
      fetchSessions();
    } catch (error) {
      console.error('Error terminating session:', error);
      toast({
        title: "خطأ في إنهاء الجلسة",
        description: "حدث خطأ أثناء إنهاء الجلسة",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return {
    sessions,
    isLoading,
    fetchSessions,
    terminateSession,
    refetch: fetchSessions
  };
};

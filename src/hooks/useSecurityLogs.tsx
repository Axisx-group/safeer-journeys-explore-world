
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityLog {
  id: string;
  user_id?: string;
  action: string;
  resource?: string;
  ip_address?: string;
  user_agent?: string;
  success: boolean;
  failure_reason?: string;
  metadata?: any;
  created_at: string;
}

export const useSecurityLogs = () => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchLogs = async (limit = 50) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('security_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching security logs:', error);
      toast({
        title: "خطأ في جلب سجلات الأمان",
        description: "حدث خطأ أثناء جلب سجلات الأمان",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logSecurityEvent = async (
    action: string,
    resource?: string,
    success: boolean = true,
    failureReason?: string,
    metadata?: any
  ) => {
    try {
      // جلب معلومات الجلسة الحالية
      const userAgent = navigator.userAgent;
      
      const { error } = await supabase
        .from('security_logs')
        .insert({
          action,
          resource,
          user_agent: userAgent,
          success,
          failure_reason: failureReason,
          metadata
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging security event:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    logs,
    isLoading,
    fetchLogs,
    logSecurityEvent,
    refetch: fetchLogs
  };
};


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityLog {
  id: string;
  user_id?: string | null;
  action: string;
  resource?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  success: boolean;
  failure_reason?: string | null;
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
      
      // تحويل البيانات لضمان التوافق مع النوع المحدد
      const typedLogs: SecurityLog[] = (data || []).map(log => ({
        ...log,
        user_id: log.user_id as string | null,
        resource: log.resource as string | null,
        ip_address: log.ip_address as string | null,
        user_agent: log.user_agent as string | null,
        failure_reason: log.failure_reason as string | null
      }));
      
      setLogs(typedLogs);
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

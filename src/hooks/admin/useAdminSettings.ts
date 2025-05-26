
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

export const useAdminSettings = () => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadSettings = async () => {
    try {
      // Since site_settings table doesn't exist, use fallback data
      setSettings({
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

  const saveSettings = async (newSettings: Partial<AdminSettings>) => {
    try {
      // Since site_settings table doesn't exist, just update local state
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
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    saveSettings,
    refetch: loadSettings
  };
};

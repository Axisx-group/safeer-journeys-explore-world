
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAdminData } from "@/hooks/useAdminData";
import GeneralSettingsTab from "./settings/GeneralSettingsTab";
import StripeSettingsTab from "./settings/StripeSettingsTab";
import EmailSettingsTab from "./settings/EmailSettingsTab";
import NotificationsSettingsTab from "./settings/NotificationsSettingsTab";
import SecuritySettingsTab from "./settings/SecuritySettingsTab";
import AppearanceSettingsTab from "./settings/AppearanceSettingsTab";
import SystemSettingsTab from "./settings/SystemSettingsTab";

const AdminSettings = () => {
  const { toast } = useToast();
  const { settings, loading, saveSettings } = useAdminData();
  const [isSaving, setIsSaving] = useState(false);
  
  const [localSettings, setLocalSettings] = useState({
    siteName: settings?.site_name || "ur trvl",
    siteDescription: settings?.site_description || "منصة السفر والسياحة الرائدة",
    supportEmail: settings?.support_email || "support@urtrvl.com",
    phoneNumber: settings?.phone_number || "+966500000000",
    allowRegistration: settings?.allow_registration ?? true,
    emailNotifications: settings?.email_notifications ?? true,
    smsNotifications: settings?.sms_notifications ?? false,
    maintenanceMode: settings?.maintenance_mode ?? false,
    autoApproveBookings: settings?.auto_approve_bookings ?? false,
    currency: settings?.currency || "EUR",
    timezone: settings?.timezone || "Asia/Riyadh",
    maxUploadSize: "10MB",
    sessionTimeout: "30",
    // Stripe settings
    stripePublishableKey: "",
    stripeSecretKey: "",
    stripeWebhookSecret: "",
    stripeTestMode: true,
    stripeAutomaticTax: false,
    stripeCurrency: "EUR",
    // Email settings
    smtpHost: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@urtrvl.com",
    fromName: "ur trvl Support",
    smtpEncryption: true,
    sendActivationEmail: true,
    sendBookingConfirmation: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    console.log('تم حفظ جميع الإعدادات:', localSettings);
    
    try {
      const success = await saveSettings({
        site_name: localSettings.siteName,
        site_description: localSettings.siteDescription,
        support_email: localSettings.supportEmail,
        phone_number: localSettings.phoneNumber,
        allow_registration: localSettings.allowRegistration,
        email_notifications: localSettings.emailNotifications,
        sms_notifications: localSettings.smsNotifications,
        maintenance_mode: localSettings.maintenanceMode,
        auto_approve_bookings: localSettings.autoApproveBookings,
        currency: localSettings.currency,
        timezone: localSettings.timezone
      });

      if (success) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ جميع الإعدادات وتطبيقها على الموقع",
        });
      }
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">جاري تحميل الإعدادات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/20 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              إعدادات النظام
            </CardTitle>
            <Button 
              onClick={handleSaveAll}
              disabled={isSaving}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  حفظ جميع الإعدادات
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="w-full">
            <div className="overflow-x-auto mb-6">
              <TabsList className="inline-flex h-12 items-center justify-start rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-2 text-muted-foreground min-w-full border border-blue-200">
                <TabsTrigger value="general" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md">عام</TabsTrigger>
                <TabsTrigger value="stripe" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md">Stripe</TabsTrigger>
                <TabsTrigger value="email" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md">الإيميل</TabsTrigger>
                <TabsTrigger value="notifications" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md">الإشعارات</TabsTrigger>
                <TabsTrigger value="security" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md">الأمان</TabsTrigger>
                <TabsTrigger value="appearance" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md">المظهر</TabsTrigger>
                <TabsTrigger value="system" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md">النظام</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="space-y-6 mt-6">
              <GeneralSettingsTab 
                settings={localSettings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="stripe" className="space-y-6 mt-6">
              <StripeSettingsTab 
                settings={localSettings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="email" className="space-y-6 mt-6">
              <EmailSettingsTab 
                settings={localSettings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <NotificationsSettingsTab 
                settings={localSettings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <SecuritySettingsTab 
                settings={localSettings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6 mt-6">
              <AppearanceSettingsTab 
                settings={localSettings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="system" className="space-y-6 mt-6">
              <SystemSettingsTab 
                settings={localSettings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;

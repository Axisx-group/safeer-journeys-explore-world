
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import GeneralSettingsTab from "./settings/GeneralSettingsTab";
import StripeSettingsTab from "./settings/StripeSettingsTab";
import EmailSettingsTab from "./settings/EmailSettingsTab";
import NotificationsSettingsTab from "./settings/NotificationsSettingsTab";
import SecuritySettingsTab from "./settings/SecuritySettingsTab";
import AppearanceSettingsTab from "./settings/AppearanceSettingsTab";
import SystemSettingsTab from "./settings/SystemSettingsTab";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "ur trvl",
    siteDescription: "منصة السفر والسياحة الرائدة",
    supportEmail: "support@urtrvl.com",
    phoneNumber: "+966500000000",
    allowRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    autoApproveBookings: false,
    currency: "EUR",
    timezone: "Asia/Riyadh",
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
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground min-w-full">
                <TabsTrigger value="general" className="px-3 py-1.5 text-sm">عام</TabsTrigger>
                <TabsTrigger value="stripe" className="px-3 py-1.5 text-sm">Stripe</TabsTrigger>
                <TabsTrigger value="email" className="px-3 py-1.5 text-sm">الإيميل</TabsTrigger>
                <TabsTrigger value="notifications" className="px-3 py-1.5 text-sm">الإشعارات</TabsTrigger>
                <TabsTrigger value="security" className="px-3 py-1.5 text-sm">الأمان</TabsTrigger>
                <TabsTrigger value="appearance" className="px-3 py-1.5 text-sm">المظهر</TabsTrigger>
                <TabsTrigger value="system" className="px-3 py-1.5 text-sm">النظام</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="space-y-6 mt-6">
              <GeneralSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="stripe" className="space-y-6 mt-6">
              <StripeSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="email" className="space-y-6 mt-6">
              <EmailSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <NotificationsSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <SecuritySettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6 mt-6">
              <AppearanceSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="system" className="space-y-6 mt-6">
              <SystemSettingsTab 
                settings={settings} 
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

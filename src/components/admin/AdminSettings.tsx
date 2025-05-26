
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
            <TabsList className="grid w-full grid-cols-7 mb-6">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="stripe">Stripe</TabsTrigger>
              <TabsTrigger value="email">الإيميل</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="appearance">المظهر</TabsTrigger>
              <TabsTrigger value="system">النظام</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <GeneralSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="stripe" className="space-y-6">
              <StripeSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="email" className="space-y-6">
              <EmailSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationsSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <SecuritySettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <AppearanceSettingsTab 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
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

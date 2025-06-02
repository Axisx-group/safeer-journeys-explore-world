
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Settings, User, Bell, Shield, Globe } from "lucide-react";

const SettingsPage = () => {
  const { language } = useLanguage();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'ar' 
              ? 'قم بتخصيص تفضيلاتك وإعداداتك الشخصية'
              : 'Customize your preferences and personal settings'
            }
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {language === 'ar' ? 'إعدادات الملف الشخصي' : 'Profile Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="firstName">
                  {language === 'ar' ? 'الاسم الأول' : 'First Name'}
                </Label>
                <Input id="firstName" placeholder={language === 'ar' ? 'أدخل اسمك الأول' : 'Enter your first name'} />
              </div>
              <div>
                <Label htmlFor="lastName">
                  {language === 'ar' ? 'الاسم الأخير' : 'Last Name'}
                </Label>
                <Input id="lastName" placeholder={language === 'ar' ? 'أدخل اسمك الأخير' : 'Enter your last name'} />
              </div>
              <div>
                <Label htmlFor="email">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input id="email" type="email" placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">
                  {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
                </Label>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="smsNotifications">
                  {language === 'ar' ? 'إشعارات الرسائل النصية' : 'SMS Notifications'}
                </Label>
                <Switch
                  id="smsNotifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketingEmails">
                  {language === 'ar' ? 'رسائل التسويق' : 'Marketing Emails'}
                </Label>
                <Switch
                  id="marketingEmails"
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {language === 'ar' ? 'إعدادات الخصوصية' : 'Privacy Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">
                  {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                </Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">
                  {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                </Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {language === 'ar' ? 'اللغة والمنطقة' : 'Language & Region'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  {language === 'ar' ? 'اللغة المفضلة' : 'Preferred Language'}
                </Label>
                <p className="text-sm text-gray-600">
                  {language === 'ar' 
                    ? 'يمكنك تغيير اللغة من الشريط العلوي'
                    : 'You can change the language from the top navigation bar'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button size="lg" className="px-8 py-3">
              {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SettingsPage;

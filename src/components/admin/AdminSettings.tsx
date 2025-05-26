import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Globe, Mail, Bell, Shield, Palette, Database, CreditCard } from "lucide-react";

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
    stripeCurrency: "EUR"
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="stripe">Stripe</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="appearance">المظهر</TabsTrigger>
              <TabsTrigger value="system">النظام</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    الإعدادات العامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">اسم الموقع</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => handleSettingChange('siteName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">العملة الافتراضية</Label>
                      <select
                        id="currency"
                        value={settings.currency}
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                        className="w-full h-10 px-3 border border-gray-300 rounded-md"
                      >
                        <option value="EUR">يورو (EUR)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="SAR">ريال سعودي (SAR)</option>
                        <option value="AED">درهم إماراتي (AED)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">وصف الموقع</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">بريد الدعم</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                      <Input
                        id="phoneNumber"
                        value={settings.phoneNumber}
                        onChange={(e) => handleSettingChange('phoneNumber', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stripe" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    إعدادات Stripe للمدفوعات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stripePublishableKey">مفتاح Stripe العام</Label>
                        <Input
                          id="stripePublishableKey"
                          type="text"
                          placeholder="pk_test_..."
                          value={settings.stripePublishableKey}
                          onChange={(e) => handleSettingChange('stripePublishableKey', e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                          المفتاح العام لـ Stripe (يبدأ بـ pk_)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripeSecretKey">مفتاح Stripe السري</Label>
                        <Input
                          id="stripeSecretKey"
                          type="password"
                          placeholder="sk_test_..."
                          value={settings.stripeSecretKey}
                          onChange={(e) => handleSettingChange('stripeSecretKey', e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                          المفتاح السري لـ Stripe (يبدأ بـ sk_)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stripeWebhookSecret">سر الـ Webhook</Label>
                      <Input
                        id="stripeWebhookSecret"
                        type="password"
                        placeholder="whsec_..."
                        value={settings.stripeWebhookSecret}
                        onChange={(e) => handleSettingChange('stripeWebhookSecret', e.target.value)}
                      />
                      <p className="text-xs text-gray-500">
                        مطلوب لتأكيد صحة إشعارات Stripe
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stripeCurrency">العملة الافتراضية</Label>
                        <select
                          id="stripeCurrency"
                          value={settings.stripeCurrency}
                          onChange={(e) => handleSettingChange('stripeCurrency', e.target.value)}
                          className="w-full h-10 px-3 border border-gray-300 rounded-md"
                        >
                          <option value="EUR">يورو (EUR)</option>
                          <option value="USD">دولار أمريكي (USD)</option>
                          <option value="SAR">ريال سعودي (SAR)</option>
                          <option value="AED">درهم إماراتي (AED)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>الوضع التجريبي</Label>
                          <div className="text-sm text-gray-500">
                            تفعيل الوضع التجريبي لـ Stripe
                          </div>
                        </div>
                        <Switch
                          checked={settings.stripeTestMode}
                          onCheckedChange={(checked) => handleSettingChange('stripeTestMode', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>الضرائب التلقائية</Label>
                          <div className="text-sm text-gray-500">
                            تفعيل حساب الضرائب التلقائي
                          </div>
                        </div>
                        <Switch
                          checked={settings.stripeAutomaticTax}
                          onCheckedChange={(checked) => handleSettingChange('stripeAutomaticTax', checked)}
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">معلومات مهمة:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• تأكد من استخدام المفاتيح الصحيحة (تجريبية أو حقيقية)</li>
                        <li>• لا تشارك المفاتيح السرية مع أي شخص</li>
                        <li>• قم بتجربة النظام في الوضع التجريبي أولاً</li>
                        <li>• تأكد من تكوين الـ Webhooks في لوحة تحكم Stripe</li>
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex-1">
                        اختبار الاتصال
                      </Button>
                      <Button className="flex-1">
                        حفظ إعدادات Stripe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    إعدادات الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات البريد الإلكتروني</Label>
                      <div className="text-sm text-gray-500">
                        إرسال إشعارات عبر البريد الإلكتروني للعملاء
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات الرسائل النصية</Label>
                      <div className="text-sm text-gray-500">
                        إرسال إشعارات عبر الرسائل النصية
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    إعدادات الأمان
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>السماح بالتسجيل الجديد</Label>
                      <div className="text-sm text-gray-500">
                        السماح للمستخدمين الجدد بإنشاء حسابات
                      </div>
                    </div>
                    <Switch
                      checked={settings.allowRegistration}
                      onCheckedChange={(checked) => handleSettingChange('allowRegistration', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>الموافقة التلقائية على الحجوزات</Label>
                      <div className="text-sm text-gray-500">
                        الموافقة تلقائياً على الحجوزات الجديدة
                      </div>
                    </div>
                    <Switch
                      checked={settings.autoApproveBookings}
                      onCheckedChange={(checked) => handleSettingChange('autoApproveBookings', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">مهلة انتهاء الجلسة (دقيقة)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    إعدادات المظهر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>الألوان الأساسية</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'].map((color) => (
                        <div
                          key={color}
                          className="w-12 h-12 rounded-lg border-2 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    إعدادات النظام
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>وضع الصيانة</Label>
                      <div className="text-sm text-gray-500">
                        تفعيل وضع الصيانة لإيقاف الموقع مؤقتاً
                      </div>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxUploadSize">الحد الأقصى لحجم الملف</Label>
                      <Input
                        id="maxUploadSize"
                        value={settings.maxUploadSize}
                        onChange={(e) => handleSettingChange('maxUploadSize', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">المنطقة الزمنية</Label>
                      <select
                        id="timezone"
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange('timezone', e.target.value)}
                        className="w-full h-10 px-3 border border-gray-300 rounded-md"
                      >
                        <option value="Asia/Riyadh">الرياض</option>
                        <option value="Europe/Madrid">مدريد</option>
                        <option value="Europe/London">لندن</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      حفظ جميع الإعدادات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;

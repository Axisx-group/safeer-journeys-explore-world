
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, Settings, Save } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const CookieSettingsPage = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Save cookie settings logic here
    console.log('Cookie settings saved:', settings);
  };

  const cookieTypes = [
    {
      key: 'essential',
      title: language === 'ar' ? 'ضرورية' : 'Essential',
      description: language === 'ar' ? 'ضرورية لعمل الموقع الأساسي' : 'Necessary for basic website functionality',
      disabled: true
    },
    {
      key: 'analytics',
      title: language === 'ar' ? 'تحليلية' : 'Analytics',
      description: language === 'ar' ? 'تساعدنا في فهم كيفية استخدام الموقع' : 'Help us understand how the website is used'
    },
    {
      key: 'marketing',
      title: language === 'ar' ? 'تسويقية' : 'Marketing',
      description: language === 'ar' ? 'لعرض إعلانات مخصصة ومناسبة' : 'For personalized and relevant advertising'
    },
    {
      key: 'functional',
      title: language === 'ar' ? 'وظيفية' : 'Functional',
      description: language === 'ar' ? 'لتحسين وظائف الموقع وتخصيص التجربة' : 'To enhance website features and personalize experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Cookie className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'إدارة إعدادات ملفات تعريف الارتباط' : 'Manage Cookie Settings'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'تحكم في ملفات تعريف الارتباط المستخدمة في موقعنا'
              : 'Control the cookies used on our website'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-blue-600" />
                {language === 'ar' ? 'إعدادات ملفات تعريف الارتباط' : 'Cookie Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {cookieTypes.map((cookie) => (
                <div key={cookie.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={cookie.key} className="text-base font-semibold">
                        {cookie.title}
                      </Label>
                      {cookie.disabled && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {language === 'ar' ? 'مطلوبة' : 'Required'}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{cookie.description}</p>
                  </div>
                  <Switch
                    id={cookie.key}
                    checked={settings[cookie.key as keyof typeof settings]}
                    onCheckedChange={(checked) => handleSettingChange(cookie.key, checked)}
                    disabled={cookie.disabled}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-center">
                <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-blue-800">
                {language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
              </h3>
              <div className="space-y-3 text-blue-700 text-sm">
                <p>
                  {language === 'ar' 
                    ? '• ملفات تعريف الارتباط الضرورية مطلوبة لعمل الموقع ولا يمكن إيقافها'
                    : '• Essential cookies are required for website functionality and cannot be disabled'
                  }
                </p>
                <p>
                  {language === 'ar' 
                    ? '• يمكنك تغيير هذه الإعدادات في أي وقت من خلال هذه الصفحة'
                    : '• You can change these settings at any time through this page'
                  }
                </p>
                <p>
                  {language === 'ar' 
                    ? '• بعض الميزات قد لا تعمل بشكل صحيح إذا تم إيقاف ملفات تعريف الارتباط'
                    : '• Some features may not work properly if cookies are disabled'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookieSettingsPage;

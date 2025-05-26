
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, TestTube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const EmailSettingsTab = ({ settings, handleSettingChange }: EmailSettingsTabProps) => {
  const { toast } = useToast();

  const handleTestEmail = () => {
    console.log('اختبار إعدادات الإيميل');
    toast({
      title: "اختبار الإيميل",
      description: "تم إرسال إيميل اختبار بنجاح",
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Mail className="h-5 w-5" />
          </div>
          إعدادات الإيميل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpHost" className="text-sm font-semibold text-gray-700">خادم SMTP</Label>
            <Input
              id="smtpHost"
              value={settings.smtpHost}
              onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
              placeholder="smtp.gmail.com"
              className="border-blue-200 focus:border-blue-500 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPort" className="text-sm font-semibold text-gray-700">منفذ SMTP</Label>
            <Input
              id="smtpPort"
              type="number"
              value={settings.smtpPort}
              onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
              placeholder="587"
              className="border-blue-200 focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpUsername" className="text-sm font-semibold text-gray-700">اسم المستخدم</Label>
            <Input
              id="smtpUsername"
              value={settings.smtpUsername}
              onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
              placeholder="your-email@gmail.com"
              className="border-blue-200 focus:border-blue-500 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPassword" className="text-sm font-semibold text-gray-700">كلمة المرور</Label>
            <Input
              id="smtpPassword"
              type="password"
              value={settings.smtpPassword}
              onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
              placeholder="••••••••"
              className="border-blue-200 focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromEmail" className="text-sm font-semibold text-gray-700">البريد الإلكتروني للمرسل</Label>
          <Input
            id="fromEmail"
            type="email"
            value={settings.fromEmail}
            onChange={(e) => handleSettingChange('fromEmail', e.target.value)}
            placeholder="noreply@urtrvl.com"
            className="border-blue-200 focus:border-blue-500 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromName" className="text-sm font-semibold text-gray-700">اسم المرسل</Label>
          <Input
            id="fromName"
            value={settings.fromName}
            onChange={(e) => handleSettingChange('fromName', e.target.value)}
            placeholder="ur trvl Support"
            className="border-blue-200 focus:border-blue-500 rounded-lg"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold text-gray-700">استخدام SSL/TLS</Label>
            <div className="text-sm text-gray-500">
              تفعيل التشفير الآمن للاتصال
            </div>
          </div>
          <Switch
            checked={settings.smtpEncryption}
            onCheckedChange={(checked) => handleSettingChange('smtpEncryption', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold text-gray-700">إيميل التفعيل</Label>
            <div className="text-sm text-gray-500">
              إرسال إيميل تفعيل للمستخدمين الجدد
            </div>
          </div>
          <Switch
            checked={settings.sendActivationEmail}
            onCheckedChange={(checked) => handleSettingChange('sendActivationEmail', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold text-gray-700">إيميل استقبال الحجوزات</Label>
            <div className="text-sm text-gray-500">
              إرسال إيميل تأكيد عند استقبال حجز جديد
            </div>
          </div>
          <Switch
            checked={settings.sendBookingConfirmation}
            onCheckedChange={(checked) => handleSettingChange('sendBookingConfirmation', checked)}
          />
        </div>

        <div className="pt-4 border-t border-blue-200">
          <Button 
            onClick={handleTestEmail}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <TestTube className="h-4 w-4 mr-2" />
            اختبار إعدادات الإيميل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSettingsTab;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const EmailSettingsTab = ({ settings, handleSettingChange }: EmailSettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          إعدادات الإيميل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpHost">خادم SMTP</Label>
            <Input
              id="smtpHost"
              value={settings.smtpHost}
              onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
              placeholder="smtp.gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPort">منفذ SMTP</Label>
            <Input
              id="smtpPort"
              type="number"
              value={settings.smtpPort}
              onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
              placeholder="587"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpUsername">اسم المستخدم</Label>
            <Input
              id="smtpUsername"
              value={settings.smtpUsername}
              onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
              placeholder="your-email@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPassword">كلمة المرور</Label>
            <Input
              id="smtpPassword"
              type="password"
              value={settings.smtpPassword}
              onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromEmail">البريد الإلكتروني للمرسل</Label>
          <Input
            id="fromEmail"
            type="email"
            value={settings.fromEmail}
            onChange={(e) => handleSettingChange('fromEmail', e.target.value)}
            placeholder="noreply@urtrvl.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromName">اسم المرسل</Label>
          <Input
            id="fromName"
            value={settings.fromName}
            onChange={(e) => handleSettingChange('fromName', e.target.value)}
            placeholder="ur trvl Support"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>استخدام SSL/TLS</Label>
            <div className="text-sm text-gray-500">
              تفعيل التشفير الآمن للاتصال
            </div>
          </div>
          <Switch
            checked={settings.smtpEncryption}
            onCheckedChange={(checked) => handleSettingChange('smtpEncryption', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>إيميل التفعيل</Label>
            <div className="text-sm text-gray-500">
              إرسال إيميل تفعيل للمستخدمين الجدد
            </div>
          </div>
          <Switch
            checked={settings.sendActivationEmail}
            onCheckedChange={(checked) => handleSettingChange('sendActivationEmail', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>إيميل استقبال الحجوزات</Label>
            <div className="text-sm text-gray-500">
              إرسال إيميل تأكيد عند استقبال حجز جديد
            </div>
          </div>
          <Switch
            checked={settings.sendBookingConfirmation}
            onCheckedChange={(checked) => handleSettingChange('sendBookingConfirmation', checked)}
          />
        </div>

        <div className="pt-4 border-t">
          <Button className="w-full">
            اختبار إعدادات الإيميل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSettingsTab;

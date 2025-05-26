
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface SecuritySettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const SecuritySettingsTab = ({ settings, handleSettingChange }: SecuritySettingsTabProps) => {
  return (
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
  );
};

export default SecuritySettingsTab;

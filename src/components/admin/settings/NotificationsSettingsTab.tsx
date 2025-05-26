
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

interface NotificationsSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const NotificationsSettingsTab = ({ settings, handleSettingChange }: NotificationsSettingsTabProps) => {
  return (
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
  );
};

export default NotificationsSettingsTab;

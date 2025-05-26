
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Database } from "lucide-react";

interface SystemSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const SystemSettingsTab = ({ settings, handleSettingChange }: SystemSettingsTabProps) => {
  return (
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
  );
};

export default SystemSettingsTab;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

interface GeneralSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const GeneralSettingsTab = ({ settings, handleSettingChange }: GeneralSettingsTabProps) => {
  return (
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
  );
};

export default GeneralSettingsTab;

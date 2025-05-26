
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";

interface AppearanceSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const AppearanceSettingsTab = ({ settings, handleSettingChange }: AppearanceSettingsTabProps) => {
  return (
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
  );
};

export default AppearanceSettingsTab;

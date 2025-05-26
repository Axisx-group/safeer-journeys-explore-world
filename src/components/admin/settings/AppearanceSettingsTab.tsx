
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AppearanceSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const AppearanceSettingsTab = ({ settings, handleSettingChange }: AppearanceSettingsTabProps) => {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const colors = [
    { color: '#3B82F6', name: 'الأزرق' },
    { color: '#10B981', name: 'الأخضر' },
    { color: '#F59E0B', name: 'الأصفر' },
    { color: '#EF4444', name: 'الأحمر' },
    { color: '#8B5CF6', name: 'البنفسجي' },
    { color: '#06B6D4', name: 'السماوي' }
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    handleSettingChange('primaryColor', color);
    console.log('تم اختيار اللون:', color);
  };

  const handleApplyTheme = () => {
    toast({
      title: "تم التطبيق بنجاح",
      description: "تم تطبيق المظهر الجديد",
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Palette className="h-5 w-5" />
          </div>
          إعدادات المظهر
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-700">الألوان الأساسية</Label>
          <div className="grid grid-cols-3 gap-4">
            {colors.map((colorItem) => (
              <div
                key={colorItem.color}
                className={`relative w-full h-20 rounded-xl border-4 cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg ${
                  selectedColor === colorItem.color ? 'border-gray-800' : 'border-gray-200'
                }`}
                style={{ backgroundColor: colorItem.color }}
                onClick={() => handleColorSelect(colorItem.color)}
              >
                {selectedColor === colorItem.color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white text-sm font-semibold drop-shadow-md">
                    {colorItem.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-purple-200">
          <Button 
            onClick={handleApplyTheme}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <Palette className="h-4 w-4 mr-2" />
            تطبيق المظهر الجديد
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettingsTab;

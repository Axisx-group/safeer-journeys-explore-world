
import { CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface PreferencesSectionProps {
  formData: {
    hotel_preference: string;
    special_requests: string;
  };
  handleChange: (field: string, value: string) => void;
}

const PreferencesSection = ({ formData, handleChange }: PreferencesSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
        <div className="bg-purple-600 p-2 rounded-lg">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#003580]">
            {isArabic ? 'التفضيلات والطلبات الخاصة' : 'Preferences & Special Requests'}
          </h3>
          <p className="text-sm text-gray-600">
            {isArabic ? 'أخبرنا عن تفضيلاتك لتحسين تجربتك' : 'Tell us your preferences to enhance your experience'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hotel_preference" className="text-sm font-semibold text-gray-700">
          {isArabic ? 'تفضيل الفندق' : 'Hotel Preference'}
        </Label>
        <Input
          id="hotel_preference"
          type="text"
          value={formData.hotel_preference}
          onChange={(e) => handleChange('hotel_preference', e.target.value)}
          placeholder={isArabic ? 'مثال: 5 نجوم، قريب من الشاطئ، إطلالة بحرية' : 'e.g., 5-star, beachfront, sea view'}
          className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="special_requests" className="text-sm font-semibold text-gray-700">
          {isArabic ? 'طلبات خاصة' : 'Special Requests'}
        </Label>
        <Textarea
          id="special_requests"
          value={formData.special_requests}
          onChange={(e) => handleChange('special_requests', e.target.value)}
          placeholder={isArabic ? 'أي طلبات أو ملاحظات خاصة (غرفة بإطلالة، احتياجات غذائية، إلخ)' : 'Any special requests or notes (room with view, dietary requirements, etc.)'}
          rows={4}
          className="border-2 border-gray-300 focus:border-[#003580] rounded-md resize-none"
        />
      </div>
    </div>
  );
};

export default PreferencesSection;

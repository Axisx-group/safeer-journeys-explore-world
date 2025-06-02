
import { User, Mail, Phone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface GuestInformationSectionProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  handleChange: (field: string, value: string) => void;
  isReadOnly?: boolean;
}

const GuestInformationSection = ({ formData, handleChange, isReadOnly = false }: GuestInformationSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
        <div className="bg-[#003580] p-2 rounded-lg">
          <User className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#003580]">
            {isArabic ? 'معلومات الضيف الرئيسي' : 'Main Guest Information'}
          </h3>
          <p className="text-sm text-gray-600">
            {isReadOnly 
              ? (isArabic ? 'معلوماتك من الحساب المسجل' : 'Your information from registered account')
              : (isArabic ? 'هذه المعلومات مطلوبة لتأكيد الحجز' : 'This information is required to confirm your booking')
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User className="h-4 w-4 text-[#003580]" />
            {isArabic ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => !isReadOnly && handleChange('name', e.target.value)}
            placeholder={isArabic ? 'مثال: أحمد محمد' : 'e.g., John Smith'}
            className={`h-12 border-2 rounded-md ${
              isReadOnly 
                ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed' 
                : 'border-gray-300 focus:border-[#003580]'
            }`}
            readOnly={isReadOnly}
            required
          />
          {isReadOnly && (
            <p className="text-xs text-gray-500">
              {isArabic ? 'من بيانات حسابك المسجل' : 'From your registered account'}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#003580]" />
            {isArabic ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => !isReadOnly && handleChange('email', e.target.value)}
            placeholder={isArabic ? 'ahmed@example.com' : 'john@example.com'}
            className={`h-12 border-2 rounded-md ${
              isReadOnly 
                ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed' 
                : 'border-gray-300 focus:border-[#003580]'
            }`}
            readOnly={isReadOnly}
            required
          />
          <p className="text-xs text-gray-500">
            {isArabic ? 'سنرسل تأكيد الحجز على هذا البريد' : 'Booking confirmation will be sent to this email'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Phone className="h-4 w-4 text-[#003580]" />
          {isArabic ? 'رقم الهاتف' : 'Phone Number'} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => !isReadOnly && handleChange('phone', e.target.value)}
          placeholder="+966 50 123 4567"
          className={`h-12 border-2 rounded-md ${
            isReadOnly 
              ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed' 
              : 'border-gray-300 focus:border-[#003580]'
          }`}
          readOnly={isReadOnly}
          required
        />
        <p className="text-xs text-gray-500">
          {isArabic ? 'مطلوب للتواصل في حالة الطوارئ' : 'Required for emergency contact'}
        </p>
      </div>
    </div>
  );
};

export default GuestInformationSection;

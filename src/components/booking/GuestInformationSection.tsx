
import { User, Mail, Phone, Shield } from "lucide-react";
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
  isLoggedIn?: boolean;
}

const GuestInformationSection = ({ 
  formData, 
  handleChange, 
  isReadOnly = false, 
  isLoggedIn = false 
}: GuestInformationSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gradient-to-r from-indigo-200 to-purple-200">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {isArabic ? 'معلومات الضيف الرئيسي' : 'Main Guest Information'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {isLoggedIn 
              ? (isArabic ? 'معلوماتك من الحساب المسجل' : 'Your information from registered account')
              : (isArabic ? 'أدخل معلوماتك لتأكيد الحجز' : 'Enter your information to confirm the booking')
            }
          </p>
        </div>
        {isLoggedIn && (
          <div className="ml-auto">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {isArabic ? 'مسجل' : 'Verified'}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-600" />
            {isArabic ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder={isArabic ? 'مثال: أحمد محمد' : 'e.g., John Smith'}
            className={`h-12 border-2 rounded-xl transition-all duration-200 ${
              isLoggedIn && isReadOnly
                ? 'bg-blue-50 border-blue-200 text-blue-800 cursor-not-allowed' 
                : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            }`}
            readOnly={isLoggedIn && isReadOnly}
            required
          />
          {isLoggedIn && isReadOnly && (
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {isArabic ? 'من بيانات حسابك المسجل' : 'From your registered account'}
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Mail className="h-4 w-4 text-indigo-600" />
            {isArabic ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={isArabic ? 'ahmed@example.com' : 'john@example.com'}
            className={`h-12 border-2 rounded-xl transition-all duration-200 ${
              isLoggedIn && isReadOnly
                ? 'bg-blue-50 border-blue-200 text-blue-800 cursor-not-allowed' 
                : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            }`}
            readOnly={isLoggedIn && isReadOnly}
            required
          />
          <p className="text-xs text-gray-500">
            {isArabic ? 'سنرسل تأكيد الحجز على هذا البريد' : 'Booking confirmation will be sent to this email'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Phone className="h-4 w-4 text-indigo-600" />
          {isArabic ? 'رقم الهاتف' : 'Phone Number'} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+966 50 123 4567"
          className={`h-12 border-2 rounded-xl transition-all duration-200 ${
            isLoggedIn && isReadOnly
              ? 'bg-blue-50 border-blue-200 text-blue-800 cursor-not-allowed' 
              : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }`}
          readOnly={isLoggedIn && isReadOnly}
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


import { CheckCircle, Clock, Shield } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface TermsAndSubmitSectionProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  isSubmitting: boolean;
}

const TermsAndSubmitSection = ({ acceptedTerms, setAcceptedTerms, isSubmitting }: TermsAndSubmitSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-6">
      {/* Terms and Conditions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3" style={{ flexDirection: isArabic ? 'row-reverse' : 'row' }}>
          <Checkbox 
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
            className="mt-1"
          />
          <div className="space-y-2" style={{ marginLeft: isArabic ? '0' : '12px', marginRight: isArabic ? '12px' : '0' }}>
            <Label htmlFor="terms" className="text-sm font-medium cursor-pointer text-[#003580]">
              {isArabic ? 'أوافق على الشروط والأحكام وسياسة الخصوصية' : 'I agree to the Terms & Conditions and Privacy Policy'}
            </Label>
            <p className="text-xs text-gray-600">
              {isArabic 
                ? 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا وتؤكد أن جميع المعلومات المقدمة صحيحة.'
                : 'By proceeding, you agree to our Terms of Service and Privacy Policy and confirm that all information provided is accurate.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <Button 
          type="submit" 
          className="w-full h-16 bg-gradient-to-r from-[#003580] to-[#0057b8] hover:from-[#002c6c] hover:to-[#004494] text-lg font-bold text-white rounded-md shadow-lg"
          disabled={isSubmitting || !acceptedTerms}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 animate-spin" />
              {isArabic ? 'جارٍ معالجة الحجز...' : 'Processing Booking...'}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6" />
              {isArabic ? 'تأكيد الحجز الآن' : 'Complete Booking'}
            </div>
          )}
        </Button>
        
        <div className="text-center mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            {isArabic 
              ? '🔒 معلوماتك محمية بتشفير SSL آمن ولن يتم تحصيل أي مبلغ حتى تأكيد الحجز'
              : '🔒 Your information is protected with secure SSL encryption and no charges until booking confirmation'
            }
          </p>
          <p className="text-xs text-green-600 flex items-center justify-center gap-1">
            <Shield className="h-4 w-4" />
            {isArabic ? 'حجز آمن 100%' : '100% Secure Booking'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndSubmitSection;

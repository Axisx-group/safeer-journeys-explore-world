
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Scale className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'اقرأ شروط وأحكام استخدام خدماتنا'
              : 'Read the terms and conditions for using our services'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                {language === 'ar' ? 'قبول الشروط' : 'Acceptance of Terms'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar' 
                  ? 'باستخدام موقعنا وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.'
                  : 'By using our website and services, you agree to be bound by these terms and conditions. If you do not agree to any of these terms, please do not use our services.'
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'الحجوزات والدفع' : 'Bookings and Payment'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {language === 'ar' ? 'تأكيد الحجز' : 'Booking Confirmation'}
                </h4>
                <p className="text-gray-700 text-sm">
                  {language === 'ar' 
                    ? 'جميع الحجوزات تخضع للتوفر والتأكيد. سنرسل لك تأكيد الحجز عبر البريد الإلكتروني خلال 24 ساعة.'
                    : 'All bookings are subject to availability and confirmation. We will send you booking confirmation via email within 24 hours.'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  {language === 'ar' ? 'الدفع' : 'Payment'}
                </h4>
                <p className="text-gray-700 text-sm">
                  {language === 'ar' 
                    ? 'يجب دفع المبلغ كاملاً عند الحجز أو حسب شروط الدفع المحددة لكل خدمة.'
                    : 'Full payment is required at booking or according to the payment terms specified for each service.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'الإلغاء والاسترداد' : 'Cancellation and Refund'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}
                </h4>
                <p className="text-gray-700 text-sm">
                  {language === 'ar' 
                    ? 'تختلف شروط الإلغاء حسب نوع الخدمة. يرجى مراجعة شروط الإلغاء الخاصة بحجزك.'
                    : 'Cancellation terms vary by service type. Please review the cancellation terms specific to your booking.'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  {language === 'ar' ? 'الاسترداد' : 'Refunds'}
                </h4>
                <p className="text-gray-700 text-sm">
                  {language === 'ar' 
                    ? 'يتم معالجة المبالغ المستردة خلال 7-14 يوم عمل حسب طريقة الدفع المستخدمة.'
                    : 'Refunds are processed within 7-14 business days depending on the payment method used.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'المسؤولية' : 'Liability'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                {language === 'ar' 
                  ? 'نحن نعمل كوسطاء بين العملاء ومقدمي الخدمات. مسؤوليتنا محدودة وفقاً للقوانين السارية.'
                  : 'We act as intermediaries between customers and service providers. Our liability is limited according to applicable laws.'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;

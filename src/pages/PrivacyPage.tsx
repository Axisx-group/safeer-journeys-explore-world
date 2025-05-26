
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Cookie, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'الخصوصية وملفات تعريف الارتباط' : 'Privacy and Cookies'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'تعرف على كيفية حماية بياناتك واستخدام ملفات تعريف الارتباط'
              : 'Learn how we protect your data and use cookies'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-blue-600" />
                {language === 'ar' ? 'جمع البيانات' : 'Data Collection'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                {language === 'ar' 
                  ? 'نجمع البيانات الضرورية لتقديم خدماتنا بكفاءة، بما يشمل:'
                  : 'We collect data necessary to provide our services efficiently, including:'
                }
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• {language === 'ar' ? 'المعلومات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف)' : 'Personal information (name, email, phone number)'}</li>
                <li>• {language === 'ar' ? 'معلومات الحجز والدفع' : 'Booking and payment information'}</li>
                <li>• {language === 'ar' ? 'بيانات الاستخدام والتصفح' : 'Usage and browsing data'}</li>
                <li>• {language === 'ar' ? 'تفضيلات السفر' : 'Travel preferences'}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-green-600" />
                {language === 'ar' ? 'حماية البيانات' : 'Data Protection'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {language === 'ar' ? 'التشفير' : 'Encryption'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'ar' 
                      ? 'جميع بياناتك محمية بتشفير SSL متقدم لضمان الأمان الكامل.'
                      : 'All your data is protected with advanced SSL encryption to ensure complete security.'
                    }
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    {language === 'ar' ? 'التخزين الآمن' : 'Secure Storage'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'ar' 
                      ? 'نستخدم خوادم آمنة ومعتمدة عالمياً لحفظ بياناتك.'
                      : 'We use secure, globally certified servers to store your data.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-orange-600" />
                {language === 'ar' ? 'ملفات تعريف الارتباط' : 'Cookies'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {language === 'ar' ? 'ما هي ملفات تعريف الارتباط؟' : 'What are Cookies?'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'ar' 
                      ? 'ملفات صغيرة تُحفظ على جهازك لتحسين تجربة التصفح وتذكر تفضيلاتك.'
                      : 'Small files stored on your device to improve browsing experience and remember your preferences.'
                    }
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    {language === 'ar' ? 'أنواع ملفات تعريف الارتباط المستخدمة' : 'Types of Cookies Used'}
                  </h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• {language === 'ar' ? 'ملفات ضرورية لعمل الموقع' : 'Essential cookies for website functionality'}</li>
                    <li>• {language === 'ar' ? 'ملفات تحليلية لفهم سلوك المستخدمين' : 'Analytics cookies to understand user behavior'}</li>
                    <li>• {language === 'ar' ? 'ملفات تسويقية لعرض إعلانات مناسبة' : 'Marketing cookies for relevant advertising'}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'حقوقك' : 'Your Rights'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• {language === 'ar' ? 'الحق في الوصول إلى بياناتك' : 'Right to access your data'}</li>
                <li>• {language === 'ar' ? 'الحق في تصحيح البيانات الخاطئة' : 'Right to correct incorrect data'}</li>
                <li>• {language === 'ar' ? 'الحق في حذف بياناتك' : 'Right to delete your data'}</li>
                <li>• {language === 'ar' ? 'الحق في نقل بياناتك' : 'Right to data portability'}</li>
                <li>• {language === 'ar' ? 'الحق في الاعتراض على معالجة البيانات' : 'Right to object to data processing'}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;

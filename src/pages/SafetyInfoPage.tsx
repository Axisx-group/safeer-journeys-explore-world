
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Info, Heart, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SafetyInfoPage = () => {
  const { language } = useLanguage();

  const safetyCategories = [
    {
      icon: Shield,
      title: language === 'ar' ? 'معايير السلامة' : 'Safety Standards',
      color: 'from-blue-500 to-blue-600',
      items: [
        language === 'ar' ? 'فحص دوري لجميع الفنادق والمرافق الشريكة' : 'Regular inspection of all partner hotels and facilities',
        language === 'ar' ? 'تطبيق أعلى معايير النظافة والتعقيم' : 'Implementation of highest hygiene and sanitization standards',
        language === 'ar' ? 'تدريب الموظفين على إجراءات السلامة' : 'Staff training on safety procedures',
        language === 'ar' ? 'أنظمة مراقبة متقدمة للأمان' : 'Advanced security monitoring systems'
      ]
    },
    {
      icon: Heart,
      title: language === 'ar' ? 'الصحة والعافية' : 'Health & Wellness',
      color: 'from-green-500 to-green-600',
      items: [
        language === 'ar' ? 'إرشادات صحية حديثة وموثقة' : 'Updated and documented health guidelines',
        language === 'ar' ? 'خدمات طبية متاحة في حالات الطوارئ' : 'Medical services available for emergencies',
        language === 'ar' ? 'معلومات حول اللقاحات المطلوبة' : 'Information about required vaccinations',
        language === 'ar' ? 'نصائح للحفاظ على الصحة أثناء السفر' : 'Tips for maintaining health while traveling'
      ]
    },
    {
      icon: Plane,
      title: language === 'ar' ? 'سلامة الطيران' : 'Flight Safety',
      color: 'from-purple-500 to-purple-600',
      items: [
        language === 'ar' ? 'شراكة مع شركات طيران معتمدة دولياً' : 'Partnership with internationally certified airlines',
        language === 'ar' ? 'فحص دوري لسجلات السلامة' : 'Regular safety record inspections',
        language === 'ar' ? 'تأمين شامل على جميع الرحلات' : 'Comprehensive insurance on all flights',
        language === 'ar' ? 'معلومات حديثة عن حالة الطقس والطيران' : 'Updated weather and flight status information'
      ]
    }
  ];

  const emergencyTips = [
    {
      title: language === 'ar' ? 'في حالة الطوارئ' : 'In Case of Emergency',
      content: language === 'ar' ? 'اتصل بخدمة العملاء على الرقم 0033766555514 فوراً' : 'Contact customer service at 0033766555514 immediately'
    },
    {
      title: language === 'ar' ? 'فقدان الوثائق' : 'Lost Documents',
      content: language === 'ar' ? 'توجه إلى أقرب قنصلية أو سفارة وتواصل معنا للمساعدة' : 'Go to the nearest consulate or embassy and contact us for assistance'
    },
    {
      title: language === 'ar' ? 'مشاكل طبية' : 'Medical Issues',
      content: language === 'ar' ? 'اطلب العناية الطبية الفورية واتصل بشركة التأمين' : 'Seek immediate medical attention and contact your insurance company'
    }
  ];

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
            {language === 'ar' ? 'مركز معلومات السلامة' : 'Safety Information Center'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'سلامتك أولويتنا القصوى. تعرف على إجراءات السلامة ونصائح السفر الآمن'
              : 'Your safety is our top priority. Learn about safety procedures and safe travel tips'
            }
          </p>
        </div>

        {/* Safety Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {safetyCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* COVID-19 Safety */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-yellow-800">
              <AlertTriangle className="h-6 w-6" />
              {language === 'ar' ? 'إرشادات كوفيد-19' : 'COVID-19 Guidelines'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-yellow-800">
                  {language === 'ar' ? 'قبل السفر' : 'Before Travel'}
                </h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• {language === 'ar' ? 'تحقق من متطلبات الدولة المقصودة' : 'Check destination country requirements'}</li>
                  <li>• {language === 'ar' ? 'احصل على اللقاحات المطلوبة' : 'Get required vaccinations'}</li>
                  <li>• {language === 'ar' ? 'احمل شهادة التطعيم' : 'Carry vaccination certificate'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-yellow-800">
                  {language === 'ar' ? 'أثناء السفر' : 'During Travel'}
                </h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• {language === 'ar' ? 'ارتد الكمامة في الأماكن المطلوبة' : 'Wear mask where required'}</li>
                  <li>• {language === 'ar' ? 'اتبع إجراءات التباعد الاجتماعي' : 'Follow social distancing procedures'}</li>
                  <li>• {language === 'ar' ? 'استخدم المطهرات بانتظام' : 'Use sanitizers regularly'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Info className="h-6 w-6 text-red-600" />
              {language === 'ar' ? 'نصائح الطوارئ' : 'Emergency Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyTips.map((tip, index) => (
                <div key={index} className="text-center">
                  <h4 className="font-semibold mb-2 text-red-600">{tip.title}</h4>
                  <p className="text-gray-700 text-sm">{tip.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SafetyInfoPage;

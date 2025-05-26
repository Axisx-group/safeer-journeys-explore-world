
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Clock, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CustomerServicePage = () => {
  const { language } = useLanguage();

  const serviceOptions = [
    {
      icon: Phone,
      title: language === 'ar' ? 'المكالمات الهاتفية' : 'Phone Support',
      content: language === 'ar' ? 'تواصل معنا عبر الهاتف' : 'Contact us by phone',
      details: '0033766555514',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: language === 'ar' ? 'البريد الإلكتروني' : 'Email Support',
      content: language === 'ar' ? 'راسلنا عبر البريد الإلكتروني' : 'Send us an email',
      details: 'Info@urtrvl.com',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageCircle,
      title: language === 'ar' ? 'الدردشة المباشرة' : 'Live Chat',
      content: language === 'ar' ? 'تحدث معنا مباشرة' : 'Chat with us directly',
      details: language === 'ar' ? 'متاح على الموقع' : 'Available on website',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'ساعات العمل' : 'Working Hours',
      content: language === 'ar' ? 'نحن متاحون' : 'We are available',
      details: language === 'ar' ? 'الأحد - الخميس: 9:00 - 18:00' : 'Sun - Thu: 9:00 AM - 6:00 PM',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Headphones className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'مساعدة خدمة العملاء' : 'Customer Service Help'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'نحن هنا لمساعدتك في أي استفسار أو مشكلة تواجهها'
              : 'We are here to help you with any questions or issues you may have'
            }
          </p>
        </div>

        {/* Service Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {serviceOptions.map((option, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${option.color} mb-4`}>
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{option.content}</p>
                <p className="text-blue-600 font-medium text-sm">{option.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Common Issues */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              {language === 'ar' ? 'المشاكل الشائعة وحلولها' : 'Common Issues and Solutions'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'مشاكل الحجز' : 'Booking Issues'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'صعوبة في إتمام الحجز أو تأكيده' : 'Difficulty completing or confirming booking'}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'مشاكل الدفع' : 'Payment Issues'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'مشاكل في عملية الدفع أو الاسترداد' : 'Issues with payment or refund process'}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'تغيير الحجز' : 'Booking Changes'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'تعديل أو إلغاء الحجوزات الموجودة' : 'Modifying or canceling existing bookings'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
};

export default CustomerServicePage;

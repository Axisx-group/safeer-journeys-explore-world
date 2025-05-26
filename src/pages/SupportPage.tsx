
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SupportPage = () => {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      title: language === 'ar' ? 'الهاتف' : 'Phone',
      content: '+1 (555) 123-4567',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      content: 'info@urtravel.com',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: language === 'ar' ? 'العنوان' : 'Address',
      content: language === 'ar' ? 'شارع السياحة 123، مدينة السفر' : '123 Tourism Street, Travel City',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'ساعات العمل' : 'Working Hours',
      content: language === 'ar' ? 'الأحد - الخميس: 9:00 - 18:00' : 'Sun - Thu: 9:00 AM - 6:00 PM',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'نحن هنا لمساعدتك! تواصل معنا في أي وقت وسنرد عليك في أقرب وقت ممكن'
              : 'We are here to help you! Contact us anytime and we will respond as soon as possible'
            }
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${info.color} mb-4`}>
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      <Footer />
      <SimpleAIAssistant />
    </div>
  );
};

export default SupportPage;

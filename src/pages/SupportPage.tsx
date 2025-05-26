
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageCircle, Clock, MapPin, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import { useToast } from "@/hooks/use-toast";

const SupportPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('language') === 'ar' ? "تم إرسال الرسالة" : "Message Sent",
      description: t('language') === 'ar' 
        ? "سنقوم بالرد عليك في أقرب وقت ممكن"
        : "We'll get back to you as soon as possible",
    });
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const supportMethods = [
    {
      icon: Phone,
      titleAr: "الدعم الهاتفي",
      titleEn: "Phone Support",
      descAr: "متاح 24/7 لجميع استفساراتك",
      descEn: "Available 24/7 for all your inquiries",
      contact: "0033766555514"
    },
    {
      icon: Mail,
      titleAr: "الدعم الإلكتروني",
      titleEn: "Email Support",
      descAr: "نرد على جميع الرسائل خلال 24 ساعة",
      descEn: "We respond to all emails within 24 hours",
      contact: "Info@urtrvl.com"
    },
    {
      icon: MessageCircle,
      titleAr: "الدردشة المباشرة",
      titleEn: "Live Chat",
      descAr: "تحدث مع فريق الدعم مباشرة",
      descEn: "Chat directly with our support team",
      contact: t('language') === 'ar' ? "اضغط على أيقونة الدردشة" : "Click the chat icon"
    }
  ];

  const faqs = [
    {
      questionAr: "كيف يمكنني إلغاء حجزي؟",
      questionEn: "How can I cancel my booking?",
      answerAr: "يمكنك إلغاء حجزك مجاناً حتى 24 ساعة قبل تاريخ الوصول من خلال حسابك أو الاتصال بخدمة العملاء.",
      answerEn: "You can cancel your booking for free up to 24 hours before arrival through your account or by contacting customer service."
    },
    {
      questionAr: "هل يمكنني تعديل تواريخ حجزي؟",
      questionEn: "Can I modify my booking dates?",
      answerAr: "نعم، يمكنك تعديل تواريخ حجزك حسب التوفر. قد تطبق رسوم إضافية في بعض الحالات.",
      answerEn: "Yes, you can modify your booking dates subject to availability. Additional fees may apply in some cases."
    },
    {
      questionAr: "ما هي طرق الدفع المقبولة؟",
      questionEn: "What payment methods do you accept?",
      answerAr: "نقبل جميع البطاقات الائتمانية الرئيسية وPayPal والدفع الإلكتروني الآمن.",
      answerEn: "We accept all major credit cards, PayPal, and secure online payments."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('language') === 'ar' ? 'مركز الدعم والمساعدة' : 'Support & Help Center'}
            </h1>
            <p className="text-xl text-gray-600">
              {t('language') === 'ar' 
                ? 'نحن هنا لمساعدتك في كل خطوة من رحلتك'
                : 'We\'re here to help you every step of your journey'
              }
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {supportMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <method.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {t('language') === 'ar' ? method.titleAr : method.titleEn}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t('language') === 'ar' ? method.descAr : method.descEn}
                  </p>
                  <p className="font-semibold text-blue-600">{method.contact}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  {t('language') === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      {t('language') === 'ar' ? 'الاسم' : 'Name'}
                    </Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      {t('language') === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">
                      {t('language') === 'ar' ? 'الموضوع' : 'Subject'}
                    </Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">
                      {t('language') === 'ar' ? 'الرسالة' : 'Message'}
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t('language') === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>
                  {t('language') === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b pb-4">
                    <h4 className="font-semibold text-lg mb-2">
                      {t('language') === 'ar' ? faq.questionAr : faq.questionEn}
                    </h4>
                    <p className="text-gray-600">
                      {t('language') === 'ar' ? faq.answerAr : faq.answerEn}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Office Information */}
          <Card className="mt-8 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                {t('language') === 'ar' ? 'معلومات المكتب' : 'Office Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">
                    {t('language') === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </h4>
                  <p className="text-gray-600">
                    {t('language') === 'ar' ? '24/7 - متاح طوال الأسبوع' : '24/7 - Available all week'}
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">
                    {t('language') === 'ar' ? 'العنوان' : 'Address'}
                  </h4>
                  <p className="text-gray-600">France-Paris</p>
                </div>
                <div className="text-center">
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">
                    {t('language') === 'ar' ? 'الاتصال الطارئ' : 'Emergency Contact'}
                  </h4>
                  <p className="text-gray-600">0033766555514</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <LiveChat />
    </div>
  );
};

export default SupportPage;

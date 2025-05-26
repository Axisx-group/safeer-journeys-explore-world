
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Shield, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQPage = () => {
  const { language } = useLanguage();

  const covidFAQs = [
    {
      question: language === 'ar' ? 'ما هي متطلبات السفر الحالية المتعلقة بكوفيد-19؟' : 'What are the current COVID-19 travel requirements?',
      answer: language === 'ar' ? 'تختلف متطلبات السفر حسب الوجهة. ننصح بمراجعة متطلبات الدولة المقصودة قبل السفر.' : 'Travel requirements vary by destination. We recommend checking the requirements of your destination country before traveling.'
    },
    {
      question: language === 'ar' ? 'هل يمكنني إلغاء حجزي بسبب كوفيد-19؟' : 'Can I cancel my booking due to COVID-19?',
      answer: language === 'ar' ? 'نعم، نوفر خيارات إلغاء مرنة للحجوزات المتأثرة بكوفيد-19. تواصل مع خدمة العملاء للتفاصيل.' : 'Yes, we offer flexible cancellation options for bookings affected by COVID-19. Contact customer service for details.'
    },
    {
      question: language === 'ar' ? 'ما هي إجراءات السلامة في الفنادق؟' : 'What are the safety procedures in hotels?',
      answer: language === 'ar' ? 'جميع الفنادق الشريكة تطبق أعلى معايير النظافة والسلامة وفقاً للإرشادات الصحية العالمية.' : 'All partner hotels implement the highest hygiene and safety standards according to global health guidelines.'
    }
  ];

  const generalFAQs = [
    {
      question: language === 'ar' ? 'كيف يمكنني تعديل حجزي؟' : 'How can I modify my booking?',
      answer: language === 'ar' ? 'يمكنك تعديل حجزك من خلال صفحة "إدارة رحلاتك" أو التواصل مع خدمة العملاء.' : 'You can modify your booking through the "Manage Your Trips" page or by contacting customer service.'
    },
    {
      question: language === 'ar' ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?',
      answer: language === 'ar' ? 'نقبل جميع البطاقات الائتمانية الرئيسية والتحويل البنكي والدفع الإلكتروني.' : 'We accept all major credit cards, bank transfers, and electronic payments.'
    },
    {
      question: language === 'ar' ? 'كم من الوقت يستغرق تأكيد الحجز؟' : 'How long does booking confirmation take?',
      answer: language === 'ar' ? 'عادة ما يتم تأكيد الحجز خلال 24 ساعة، وقد يكون فورياً في معظم الحالات.' : 'Booking confirmation usually takes up to 24 hours, and may be instant in most cases.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <HelpCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'الأسئلة المتكررة' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا'
              : 'Answers to the most common questions about our services'
            }
          </p>
        </div>

        {/* COVID-19 FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-600" />
              {language === 'ar' ? 'الأسئلة المتكررة حول فيروس كورونا (كوفيد-19)' : 'COVID-19 Frequently Asked Questions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {covidFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`covid-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* General FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Info className="h-6 w-6 text-blue-600" />
              {language === 'ar' ? 'أسئلة عامة' : 'General Questions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {generalFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;

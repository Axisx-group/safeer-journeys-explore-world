
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";
import { useLanguage } from "@/contexts/LanguageContext";

const BookingPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'احجز رحلتك الآن' : 'Book Your Trip Now'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'املأ النموذج أدناه وسنتواصل معك لتأكيد تفاصيل رحلتك'
              : 'Fill out the form below and we will contact you to confirm your trip details'
            }
          </p>
        </div>

        <BookingForm />
      </div>

      <Footer />
      <SimpleAIAssistant />
    </div>
  );
};

export default BookingPage;

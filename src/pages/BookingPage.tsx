
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const BookingPage = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'احجز رحلتك الآن' : 'Book Your Dream Trip'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'خطط لرحلتك المثالية معنا - خدمة احترافية وأسعار تنافسية'
              : 'Plan your perfect trip with us - professional service and competitive prices'
            }
          </p>
          
          {user && (
            <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {language === 'ar' ? 'مسجل الدخول كـ' : 'Logged in as'} {user.email}
            </div>
          )}
        </div>

        <BookingForm />
      </div>

      <Footer />
      <SimpleAIAssistant />
    </div>
  );
};

export default BookingPage;


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Star, Shield } from "lucide-react";

const BookingPage = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'احجز رحلة أحلامك' : 'Book Your Dream Journey'}
            </h1>
            <Star className="h-8 w-8 text-indigo-600" />
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            {language === 'ar' 
              ? 'اكتشف العالم معنا - تجربة سفر استثنائية مع أفضل الخدمات وأسعار لا تُقاوم'
              : 'Discover the world with us - exceptional travel experiences with premium services and unbeatable prices'
            }
          </p>
          
          {user && (
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {language === 'ar' ? 'مرحباً' : 'Welcome'} {user.email}
              <span className="text-green-600">✓</span>
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

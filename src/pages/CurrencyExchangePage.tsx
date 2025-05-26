
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CurrencySection from "@/components/CurrencySection";
import { useLanguage } from "@/contexts/LanguageContext";

const CurrencyExchangePage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'ar' ? 'أسعار صرف العملات الأوروبية' : 'European Currency Exchange Rates'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'تابع أحدث أسعار صرف العملات الأوروبية مباشرة وخطط لرحلتك بذكاء'
              : 'Track the latest European currency exchange rates live and plan your trip smartly'
            }
          </p>
        </div>
      </section>

      {/* Currency Section */}
      <CurrencySection />

      <Footer />
    </div>
  );
};

export default CurrencyExchangePage;

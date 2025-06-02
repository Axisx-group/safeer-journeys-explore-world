
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/booking');
  };

  const handleDiscoverOffers = () => {
    navigate('/offers');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
      </div>

      {/* Content - Mobile Optimized */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 animate-fade-in leading-tight">
          {t('heroTitle')}
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mt-2">
            ur trvl
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
          {t('heroSubtitle')}
        </p>

        <div className={`flex flex-col gap-3 sm:gap-4 justify-center items-center sm:flex-row ${language === 'ar' ? 'space-x-reverse' : ''}`}>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            onClick={handleStartJourney}
          >
            {t('startJourney')}
            <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold backdrop-blur-sm bg-white/10 w-full sm:w-auto"
            onClick={handleDiscoverOffers}
          >
            {t('discoverOffers')}
          </Button>
        </div>

        {/* Stats - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400">1000+</div>
            <div className="text-blue-100 text-sm sm:text-base">{t('hotels_count')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400">500+</div>
            <div className="text-blue-100 text-sm sm:text-base">{t('destinations_count')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400">50K+</div>
            <div className="text-blue-100 text-sm sm:text-base">{t('happy_clients')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400">24/7</div>
            <div className="text-blue-100 text-sm sm:text-base">{t('customer_support')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

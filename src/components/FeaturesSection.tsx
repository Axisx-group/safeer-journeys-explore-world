
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star, Heart, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t, language } = useLanguage();

  const features = [
    t('bestPrices'),
    t('freeCancellation'),
    t('excellentSupport'),
    t('instantBooking'),
    t('dailyOffers'),
    t('rewardPoints')
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('whyChoose')}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> {t('brandName')}</span>؟
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('whyChooseDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className={`flex items-center gap-3 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className={`flex items-center justify-center mb-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                  <Star className={`h-6 w-6 text-yellow-500 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-sm text-gray-600">{t('customerRating')}</p>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center mb-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                  <Heart className={`h-6 w-6 text-red-500 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  <span className="text-2xl font-bold text-gray-900">98%</span>
                </div>
                <p className="text-sm text-gray-600">{t('satisfaction')}</p>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center mb-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                  <Globe className={`h-6 w-6 text-blue-500 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  <span className="text-2xl font-bold text-gray-900">150+</span>
                </div>
                <p className="text-sm text-gray-600">{t('countries')}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Travel Experience"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -top-4 -right-4 bg-white shadow-xl border-0 w-32 h-32">
              <CardContent className="p-4 text-center h-full flex flex-col justify-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">{t('happyTrips')}</div>
              </CardContent>
            </Card>
            
            <Card className="absolute -bottom-4 -left-4 bg-white shadow-xl border-0 w-32 h-32">
              <CardContent className="p-4 text-center h-full flex flex-col justify-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">{t('continuousSupport')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

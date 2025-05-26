
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Percent, Clock, Star, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";

const OffersPage = () => {
  const { language } = useLanguage();

  const offers = [
    {
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleAr: "عرض مدريد الخاص",
      titleEn: "Madrid Special Offer",
      descAr: "اكتشف عاصمة إسبانيا الجميلة",
      descEn: "Discover Spain's beautiful capital",
      originalPrice: "300€",
      discountPrice: "200€",
      discount: "33%",
      rating: 4.8
    },
    {
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleAr: "رحلة برشلونة المميزة",
      titleEn: "Barcelona Premium Trip", 
      descAr: "استمتع بمدينة الفن والعمارة",
      descEn: "Enjoy the city of art and architecture",
      originalPrice: "350€",
      discountPrice: "250€",
      discount: "29%",
      rating: 4.9
    },
    {
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleAr: "جولة إسطنبول الساحرة",
      titleEn: "Magical Istanbul Tour",
      descAr: "استكشف ملتقى الشرق والغرب",
      descEn: "Explore where East meets West",
      originalPrice: "280€",
      discountPrice: "180€",
      discount: "36%",
      rating: 4.7
    }
  ];

  const featuredDeals = [
    {
      icon: Percent,
      titleAr: "خصم يصل إلى 50%",
      titleEn: "Up to 50% Off",
      descAr: "على جميع الرحلات الأوروبية",
      descEn: "On all European trips"
    },
    {
      icon: Clock,
      titleAr: "عروض محدودة الوقت",
      titleEn: "Limited Time Offers",
      descAr: "احجز الآن ولا تفوت الفرصة",
      descEn: "Book now and don't miss the chance"
    },
    {
      icon: Star,
      titleAr: "عروض حصرية للأعضاء",
      titleEn: "Exclusive Member Deals",
      descAr: "خصومات إضافية للعملاء المميزين",
      descEn: "Additional discounts for premium customers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'العروض والخصومات' : 'Offers & Discounts'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'اكتشف أفضل العروض والخصومات على رحلات السفر والسياحة'
                : 'Discover the best offers and discounts on travel and tourism trips'
              }
            </p>
          </div>

          {/* Featured Deals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {featuredDeals.map((deal, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <deal.icon className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-xl font-semibold mb-3">
                    {language === 'ar' ? deal.titleAr : deal.titleEn}
                  </h3>
                  <p className="text-blue-100">
                    {language === 'ar' ? deal.descAr : deal.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden">
                <div className="relative">
                  <img 
                    src={offer.image}
                    alt={language === 'ar' ? offer.titleAr : offer.titleEn}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                    -{offer.discount}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{offer.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {language === 'ar' ? offer.titleAr : offer.titleEn}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'ar' ? offer.descAr : offer.descEn}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg line-through text-gray-400">{offer.originalPrice}</span>
                      <span className="text-2xl font-bold text-blue-600 ml-2">{offer.discountPrice}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <SimpleAIAssistant />
    </div>
  );
};

export default OffersPage;

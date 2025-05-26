
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Hotel, 
  Car, 
  Map, 
  Shield, 
  Headphones, 
  Star,
  Clock,
  Award,
  Globe
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";

const ServicesPage = () => {
  const { t } = useLanguage();

  const mainServices = [
    {
      icon: Hotel,
      titleAr: "حجز الفنادق",
      titleEn: "Hotel Booking",
      descAr: "اختر من بين آلاف الفنادق المميزة حول العالم بأفضل الأسعار وضمان الجودة",
      descEn: "Choose from thousands of premium hotels worldwide with the best prices and quality guarantee",
      features: [
        { ar: "أكثر من 100,000 فندق", en: "Over 100,000 hotels" },
        { ar: "ضمان أفضل سعر", en: "Best price guarantee" },
        { ar: "إلغاء مجاني", en: "Free cancellation" },
        { ar: "دعم 24/7", en: "24/7 support" }
      ]
    },
    {
      icon: Plane,
      titleAr: "حجز الطيران",
      titleEn: "Flight Booking",
      descAr: "احجز تذاكر الطيران بأسعار تنافسية مع أفضل شركات الطيران العالمية",
      descEn: "Book flight tickets at competitive prices with the best international airlines",
      features: [
        { ar: "500+ شركة طيران", en: "500+ airlines" },
        { ar: "رحلات مباشرة ومتصلة", en: "Direct and connecting flights" },
        { ar: "اختيار المقاعد", en: "Seat selection" },
        { ar: "تأمين السفر", en: "Travel insurance" }
      ]
    },
    {
      icon: Car,
      titleAr: "تأجير السيارات",
      titleEn: "Car Rental",
      descAr: "استأجر السيارة المناسبة لرحلتك من أفضل شركات التأجير العالمية",
      descEn: "Rent the perfect car for your trip from the best international rental companies",
      features: [
        { ar: "جميع أنواع السيارات", en: "All car types" },
        { ar: "تأمين شامل", en: "Comprehensive insurance" },
        { ar: "استلام من المطار", en: "Airport pickup" },
        { ar: "بدون رسوم إضافية", en: "No hidden fees" }
      ]
    },
    {
      icon: Map,
      titleAr: "الجولات السياحية",
      titleEn: "Tour Packages",
      descAr: "اكتشف أجمل الأماكن السياحية مع برامج سياحية مخصصة ومنظمة",
      descEn: "Discover the most beautiful tourist attractions with customized and organized tour programs",
      features: [
        { ar: "مرشدين محترفين", en: "Professional guides" },
        { ar: "برامج مخصصة", en: "Customized programs" },
        { ar: "مجموعات صغيرة", en: "Small groups" },
        { ar: "تجارب فريدة", en: "Unique experiences" }
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      titleAr: "تأمين السفر",
      titleEn: "Travel Insurance",
      descAr: "حماية شاملة لرحلتك ضد جميع المخاطر المحتملة",
      descEn: "Comprehensive protection for your trip against all potential risks"
    },
    {
      icon: Headphones,
      titleAr: "دعم العملاء",
      titleEn: "Customer Support",
      descAr: "فريق دعم متخصص متاح 24/7 لمساعدتك في أي وقت",
      descEn: "Specialized support team available 24/7 to help you anytime"
    },
    {
      icon: Globe,
      titleAr: "خدمات التأشيرة",
      titleEn: "Visa Services",
      descAr: "مساعدة في الحصول على التأشيرات لجميع الوجهات",
      descEn: "Assistance in obtaining visas for all destinations"
    },
    {
      icon: Award,
      titleAr: "برنامج الولاء",
      titleEn: "Loyalty Program",
      descAr: "اكسب نقاط مع كل حجز واحصل على مكافآت حصرية",
      descEn: "Earn points with every booking and get exclusive rewards"
    }
  ];

  const whyChooseUs = [
    {
      icon: Star,
      titleAr: "خبرة 15 عاماً",
      titleEn: "15 Years Experience",
      descAr: "خبرة طويلة في مجال السياحة والسفر"
    },
    {
      icon: Award,
      titleAr: "جوائز متعددة",
      titleEn: "Multiple Awards",
      descAr: "حاصلون على جوائز عالمية للتميز"
    },
    {
      icon: Clock,
      titleAr: "خدمة سريعة",
      titleEn: "Fast Service",
      descAr: "حجز فوري وتأكيد خلال دقائق"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('language') === 'ar' ? 'خدماتنا المتميزة' : 'Our Premium Services'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('language') === 'ar' 
                ? 'نقدم لك مجموعة شاملة من خدمات السفر والسياحة المصممة لضمان رحلة مثالية ولا تُنسى'
                : 'We provide you with a comprehensive range of travel and tourism services designed to ensure a perfect and unforgettable trip'
              }
            </p>
          </div>

          {/* Main Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <service.icon className="h-8 w-8 text-blue-600" />
                    {t('language') === 'ar' ? service.titleAr : service.titleEn}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    {t('language') === 'ar' ? service.descAr : service.descEn}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">
                          {t('language') === 'ar' ? feature.ar : feature.en}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    {t('language') === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('language') === 'ar' ? 'خدمات إضافية' : 'Additional Services'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-3">
                      {t('language') === 'ar' ? service.titleAr : service.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('language') === 'ar' ? service.descAr : service.descEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('language') === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <item.icon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      {t('language') === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-gray-600">
                      {t('language') === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                {t('language') === 'ar' ? 'جاهز لبدء رحلتك؟' : 'Ready to Start Your Journey?'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('language') === 'ar' 
                  ? 'اتصل بنا اليوم ودعنا نخطط لرحلة أحلامك'
                  : 'Contact us today and let us plan your dream trip'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-blue-600">
                  {t('language') === 'ar' ? 'ابدأ الحجز' : 'Start Booking'}
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                  {t('language') === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Button>
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

export default ServicesPage;

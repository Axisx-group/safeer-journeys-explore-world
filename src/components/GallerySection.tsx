
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const GallerySection = () => {
  const { t } = useLanguage();

  const destinations = [
    {
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "مكة المكرمة",
      titleEn: "Mecca",
      description: "الحرم المكي الشريف",
      descriptionEn: "The Holy Mosque"
    },
    {
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "المدينة المنورة",
      titleEn: "Medina",
      description: "المسجد النبوي الشريف",
      descriptionEn: "The Prophet's Mosque"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "الرياض",
      titleEn: "Riyadh",
      description: "عاصمة المملكة العربية السعودية",
      descriptionEn: "Capital of Saudi Arabia"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "جدة",
      titleEn: "Jeddah", 
      description: "عروس البحر الأحمر",
      descriptionEn: "Bride of the Red Sea"
    },
    {
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "العلا",
      titleEn: "AlUla",
      description: "عجائب التاريخ والطبيعة",
      descriptionEn: "Wonders of History and Nature"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "الطائف",
      titleEn: "Taif",
      description: "مدينة الورود والمناخ المعتدل",
      descriptionEn: "City of Roses and Mild Climate"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('language') === 'ar' ? 'وجهات مميزة' : 'Featured Destinations'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('language') === 'ar' 
              ? 'اكتشف أجمل الوجهات السياحية في المملكة العربية السعودية'
              : 'Discover the most beautiful tourist destinations in Saudi Arabia'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={destination.image}
                  alt={t('language') === 'ar' ? destination.title : destination.titleEn}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {t('language') === 'ar' ? destination.title : destination.titleEn}
                  </h3>
                  <p className="text-gray-200">
                    {t('language') === 'ar' ? destination.description : destination.descriptionEn}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

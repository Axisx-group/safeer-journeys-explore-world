
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const GallerySection = () => {
  const { t } = useLanguage();

  const destinations = [
    {
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "مدريد",
      titleEn: "Madrid",
      description: "عاصمة إسبانيا النابضة بالحياة",
      descriptionEn: "Spain's vibrant capital"
    },
    {
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "برشلونة",
      titleEn: "Barcelona",
      description: "مدينة الفن والعمارة",
      descriptionEn: "City of Art and Architecture"
    },
    {
      image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "إشبيلية",
      titleEn: "Seville", 
      description: "جوهرة الأندلس",
      descriptionEn: "Jewel of Andalusia"
    },
    {
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "إسطنبول",
      titleEn: "Istanbul",
      description: "ملتقى الشرق والغرب",
      descriptionEn: "Where East Meets West"
    },
    {
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "روما",
      titleEn: "Rome",
      description: "المدينة الخالدة",
      descriptionEn: "The Eternal City"
    },
    {
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "باريس",
      titleEn: "Paris",
      description: "مدينة النور والحب",
      descriptionEn: "City of Light and Love"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('language') === 'ar' ? 'الوجهات الأوروبية المميزة' : 'Featured European Destinations'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('language') === 'ar' 
              ? 'اكتشف أجمل المدن الأوروبية مع التركيز على إسبانيا الساحرة وتركيا التاريخية'
              : 'Discover the most beautiful European cities with focus on charming Spain and historic Turkey'
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


import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SimpleSmartRecommendations = () => {
  const { t, language } = useLanguage();

  const recommendations = [
    {
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: language === 'ar' ? "مدريد" : "Madrid",
      price: language === 'ar' ? "من 150€" : "From 150€",
      rating: 4.8
    },
    {
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: language === 'ar' ? "برشلونة" : "Barcelona", 
      price: language === 'ar' ? "من 180€" : "From 180€",
      rating: 4.9
    },
    {
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: language === 'ar' ? "إسطنبول" : "Istanbul",
      price: language === 'ar' ? "من 120€" : "From 120€", 
      rating: 4.7
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'العروض المميزة' : 'Special Offers'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'ar' ? 'اكتشف أفضل الوجهات السياحية' : 'Discover the best travel destinations'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((item, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{item.rating}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">{item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleSmartRecommendations;

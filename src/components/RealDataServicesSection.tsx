
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Plane, Car, Map, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServices } from "@/hooks/useServices";

const iconMap: Record<string, any> = {
  Hotel,
  Plane,
  Car,
  Map,
  Shield,
  Clock,
};

const RealDataServicesSection = () => {
  const { language } = useLanguage();
  const { data: services, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">حدث خطأ في تحميل الخدمات</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'نقدم مجموعة شاملة من الخدمات السياحية المتميزة'
              : 'We offer a comprehensive range of distinguished tourism services'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => {
            const IconComponent = iconMap[service.icon] || Map;
            return (
              <Card 
                key={service.id} 
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {language === 'ar' ? service.title_ar : service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {language === 'ar' ? service.description_ar : service.description}
                  </p>

                  {service.price_from > 0 && (
                    <p className="text-lg font-semibold text-blue-600">
                      {language === 'ar' ? 'من' : 'From'} €{service.price_from}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RealDataServicesSection;

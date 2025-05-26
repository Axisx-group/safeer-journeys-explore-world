
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Plane, Car, Map, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Hotel,
      title: t('hotelBooking'),
      description: t('hotelDesc'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Plane,
      title: t('flightBooking'), 
      description: t('flightDesc'),
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Car,
      title: t('carRental'),
      description: t('carDesc'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Map,
      title: t('tours'),
      description: t('toursDesc'),
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: t('security'),
      description: t('securityDesc'),
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Clock,
      title: t('support247'),
      description: t('supportDesc'),
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white"
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Clock, Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SimpleDynamicPricing = () => {
  const { language } = useLanguage();

  const deals = [
    {
      icon: TrendingDown,
      title: language === 'ar' ? 'خصم 30%' : '30% Off',
      description: language === 'ar' ? 'على جميع رحلات إسبانيا' : 'On all Spain trips',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'عرض محدود' : 'Limited Time',
      description: language === 'ar' ? 'احجز خلال 24 ساعة' : 'Book within 24 hours',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Percent,
      title: language === 'ar' ? 'عرض خاص' : 'Special Deal',
      description: language === 'ar' ? 'وجهات أوروبية مختارة' : 'Selected European destinations',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'عروض حصرية' : 'Exclusive Deals'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'ar' ? 'لا تفوت هذه الفرص الذهبية' : "Don't miss these golden opportunities"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${deal.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <deal.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{deal.title}</h3>
                <p className="text-gray-600">{deal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleDynamicPricing;

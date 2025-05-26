
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  MapPin, 
  Star, 
  Award,
  Globe,
  Calendar,
  Heart,
  TrendingUp
} from "lucide-react";

const TravelStatsSection = () => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: "500K+",
      labelAr: "عميل سعيد",
      labelEn: "Happy Customers",
      color: "from-blue-500 to-blue-600",
      growth: "+25%"
    },
    {
      icon: MapPin,
      value: "150+",
      labelAr: "وجهة سياحية",
      labelEn: "Destinations",
      color: "from-green-500 to-green-600",
      growth: "+12%"
    },
    {
      icon: Calendar,
      value: "50K+",
      labelAr: "رحلة منظمة",
      labelEn: "Trips Organized",
      color: "from-purple-500 to-purple-600",
      growth: "+18%"
    },
    {
      icon: Star,
      value: "4.9",
      labelAr: "تقييم العملاء",
      labelEn: "Customer Rating",
      color: "from-yellow-500 to-yellow-600",
      growth: "+0.2"
    },
    {
      icon: Globe,
      value: "25+",
      labelAr: "دولة نخدمها",
      labelEn: "Countries Served",
      color: "from-indigo-500 to-indigo-600",
      growth: "+5"
    },
    {
      icon: Award,
      value: "15+",
      labelAr: "جائزة عالمية",
      labelEn: "Global Awards",
      color: "from-red-500 to-red-600",
      growth: "+3"
    },
    {
      icon: Heart,
      value: "98%",
      labelAr: "نسبة الرضا",
      labelEn: "Satisfaction Rate",
      color: "from-pink-500 to-pink-600",
      growth: "+2%"
    },
    {
      icon: TrendingUp,
      value: "15",
      labelAr: "سنة خبرة",
      labelEn: "Years Experience",
      color: "from-teal-500 to-teal-600",
      growth: "Trusted"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'ar' ? 'أرقامنا تتحدث عن نفسها' : 'Our Numbers Speak for Themselves'}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'نفخر بالثقة التي وضعها عملاؤنا فينا عبر السنوات وبالإنجازات التي حققناها معاً'
              : 'We are proud of the trust our customers have placed in us over the years and the achievements we have made together'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-500 group"
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                
                <div className="text-blue-100 text-sm mb-2">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
                
                <div className="text-green-400 text-xs font-semibold flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.growth}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-yellow-400 text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {language === 'ar' ? 'أفضل شركة سياحة' : 'Best Travel Company'}
            </h3>
            <p className="text-blue-100">
              {language === 'ar' ? 'لعام 2024' : 'of 2024'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-green-400 text-6xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {language === 'ar' ? 'خدمة عملاء متميزة' : 'Excellence in Customer Service'}
            </h3>
            <p className="text-blue-100">
              {language === 'ar' ? 'جائزة الخدمة الذهبية' : 'Golden Service Award'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-blue-400 text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {language === 'ar' ? 'الأسرع نمواً' : 'Fastest Growing'}
            </h3>
            <p className="text-blue-100">
              {language === 'ar' ? 'في المنطقة' : 'in the Region'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelStatsSection;


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Sparkles, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Recommendation {
  id: string;
  destination: string;
  price: string;
  duration: string;
  type: string;
  image: string;
  aiScore: number;
  reasons: string[];
}

const SmartRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  const generateSmartRecommendations = () => {
    const destinations = language === 'ar' ? [
      {
        id: '1',
        destination: 'دبي، الإمارات',
        price: '1200€',
        duration: '5 أيام',
        type: 'رحلة فاخرة',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
        aiScore: 95,
        reasons: ['طقس مثالي', 'عروض حصرية', 'تجارب فريدة']
      },
      {
        id: '2',
        destination: 'باريس، فرنسا',
        price: '800€',
        duration: '4 أيام',
        type: 'رحلة ثقافية',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
        aiScore: 92,
        reasons: ['موسم مثالي', 'فعاليات خاصة', 'أسعار منخفضة']
      },
      {
        id: '3',
        destination: 'طوكيو، اليابان',
        price: '1500€',
        duration: '7 أيام',
        type: 'رحلة مغامرة',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
        aiScore: 88,
        reasons: ['تجربة فريدة', 'ثقافة مميزة', 'طعام رائع']
      }
    ] : [
      {
        id: '1',
        destination: 'Dubai, UAE',
        price: '€1200',
        duration: '5 days',
        type: 'Luxury Trip',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
        aiScore: 95,
        reasons: ['Perfect Weather', 'Exclusive Deals', 'Unique Experiences']
      },
      {
        id: '2',
        destination: 'Paris, France',
        price: '€800',
        duration: '4 days',
        type: 'Cultural Trip',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
        aiScore: 92,
        reasons: ['Perfect Season', 'Special Events', 'Great Prices']
      },
      {
        id: '3',
        destination: 'Tokyo, Japan',
        price: '€1500',
        duration: '7 days',
        type: 'Adventure Trip',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
        aiScore: 88,
        reasons: ['Unique Experience', 'Amazing Culture', 'Great Food']
      }
    ];

    return destinations;
  };

  useEffect(() => {
    // محاكاة تحليل ذكي للبيانات
    setIsLoading(true);
    setTimeout(() => {
      const smartRecommendations = generateSmartRecommendations();
      setRecommendations(smartRecommendations);
      setIsLoading(false);
    }, 2000);
  }, [language]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
              <h2 className="text-3xl font-bold text-gray-900">
                {language === 'ar' ? 'الذكاء الاصطناعي يحلل...' : 'AI is analyzing...'}
              </h2>
            </div>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'نحن نحلل أفضل الوجهات لك بناءً على تفضيلاتك والاتجاهات الحالية'
                : 'We are analyzing the best destinations for you based on your preferences and current trends'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'اقتراحات ذكية مخصصة لك' : 'Smart Recommendations for You'}
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'بناءً على تحليل الذكاء الاصطناعي للاتجاهات الحالية وتفضيلات المسافرين'
              : 'Based on AI analysis of current trends and traveler preferences'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
              <div className="relative">
                <img 
                  src={rec.image} 
                  alt={rec.destination}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {rec.aiScore}%
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                    {rec.type}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">{rec.destination}</h3>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{rec.duration}</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{rec.price}</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    {language === 'ar' ? 'لماذا نوصي بهذه الوجهة:' : 'Why we recommend this:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.reasons.map((reason, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendations;

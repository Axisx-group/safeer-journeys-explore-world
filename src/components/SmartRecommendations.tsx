import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Sparkles, TrendingUp, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const generateSmartRecommendations = () => {
    const destinations = language === 'ar' ? [
      {
        id: '1',
        destination: 'مدريد، إسبانيا',
        price: '450€',
        duration: '4 أيام',
        type: 'رحلة ثقافية',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 96,
        reasons: ['عاصمة فنية رائعة', 'طقس مثالي', 'تراث ثقافي غني']
      },
      {
        id: '2',
        destination: 'برشلونة، إسبانيا',
        price: '520€',
        duration: '5 أيام',
        type: 'رحلة شاطئية وثقافية',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 95,
        reasons: ['شواطئ رائعة', 'فن الغاودي', 'مأكولات متميزة']
      },
      {
        id: '3',
        destination: 'إشبيلية، إسبانيا',
        price: '380€',
        duration: '3 أيام',
        type: 'رحلة تاريخية',
        image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 94,
        reasons: ['تراث أندلسي', 'عمارة إسلامية', 'جو رومانسي']
      },
      {
        id: '4',
        destination: 'إسطنبول، تركيا',
        price: '420€',
        duration: '4 أيام',
        type: 'رحلة تاريخية وثقافية',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 93,
        reasons: ['ملتقى الحضارات', 'مساجد تاريخية', 'تجربة فريدة']
      },
      {
        id: '5',
        destination: 'روما، إيطاليا',
        price: '480€',
        duration: '4 أيام',
        type: 'رحلة تاريخية',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 92,
        reasons: ['عاصمة التاريخ', 'آثار رومانية', 'فن النهضة']
      },
      {
        id: '6',
        destination: 'باريس، فرنسا',
        price: '550€',
        duration: '5 أيام',
        type: 'رحلة رومانسية',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 91,
        reasons: ['مدينة النور', 'فن وثقافة', 'رومانسية خالدة']
      }
    ] : [
      {
        id: '1',
        destination: 'Madrid, Spain',
        price: '€450',
        duration: '4 days',
        type: 'Cultural Trip',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 96,
        reasons: ['Amazing Art Capital', 'Perfect Weather', 'Rich Cultural Heritage']
      },
      {
        id: '2',
        destination: 'Barcelona, Spain',
        price: '€520',
        duration: '5 days',
        type: 'Beach & Culture',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 95,
        reasons: ['Beautiful Beaches', 'Gaudí Architecture', 'Outstanding Cuisine']
      },
      {
        id: '3',
        destination: 'Seville, Spain',
        price: '€380',
        duration: '3 days',
        type: 'Historical Trip',
        image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 94,
        reasons: ['Andalusian Heritage', 'Islamic Architecture', 'Romantic Atmosphere']
      },
      {
        id: '4',
        destination: 'Istanbul, Turkey',
        price: '€420',
        duration: '4 days',
        type: 'Historical & Cultural',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 93,
        reasons: ['Meeting of Civilizations', 'Historic Mosques', 'Unique Experience']
      },
      {
        id: '5',
        destination: 'Rome, Italy',
        price: '€480',
        duration: '4 days',
        type: 'Historical Trip',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 92,
        reasons: ['Capital of History', 'Roman Ruins', 'Renaissance Art']
      },
      {
        id: '6',
        destination: 'Paris, France',
        price: '€550',
        duration: '5 days',
        type: 'Romantic Trip',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        aiScore: 91,
        reasons: ['City of Light', 'Art & Culture', 'Timeless Romance']
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
                ? 'نحن نحلل أفضل الوجهات الأوروبية لك مع التركيز على إسبانيا وتركيا'
                : 'We are analyzing the best European destinations for you with focus on Spain and Turkey'
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
              {language === 'ar' ? 'أفضل الوجهات الأوروبية وتركيا' : 'Best European Destinations & Turkey'}
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف أجمل المدن الأوروبية مع التركيز على إسبانيا الساحرة وتركيا التاريخية'
              : 'Discover the most beautiful European cities with focus on charming Spain and historic Turkey'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
              <div className="relative">
                <img 
                  src={rec.image} 
                  alt={rec.destination}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
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

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/booking')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'المزيد' : 'More Info'}
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => navigate('/booking')}
                  >
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendations;

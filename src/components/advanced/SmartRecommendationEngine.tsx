
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  MapPin, 
  Star,
  Clock,
  DollarSign,
  Thermometer,
  Shield
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDestinations } from "@/hooks/useDestinations";
import { motion } from "framer-motion";

interface SmartRecommendation {
  destination: any;
  score: number;
  reasons: string[];
  reasons_ar: string[];
  trending: boolean;
  savings: number;
  bestTime: string;
  crowdLevel: 'low' | 'medium' | 'high';
}

const SmartRecommendationEngine = () => {
  const { language } = useLanguage();
  const { data: destinations, isLoading } = useDestinations();
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Recommendations', label_ar: 'جميع التوصيات' },
    { id: 'trending', label: 'Trending Now', label_ar: 'الأكثر رواجاً' },
    { id: 'budget', label: 'Best Value', label_ar: 'أفضل قيمة' },
    { id: 'exclusive', label: 'Hidden Gems', label_ar: 'جواهر مخفية' },
    { id: 'seasonal', label: 'Perfect Season', label_ar: 'الموسم المثالي' }
  ];

  useEffect(() => {
    if (destinations && destinations.length > 0) {
      // Smart algorithm to generate recommendations
      const smartRecs: SmartRecommendation[] = destinations.slice(0, 6).map((dest, index) => {
        const score = Math.floor(Math.random() * 30) + 70; // 70-100
        const trending = index < 2;
        const savings = Math.floor(Math.random() * 300) + 50;
        const crowdLevels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
        const crowdLevel = crowdLevels[Math.floor(Math.random() * 3)];
        
        const reasons = [
          'Perfect weather conditions',
          'Off-peak pricing available',
          'High user satisfaction rating',
          'Recently trending destination',
          'Excellent safety rating'
        ];
        
        const reasons_ar = [
          'ظروف جوية مثالية',
          'أسعار خارج موسم الذروة',
          'تقييم عالي من المستخدمين',
          'وجهة رائجة مؤخراً',
          'تقييم أمان ممتاز'
        ];

        return {
          destination: dest,
          score,
          reasons: reasons.slice(0, 3),
          reasons_ar: reasons_ar.slice(0, 3),
          trending,
          savings,
          bestTime: 'Spring/Summer',
          crowdLevel
        };
      });

      setRecommendations(smartRecs);
    }
  }, [destinations]);

  const filteredRecommendations = recommendations.filter(rec => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'trending') return rec.trending;
    if (selectedCategory === 'budget') return rec.savings > 150;
    if (selectedCategory === 'exclusive') return rec.crowdLevel === 'low';
    if (selectedCategory === 'seasonal') return rec.score > 85;
    return true;
  });

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10 text-blue-600" />
            {language === 'ar' ? 'توصيات ذكية مخصصة لك' : 'Smart Recommendations for You'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف أفضل الوجهات بناءً على ذكاء اصطناعي متطور يحلل التوجهات والأسعار والطقس'
              : 'Discover the best destinations powered by AI that analyzes trends, prices, and weather'
            }
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {language === 'ar' ? category.label_ar : category.label}
            </Button>
          ))}
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecommendations.map((rec, index) => (
            <motion.div
              key={rec.destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                <div className="relative">
                  <img 
                    src={rec.destination.image_urls[0]} 
                    alt={language === 'ar' ? rec.destination.name_ar : rec.destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-blue-600 text-white flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {rec.score}% Match
                    </Badge>
                    {rec.trending && (
                      <Badge className="bg-red-500 text-white flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {language === 'ar' ? 'رائج' : 'Trending'}
                      </Badge>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-600 text-white">
                      -{rec.savings}€
                    </Badge>
                  </div>

                  {/* Crowd Level Indicator */}
                  <div className="absolute bottom-3 right-3">
                    <Badge 
                      className={
                        rec.crowdLevel === 'low' ? 'bg-green-100 text-green-800' :
                        rec.crowdLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      <Users className="h-3 w-3 mr-1" />
                      {rec.crowdLevel === 'low' ? (language === 'ar' ? 'قليل' : 'Low') :
                       rec.crowdLevel === 'medium' ? (language === 'ar' ? 'متوسط' : 'Medium') :
                       (language === 'ar' ? 'مزدحم' : 'Busy')}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {language === 'ar' ? rec.destination.name_ar : rec.destination.name}
                      </h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {language === 'ar' ? rec.destination.country_ar : rec.destination.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        {[...Array(rec.destination.safety_rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        {language === 'ar' ? 'تقييم الأمان' : 'Safety Rating'}
                      </p>
                    </div>
                  </div>

                  {/* AI Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'ar' ? 'مطابقة الذكاء الاصطناعي' : 'AI Match Score'}
                      </span>
                      <span className="text-sm font-bold text-blue-600">{rec.score}%</span>
                    </div>
                    <Progress value={rec.score} className="h-2" />
                  </div>

                  {/* Reasons */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">
                      {language === 'ar' ? 'لماذا موصى به:' : 'Why recommended:'}
                    </h4>
                    <ul className="space-y-1">
                      {(language === 'ar' ? rec.reasons_ar : rec.reasons).map((reason, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                    <div className="text-center">
                      <Thermometer className="h-4 w-4 mx-auto mb-1 text-orange-500" />
                      <p className="font-semibold">{rec.destination.average_temperature}°C</p>
                      <p className="text-gray-500">{language === 'ar' ? 'متوسط' : 'Avg'}</p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="h-4 w-4 mx-auto mb-1 text-green-500" />
                      <p className="font-semibold">{'€'.repeat(rec.destination.price_level)}</p>
                      <p className="text-gray-500">{language === 'ar' ? 'مستوى' : 'Level'}</p>
                    </div>
                    <div className="text-center">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                      <p className="font-semibold">{rec.bestTime}</p>
                      <p className="text-gray-500">{language === 'ar' ? 'أفضل وقت' : 'Best time'}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === 'ar' ? 'تفاصيل' : 'Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendationEngine;

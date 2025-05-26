
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Zap, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceAnalysis {
  destination: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  prediction: string;
  confidence: number;
  bestTimeToBook: string;
}

const DynamicPricing = () => {
  const [priceAnalysis, setPriceAnalysis] = useState<PriceAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const { language } = useLanguage();

  const generatePriceAnalysis = (): PriceAnalysis[] => {
    const destinations = language === 'ar' ? [
      {
        destination: 'لندن',
        currentPrice: 450,
        previousPrice: 520,
        trend: 'down' as const,
        prediction: 'انخفاض متوقع بـ 8% في الأسبوع القادم',
        confidence: 87,
        bestTimeToBook: 'خلال الـ 3 أيام القادمة'
      },
      {
        destination: 'نيويورك',
        currentPrice: 680,
        previousPrice: 630,
        trend: 'up' as const,
        prediction: 'ارتفاع متوقع بـ 12% في الشهر القادم',
        confidence: 92,
        bestTimeToBook: 'احجز الآن'
      },
      {
        destination: 'روما',
        currentPrice: 380,
        previousPrice: 380,
        trend: 'stable' as const,
        prediction: 'استقرار في الأسعار للأسبوعين القادمين',
        confidence: 75,
        bestTimeToBook: 'أي وقت خلال الأسبوعين القادمين'
      }
    ] : [
      {
        destination: 'London',
        currentPrice: 450,
        previousPrice: 520,
        trend: 'down' as const,
        prediction: 'Expected 8% decrease next week',
        confidence: 87,
        bestTimeToBook: 'Within next 3 days'
      },
      {
        destination: 'New York',
        currentPrice: 680,
        previousPrice: 630,
        trend: 'up' as const,
        prediction: 'Expected 12% increase next month',
        confidence: 92,
        bestTimeToBook: 'Book now'
      },
      {
        destination: 'Rome',
        currentPrice: 380,
        previousPrice: 380,
        trend: 'stable' as const,
        prediction: 'Stable prices for next 2 weeks',
        confidence: 75,
        bestTimeToBook: 'Anytime in next 2 weeks'
      }
    ];

    return destinations;
  };

  useEffect(() => {
    setIsAnalyzing(true);
    // محاكاة تحليل الأسعار بالذكاء الاصطناعي
    setTimeout(() => {
      setPriceAnalysis(generatePriceAnalysis());
      setIsAnalyzing(false);
    }, 3000);
  }, [language]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-red-600';
      case 'down':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  if (isAnalyzing) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
              <h2 className="text-3xl font-bold text-gray-900">
                {language === 'ar' ? 'تحليل الأسعار الذكي' : 'Smart Price Analysis'}
              </h2>
            </div>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'الذكاء الاصطناعي يحلل اتجاهات الأسعار لإيجاد أفضل الصفقات...'
                : 'AI is analyzing price trends to find the best deals...'
              }
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <p className="text-center mt-4 text-gray-600">
                {language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'تحليل الأسعار الذكي' : 'Smart Price Analysis'}
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'احصل على توقعات دقيقة للأسعار وأفضل أوقات الحجز باستخدام الذكاء الاصطناعي'
              : 'Get accurate price predictions and best booking times using artificial intelligence'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {priceAnalysis.map((analysis, index) => (
            <Card key={index} className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl font-bold">{analysis.destination}</span>
                  {getTrendIcon(analysis.trend)}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">€{analysis.currentPrice}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'السعر الحالي' : 'Current Price'}
                    </p>
                  </div>
                  <div className={`text-right ${getTrendColor(analysis.trend)}`}>
                    <p className="text-lg font-semibold">
                      {analysis.trend === 'down' ? '-' : analysis.trend === 'up' ? '+' : ''}
                      {analysis.trend !== 'stable' ? getPriceChange(analysis.currentPrice, analysis.previousPrice) + '%' : '0%'}
                    </p>
                    <p className="text-xs">
                      {language === 'ar' ? 'من الأسبوع الماضي' : 'from last week'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-800">
                      {language === 'ar' ? 'توقعات الذكاء الاصطناعي' : 'AI Prediction'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{analysis.prediction}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'مستوى الثقة:' : 'Confidence:'}
                  </span>
                  <span className="font-semibold text-green-600">{analysis.confidence}%</span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-semibold text-green-800 mb-1">
                    {language === 'ar' ? 'أفضل وقت للحجز:' : 'Best time to book:'}
                  </p>
                  <p className="text-sm text-green-700">{analysis.bestTimeToBook}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">
                  {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
                </span>
              </div>
              <p className="text-sm opacity-90">
                {language === 'ar' 
                  ? 'يتم تحديث التحليل كل ساعة بناءً على بيانات السوق الحية'
                  : 'Analysis updated every hour based on live market data'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DynamicPricing;

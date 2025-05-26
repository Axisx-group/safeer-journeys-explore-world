
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Heart, 
  MapPin, 
  Calendar,
  Users,
  DollarSign,
  Plane,
  Camera,
  Music,
  Coffee
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface MoodQuestion {
  id: string;
  question: string;
  question_ar: string;
  type: 'multiple' | 'scale' | 'text';
  options?: string[];
  options_ar?: string[];
  icon: any;
}

interface AIRecommendation {
  destination: string;
  destination_ar: string;
  matchScore: number;
  reasons: string[];
  reasons_ar: string[];
  imageUrl: string;
  priceRange: string;
  bestTime: string;
  activities: string[];
}

const AITravelAssistant = () => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  const moodQuestions: MoodQuestion[] = [
    {
      id: 'current_mood',
      question: 'How are you feeling right now?',
      question_ar: 'كيف تشعر الآن؟',
      type: 'multiple',
      options: ['Energetic', 'Relaxed', 'Adventurous', 'Romantic', 'Stressed', 'Excited'],
      options_ar: ['نشيط', 'مسترخٍ', 'مغامر', 'رومانسي', 'متوتر', 'متحمس'],
      icon: Heart
    },
    {
      id: 'travel_style',
      question: 'What type of vacation do you prefer?',
      question_ar: 'أي نوع من العطلات تفضل؟',
      type: 'multiple',
      options: ['Cultural exploration', 'Beach relaxation', 'City adventures', 'Nature escapes', 'Historical tours', 'Nightlife experiences'],
      options_ar: ['استكشاف ثقافي', 'استرخاء على الشاطئ', 'مغامرات المدينة', 'هروب للطبيعة', 'جولات تاريخية', 'تجارب الحياة الليلية'],
      icon: MapPin
    },
    {
      id: 'energy_level',
      question: 'Rate your energy level for activities (1-10)',
      question_ar: 'قيم مستوى طاقتك للأنشطة (1-10)',
      type: 'scale',
      icon: Sparkles
    },
    {
      id: 'budget_range',
      question: 'What\'s your budget range for this trip?',
      question_ar: 'ما هي ميزانيتك لهذه الرحلة؟',
      type: 'multiple',
      options: ['Budget-friendly (€500-1000)', 'Mid-range (€1000-2500)', 'Luxury (€2500-5000)', 'Ultra-luxury (€5000+)'],
      options_ar: ['اقتصادي (€500-1000)', 'متوسط (€1000-2500)', 'فاخر (€2500-5000)', 'فائق الفخامة (€5000+)'],
      icon: DollarSign
    },
    {
      id: 'travel_duration',
      question: 'How long do you want to travel?',
      question_ar: 'كم يوماً تريد أن تسافر؟',
      type: 'multiple',
      options: ['Weekend (2-3 days)', 'Short trip (4-7 days)', 'Extended vacation (8-14 days)', 'Long journey (15+ days)'],
      options_ar: ['عطلة نهاية أسبوع (2-3 أيام)', 'رحلة قصيرة (4-7 أيام)', 'عطلة ممتدة (8-14 يوماً)', 'رحلة طويلة (15+ يوماً)'],
      icon: Calendar
    },
    {
      id: 'companion_type',
      question: 'Who are you traveling with?',
      question_ar: 'مع من ستسافر؟',
      type: 'multiple',
      options: ['Solo', 'Partner/Spouse', 'Family with kids', 'Friends group', 'Business colleagues'],
      options_ar: ['بمفردي', 'الشريك/الزوج', 'العائلة مع الأطفال', 'مجموعة أصدقاء', 'زملاء العمل'],
      icon: Users
    }
  ];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentStep < moodQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      analyzeAndRecommend();
    }
  };

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const analyzeAndRecommend = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock recommendations based on answers
    const mockRecommendations: AIRecommendation[] = [
      {
        destination: 'Barcelona',
        destination_ar: 'برشلونة',
        matchScore: 95,
        reasons: ['Perfect for your energetic mood', 'Great cultural experiences', 'Vibrant nightlife'],
        reasons_ar: ['مثالية لحالتك النشطة', 'تجارب ثقافية رائعة', 'حياة ليلية نابضة'],
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca',
        priceRange: '€800-1500',
        bestTime: 'Spring/Summer',
        activities: ['Sightseeing', 'Beach', 'Culture', 'Nightlife']
      },
      {
        destination: 'Santorini',
        destination_ar: 'سانتوريني',
        matchScore: 88,
        reasons: ['Romantic atmosphere', 'Relaxing environment', 'Beautiful sunsets'],
        reasons_ar: ['أجواء رومانسية', 'بيئة مريحة', 'غروب شمس خلاب'],
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        priceRange: '€1200-2000',
        bestTime: 'Summer',
        activities: ['Beach', 'Photography', 'Wine tasting', 'Relaxation']
      },
      {
        destination: 'Istanbul',
        destination_ar: 'إسطنبول',
        matchScore: 82,
        reasons: ['Rich cultural heritage', 'Historical significance', 'Great food scene'],
        reasons_ar: ['تراث ثقافي غني', 'أهمية تاريخية', 'مشهد طعام رائع'],
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
        priceRange: '€600-1200',
        bestTime: 'Spring/Fall',
        activities: ['History', 'Culture', 'Shopping', 'Cuisine']
      }
    ];

    setRecommendations(mockRecommendations);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const currentQuestion = moodQuestions[currentStep];
  const progress = ((currentStep + 1) / moodQuestions.length) * 100;

  if (showResults) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            {language === 'ar' ? 'توصياتنا المخصصة لك' : 'Your Personalized Recommendations'}
          </h2>
          <p className="text-gray-600">
            {language === 'ar' ? 'بناءً على إجاباتك، إليك أفضل الوجهات المناسبة لك' : 'Based on your answers, here are the best destinations for you'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={rec.imageUrl} 
                    alt={language === 'ar' ? rec.destination_ar : rec.destination}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    {rec.matchScore}% Match
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'ar' ? rec.destination_ar : rec.destination}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        {language === 'ar' ? 'نسبة التطابق' : 'Match Score'}
                      </span>
                      <span className="font-semibold">{rec.matchScore}%</span>
                    </div>
                    <Progress value={rec.matchScore} className="h-2" />
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">
                      {language === 'ar' ? 'لماذا هذه الوجهة؟' : 'Why this destination?'}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {(language === 'ar' ? rec.reasons_ar : rec.reasons).map((reason, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {rec.activities.map((activity, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{rec.priceRange}</span>
                    <span>{rec.bestTime}</span>
                  </div>

                  <Button className="w-full">
                    <Plane className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              setCurrentStep(0);
              setAnswers({});
              setShowResults(false);
              setRecommendations([]);
            }}
          >
            {language === 'ar' ? 'ابدأ من جديد' : 'Start Over'}
          </Button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-6"
            >
              <Bot className="h-16 w-16 text-blue-600" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'يقوم الذكاء الاصطناعي بتحليل إجاباتك...' : 'AI is analyzing your answers...'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 'نحن نحلل نفسيتك وتفضيلاتك لنجد أفضل الوجهات لك' : 'We\'re analyzing your mood and preferences to find the perfect destinations for you'}
            </p>
            <Progress value={66} className="w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = currentQuestion.icon;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {language === 'ar' ? 'مساعد السفر الذكي' : 'AI Travel Assistant'}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? `السؤال ${currentStep + 1} من ${moodQuestions.length}` : `Question ${currentStep + 1} of ${moodQuestions.length}`}
                </p>
              </div>
            </div>
            <Badge variant="outline">{Math.round(progress)}%</Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6">
                {language === 'ar' ? currentQuestion.question_ar : currentQuestion.question}
              </h3>

              {currentQuestion.type === 'multiple' && (
                <div className="space-y-3">
                  {(language === 'ar' ? currentQuestion.options_ar : currentQuestion.options)?.map((option, index) => (
                    <Button
                      key={index}
                      variant={answers[currentQuestion.id] === option ? "default" : "outline"}
                      className="w-full justify-start h-auto p-4"
                      onClick={() => handleAnswer(currentQuestion.id, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'scale' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">1</span>
                    <span className="text-sm text-gray-500">10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={answers[currentQuestion.id] || 5}
                    onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {answers[currentQuestion.id] || 5}
                    </span>
                  </div>
                </div>
              )}

              {currentQuestion.type === 'text' && (
                <Textarea
                  placeholder={language === 'ar' ? 'اكتب إجابتك هنا...' : 'Type your answer here...'}
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="min-h-32"
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              disabled={currentStep === 0}
            >
              {language === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            
            <Button 
              onClick={nextQuestion}
              disabled={!answers[currentQuestion.id]}
              className="flex items-center gap-2"
            >
              {currentStep === moodQuestions.length - 1 ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  {language === 'ar' ? 'احصل على التوصيات' : 'Get Recommendations'}
                </>
              ) : (
                <>
                  {language === 'ar' ? 'التالي' : 'Next'}
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITravelAssistant;

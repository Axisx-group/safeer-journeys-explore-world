
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, Bell, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email address',
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: language === 'ar' ? 'تم الاشتراك بنجاح!' : 'Successfully Subscribed!',
        description: language === 'ar' 
          ? 'سنرسل لك أحدث العروض والنصائح السياحية' 
          : 'We will send you the latest offers and travel tips',
      });
      setEmail("");
      setIsSubscribing(false);
    }, 2000);
  };

  const benefits = [
    {
      icon: Gift,
      textAr: "عروض حصرية للمشتركين",
      textEn: "Exclusive offers for subscribers"
    },
    {
      icon: Bell,
      textAr: "أول من يعلم بالعروض الجديدة",
      textEn: "First to know about new offers"
    },
    {
      icon: Sparkles,
      textAr: "نصائح سفر مجانية",
      textEn: "Free travel tips"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex p-4 rounded-full bg-white/20 mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {language === 'ar' ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}
              </h2>
              
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'احصل على أفضل العروض والنصائح السياحية مباشرة في بريدك الإلكتروني'
                  : 'Get the best deals and travel tips delivered directly to your inbox'
                }
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center text-white">
                  <benefit.icon className="h-5 w-5 mr-3 text-yellow-300" />
                  <span className="text-sm">
                    {language === 'ar' ? benefit.textAr : benefit.textEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  disabled={isSubscribing}
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
                  disabled={isSubscribing}
                >
                  {isSubscribing 
                    ? (language === 'ar' ? 'جاري الاشتراك...' : 'Subscribing...')
                    : (language === 'ar' ? 'اشترك' : 'Subscribe')
                  }
                </Button>
              </div>
            </form>

            <p className="text-xs text-blue-100 mt-4 opacity-80">
              {language === 'ar' 
                ? 'نحترم خصوصيتك ولن نرسل لك رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.'
                : 'We respect your privacy and will not send you spam. You can unsubscribe at any time.'
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-blue-100">
                  {language === 'ar' ? 'مشترك' : 'Subscribers'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-xs text-blue-100">
                  {language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Weekly</div>
                <div className="text-xs text-blue-100">
                  {language === 'ar' ? 'عروض جديدة' : 'New Deals'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-blue-100">
                  {language === 'ar' ? 'دعم العملاء' : 'Customer Support'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;


import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleAIAssistant from "@/components/SimpleAIAssistant";

const AboutPage = () => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Target,
      titleAr: "رؤيتنا",
      titleEn: "Our Vision",
      descAr: "أن نكون الشركة الرائدة في مجال السياحة والسفر",
      descEn: "To be the leading company in tourism and travel"
    },
    {
      icon: Heart,
      titleAr: "مهمتنا", 
      titleEn: "Our Mission",
      descAr: "تقديم تجارب سفر استثنائية ولا تُنسى",
      descEn: "Providing exceptional and unforgettable travel experiences"
    },
    {
      icon: Users,
      titleAr: "فريقنا",
      titleEn: "Our Team", 
      descAr: "خبراء متخصصون في مجال السياحة والسفر",
      descEn: "Experts specialized in tourism and travel"
    },
    {
      icon: Award,
      titleAr: "جوائزنا",
      titleEn: "Our Awards",
      descAr: "حاصلون على جوائز عالمية للتميز",
      descEn: "Recipients of international excellence awards"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'نحن شركة رائدة في مجال السياحة والسفر، نقدم خدمات متميزة منذ أكثر من 15 عاماً'
                : 'We are a leading company in tourism and travel, providing distinguished services for over 15 years'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="About us"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === 'ar' ? 'قصتنا' : 'Our Story'}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {language === 'ar' 
                  ? 'بدأت رحلتنا منذ أكثر من 15 عاماً بحلم بسيط: تقديم تجارب سفر استثنائية تتجاوز توقعات عملائنا. اليوم، نحن فخورون بكوننا واحدة من أكثر شركات السياحة ثقة في المنطقة.'
                  : 'Our journey began over 15 years ago with a simple dream: to provide exceptional travel experiences that exceed our customers\' expectations. Today, we are proud to be one of the most trusted tourism companies in the region.'
                }
              </p>
              <p className="text-gray-600 leading-relaxed">
                {language === 'ar'
                  ? 'نؤمن بأن السفر أكثر من مجرد وجهة، إنه تجربة تغير الحياة وتخلق ذكريات تدوم مدى الحياة.'
                  : 'We believe that travel is more than just a destination, it\'s a life-changing experience that creates memories that last a lifetime.'
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">
                    {language === 'ar' ? value.titleAr : value.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' ? value.descAr : value.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <SimpleAIAssistant />
    </div>
  );
};

export default AboutPage;

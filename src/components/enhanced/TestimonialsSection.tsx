
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsSection = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      id: 1,
      nameAr: "أحمد محمد",
      nameEn: "Ahmed Mohammed",
      locationAr: "الرياض، السعودية",
      locationEn: "Riyadh, Saudi Arabia",
      rating: 5,
      textAr: "تجربة رائعة! الخدمة كانت ممتازة والأسعار معقولة. سأكرر الحجز معهم بالتأكيد.",
      textEn: "Amazing experience! The service was excellent and prices were reasonable. I will definitely book with them again.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tripType: "Family Vacation"
    },
    {
      id: 2,
      nameAr: "فاطمة الزهراء",
      nameEn: "Fatima Al-Zahra",
      locationAr: "دبي، الإمارات",
      locationEn: "Dubai, UAE",
      rating: 5,
      textAr: "فريق محترف جداً وخدمة عملاء ممتازة. ساعدوني في تنظيم رحلة شهر العسل المثالية.",
      textEn: "Very professional team and excellent customer service. They helped me organize the perfect honeymoon trip.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b123?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tripType: "Honeymoon"
    },
    {
      id: 3,
      nameAr: "خالد العمري",
      nameEn: "Khalid Al-Omari",
      locationAr: "الكويت",
      locationEn: "Kuwait",
      rating: 5,
      textAr: "أفضل موقع حجز استخدمته على الإطلاق. سهولة في الاستخدام وأسعار تنافسية.",
      textEn: "The best booking site I've ever used. Easy to use and competitive prices.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tripType: "Business Trip"
    },
    {
      id: 4,
      nameAr: "مريم السالم",
      nameEn: "Mariam Al-Salem",
      locationAr: "القاهرة، مصر",
      locationEn: "Cairo, Egypt",
      rating: 5,
      textAr: "خدمة رائعة وموظفين متعاونين جداً. رحلتي كانت أكثر من رائعة بفضلهم.",
      textEn: "Wonderful service and very helpful staff. My trip was more than amazing thanks to them.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tripType: "Solo Travel"
    },
    {
      id: 5,
      nameAr: "عبدالله الحربي",
      nameEn: "Abdullah Al-Harbi",
      locationAr: "جدة، السعودية",
      locationEn: "Jeddah, Saudi Arabia",
      rating: 5,
      textAr: "تنظيم مثالي ومتابعة مستمرة. أنصح الجميع بالتعامل معهم.",
      textEn: "Perfect organization and continuous follow-up. I recommend everyone to deal with them.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tripType: "Group Travel"
    },
    {
      id: 6,
      nameAr: "سارة المطيري",
      nameEn: "Sarah Al-Mutairi",
      locationAr: "الدوحة، قطر",
      locationEn: "Doha, Qatar",
      rating: 5,
      textAr: "موقع موثوق وآمن. الدفع سهل والحجز سريع. تجربة ممتازة.",
      textEn: "Reliable and secure website. Easy payment and quick booking. Excellent experience.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tripType: "Adventure Trip"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'تجارب حقيقية من عملائنا الكرام حول خدماتنا وجودة رحلاتهم معنا'
              : 'Real experiences from our valued customers about our services and the quality of their trips with us'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-500 border-0 bg-white relative group">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Quote className="h-8 w-8 text-blue-600" />
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{language === 'ar' ? testimonial.textAr : testimonial.textEn}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image} alt={language === 'ar' ? testimonial.nameAr : testimonial.nameEn} />
                    <AvatarFallback>
                      {language === 'ar' 
                        ? testimonial.nameAr.split(' ').map(n => n[0]).join('')
                        : testimonial.nameEn.split(' ').map(n => n[0]).join('')
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {language === 'ar' ? testimonial.nameAr : testimonial.nameEn}
                    </div>
                    <div className="text-sm text-gray-500">
                      {language === 'ar' ? testimonial.locationAr : testimonial.locationEn}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      {testimonial.tripType}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">4.9/5</div>
              <div className="text-sm text-gray-500">
                {language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">98%</div>
              <div className="text-sm text-gray-500">
                {language === 'ar' ? 'نسبة الرضا' : 'Satisfaction Rate'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">500K+</div>
              <div className="text-sm text-gray-500">
                {language === 'ar' ? 'عميل سعيد' : 'Happy Customers'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">15+</div>
              <div className="text-sm text-gray-500">
                {language === 'ar' ? 'سنة خبرة' : 'Years Experience'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

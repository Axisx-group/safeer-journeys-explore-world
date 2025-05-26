
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-indigo-300/20 to-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 rounded-2xl shadow-2xl border-2 border-white/30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Quote className="h-12 w-12 text-white" />
                </motion.div>
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'ماذا يقول' : 'What Our'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'عملاؤنا' : 'Customers Say'}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            {language === 'ar' 
              ? 'تجارب حقيقية من عملائنا الكرام حول خدماتنا وجودة رحلاتهم معنا'
              : 'Real experiences from our valued customers about our services and the quality of their trips with us'
            }
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm relative group overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <CardContent className="p-8 relative">
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
                        <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">
                          "{language === 'ar' ? testimonial.textAr : testimonial.textEn}"
                        </p>

                        {/* Customer Info */}
                        <div className="flex items-center">
                          <Avatar className="h-14 w-14 mr-4 ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
                            <AvatarImage src={testimonial.image} alt={language === 'ar' ? testimonial.nameAr : testimonial.nameEn} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                              {language === 'ar' 
                                ? testimonial.nameAr.split(' ').map(n => n[0]).join('')
                                : testimonial.nameEn.split(' ').map(n => n[0]).join('')
                              }
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-gray-900 text-lg">
                              {language === 'ar' ? testimonial.nameAr : testimonial.nameEn}
                            </div>
                            <div className="text-sm text-gray-500">
                              {language === 'ar' ? testimonial.locationAr : testimonial.locationEn}
                            </div>
                            <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full mt-1 inline-block">
                              {testimonial.tripType}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom styled navigation buttons */}
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-2xl border-2 border-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 h-12 w-12 transition-all duration-300 hover:scale-110" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-2xl border-2 border-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 h-12 w-12 transition-all duration-300 hover:scale-110" />
          </Carousel>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">4.9/5</div>
              <div className="text-sm text-gray-600 font-medium">
                {language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-sm text-gray-600 font-medium">
                {language === 'ar' ? 'نسبة الرضا' : 'Satisfaction Rate'}
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">500K+</div>
              <div className="text-sm text-gray-600 font-medium">
                {language === 'ar' ? 'عميل سعيد' : 'Happy Customers'}
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-sm text-gray-600 font-medium">
                {language === 'ar' ? 'سنة خبرة' : 'Years Experience'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

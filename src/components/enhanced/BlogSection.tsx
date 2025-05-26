
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, User, ArrowRight, Eye, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const BlogSection = () => {
  const { language } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      titleAr: "أفضل 10 وجهات سياحية لعام 2024",
      titleEn: "Top 10 Travel Destinations for 2024",
      excerptAr: "اكتشف أجمل الوجهات السياحية التي يجب زيارتها هذا العام مع نصائح مفيدة للمسافرين",
      excerptEn: "Discover the most beautiful tourist destinations that must be visited this year with useful tips for travelers",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "فريق التحرير",
      authorEn: "Editorial Team",
      date: "2024-01-15",
      category: "travel-guides",
      categoryAr: "أدلة السفر",
      categoryEn: "Travel Guides",
      readTime: "5 دقائق",
      readTimeEn: "5 min read",
      views: "12.5K"
    },
    {
      id: 2,
      titleAr: "نصائح السفر الذكي: كيف توفر المال في رحلاتك",
      titleEn: "Smart Travel Tips: How to Save Money on Your Trips",
      excerptAr: "استراتيجيات فعالة لتوفير المال أثناء السفر دون التنازل عن جودة التجربة",
      excerptEn: "Effective strategies to save money while traveling without compromising the quality of experience",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "سارة أحمد",
      authorEn: "Sarah Ahmed",
      date: "2024-01-12",
      category: "tips",
      categoryAr: "نصائح",
      categoryEn: "Tips",
      readTime: "7 دقائق",
      readTimeEn: "7 min read",
      views: "18.2K"
    },
    {
      id: 3,
      titleAr: "السفر المستدام: كيف تكون مسافراً صديقاً للبيئة",
      titleEn: "Sustainable Travel: How to Be an Eco-Friendly Traveler",
      excerptAr: "دليل شامل للسفر المسؤول والحفاظ على البيئة أثناء استكشاف العالم",
      excerptEn: "A comprehensive guide to responsible travel and environmental conservation while exploring the world",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "محمد الأخضر",
      authorEn: "Mohammed Al-Akhdar",
      date: "2024-01-10",
      category: "sustainability",
      categoryAr: "الاستدامة",
      categoryEn: "Sustainability",
      readTime: "6 دقائق",
      readTimeEn: "6 min read",
      views: "9.8K"
    },
    {
      id: 4,
      titleAr: "تجربة الطعام المحلي: دليل لأشهى المأكولات العالمية",
      titleEn: "Local Food Experience: Guide to the World's Most Delicious Cuisines",
      excerptAr: "استكشف ثقافات العالم من خلال أطباقها الشهية ونصائح لتذوق الطعام المحلي الأصيل",
      excerptEn: "Explore world cultures through their delicious dishes and tips for tasting authentic local food",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "فاطمة الطباخ",
      authorEn: "Fatima Al-Tabakh",
      date: "2024-01-08",
      category: "food",
      categoryAr: "الطعام",
      categoryEn: "Food",
      readTime: "8 دقائق",
      readTimeEn: "8 min read",
      views: "15.6K"
    },
    {
      id: 5,
      titleAr: "التصوير في السفر: كيف تلتقط صوراً لا تُنسى",
      titleEn: "Travel Photography: How to Capture Unforgettable Photos",
      excerptAr: "تقنيات ونصائح احترافية لتصوير رحلاتك وتوثيق ذكرياتك بأجمل الطرق",
      excerptEn: "Professional techniques and tips for photographing your trips and documenting your memories in the most beautiful ways",
      image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "أحمد المصور",
      authorEn: "Ahmed Al-Musawwar",
      date: "2024-01-05",
      category: "photography",
      categoryAr: "التصوير",
      categoryEn: "Photography",
      readTime: "10 دقائق",
      readTimeEn: "10 min read",
      views: "22.1K"
    },
    {
      id: 6,
      titleAr: "السفر العائلي: نصائح لرحلة ممتعة مع الأطفال",
      titleEn: "Family Travel: Tips for a Fun Trip with Children",
      excerptAr: "دليل شامل لتخطيط رحلة عائلية ناجحة مع أفكار وأنشطة مناسبة للأطفال",
      excerptEn: "A comprehensive guide to planning a successful family trip with ideas and activities suitable for children",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "ليلى الأم",
      authorEn: "Layla Al-Um",
      date: "2024-01-03",
      category: "family",
      categoryAr: "العائلة",
      categoryEn: "Family",
      readTime: "9 دقائق",
      readTimeEn: "9 min read",
      views: "31.4K"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">
              {language === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            {language === 'ar' ? 'مدونة السفر' : 'Travel Blog'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'اكتشف أحدث نصائح السفر والوجهات المميزة والتجارب الملهمة من خبراء السياحة'
              : 'Discover the latest travel tips, featured destinations, and inspiring experiences from tourism experts'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {blogPosts.map((post, index) => (
                <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                        <img 
                          src={post.image} 
                          alt={language === 'ar' ? post.titleAr : post.titleEn}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        <div className="absolute top-4 left-4 z-20">
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg">
                            {language === 'ar' ? post.categoryAr : post.categoryEn}
                          </Badge>
                        </div>
                        
                        <div className="absolute top-4 right-4 z-20">
                          <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-xs flex items-center shadow-lg">
                            <Eye className="h-3 w-3 mr-1.5" />
                            {post.views}
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 z-20">
                          <div className="flex items-center text-white text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{language === 'ar' ? post.readTime : post.readTimeEn}</span>
                          </div>
                        </div>
                      </div>

                      <CardHeader className="flex-shrink-0">
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                          {language === 'ar' ? post.titleAr : post.titleEn}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex-grow flex flex-col justify-between">
                        <div>
                          <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                            {language === 'ar' ? post.excerptAr : post.excerptEn}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mr-2">
                                <User className="h-3 w-3 text-white" />
                              </div>
                              <span className="font-medium">{language === 'ar' ? post.author : post.authorEn}</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                            </div>
                          </div>
                        </div>

                        <Button 
                          variant="ghost" 
                          className="group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-indigo-50 group-hover:text-blue-600 transition-all duration-300 p-0 h-auto justify-start"
                        >
                          <span className="mr-2">{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                          <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-lg w-12 h-12" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-lg w-12 h-12" />
            </div>
          </Carousel>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {language === 'ar' ? 'عرض جميع المقالات' : 'View All Articles'}
            <ArrowRight className={`h-5 w-5 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;

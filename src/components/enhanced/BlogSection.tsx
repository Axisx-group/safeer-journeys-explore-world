
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'مدونة السفر' : 'Travel Blog'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف أحدث نصائح السفر والوجهات المميزة والتجارب الملهمة من خبراء السياحة'
              : 'Discover the latest travel tips, featured destinations, and inspiring experiences from tourism experts'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white overflow-hidden">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={language === 'ar' ? post.titleAr : post.titleEn}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">
                    {language === 'ar' ? post.categoryAr : post.categoryEn}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {post.views}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {language === 'ar' ? post.titleAr : post.titleEn}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {language === 'ar' ? post.excerptAr : post.excerptEn}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {language === 'ar' ? post.author : post.authorEn}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {language === 'ar' ? post.readTime : post.readTimeEn}
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:text-blue-600 p-0">
                    {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                    <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'mr-1' : 'ml-1'} group-hover:translate-x-1 transition-transform`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            {language === 'ar' ? 'عرض جميع المقالات' : 'View All Articles'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

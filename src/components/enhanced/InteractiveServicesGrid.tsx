
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Hotel, 
  Car, 
  Map, 
  Shield, 
  Headphones,
  CreditCard,
  Globe,
  Calendar,
  Users,
  Camera,
  Utensils,
  Wifi,
  Gift,
  Star,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { motion } from "framer-motion";

const InteractiveServicesGrid = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services = [
    {
      id: 'flights',
      icon: Plane,
      category: 'transport',
      titleAr: 'حجز الطيران',
      titleEn: 'Flight Booking',
      descAr: 'احجز تذاكر الطيران بأفضل الأسعار مع ضمان الجودة',
      descEn: 'Book flight tickets at the best prices with quality guarantee',
      features: ['500+ Airlines', 'Best Price Guarantee', '24/7 Support'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      popular: true,
      rating: 4.9
    },
    {
      id: 'hotels',
      icon: Hotel,
      category: 'accommodation',
      titleAr: 'حجز الفنادق',
      titleEn: 'Hotel Booking',
      descAr: 'اختر من آلاف الفنادق المميزة حول العالم',
      descEn: 'Choose from thousands of premium hotels worldwide',
      features: ['100K+ Hotels', 'Free Cancellation', 'Instant Booking'],
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100',
      popular: true,
      rating: 4.8
    },
    {
      id: 'cars',
      icon: Car,
      category: 'transport',
      titleAr: 'تأجير السيارات',
      titleEn: 'Car Rental',
      descAr: 'استأجر السيارة المناسبة لرحلتك بأفضل الأسعار',
      descEn: 'Rent the perfect car for your trip at best prices',
      features: ['All Car Types', 'Full Insurance', 'Airport Pickup'],
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-100',
      rating: 4.7
    },
    {
      id: 'tours',
      icon: Map,
      category: 'experiences',
      titleAr: 'الجولات السياحية',
      titleEn: 'Tour Packages',
      descAr: 'اكتشف أجمل الأماكن مع مرشدين محترفين',
      descEn: 'Discover beautiful places with professional guides',
      features: ['Expert Guides', 'Small Groups', 'Unique Experiences'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-100',
      rating: 4.9
    },
    {
      id: 'insurance',
      icon: Shield,
      category: 'protection',
      titleAr: 'تأمين السفر',
      titleEn: 'Travel Insurance',
      descAr: 'حماية شاملة لرحلتك ضد جميع المخاطر',
      descEn: 'Comprehensive protection for your trip',
      features: ['Medical Coverage', 'Trip Cancellation', 'Lost Luggage'],
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-100',
      rating: 4.6
    },
    {
      id: 'visa',
      icon: Globe,
      category: 'documentation',
      titleAr: 'خدمات التأشيرة',
      titleEn: 'Visa Services',
      descAr: 'مساعدة احترافية في الحصول على التأشيرات',
      descEn: 'Professional assistance in obtaining visas',
      features: ['All Countries', 'Fast Processing', 'Document Support'],
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'from-indigo-50 to-blue-100',
      rating: 4.5
    },
    {
      id: 'packages',
      icon: Gift,
      category: 'packages',
      titleAr: 'الباقات السياحية',
      titleEn: 'Travel Packages',
      descAr: 'باقات شاملة مصممة خصيصاً لك بأسعار مميزة',
      descEn: 'Complete packages specially designed for you',
      features: ['All Inclusive', 'Custom Packages', 'Group Discounts'],
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-100',
      popular: true,
      rating: 4.8
    },
    {
      id: 'dining',
      icon: Utensils,
      category: 'experiences',
      titleAr: 'حجز المطاعم',
      titleEn: 'Restaurant Booking',
      descAr: 'احجز طاولتك في أفضل المطاعم العالمية',
      descEn: 'Book your table at the best restaurants',
      features: ['Premium Restaurants', 'Special Menus', 'VIP Service'],
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-100',
      rating: 4.7
    }
  ];

  const categories = [
    { id: 'all', nameAr: 'جميع الخدمات', nameEn: 'All Services', icon: Gift },
    { id: 'transport', nameAr: 'النقل', nameEn: 'Transport', icon: Plane },
    { id: 'accommodation', nameAr: 'الإقامة', nameEn: 'Accommodation', icon: Hotel },
    { id: 'experiences', nameAr: 'التجارب', nameEn: 'Experiences', icon: Camera },
    { id: 'protection', nameAr: 'الحماية', nameEn: 'Protection', icon: Shield },
    { id: 'documentation', nameAr: 'الوثائق', nameEn: 'Documentation', icon: Globe },
    { id: 'packages', nameAr: 'الباقات', nameEn: 'Packages', icon: Gift }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-indigo-300/20 to-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
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
                  <Gift className="h-12 w-12 text-white" />
                </motion.div>
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'خدماتنا' : 'Our'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'الشاملة' : 'Comprehensive Services'}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            {language === 'ar' 
              ? 'نقدم مجموعة واسعة من الخدمات المتميزة لجعل رحلتك مثالية من البداية إلى النهاية'
              : 'We offer a wide range of premium services to make your trip perfect from start to finish'
            }
          </p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Button
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 px-6 py-3 rounded-2xl font-semibold ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {language === 'ar' ? category.nameAr : category.nameEn}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredService === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="relative group"
              >
                {/* Glow effect */}
                {isHovered && (
                  <div className={`absolute -inset-2 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-20 animate-pulse`}></div>
                )}
                
                <Card className={`relative h-full transition-all duration-500 transform hover:-translate-y-3 border-0 overflow-hidden ${
                  isHovered ? 'shadow-2xl scale-105' : 'shadow-xl hover:shadow-2xl'
                } bg-white/95 backdrop-blur-sm`}>
                  
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                        <Star className="h-3 w-3 mr-1" />
                        {language === 'ar' ? 'الأكثر طلباً' : 'Popular'}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">{service.rating}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {language === 'ar' ? service.titleAr : service.titleEn}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {language === 'ar' ? service.descAr : service.descEn}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex items-center text-xs text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <Button className={`w-full group-hover:bg-gradient-to-r group-hover:${service.color} transition-all duration-300 rounded-xl font-semibold py-2.5 shadow-lg hover:shadow-xl transform group-hover:scale-105`}>
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            <Card className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white border-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              <CardContent className="relative p-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Headphones className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {language === 'ar' ? 'لا تجد ما تبحث عنه؟' : "Can't find what you're looking for?"}
                </h3>
                
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                  {language === 'ar' 
                    ? 'تواصل معنا وسنساعدك في تخصيص الخدمة المناسبة لاحتياجاتك الخاصة'
                    : 'Contact us and we\'ll help you customize the right service for your specific needs'
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg" className="text-blue-600 font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Headphones className="h-5 w-5 mr-2" />
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                  
                  <Button variant="outline" size="lg" className="text-white border-white/50 hover:bg-white hover:text-blue-600 font-bold px-8 py-3 rounded-2xl transition-all duration-300">
                    <Gift className="h-5 w-5 mr-2" />
                    {language === 'ar' ? 'طلب خدمة مخصصة' : 'Request Custom Service'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveServicesGrid;


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
  Gift
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const InteractiveServicesGrid = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 'flights',
      icon: Plane,
      category: 'transport',
      titleAr: 'حجز الطيران',
      titleEn: 'Flight Booking',
      descAr: 'احجز تذاكر الطيران بأفضل الأسعار',
      descEn: 'Book flight tickets at the best prices',
      features: ['500+ Airlines', 'Best Price Guarantee', '24/7 Support'],
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      id: 'hotels',
      icon: Hotel,
      category: 'accommodation',
      titleAr: 'حجز الفنادق',
      titleEn: 'Hotel Booking',
      descAr: 'اختر من آلاف الفنادق حول العالم',
      descEn: 'Choose from thousands of hotels worldwide',
      features: ['100K+ Hotels', 'Free Cancellation', 'Instant Booking'],
      color: 'from-green-500 to-green-600',
      popular: true
    },
    {
      id: 'cars',
      icon: Car,
      category: 'transport',
      titleAr: 'تأجير السيارات',
      titleEn: 'Car Rental',
      descAr: 'استأجر السيارة المناسبة لرحلتك',
      descEn: 'Rent the perfect car for your trip',
      features: ['All Car Types', 'Full Insurance', 'Airport Pickup'],
      color: 'from-purple-500 to-purple-600'
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
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'insurance',
      icon: Shield,
      category: 'protection',
      titleAr: 'تأمين السفر',
      titleEn: 'Travel Insurance',
      descAr: 'حماية شاملة لرحلتك',
      descEn: 'Comprehensive protection for your trip',
      features: ['Medical Coverage', 'Trip Cancellation', 'Lost Luggage'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'visa',
      icon: Globe,
      category: 'documentation',
      titleAr: 'خدمات التأشيرة',
      titleEn: 'Visa Services',
      descAr: 'مساعدة في الحصول على التأشيرات',
      descEn: 'Assistance in obtaining visas',
      features: ['All Countries', 'Fast Processing', 'Document Support'],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'packages',
      icon: Gift,
      category: 'packages',
      titleAr: 'الباقات السياحية',
      titleEn: 'Travel Packages',
      descAr: 'باقات شاملة بأسعار مميزة',
      descEn: 'Complete packages at special prices',
      features: ['All Inclusive', 'Custom Packages', 'Group Discounts'],
      color: 'from-pink-500 to-pink-600',
      popular: true
    },
    {
      id: 'dining',
      icon: Utensils,
      category: 'experiences',
      titleAr: 'حجز المطاعم',
      titleEn: 'Restaurant Booking',
      descAr: 'احجز طاولتك في أفضل المطاعم',
      descEn: 'Book your table at the best restaurants',
      features: ['Premium Restaurants', 'Special Menus', 'VIP Service'],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'photography',
      icon: Camera,
      category: 'experiences',
      titleAr: 'التصوير السياحي',
      titleEn: 'Travel Photography',
      descAr: 'خدمات تصوير احترافية لرحلتك',
      descEn: 'Professional photography services for your trip',
      features: ['Professional Photographers', 'Edited Photos', 'Same Day Delivery'],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'concierge',
      icon: Headphones,
      category: 'support',
      titleAr: 'خدمة الكونسيرج',
      titleEn: 'Concierge Service',
      descAr: 'مساعد شخصي لجميع احتياجاتك',
      descEn: 'Personal assistant for all your needs',
      features: ['24/7 Available', 'Local Experts', 'Personalized Service'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'events',
      icon: Calendar,
      category: 'experiences',
      titleAr: 'تنظيم الفعاليات',
      titleEn: 'Event Planning',
      descAr: 'تنظيم المناسبات والفعاليات الخاصة',
      descEn: 'Organize special occasions and events',
      features: ['Weddings', 'Corporate Events', 'Private Parties'],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'groups',
      icon: Users,
      category: 'packages',
      titleAr: 'رحلات المجموعات',
      titleEn: 'Group Travel',
      descAr: 'خصومات خاصة للمجموعات الكبيرة',
      descEn: 'Special discounts for large groups',
      features: ['Group Discounts', 'Custom Itineraries', 'Dedicated Support'],
      color: 'from-violet-500 to-violet-600'
    }
  ];

  const categories = [
    { id: 'all', nameAr: 'جميع الخدمات', nameEn: 'All Services' },
    { id: 'transport', nameAr: 'النقل', nameEn: 'Transport' },
    { id: 'accommodation', nameAr: 'الإقامة', nameEn: 'Accommodation' },
    { id: 'experiences', nameAr: 'التجارب', nameEn: 'Experiences' },
    { id: 'protection', nameAr: 'الحماية', nameEn: 'Protection' },
    { id: 'documentation', nameAr: 'الوثائق', nameEn: 'Documentation' },
    { id: 'packages', nameAr: 'الباقات', nameEn: 'Packages' },
    { id: 'support', nameAr: 'الدعم', nameEn: 'Support' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'خدماتنا الشاملة' : 'Our Comprehensive Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'نقدم مجموعة واسعة من الخدمات لجعل رحلتك مثالية من البداية إلى النهاية'
              : 'We offer a wide range of services to make your trip perfect from start to finish'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-300"
            >
              {language === 'ar' ? category.nameAr : category.nameEn}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card 
              key={service.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white relative overflow-hidden"
            >
              {service.popular && (
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white z-10">
                  {language === 'ar' ? 'الأكثر طلباً' : 'Popular'}
                </Badge>
              )}
              
              <CardHeader className="relative">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300 w-fit`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  {language === 'ar' ? service.descAr : service.descEn}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full group-hover:bg-blue-600 transition-colors">
                  {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'لا تجد ما تبحث عنه؟' : "Can't find what you're looking for?"}
              </h3>
              <p className="text-xl mb-8 opacity-90">
                {language === 'ar' 
                  ? 'تواصل معنا وسنساعدك في تخصيص الخدمة المناسبة لك'
                  : 'Contact us and we\'ll help you customize the right service for you'
                }
              </p>
              <Button variant="secondary" size="lg" className="text-blue-600">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveServicesGrid;

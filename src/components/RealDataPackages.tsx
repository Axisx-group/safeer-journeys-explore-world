
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Star, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFeaturedPackages } from "@/hooks/usePackages";
import { useNavigate } from "react-router-dom";

const RealDataPackages = () => {
  const { language } = useLanguage();
  const { data: packages, isLoading, error } = useFeaturedPackages();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'العروض المميزة' : 'Featured Packages'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse overflow-hidden">
                <div className="h-64 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">حدث خطأ في تحميل العروض</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'العروض المميزة' : 'Featured Packages'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'ar' ? 'اكتشف أفضل عروضنا السياحية' : 'Discover our best travel packages'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages?.map((pkg) => (
            <Card key={pkg.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={pkg.image_url}
                  alt={language === 'ar' ? pkg.title_ar : pkg.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {pkg.is_featured && (
                    <Star className="h-4 w-4 inline mr-1" />
                  )}
                  {language === 'ar' ? 'مميز' : 'Featured'}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {language === 'ar' ? pkg.title_ar : pkg.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {language === 'ar' ? pkg.description_ar : pkg.description}
                </p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{pkg.duration_days} {language === 'ar' ? 'أيام' : 'days'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{language === 'ar' ? 'للأشخاص' : 'per person'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">€{pkg.price}</span>
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'للشخص الواحد' : 'per person'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/package/${pkg.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'التفاصيل' : 'Details'}
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => navigate('/booking')}
                  >
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealDataPackages;

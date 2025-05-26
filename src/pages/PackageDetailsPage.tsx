
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePackages } from "@/hooks/usePackages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Star, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PackageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data: packages, isLoading } = usePackages();

  const packageData = packages?.find(pkg => pkg.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'العرض غير موجود' : 'Package not found'}
          </h1>
          <Button onClick={() => navigate('/')}>
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === 'ar' ? 'العودة' : 'Back'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <img 
              src={packageData.image_url}
              alt={language === 'ar' ? packageData.title_ar : packageData.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            {packageData.is_featured && (
              <Badge className="bg-yellow-500 text-yellow-900">
                <Star className="h-4 w-4 mr-1" />
                {language === 'ar' ? 'عرض مميز' : 'Featured Package'}
              </Badge>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? packageData.title_ar : packageData.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{packageData.destination}</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === 'ar' ? 'المدة' : 'Duration'}
                      </p>
                      <p className="font-semibold">
                        {packageData.duration_days} {language === 'ar' ? 'أيام' : 'days'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === 'ar' ? 'السعر' : 'Price'}
                      </p>
                      <p className="text-2xl font-bold text-blue-600">€{packageData.price}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {language === 'ar' ? packageData.description_ar : packageData.description}
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => navigate('/booking')}
                >
                  {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                </Button>
              </CardContent>
            </Card>

            {/* Highlights */}
            {packageData.highlights && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'مميزات العرض' : 'Package Highlights'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(language === 'ar' ? packageData.highlights_ar : packageData.highlights)?.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PackageDetailsPage;

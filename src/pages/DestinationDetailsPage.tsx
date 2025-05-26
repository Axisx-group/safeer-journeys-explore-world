
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDestinations } from "@/hooks/useDestinations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Thermometer, 
  Star, 
  ArrowLeft, 
  Sun,
  Shield,
  CreditCard,
  Passport
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DestinationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data: destinations, isLoading } = useDestinations();

  const destination = destinations?.find(dest => dest.id === id);

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

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الوجهة غير موجودة' : 'Destination not found'}
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

        {/* Hero Section */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <img 
            src={destination.image_urls?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
            alt={language === 'ar' ? destination.name_ar : destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">
                {language === 'ar' ? destination.name_ar : destination.name}
              </h1>
              <div className="flex items-center text-lg">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{language === 'ar' ? destination.country_ar : destination.country}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'نبذة عن الوجهة' : 'About this destination'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'ar' ? destination.description_ar : destination.description}
                </p>
              </CardContent>
            </Card>

            {/* Activities */}
            {destination.activity_types && destination.activity_types.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'الأنشطة المتاحة' : 'Available Activities'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {destination.activity_types.map((activity, index) => (
                      <Badge key={index} variant="outline">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mood Tags */}
            {destination.mood_tags && destination.mood_tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'أجواء الوجهة' : 'Destination Mood'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {destination.mood_tags.map((mood, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800">
                        {mood}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'معلومات سريعة' : 'Quick Info'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="text-sm">
                      {language === 'ar' ? 'متوسط الحرارة' : 'Avg Temperature'}
                    </span>
                  </div>
                  <span className="font-semibold">{destination.average_temperature}°C</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm">
                      {language === 'ar' ? 'أفضل وقت' : 'Best Season'}
                    </span>
                  </div>
                  <span className="font-semibold">{destination.best_season}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">
                      {language === 'ar' ? 'تقييم الأمان' : 'Safety Rating'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < (destination.safety_rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">
                      {language === 'ar' ? 'العملة' : 'Currency'}
                    </span>
                  </div>
                  <span className="font-semibold">{destination.currency}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Passport className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm">
                      {language === 'ar' ? 'تأشيرة مطلوبة' : 'Visa Required'}
                    </span>
                  </div>
                  <span className="font-semibold">
                    {destination.visa_required 
                      ? (language === 'ar' ? 'نعم' : 'Yes')
                      : (language === 'ar' ? 'لا' : 'No')
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Book Now */}
            <Card>
              <CardContent className="p-6">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => navigate('/booking')}
                >
                  {language === 'ar' ? 'احجز رحلة إلى هذه الوجهة' : 'Book Trip to this Destination'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DestinationDetailsPage;

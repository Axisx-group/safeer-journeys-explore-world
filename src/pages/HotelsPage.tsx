
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Wifi, Car, Coffee, Waves, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Hotel {
  id: string;
  name: string;
  name_ar: string;
  rating: number;
  price: number;
  image: string;
  video?: string;
  amenities: string[];
  location: string;
  location_ar: string;
  description: string;
  description_ar: string;
}

const HotelsPage = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const hotels: Hotel[] = [
    {
      id: "1",
      name: "Luxury Beach Resort & Spa",
      name_ar: "منتجع الشاطئ الفاخر والسبا",
      rating: 5,
      price: 299,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Beach Access"],
      location: "Beachfront",
      location_ar: "الواجهة البحرية",
      description: "Experience luxury at its finest with breathtaking ocean views, world-class amenities, and exceptional service.",
      description_ar: "استمتع بالفخامة في أجمل صورها مع إطلالات خلابة على المحيط ووسائل راحة عالمية وخدمة استثنائية."
    },
    {
      id: "2",
      name: "Mountain View Hotel",
      name_ar: "فندق إطلالة الجبل",
      rating: 4,
      price: 189,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      amenities: ["WiFi", "Parking", "Restaurant", "Mountain View"],
      location: "Mountain Area",
      location_ar: "المنطقة الجبلية",
      description: "Nestled in the mountains with panoramic views and modern comfort for the perfect getaway.",
      description_ar: "يقع في قلب الجبال مع إطلالات بانورامية وراحة عصرية للهروب المثالي."
    },
    {
      id: "3",
      name: "City Center Business Hotel",
      name_ar: "فندق الأعمال وسط المدينة",
      rating: 4,
      price: 129,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Business Center", "Restaurant", "Gym"],
      location: "City Center",
      location_ar: "وسط المدينة",
      description: "Perfect for business travelers with modern facilities and convenient city center location.",
      description_ar: "مثالي لرجال الأعمال مع مرافق حديثة وموقع مناسب في وسط المدينة."
    },
    {
      id: "4",
      name: "Historic Palace Hotel",
      name_ar: "فندق القصر التاريخي",
      rating: 5,
      price: 399,
      image: "https://images.unsplash.com/photo-1485813385316-3687206f9653?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      amenities: ["WiFi", "Spa", "Fine Dining", "Historic Architecture"],
      location: "Historic District",
      location_ar: "المنطقة التاريخية",
      description: "Step into history with this beautifully restored palace offering luxury accommodations.",
      description_ar: "ادخل إلى التاريخ مع هذا القصر المرمم بجمال والذي يوفر إقامة فاخرة."
    },
    {
      id: "5",
      name: "Desert Oasis Resort",
      name_ar: "منتجع واحة الصحراء",
      rating: 4,
      price: 249,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      amenities: ["WiFi", "Pool", "Desert Tours", "Spa"],
      location: "Desert",
      location_ar: "الصحراء",
      description: "Escape to the tranquil desert with luxury amenities and breathtaking sunsets.",
      description_ar: "اهرب إلى الصحراء الهادئة مع المرافق الفاخرة وغروب الشمس الخلاب."
    },
    {
      id: "6",
      name: "Lakeside Lodge",
      name_ar: "نزل على ضفاف البحيرة",
      rating: 4,
      price: 159,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Lake View", "Fishing", "Restaurant"],
      location: "Lakeside",
      location_ar: "ضفاف البحيرة",
      description: "Peaceful lakeside retreat with stunning water views and outdoor activities.",
      description_ar: "ملاذ هادئ على ضفاف البحيرة مع إطلالات مائية مذهلة وأنشطة خارجية."
    },
    {
      id: "7",
      name: "Modern Boutique Hotel",
      name_ar: "فندق بوتيك عصري",
      rating: 4,
      price: 199,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      amenities: ["WiFi", "Modern Design", "Rooftop Bar", "Gym"],
      location: "Downtown",
      location_ar: "وسط البلد",
      description: "Contemporary design meets comfort in this stylish boutique hotel.",
      description_ar: "التصميم المعاصر يلتقي بالراحة في هذا الفندق البوتيك الأنيق."
    },
    {
      id: "8",
      name: "Family Resort Paradise",
      name_ar: "منتجع الجنة العائلي",
      rating: 4,
      price: 229,
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Kids Club", "Pool", "Family Activities"],
      location: "Resort Area",
      location_ar: "منطقة المنتجعات",
      description: "Perfect family destination with activities for all ages and comfortable accommodations.",
      description_ar: "وجهة عائلية مثالية مع أنشطة لجميع الأعمار وإقامة مريحة."
    },
    {
      id: "9",
      name: "Eco-Friendly Green Hotel",
      name_ar: "فندق أخضر صديق للبيئة",
      rating: 4,
      price: 169,
      image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Eco-Friendly", "Garden", "Organic Restaurant"],
      location: "Nature Reserve",
      location_ar: "المحمية الطبيعية",
      description: "Sustainable luxury in harmony with nature, featuring eco-friendly practices and organic dining.",
      description_ar: "فخامة مستدامة في تناغم مع الطبيعة، تتميز بممارسات صديقة للبيئة وطعام عضوي."
    },
    {
      id: "10",
      name: "Grand Luxury Hotel",
      name_ar: "الفندق الكبير الفاخر",
      rating: 5,
      price: 449,
      image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      amenities: ["WiFi", "Concierge", "Multiple Restaurants", "Luxury Spa"],
      location: "Premium District",
      location_ar: "المنطقة المميزة",
      description: "The epitome of luxury with world-class service, exquisite dining, and unparalleled comfort.",
      description_ar: "قمة الفخامة مع خدمة عالمية المستوى وطعام راقي وراحة لا مثيل لها."
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
      case 'fine dining':
        return <Coffee className="h-4 w-4" />;
      case 'pool':
      case 'beach access':
        return <Waves className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const filteredHotels = hotels.filter(hotel =>
    (language === 'ar' ? hotel.name_ar : hotel.name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'أفضل الفنادق' : 'Best Hotels'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {language === 'ar' 
              ? 'اكتشف أجمل الفنادق مع أفضل المرافق والخدمات'
              : 'Discover amazing hotels with the best facilities and services'
            }
          </p>
          
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder={language === 'ar' ? 'ابحث عن فندق...' : 'Search for hotels...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={hotel.image} 
                  alt={language === 'ar' ? hotel.name_ar : hotel.name}
                  className="w-full h-full object-cover"
                />
                {hotel.video && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-600 hover:bg-red-700 cursor-pointer">
                      <Play className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'فيديو' : 'Video'}
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center bg-white px-2 py-1 rounded">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">
                    {language === 'ar' ? hotel.name_ar : hotel.name}
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">€{hotel.price}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'لليلة' : 'per night'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {language === 'ar' ? hotel.location_ar : hotel.location}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {language === 'ar' ? hotel.description_ar : hotel.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </Badge>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HotelsPage;

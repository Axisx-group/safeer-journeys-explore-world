
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Car, Users, Fuel, Settings, Star, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CarRental {
  id: string;
  name: string;
  name_ar: string;
  type: string;
  type_ar: string;
  seats: number;
  transmission: string;
  transmission_ar: string;
  fuel: string;
  fuel_ar: string;
  price: number;
  image: string;
  video?: string;
  features: string[];
  rating: number;
  available: boolean;
}

const CarRentalPage = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const cars: CarRental[] = [
    {
      id: "1",
      name: "BMW X5",
      name_ar: "بي إم دبليو إكس 5",
      type: "SUV",
      type_ar: "سيارة رياضية متعددة الاستخدامات",
      seats: 7,
      transmission: "Automatic",
      transmission_ar: "أوتوماتيك",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 89,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["GPS", "AC", "Bluetooth", "Leather Seats"],
      rating: 5,
      available: true
    },
    {
      id: "2",
      name: "Mercedes C-Class",
      name_ar: "مرسيدس سي كلاس",
      type: "Sedan",
      type_ar: "سيدان",
      seats: 5,
      transmission: "Automatic",
      transmission_ar: "أوتوماتيك",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 75,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["GPS", "AC", "Sunroof", "Premium Audio"],
      rating: 5,
      available: true
    },
    {
      id: "3",
      name: "Toyota Corolla",
      name_ar: "تويوتا كورولا",
      type: "Compact",
      type_ar: "مدمجة",
      seats: 5,
      transmission: "Manual",
      transmission_ar: "يدوي",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 35,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["AC", "Bluetooth", "USB Charging"],
      rating: 4,
      available: true
    },
    {
      id: "4",
      name: "Range Rover Sport",
      name_ar: "رينج روفر سبورت",
      type: "Luxury SUV",
      type_ar: "سيارة فاخرة متعددة الاستخدامات",
      seats: 7,
      transmission: "Automatic",
      transmission_ar: "أوتوماتيك",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 120,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["4WD", "GPS", "AC", "Leather Seats", "Premium Audio"],
      rating: 5,
      available: true
    },
    {
      id: "5",
      name: "Ford Mustang",
      name_ar: "فورد موستانغ",
      type: "Sports Car",
      type_ar: "سيارة رياضية",
      seats: 4,
      transmission: "Automatic",
      transmission_ar: "أوتوماتيك",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 95,
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Sports Mode", "AC", "Premium Audio", "Performance Tires"],
      rating: 5,
      available: true
    },
    {
      id: "6",
      name: "Volkswagen Golf",
      name_ar: "فولكس واجن جولف",
      type: "Hatchback",
      type_ar: "هاتشباك",
      seats: 5,
      transmission: "Manual",
      transmission_ar: "يدوي",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 42,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["AC", "Bluetooth", "Parking Sensors"],
      rating: 4,
      available: true
    },
    {
      id: "7",
      name: "Audi A6",
      name_ar: "أودي أي 6",
      type: "Executive",
      type_ar: "تنفيذية",
      seats: 5,
      transmission: "Automatic",
      transmission_ar: "أوتوماتيك",
      fuel: "Diesel",
      fuel_ar: "ديزل",
      price: 85,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["GPS", "AC", "Leather Seats", "Advanced Safety"],
      rating: 5,
      available: true
    },
    {
      id: "8",
      name: "Jeep Wrangler",
      name_ar: "جيب رانجلر",
      type: "Off-Road SUV",
      type_ar: "سيارة للطرق الوعرة",
      seats: 5,
      transmission: "Manual",
      transmission_ar: "يدوي",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 68,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["4WD", "Removable Roof", "Off-Road Tires", "AC"],
      rating: 4,
      available: true
    },
    {
      id: "9",
      name: "Tesla Model 3",
      name_ar: "تسلا موديل 3",
      type: "Electric Sedan",
      type_ar: "سيدان كهربائية",
      seats: 5,
      transmission: "Automatic",
      transmission_ar: "أوتوماتيك",
      fuel: "Electric",
      fuel_ar: "كهربائية",
      price: 78,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Autopilot", "Supercharging", "Premium Interior", "Tech Display"],
      rating: 5,
      available: true
    },
    {
      id: "10",
      name: "Nissan Micra",
      name_ar: "نيسان ميكرا",
      type: "Economy",
      type_ar: "اقتصادية",
      seats: 5,
      transmission: "Manual",
      transmission_ar: "يدوي",
      fuel: "Petrol",
      fuel_ar: "بنزين",
      price: 28,
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["AC", "Fuel Efficient", "Compact Size"],
      rating: 4,
      available: true
    }
  ];

  const filteredCars = cars.filter(car =>
    (language === 'ar' ? car.name_ar : car.name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'تأجير السيارات' : 'Car Rental'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {language === 'ar' 
              ? 'اختر من مجموعة واسعة من السيارات المتاحة للإيجار'
              : 'Choose from a wide range of cars available for rent'
            }
          </p>
          
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder={language === 'ar' ? 'ابحث عن سيارة...' : 'Search for cars...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={car.image} 
                  alt={language === 'ar' ? car.name_ar : car.name}
                  className="w-full h-full object-cover"
                />
                {car.video && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-600 hover:bg-red-700 cursor-pointer">
                      <Play className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'فيديو' : 'Video'}
                    </Badge>
                  </div>
                )}
                {car.available && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-600">
                      {language === 'ar' ? 'متاح' : 'Available'}
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center bg-white px-2 py-1 rounded">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < car.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">
                      {language === 'ar' ? car.name_ar : car.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? car.type_ar : car.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">€{car.price}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'لليوم' : 'per day'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{car.seats} {language === 'ar' ? 'مقاعد' : 'seats'}</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-xs">
                      {language === 'ar' ? car.transmission_ar : car.transmission}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-xs">
                      {language === 'ar' ? car.fuel_ar : car.fuel}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {car.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  {language === 'ar' ? 'احجز الآن' : 'Rent Now'}
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

export default CarRentalPage;

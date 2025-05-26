
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const ManageTripsPage = () => {
  const { language } = useLanguage();
  const [bookingReference, setBookingReference] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    // Handle booking search logic here
    console.log("Searching for booking:", bookingReference, email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Plane className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'إدارة رحلاتك' : 'Manage Your Trips'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'ابحث عن حجوزاتك وقم بإدارتها بسهولة'
              : 'Find and manage your bookings easily'
            }
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'البحث عن حجزك' : 'Find Your Booking'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="booking-ref">
                  {language === 'ar' ? 'رقم الحجز' : 'Booking Reference'}
                </Label>
                <Input
                  id="booking-ref"
                  value={bookingReference}
                  onChange={(e) => setBookingReference(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل رقم الحجز' : 'Enter booking reference'}
                />
              </div>
              <div>
                <Label htmlFor="email">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                />
              </div>
              <Button onClick={handleSearch} className="w-full">
                {language === 'ar' ? 'البحث عن الحجز' : 'Search Booking'}
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'ar' ? 'تعديل الحجز' : 'Modify Booking'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'غيّر تواريخ السفر أو تفاصيل الحجز' : 'Change travel dates or booking details'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'ar' ? 'تتبع الرحلة' : 'Track Trip'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'تابع حالة رحلتك وتحديثاتها' : 'Follow your trip status and updates'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">
                {language === 'ar' ? 'تحتاج مساعدة؟' : 'Need Help?'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">0033766555514</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Info@urtrvl.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageTripsPage;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Users, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import { useToast } from "@/hooks/use-toast";

const BookingPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "standard",
    totalPrice: 299
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to payment page with booking data
    const params = new URLSearchParams({
      destination: bookingData.destination,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests.toString(),
      roomType: bookingData.roomType,
      totalPrice: bookingData.totalPrice.toString()
    });
    window.location.href = `/payment?${params.toString()}`;
  };

  const roomTypes = [
    { id: "standard", nameAr: "غرفة قياسية", nameEn: "Standard Room", price: 299 },
    { id: "deluxe", nameAr: "غرفة فاخرة", nameEn: "Deluxe Room", price: 399 },
    { id: "suite", nameAr: "جناح", nameEn: "Suite", price: 599 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('language') === 'ar' ? 'احجز رحلتك المثالية' : 'Book Your Perfect Trip'}
            </h1>
            <p className="text-xl text-gray-600">
              {t('language') === 'ar' 
                ? 'اختر الوجهة المثالية واحجز إقامتك مع أفضل الأسعار'
                : 'Choose your perfect destination and book your stay with the best prices'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    {t('language') === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="destination">
                          {t('language') === 'ar' ? 'الوجهة' : 'Destination'}
                        </Label>
                        <Input
                          id="destination"
                          value={bookingData.destination}
                          onChange={(e) => setBookingData({...bookingData, destination: e.target.value})}
                          placeholder={t('language') === 'ar' ? 'اختر الوجهة' : 'Choose destination'}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guests">
                          {t('language') === 'ar' ? 'عدد الضيوف' : 'Number of Guests'}
                        </Label>
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          max="8"
                          value={bookingData.guests}
                          onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkIn">
                          {t('language') === 'ar' ? 'تاريخ الوصول' : 'Check-in Date'}
                        </Label>
                        <Input
                          id="checkIn"
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOut">
                          {t('language') === 'ar' ? 'تاريخ المغادرة' : 'Check-out Date'}
                        </Label>
                        <Input
                          id="checkOut"
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label>
                        {t('language') === 'ar' ? 'نوع الغرفة' : 'Room Type'}
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        {roomTypes.map((room) => (
                          <Card 
                            key={room.id}
                            className={`cursor-pointer transition-all ${
                              bookingData.roomType === room.id 
                                ? 'ring-2 ring-blue-600 bg-blue-50' 
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => setBookingData({...bookingData, roomType: room.id, totalPrice: room.price})}
                          >
                            <CardContent className="p-4 text-center">
                              <h3 className="font-semibold">
                                {t('language') === 'ar' ? room.nameAr : room.nameEn}
                              </h3>
                              <p className="text-2xl font-bold text-blue-600">${room.price}</p>
                              <p className="text-sm text-gray-500">
                                {t('language') === 'ar' ? 'لليلة الواحدة' : 'per night'}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <CreditCard className="h-5 w-5 mr-2" />
                      {t('language') === 'ar' ? 'انتقل للدفع' : 'Proceed to Payment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card className="shadow-xl sticky top-8">
                <CardHeader>
                  <CardTitle>
                    {t('language') === 'ar' ? 'ملخص الحجز' : 'Booking Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t('language') === 'ar' ? 'نوع الغرفة:' : 'Room Type:'}</span>
                    <span className="font-semibold">
                      {t('language') === 'ar' 
                        ? roomTypes.find(r => r.id === bookingData.roomType)?.nameAr
                        : roomTypes.find(r => r.id === bookingData.roomType)?.nameEn
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('language') === 'ar' ? 'عدد الضيوف:' : 'Guests:'}</span>
                    <span className="font-semibold">{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('language') === 'ar' ? 'المدة:' : 'Duration:'}</span>
                    <span className="font-semibold">
                      {bookingData.checkIn && bookingData.checkOut 
                        ? `${Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 3600 * 24))} ${t('language') === 'ar' ? 'ليالي' : 'nights'}`
                        : t('language') === 'ar' ? 'حدد التواريخ' : 'Select dates'
                      }
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('language') === 'ar' ? 'المجموع:' : 'Total:'}</span>
                    <span className="text-blue-600">${bookingData.totalPrice}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('language') === 'ar' 
                      ? 'شامل جميع الضرائب والرسوم'
                      : 'Including all taxes and fees'
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <LiveChat />
    </div>
  );
};

export default BookingPage;

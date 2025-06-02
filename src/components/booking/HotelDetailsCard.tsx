
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Users, Wifi, Car, Coffee, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HotelDetailsCardProps {
  hotelData: {
    hotelId: string;
    hotelName: string;
    hotelCity: string;
    hotelCountry: string;
    hotelPrice?: number;
    hotelCurrency?: string;
    checkInDate?: string;
    checkOutDate?: string;
  };
}

const HotelDetailsCard = ({ hotelData }: HotelDetailsCardProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const formatPrice = (price: number, currency: string) => {
    const currencySymbols = {
      'EUR': '€',
      'GBP': '£',
      'CHF': 'CHF',
      'USD': '$'
    };
    
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${Math.round(price)}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-[#003580] flex items-center gap-3">
          <div className="bg-[#003580] p-2 rounded-lg">
            <Star className="h-5 w-5 text-white" />
          </div>
          {isArabic ? 'تفاصيل الفندق المختار' : 'Selected Hotel Details'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{hotelData.hotelName}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{hotelData.hotelCity}, {hotelData.hotelCountry}</span>
              </div>
            </div>

            {hotelData.hotelPrice && hotelData.hotelCurrency && (
              <div className="bg-white rounded-lg p-3 border">
                <div className="text-2xl font-bold text-blue-600">
                  {formatPrice(hotelData.hotelPrice, hotelData.hotelCurrency)}
                </div>
                <div className="text-sm text-gray-500">
                  {isArabic ? 'لليلة الواحدة' : 'per night'}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {hotelData.checkInDate && hotelData.checkOutDate && (
              <div className="bg-white rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-700">
                    {isArabic ? 'تواريخ الإقامة' : 'Stay Dates'}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-gray-600">
                      {isArabic ? 'تسجيل الوصول: ' : 'Check-in: '}
                    </span>
                    <span className="font-medium">{formatDate(hotelData.checkInDate)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {isArabic ? 'تسجيل المغادرة: ' : 'Check-out: '}
                    </span>
                    <span className="font-medium">{formatDate(hotelData.checkOutDate)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Wifi className="h-3 w-3 mr-1" />
                {isArabic ? 'واي فاي مجاني' : 'Free WiFi'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Coffee className="h-3 w-3 mr-1" />
                {isArabic ? 'مطعم' : 'Restaurant'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Waves className="h-3 w-3 mr-1" />
                {isArabic ? 'مسبح' : 'Pool'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-green-800">
            <span className="font-semibold">
              {isArabic ? '✓ تم اختيار الفندق' : '✓ Hotel Selected'}
            </span>
            {isArabic 
              ? ' - سيتم إرسال تفاصيل الحجز إلى هذا الفندق'
              : ' - Booking details will be sent for this hotel'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelDetailsCard;

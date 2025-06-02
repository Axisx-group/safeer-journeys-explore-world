
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useCreateBooking } from "@/hooks/useBooking";
import { User, MapPin, Calendar, Gift } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import BookingHeader from "./booking/BookingHeader";
import GuestInformationSection from "./booking/GuestInformationSection";
import TripDetailsSection from "./booking/TripDetailsSection";
import PreferencesSection from "./booking/PreferencesSection";
import TermsAndSubmitSection from "./booking/TermsAndSubmitSection";
import SupportInformation from "./booking/SupportInformation";
import HotelDetailsCard from "./booking/HotelDetailsCard";

const BookingForm = () => {
  const { language } = useLanguage();
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const createBooking = useCreateBooking();
  const isArabic = language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    departure_date: '',
    return_date: '',
    passengers: 1,
    hotel_preference: '',
    special_requests: '',
    user_id: user?.id || null
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [hotelBookingData, setHotelBookingData] = useState(null);

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user && userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.first_name && userProfile.last_name 
          ? `${userProfile.first_name} ${userProfile.last_name}` 
          : '',
        email: user.email || '',
        phone: userProfile.phone || '',
        user_id: user.id
      }));
    }
  }, [user, userProfile]);

  // Handle hotel booking data from navigation state
  useEffect(() => {
    const state = location.state as { 
      hotelId?: string; 
      bookingType?: string;
      hotelName?: string;
      hotelCity?: string;
      hotelCountry?: string;
      hotelPrice?: number;
      hotelCurrency?: string;
      checkInDate?: string;
      checkOutDate?: string;
    };
    
    if (state?.bookingType === 'hotel' && state?.hotelId) {
      setHotelBookingData(state);
      
      const destination = state.hotelCity && state.hotelCountry 
        ? `${state.hotelCity}, ${state.hotelCountry}` 
        : '';
        
      const hotelPreference = state.hotelName || `Hotel ID: ${state.hotelId}`;
      
      setFormData(prev => ({
        ...prev,
        destination: destination,
        departure_date: state.checkInDate || '',
        return_date: state.checkOutDate || '',
        hotel_preference: hotelPreference,
        special_requests: prev.special_requests 
          ? `${prev.special_requests}\n\nPreferred Hotel: ${hotelPreference}` 
          : `Preferred Hotel: ${hotelPreference}`
      }));
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert(isArabic ? 'يرجى قبول الشروط والأحكام' : 'Please accept terms and conditions');
      return;
    }
    createBooking.mutate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginRedirect = () => {
    navigate('/auth?redirect=/booking', { state: location.state });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <BookingHeader />

        {/* Login suggestion banner for non-authenticated users */}
        {!user && (
          <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-full">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-800">
                      {isArabic ? 'احصل على مزايا إضافية!' : 'Get Extra Benefits!'}
                    </h3>
                    <p className="text-amber-700">
                      {isArabic 
                        ? 'سجل دخولك لحفظ بياناتك وتتبع حجوزاتك والحصول على عروض خاصة'
                        : 'Login to save your details, track bookings, and get special offers'
                      }
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleLoginRedirect}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2"
                >
                  {isArabic ? 'تسجيل الدخول' : 'Login'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hotel Details Card - Show only if booking a hotel */}
        {hotelBookingData && (
          <HotelDetailsCard hotelData={hotelBookingData} />
        )}

        {/* Main Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <User className="h-6 w-6" />
                  </div>
                  {isArabic ? 'تفاصيل الحجز' : 'Booking Details'}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <GuestInformationSection 
                    formData={formData} 
                    handleChange={handleChange}
                    isReadOnly={false}
                    isLoggedIn={!!user}
                  />

                  <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px" />

                  <TripDetailsSection 
                    formData={formData} 
                    handleChange={handleChange}
                    hotelBookingData={hotelBookingData}
                    allowDateChanges={true}
                  />

                  <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px" />

                  <PreferencesSection 
                    formData={formData} 
                    handleChange={handleChange} 
                  />

                  <TermsAndSubmitSection 
                    acceptedTerms={acceptedTerms}
                    setAcceptedTerms={setAcceptedTerms}
                    isSubmitting={createBooking.isPending}
                  />
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with booking summary and support */}
          <div className="space-y-6">
            {/* Booking Summary Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {isArabic ? 'ملخص الرحلة' : 'Trip Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {formData.destination && (
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        {isArabic ? 'الوجهة' : 'Destination'}
                      </p>
                      <p className="text-lg font-semibold text-gray-900">{formData.destination}</p>
                    </div>
                  )}
                  {formData.departure_date && formData.return_date && (
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        {isArabic ? 'التواريخ' : 'Dates'}
                      </p>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {new Date(formData.departure_date).toLocaleDateString()} - {new Date(formData.return_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {isArabic ? 'عدد المسافرين' : 'Travelers'}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">{formData.passengers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <SupportInformation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

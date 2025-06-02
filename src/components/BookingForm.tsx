
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useCreateBooking } from "@/hooks/useBooking";
import { Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BookingHeader from "./booking/BookingHeader";
import GuestInformationSection from "./booking/GuestInformationSection";
import TripDetailsSection from "./booking/TripDetailsSection";
import PreferencesSection from "./booking/PreferencesSection";
import TermsAndSubmitSection from "./booking/TermsAndSubmitSection";
import SupportInformation from "./booking/SupportInformation";

const BookingForm = () => {
  const { language } = useLanguage();
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth?redirect=/booking');
      return;
    }
    
    // Pre-fill form with user data
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
  }, [user, userProfile, navigate]);

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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {isArabic ? 'تسجيل الدخول مطلوب' : 'Login Required'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isArabic ? 'يرجى تسجيل الدخول للمتابعة مع الحجز' : 'Please login to continue with booking'}
          </p>
          <Button onClick={() => navigate('/auth')}>
            {isArabic ? 'تسجيل الدخول' : 'Login'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      <BookingHeader />

      {/* Main Booking Form */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-2xl text-[#003580] flex items-center gap-3">
            <div className="bg-[#003580] p-2 rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            {isArabic ? 'تفاصيل الحجز' : 'Booking Details'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <GuestInformationSection 
              formData={formData} 
              handleChange={handleChange} 
            />

            <Separator className="my-8" />

            <TripDetailsSection 
              formData={formData} 
              handleChange={handleChange} 
            />

            <Separator className="my-8" />

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

      <SupportInformation />
    </div>
  );
};

export default BookingForm;

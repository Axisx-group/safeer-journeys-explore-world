
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useCreateBooking } from "@/hooks/useBooking";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  Phone, 
  User,
  CheckCircle,
  Shield,
  CreditCard,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const [currentStep, setCurrentStep] = useState(1);
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

  const destinations = [
    { value: 'spain', label: isArabic ? 'إسبانيا' : 'Spain' },
    { value: 'turkey', label: isArabic ? 'تركيا' : 'Turkey' },
    { value: 'italy', label: isArabic ? 'إيطاليا' : 'Italy' },
    { value: 'france', label: isArabic ? 'فرنسا' : 'France' },
    { value: 'greece', label: isArabic ? 'اليونان' : 'Greece' },
    { value: 'portugal', label: isArabic ? 'البرتغال' : 'Portugal' },
    { value: 'netherlands', label: isArabic ? 'هولندا' : 'Netherlands' },
    { value: 'switzerland', label: isArabic ? 'سويسرا' : 'Switzerland' }
  ];

  const steps = [
    { id: 1, title: isArabic ? 'المعلومات الشخصية' : 'Personal Details' },
    { id: 2, title: isArabic ? 'تفاصيل الرحلة' : 'Trip Details' },
    { id: 3, title: isArabic ? 'التفضيلات' : 'Preferences' },
    { id: 4, title: isArabic ? 'المراجعة والحجز' : 'Review & Book' }
  ];

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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {isArabic ? `مرحباً ${userProfile?.first_name || user?.email}!` : `Welcome ${userProfile?.first_name || user?.email}!`}
              </h2>
              <p className="text-blue-100">
                {isArabic ? 'احجز رحلتك القادمة معنا' : 'Book your next adventure with us'}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg p-3">
                <Calendar className="h-8 w-8 mb-1" />
                <p className="text-sm text-blue-100">
                  {isArabic ? 'حجز سريع وآمن' : 'Quick & Secure'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Booking Form */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            {isArabic ? 'تفاصيل الحجز' : 'Booking Details'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                    <User className="h-4 w-4 text-blue-600" />
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder={isArabic ? 'اكتب اسمك الكامل' : 'Enter your full name'}
                    className="h-12 border-2 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4 text-blue-600" />
                    {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder={isArabic ? 'البريد الإلكتروني' : 'Your email address'}
                    className="h-12 border-2 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
                  <Phone className="h-4 w-4 text-blue-600" />
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={isArabic ? '+966 50 123 4567' : '+966 50 123 4567'}
                  className="h-12 border-2 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Trip Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  {isArabic ? 'تفاصيل الرحلة' : 'Trip Details'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2 font-medium">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {isArabic ? 'الوجهة' : 'Destination'}
                  </Label>
                  <Select onValueChange={(value) => handleChange('destination', value)} required>
                    <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                      <SelectValue placeholder={isArabic ? 'اختر الوجهة' : 'Select destination'} />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers" className="flex items-center gap-2 font-medium">
                    <Users className="h-4 w-4 text-green-600" />
                    {isArabic ? 'عدد المسافرين' : 'Number of Travelers'}
                  </Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.passengers}
                    onChange={(e) => handleChange('passengers', parseInt(e.target.value))}
                    className="h-12 border-2 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="departure_date" className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-green-600" />
                    {isArabic ? 'تاريخ المغادرة' : 'Departure Date'}
                  </Label>
                  <Input
                    id="departure_date"
                    type="date"
                    value={formData.departure_date}
                    onChange={(e) => handleChange('departure_date', e.target.value)}
                    className="h-12 border-2 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="return_date" className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-green-600" />
                    {isArabic ? 'تاريخ العودة' : 'Return Date'}
                  </Label>
                  <Input
                    id="return_date"
                    type="date"
                    value={formData.return_date}
                    onChange={(e) => handleChange('return_date', e.target.value)}
                    className="h-12 border-2 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Preferences Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  {isArabic ? 'التفضيلات والطلبات' : 'Preferences & Requests'}
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotel_preference" className="font-medium">
                  {isArabic ? 'تفضيل الفندق' : 'Hotel Preference'}
                </Label>
                <Input
                  id="hotel_preference"
                  type="text"
                  value={formData.hotel_preference}
                  onChange={(e) => handleChange('hotel_preference', e.target.value)}
                  placeholder={isArabic ? 'مثال: 5 نجوم، قريب من الشاطئ، إطلالة بحرية' : 'e.g., 5-star, beachfront, sea view'}
                  className="h-12 border-2 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="special_requests" className="font-medium">
                  {isArabic ? 'طلبات خاصة' : 'Special Requests'}
                </Label>
                <Textarea
                  id="special_requests"
                  value={formData.special_requests}
                  onChange={(e) => handleChange('special_requests', e.target.value)}
                  placeholder={isArabic ? 'أي طلبات أو ملاحظات خاصة (غرفة بإطلالة، احتياجات غذائية، إلخ)' : 'Any special requests or notes (room with view, dietary requirements, etc.)'}
                  rows={4}
                  className="border-2 focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            <Separator />

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={setAcceptedTerms}
                  className="mt-1"
                />
                <div className="space-y-2">
                  <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                    {isArabic ? 'أوافق على الشروط والأحكام وسياسة الخصوصية' : 'I agree to the Terms & Conditions and Privacy Policy'}
                  </Label>
                  <p className="text-xs text-gray-600">
                    {isArabic 
                      ? 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.'
                      : 'By proceeding, you agree to our Terms of Service and Privacy Policy.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold"
                disabled={createBooking.isPending || !acceptedTerms}
              >
                {createBooking.isPending ? (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 animate-spin" />
                    {isArabic ? 'جارٍ الإرسال...' : 'Processing...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
                  </div>
                )}
              </Button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                {isArabic 
                  ? '🔒 معلوماتك محمية بتشفير SSL ولن يتم تحصيل أي مبلغ حتى تأكيد الحجز'
                  : '🔒 Your information is SSL encrypted and no charges until booking confirmation'
                }
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Support Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-blue-900 mb-2">
              {isArabic ? 'بحاجة للمساعدة؟' : 'Need Help?'}
            </h4>
            <p className="text-blue-700 text-sm">
              {isArabic 
                ? 'فريق الدعم متاح 24/7 للمساعدة في حجزك'
                : 'Our support team is available 24/7 to help with your booking'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;

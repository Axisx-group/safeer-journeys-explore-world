
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
  Clock,
  Star,
  Globe
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
      {/* Booking.com Style Header */}
      <div className="bg-gradient-to-r from-[#003580] to-[#0057b8] text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-6 w-6" />
              <span className="text-sm font-medium">
                {isArabic ? 'حجز موثوق' : 'Trusted Booking'}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isArabic ? `أهلاً وسهلاً ${userProfile?.first_name || ''}!` : `Hello ${userProfile?.first_name || ''}!`}
            </h1>
            <p className="text-blue-100">
              {isArabic ? 'أحجز رحلتك القادمة بسهولة وأمان' : 'Book your next trip easily and securely'}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-4">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">
                {isArabic ? 'تقييم ممتاز' : 'Excellent Rating'}
              </p>
              <p className="text-xs text-blue-200">9.2/10</p>
            </div>
          </div>
        </div>
      </div>

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
            {/* Guest Information Section - Booking.com Style */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="bg-[#003580] p-2 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#003580]">
                    {isArabic ? 'معلومات الضيف الرئيسي' : 'Main Guest Information'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isArabic ? 'هذه المعلومات مطلوبة لتأكيد الحجز' : 'This information is required to confirm your booking'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-[#003580]" />
                    {isArabic ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder={isArabic ? 'مثال: أحمد محمد' : 'e.g., John Smith'}
                    className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#003580]" />
                    {isArabic ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder={isArabic ? 'ahmed@example.com' : 'john@example.com'}
                    className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {isArabic ? 'سنرسل تأكيد الحجز على هذا البريد' : 'Booking confirmation will be sent to this email'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#003580]" />
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+966 50 123 4567"
                  className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
                  required
                />
                <p className="text-xs text-gray-500">
                  {isArabic ? 'مطلوب للتواصل في حالة الطوارئ' : 'Required for emergency contact'}
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Trip Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="bg-green-600 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#003580]">
                    {isArabic ? 'تفاصيل الرحلة' : 'Trip Details'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isArabic ? 'اختر وجهتك وتواريخ السفر' : 'Choose your destination and travel dates'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {isArabic ? 'الوجهة' : 'Destination'} <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleChange('destination', value)} required>
                    <SelectTrigger className="h-12 border-2 border-gray-300 focus:border-[#003580]">
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
                  <Label htmlFor="passengers" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    {isArabic ? 'عدد المسافرين' : 'Number of Travelers'} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.passengers}
                    onChange={(e) => handleChange('passengers', parseInt(e.target.value))}
                    className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="departure_date" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    {isArabic ? 'تاريخ المغادرة' : 'Departure Date'} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="departure_date"
                    type="date"
                    value={formData.departure_date}
                    onChange={(e) => handleChange('departure_date', e.target.value)}
                    className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="return_date" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    {isArabic ? 'تاريخ العودة' : 'Return Date'} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="return_date"
                    type="date"
                    value={formData.return_date}
                    onChange={(e) => handleChange('return_date', e.target.value)}
                    className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Preferences Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#003580]">
                    {isArabic ? 'التفضيلات والطلبات الخاصة' : 'Preferences & Special Requests'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isArabic ? 'أخبرنا عن تفضيلاتك لتحسين تجربتك' : 'Tell us your preferences to enhance your experience'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotel_preference" className="text-sm font-semibold text-gray-700">
                  {isArabic ? 'تفضيل الفندق' : 'Hotel Preference'}
                </Label>
                <Input
                  id="hotel_preference"
                  type="text"
                  value={formData.hotel_preference}
                  onChange={(e) => handleChange('hotel_preference', e.target.value)}
                  placeholder={isArabic ? 'مثال: 5 نجوم، قريب من الشاطئ، إطلالة بحرية' : 'e.g., 5-star, beachfront, sea view'}
                  className="h-12 border-2 border-gray-300 focus:border-[#003580] rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="special_requests" className="text-sm font-semibold text-gray-700">
                  {isArabic ? 'طلبات خاصة' : 'Special Requests'}
                </Label>
                <Textarea
                  id="special_requests"
                  value={formData.special_requests}
                  onChange={(e) => handleChange('special_requests', e.target.value)}
                  placeholder={isArabic ? 'أي طلبات أو ملاحظات خاصة (غرفة بإطلالة، احتياجات غذائية، إلخ)' : 'Any special requests or notes (room with view, dietary requirements, etc.)'}
                  rows={4}
                  className="border-2 border-gray-300 focus:border-[#003580] rounded-md resize-none"
                />
              </div>
            </div>

            {/* Terms and Conditions - Booking.com Style */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3" style={{ flexDirection: isArabic ? 'row-reverse' : 'row' }}>
                <Checkbox 
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  className="mt-1"
                />
                <div className="space-y-2" style={{ marginLeft: isArabic ? '0' : '12px', marginRight: isArabic ? '12px' : '0' }}>
                  <Label htmlFor="terms" className="text-sm font-medium cursor-pointer text-[#003580]">
                    {isArabic ? 'أوافق على الشروط والأحكام وسياسة الخصوصية' : 'I agree to the Terms & Conditions and Privacy Policy'}
                  </Label>
                  <p className="text-xs text-gray-600">
                    {isArabic 
                      ? 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا وتؤكد أن جميع المعلومات المقدمة صحيحة.'
                      : 'By proceeding, you agree to our Terms of Service and Privacy Policy and confirm that all information provided is accurate.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button - Booking.com Style */}
            <div className="pt-6">
              <Button 
                type="submit" 
                className="w-full h-16 bg-gradient-to-r from-[#003580] to-[#0057b8] hover:from-[#002c6c] hover:to-[#004494] text-lg font-bold text-white rounded-md shadow-lg"
                disabled={createBooking.isPending || !acceptedTerms}
              >
                {createBooking.isPending ? (
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 animate-spin" />
                    {isArabic ? 'جارٍ معالجة الحجز...' : 'Processing Booking...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6" />
                    {isArabic ? 'تأكيد الحجز الآن' : 'Complete Booking'}
                  </div>
                )}
              </Button>
              
              <div className="text-center mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  {isArabic 
                    ? '🔒 معلوماتك محمية بتشفير SSL آمن ولن يتم تحصيل أي مبلغ حتى تأكيد الحجز'
                    : '🔒 Your information is protected with secure SSL encryption and no charges until booking confirmation'
                  }
                </p>
                <p className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <Shield className="h-4 w-4" />
                  {isArabic ? 'حجز آمن 100%' : '100% Secure Booking'}
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Support Information - Booking.com Style */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Phone className="h-8 w-8 text-[#003580]" />
              <div className="text-left">
                <h4 className="font-bold text-[#003580] text-lg">
                  {isArabic ? 'هل تحتاج مساعدة؟' : 'Need assistance?'}
                </h4>
                <p className="text-gray-700 text-sm">
                  {isArabic 
                    ? 'فريق الدعم متاح 24/7 لمساعدتك في حجزك'
                    : 'Our support team is available 24/7 to help with your booking'
                  }
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <span className="bg-[#003580] text-white px-4 py-2 rounded-full">
                📞 +966 11 123 4567
              </span>
              <span className="bg-green-600 text-white px-4 py-2 rounded-full">
                💬 {isArabic ? 'دردشة مباشرة' : 'Live Chat'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;

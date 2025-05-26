
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreateBooking } from "@/hooks/useBooking";
import { Calendar, MapPin, Users, Mail, Phone, User } from "lucide-react";

const BookingForm = () => {
  const { language } = useLanguage();
  const createBooking = useCreateBooking();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    departure_date: '',
    return_date: '',
    passengers: 1,
    hotel_preference: '',
    special_requests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking.mutate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const destinations = [
    { value: 'spain', label: language === 'ar' ? 'إسبانيا' : 'Spain' },
    { value: 'turkey', label: language === 'ar' ? 'تركيا' : 'Turkey' },
    { value: 'italy', label: language === 'ar' ? 'إيطاليا' : 'Italy' },
    { value: 'france', label: language === 'ar' ? 'فرنسا' : 'France' },
    { value: 'greece', label: language === 'ar' ? 'اليونان' : 'Greece' }
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          {language === 'ar' ? 'نموذج الحجز' : 'Booking Form'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder={language === 'ar' ? 'اكتب اسمك الكامل' : 'Enter your full name'}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Your email address'}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder={language === 'ar' ? 'رقم الهاتف' : 'Your phone number'}
              required
            />
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {language === 'ar' ? 'الوجهة' : 'Destination'}
              </Label>
              <Select onValueChange={(value) => handleChange('destination', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'ar' ? 'اختر الوجهة' : 'Select destination'} />
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
              <Label htmlFor="passengers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {language === 'ar' ? 'عدد المسافرين' : 'Number of Passengers'}
              </Label>
              <Input
                id="passengers"
                type="number"
                min="1"
                max="20"
                value={formData.passengers}
                onChange={(e) => handleChange('passengers', parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure_date">
                {language === 'ar' ? 'تاريخ المغادرة' : 'Departure Date'}
              </Label>
              <Input
                id="departure_date"
                type="date"
                value={formData.departure_date}
                onChange={(e) => handleChange('departure_date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="return_date">
                {language === 'ar' ? 'تاريخ العودة' : 'Return Date'}
              </Label>
              <Input
                id="return_date"
                type="date"
                value={formData.return_date}
                onChange={(e) => handleChange('return_date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotel_preference">
              {language === 'ar' ? 'تفضيل الفندق' : 'Hotel Preference'}
            </Label>
            <Input
              id="hotel_preference"
              type="text"
              value={formData.hotel_preference}
              onChange={(e) => handleChange('hotel_preference', e.target.value)}
              placeholder={language === 'ar' ? 'مثال: 5 نجوم، قريب من الشاطئ' : 'e.g., 5-star, near beach'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_requests">
              {language === 'ar' ? 'طلبات خاصة' : 'Special Requests'}
            </Label>
            <Textarea
              id="special_requests"
              value={formData.special_requests}
              onChange={(e) => handleChange('special_requests', e.target.value)}
              placeholder={language === 'ar' ? 'أي طلبات أو ملاحظات خاصة' : 'Any special requests or notes'}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={createBooking.isPending}
          >
            {createBooking.isPending 
              ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') 
              : (language === 'ar' ? 'إرسال طلب الحجز' : 'Submit Booking Request')
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;

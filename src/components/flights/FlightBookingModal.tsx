
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flight } from '@/hooks/useFlights';
import { Plane, Clock, MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';

interface FlightBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight;
}

const FlightBookingModal: React.FC<FlightBookingModalProps> = ({ 
  isOpen, 
  onClose, 
  flight 
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    dateOfBirth: '',
    nationality: '',
    specialRequests: ''
  });

  const handleBooking = async () => {
    try {
      // هنا سيتم حفظ الحجز في قاعدة البيانات الخاصة بموقعكم
      console.log('حجز الرحلة:', { flight, bookingData });
      // يمكن إضافة API call لحفظ الحجز
      alert(isArabic ? 'تم الحجز بنجاح!' : 'Booking confirmed!');
      onClose();
    } catch (error) {
      console.error('خطأ في الحجز:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isArabic ? 'تأكيد حجز الرحلة' : 'Confirm Flight Booking'}
          </DialogTitle>
        </DialogHeader>
        
        {/* تفاصيل الرحلة */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">{flight.airline}</span>
              <span className="text-sm text-gray-500">{flight.flight_number}</span>
            </div>
            <div className="text-xl font-bold text-green-600">
              {flight.price} {flight.currency}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <div className="font-medium">{flight.departure_city}</div>
                <div className="text-sm text-gray-500">{flight.departure_time}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <div className="font-medium">{flight.arrival_city}</div>
                <div className="text-sm text-gray-500">{flight.arrival_time}</div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* نموذج بيانات المسافر */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            {isArabic ? 'بيانات المسافر' : 'Passenger Information'}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">
                {isArabic ? 'الاسم الأول' : 'First Name'}
              </Label>
              <Input
                id="firstName"
                value={bookingData.firstName}
                onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">
                {isArabic ? 'اسم العائلة' : 'Last Name'}
              </Label>
              <Input
                id="lastName"
                value={bookingData.lastName}
                onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">
                <Mail className="h-4 w-4 inline mr-1" />
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">
                <Phone className="h-4 w-4 inline mr-1" />
                {isArabic ? 'رقم الهاتف' : 'Phone Number'}
              </Label>
              <Input
                id="phone"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="passport">
                {isArabic ? 'رقم جواز السفر' : 'Passport Number'}
              </Label>
              <Input
                id="passport"
                value={bookingData.passportNumber}
                onChange={(e) => setBookingData({...bookingData, passportNumber: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">
                {isArabic ? 'تاريخ الميلاد' : 'Date of Birth'}
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={bookingData.dateOfBirth}
                onChange={(e) => setBookingData({...bookingData, dateOfBirth: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="nationality">
              {isArabic ? 'الجنسية' : 'Nationality'}
            </Label>
            <Input
              id="nationality"
              value={bookingData.nationality}
              onChange={(e) => setBookingData({...bookingData, nationality: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="specialRequests">
              {isArabic ? 'طلبات خاصة' : 'Special Requests'}
            </Label>
            <Input
              id="specialRequests"
              value={bookingData.specialRequests}
              onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
              placeholder={isArabic ? 'وجبة خاصة، مقعد بالنافذة، إلخ...' : 'Special meal, window seat, etc...'}
            />
          </div>
        </div>
        
        <Separator />
        
        {/* ملخص التكلفة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {isArabic ? 'ملخص التكلفة' : 'Cost Summary'}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{isArabic ? 'سعر التذكرة:' : 'Ticket Price:'}</span>
              <span>{flight.price} {flight.currency}</span>
            </div>
            <div className="flex justify-between">
              <span>{isArabic ? 'رسوم الخدمة:' : 'Service Fee:'}</span>
              <span>50 {flight.currency}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>{isArabic ? 'المجموع:' : 'Total:'}</span>
              <span>{Number(flight.price) + 50} {flight.currency}</span>
            </div>
          </div>
        </div>
        
        {/* أزرار التحكم */}
        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            {isArabic ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button 
            onClick={handleBooking}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightBookingModal;


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, CheckCircle, Calendar, Users, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    city: "",
    zipCode: ""
  });
  
  const [bookingDetails, setBookingDetails] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    totalPrice: 0
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get booking details from URL parameters
    const params = new URLSearchParams(window.location.search);
    setBookingDetails({
      destination: params.get('destination') || '',
      checkIn: params.get('checkIn') || '',
      checkOut: params.get('checkOut') || '',
      guests: parseInt(params.get('guests') || '1'),
      roomType: params.get('roomType') || '',
      totalPrice: parseInt(params.get('totalPrice') || '0')
    });
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: t('language') === 'ar' ? "تمت عملية الدفع بنجاح!" : "Payment Successful!",
        description: t('language') === 'ar' 
          ? "تم تأكيد حجزك. ستصلك رسالة تأكيد قريباً"
          : "Your booking has been confirmed. You'll receive a confirmation email shortly",
      });
      setIsProcessing(false);
      // Redirect to success page or booking confirmation
      window.location.href = '/';
    }, 3000);
  };

  const paymentMethods = [
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "PayPal", logo: "🅿️" },
    { name: "Apple Pay", logo: "🍎" }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      titleAr: "دفع آمن 100%",
      titleEn: "100% Secure Payment",
      descAr: "جميع البيانات محمية بتشفير SSL",
      descEn: "All data is protected with SSL encryption"
    },
    {
      icon: CheckCircle,
      titleAr: "ضمان الاسترداد",
      titleEn: "Money Back Guarantee",
      descAr: "ضمان استرداد كامل في حالة الإلغاء",
      descEn: "Full refund guarantee in case of cancellation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('language') === 'ar' ? 'إتمام عملية الدفع' : 'Complete Your Payment'}
            </h1>
            <p className="text-xl text-gray-600">
              {t('language') === 'ar' 
                ? 'آخر خطوة لتأكيد حجزك - دفع آمن ومضمون'
                : 'Final step to confirm your booking - secure and guaranteed payment'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    {t('language') === 'ar' ? 'معلومات الدفع' : 'Payment Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Payment Methods */}
                  <div className="mb-6">
                    <Label className="text-base font-semibold mb-3 block">
                      {t('language') === 'ar' ? 'طرق الدفع المقبولة' : 'Accepted Payment Methods'}
                    </Label>
                    <div className="flex gap-4 mb-6">
                      {paymentMethods.map((method, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <span className="text-2xl">{method.logo}</span>
                          <span className="text-sm">{method.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-6">
                    <div>
                      <Label htmlFor="cardName">
                        {t('language') === 'ar' ? 'اسم حامل البطاقة' : 'Cardholder Name'}
                      </Label>
                      <Input
                        id="cardName"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                        placeholder={t('language') === 'ar' ? 'الاسم كما هو على البطاقة' : 'Name as on card'}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">
                        {t('language') === 'ar' ? 'رقم البطاقة' : 'Card Number'}
                      </Label>
                      <Input
                        id="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">
                          {t('language') === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}
                        </Label>
                        <Input
                          id="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">
                          {t('language') === 'ar' ? 'رمز الأمان' : 'CVV'}
                        </Label>
                        <Input
                          id="cvv"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingAddress">
                        {t('language') === 'ar' ? 'عنوان الفواتير' : 'Billing Address'}
                      </Label>
                      <Input
                        id="billingAddress"
                        value={paymentData.billingAddress}
                        onChange={(e) => setPaymentData({...paymentData, billingAddress: e.target.value})}
                        placeholder={t('language') === 'ar' ? 'العنوان الكامل' : 'Full address'}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">
                          {t('language') === 'ar' ? 'المدينة' : 'City'}
                        </Label>
                        <Input
                          id="city"
                          value={paymentData.city}
                          onChange={(e) => setPaymentData({...paymentData, city: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">
                          {t('language') === 'ar' ? 'الرمز البريدي' : 'ZIP Code'}
                        </Label>
                        <Input
                          id="zipCode"
                          value={paymentData.zipCode}
                          onChange={(e) => setPaymentData({...paymentData, zipCode: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t('language') === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
                        </div>
                      ) : (
                        <>
                          <Lock className="h-5 w-5 mr-2" />
                          {t('language') === 'ar' ? `ادفع $${bookingDetails.totalPrice}` : `Pay $${bookingDetails.totalPrice}`}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Security Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityFeatures.map((feature, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <feature.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">
                        {t('language') === 'ar' ? feature.titleAr : feature.titleEn}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t('language') === 'ar' ? feature.descAr : feature.descEn}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{bookingDetails.destination}</p>
                      <p className="text-sm text-gray-600">{bookingDetails.roomType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm">
                        {t('language') === 'ar' ? 'من' : 'From'}: {bookingDetails.checkIn}
                      </p>
                      <p className="text-sm">
                        {t('language') === 'ar' ? 'إلى' : 'To'}: {bookingDetails.checkOut}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-gray-600" />
                    <p>
                      {bookingDetails.guests} {t('language') === 'ar' ? 'ضيف' : 'guests'}
                    </p>
                  </div>

                  <hr />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{t('language') === 'ar' ? 'سعر الغرفة:' : 'Room price:'}</span>
                      <span>${bookingDetails.totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('language') === 'ar' ? 'الضرائب والرسوم:' : 'Taxes & fees:'}</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>{t('language') === 'ar' ? 'المجموع:' : 'Total:'}</span>
                      <span className="text-blue-600">${bookingDetails.totalPrice}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 pt-4">
                    {t('language') === 'ar' 
                      ? 'بالنقر على "ادفع"، أنت توافق على شروط وأحكام الخدمة'
                      : 'By clicking "Pay", you agree to our terms and conditions'
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

export default PaymentPage;

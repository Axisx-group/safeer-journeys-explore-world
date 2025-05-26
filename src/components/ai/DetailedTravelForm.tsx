
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  MapPin, 
  Plane, 
  Users, 
  Calendar as CalendarIcon,
  Clock,
  Mountain,
  Waves,
  Building,
  Snowflake,
  Camera,
  Trees
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TravelFormData {
  departureAirport: string;
  destination: string;
  preferences: string[];
  adults: number;
  children: number;
  infants: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  duration: number;
}

interface DetailedTravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  onBack: () => void;
}

const DetailedTravelForm = ({ onSubmit, onBack }: DetailedTravelFormProps) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<TravelFormData>({
    departureAirport: '',
    destination: '',
    preferences: [],
    adults: 1,
    children: 0,
    infants: 0,
    startDate: undefined,
    endDate: undefined,
    duration: 7
  });

  const airports = [
    { code: 'RUH', nameAr: 'مطار الملك خالد - الرياض', nameEn: 'King Khalid Airport - Riyadh' },
    { code: 'JED', nameAr: 'مطار الملك عبدالعزيز - جدة', nameEn: 'King Abdulaziz Airport - Jeddah' },
    { code: 'DXB', nameAr: 'مطار دبي الدولي', nameEn: 'Dubai International Airport' },
    { code: 'DOH', nameAr: 'مطار حمد الدولي - الدوحة', nameEn: 'Hamad International Airport - Doha' },
    { code: 'KWI', nameAr: 'مطار الكويت الدولي', nameEn: 'Kuwait International Airport' },
    { code: 'CAI', nameAr: 'مطار القاهرة الدولي', nameEn: 'Cairo International Airport' }
  ];

  const destinations = [
    { nameAr: 'تركيا', nameEn: 'Turkey' },
    { nameAr: 'المالديف', nameEn: 'Maldives' },
    { nameAr: 'إيطاليا', nameEn: 'Italy' },
    { nameAr: 'فرنسا', nameEn: 'France' },
    { nameAr: 'اليابان', nameEn: 'Japan' },
    { nameAr: 'سويسرا', nameEn: 'Switzerland' },
    { nameAr: 'إسبانيا', nameEn: 'Spain' },
    { nameAr: 'تايلاند', nameEn: 'Thailand' },
    { nameAr: 'المغرب', nameEn: 'Morocco' },
    { nameAr: 'النمسا', nameEn: 'Austria' }
  ];

  const preferenceOptions = [
    { id: 'beach', iconComponent: Waves, labelAr: 'شاطئ وبحر', labelEn: 'Beach & Sea' },
    { id: 'mountain', iconComponent: Mountain, labelAr: 'جبال', labelEn: 'Mountains' },
    { id: 'city', iconComponent: Building, labelAr: 'مدن حضارية', labelEn: 'Urban Cities' },
    { id: 'snow', iconComponent: Snowflake, labelAr: 'ثلوج وجليد', labelEn: 'Snow & Ice' },
    { id: 'historical', iconComponent: Camera, labelAr: 'آثار تاريخية', labelEn: 'Historical Sites' },
    { id: 'nature', iconComponent: Trees, labelAr: 'طبيعة خضراء', labelEn: 'Green Nature' }
  ];

  const handlePreferenceToggle = (preferenceId: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preferenceId)
        ? prev.preferences.filter(p => p !== preferenceId)
        : [...prev.preferences, preferenceId]
    }));
  };

  const handlePassengerChange = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      [type]: increment 
        ? prev[type] + 1 
        : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
    }));
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const diffTime = Math.abs(formData.endDate.getTime() - formData.startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData(prev => ({ ...prev, duration: diffDays }));
    }
  };

  const handleSubmit = () => {
    if (formData.departureAirport && formData.destination && formData.startDate && formData.endDate) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.departureAirport && formData.destination && formData.startDate && formData.endDate && formData.preferences.length > 0;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {language === 'ar' ? 'تفاصيل رحلتك المثالية' : 'Your Perfect Trip Details'}
        </CardTitle>
        <p className="text-center text-gray-600">
          {language === 'ar' ? 'أخبرنا عن تفضيلاتك لنقدم لك أفضل التوصيات' : 'Tell us your preferences for the best recommendations'}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Departure Airport */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-600" />
            {language === 'ar' ? 'مطار المغادرة' : 'Departure Airport'}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {airports.map((airport) => (
              <Button
                key={airport.code}
                variant={formData.departureAirport === airport.code ? "default" : "outline"}
                className="h-auto p-4 justify-start"
                onClick={() => setFormData(prev => ({ ...prev, departureAirport: airport.code }))}
              >
                <div className="text-left">
                  <div className="font-semibold">{airport.code}</div>
                  <div className="text-sm opacity-80">
                    {language === 'ar' ? airport.nameAr : airport.nameEn}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            {language === 'ar' ? 'الوجهة المطلوبة' : 'Desired Destination'}
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {destinations.map((dest) => (
              <Button
                key={dest.nameEn}
                variant={formData.destination === dest.nameEn ? "default" : "outline"}
                className="h-auto p-3"
                onClick={() => setFormData(prev => ({ ...prev, destination: dest.nameEn }))}
              >
                {language === 'ar' ? dest.nameAr : dest.nameEn}
              </Button>
            ))}
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">
            {language === 'ar' ? 'تفضيلات السفر' : 'Travel Preferences'}
          </Label>
          <p className="text-sm text-gray-600">
            {language === 'ar' ? 'اختر ما يناسب اهتماماتك (يمكن اختيار أكثر من خيار)' : 'Select what matches your interests (multiple choices allowed)'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {preferenceOptions.map((pref) => {
              const IconComponent = pref.iconComponent;
              return (
                <Button
                  key={pref.id}
                  variant={formData.preferences.includes(pref.id) ? "default" : "outline"}
                  className="h-auto p-4 flex-col gap-2"
                  onClick={() => handlePreferenceToggle(pref.id)}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm">{language === 'ar' ? pref.labelAr : pref.labelEn}</span>
                </Button>
              );
            })}
          </div>
          {formData.preferences.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.preferences.map(prefId => {
                const pref = preferenceOptions.find(p => p.id === prefId);
                return (
                  <Badge key={prefId} variant="secondary">
                    {language === 'ar' ? pref?.labelAr : pref?.labelEn}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* Number of Passengers */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            {language === 'ar' ? 'عدد المسافرين' : 'Number of Travelers'}
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Adults */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{language === 'ar' ? 'البالغون' : 'Adults'}</div>
                <div className="text-sm text-gray-600">{language === 'ar' ? '12 سنة فأكثر' : '12 years and above'}</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePassengerChange('adults', false)}
                  disabled={formData.adults <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center font-semibold">{formData.adults}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePassengerChange('adults', true)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{language === 'ar' ? 'الأطفال' : 'Children'}</div>
                <div className="text-sm text-gray-600">{language === 'ar' ? '2-11 سنة' : '2-11 years'}</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePassengerChange('children', false)}
                  disabled={formData.children <= 0}
                >
                  -
                </Button>
                <span className="w-8 text-center font-semibold">{formData.children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePassengerChange('children', true)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{language === 'ar' ? 'الرضع' : 'Infants'}</div>
                <div className="text-sm text-gray-600">{language === 'ar' ? 'أقل من سنتين' : 'Under 2 years'}</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePassengerChange('infants', false)}
                  disabled={formData.infants <= 0}
                >
                  -
                </Button>
                <span className="w-8 text-center font-semibold">{formData.infants}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePassengerChange('infants', true)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Dates */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-orange-600" />
            {language === 'ar' ? 'تواريخ السفر' : 'Travel Dates'}
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                {language === 'ar' ? 'تاريخ بداية الإجازة' : 'Vacation Start Date'}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP")
                    ) : (
                      <span>{language === 'ar' ? 'اختر التاريخ' : 'Pick a date'}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => {
                      setFormData(prev => ({ ...prev, startDate: date }));
                      setTimeout(calculateDuration, 100);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                {language === 'ar' ? 'تاريخ انتهاء الإجازة' : 'Vacation End Date'}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(formData.endDate, "PPP")
                    ) : (
                      <span>{language === 'ar' ? 'اختر التاريخ' : 'Pick a date'}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => {
                      setFormData(prev => ({ ...prev, endDate: date }));
                      setTimeout(calculateDuration, 100);
                    }}
                    disabled={(date) => date < (formData.startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Duration Display */}
          {formData.duration > 0 && (
            <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium">
                {language === 'ar' ? 'مدة الإجازة:' : 'Trip Duration:'} {formData.duration} {language === 'ar' ? 'يوم' : 'days'}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button variant="outline" onClick={onBack} className="flex-1">
            {language === 'ar' ? 'رجوع' : 'Back'}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid}
            className="flex-1"
          >
            {language === 'ar' ? 'احصل على التوصيات المخصصة' : 'Get Personalized Recommendations'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedTravelForm;

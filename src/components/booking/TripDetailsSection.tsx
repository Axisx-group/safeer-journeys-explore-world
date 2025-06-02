
import { MapPin, Users, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface TripDetailsSectionProps {
  formData: {
    destination: string;
    passengers: number;
    departure_date: string;
    return_date: string;
  };
  handleChange: (field: string, value: string | number) => void;
  hotelBookingData?: any;
}

const TripDetailsSection = ({ formData, handleChange, hotelBookingData }: TripDetailsSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

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

  return (
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
          {hotelBookingData ? (
            <div>
              <Input
                id="destination"
                type="text"
                value={formData.destination}
                className="h-12 border-2 border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed rounded-md"
                readOnly
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {isArabic ? 'تم تحديد الوجهة بناءً على الفندق المختار' : 'Destination set based on selected hotel'}
              </p>
            </div>
          ) : (
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
          )}
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
            className={`h-12 border-2 rounded-md ${
              hotelBookingData 
                ? 'bg-gray-100 border-gray-300 text-gray-700' 
                : 'border-gray-300 focus:border-[#003580]'
            }`}
            readOnly={!!hotelBookingData}
            required
          />
          {hotelBookingData && (
            <p className="text-xs text-gray-500">
              {isArabic ? 'تاريخ تسجيل الوصول للفندق' : 'Hotel check-in date'}
            </p>
          )}
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
            className={`h-12 border-2 rounded-md ${
              hotelBookingData 
                ? 'bg-gray-100 border-gray-300 text-gray-700' 
                : 'border-gray-300 focus:border-[#003580]'
            }`}
            readOnly={!!hotelBookingData}
            required
          />
          {hotelBookingData && (
            <p className="text-xs text-gray-500">
              {isArabic ? 'تاريخ تسجيل المغادرة من الفندق' : 'Hotel check-out date'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetailsSection;

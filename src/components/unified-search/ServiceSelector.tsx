
import { Checkbox } from "@/components/ui/checkbox";
import { Plane, Hotel, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceSelectorProps {
  includeFlights: boolean;
  includeHotels: boolean;
  includeCars: boolean;
  onFlightsChange: (checked: boolean | "indeterminate") => void;
  onHotelsChange: (checked: boolean | "indeterminate") => void;
  onCarsChange: (checked: boolean | "indeterminate") => void;
}

const ServiceSelector = ({
  includeFlights,
  includeHotels,
  includeCars,
  onFlightsChange,
  onHotelsChange,
  onCarsChange
}: ServiceSelectorProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {isArabic ? 'اختر الخدمات المطلوبة:' : 'Select Services:'}
      </h3>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="flights" 
            checked={includeFlights} 
            onCheckedChange={onFlightsChange}
          />
          <label htmlFor="flights" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <Plane className="h-4 w-4 text-blue-600" />
            {isArabic ? 'طيران' : 'Flights'}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="hotels" 
            checked={includeHotels} 
            onCheckedChange={onHotelsChange}
          />
          <label htmlFor="hotels" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <Hotel className="h-4 w-4 text-purple-600" />
            {isArabic ? 'فنادق' : 'Hotels'}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="cars" 
            checked={includeCars} 
            onCheckedChange={onCarsChange}
          />
          <label htmlFor="cars" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <Car className="h-4 w-4 text-indigo-600" />
            {isArabic ? 'سيارات' : 'Cars'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;

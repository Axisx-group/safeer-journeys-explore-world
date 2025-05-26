
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Plane, Hotel } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CitySearchInput from "@/components/flights/CitySearchInput";

interface SearchFormProps {
  searchParams: {
    from: string;
    to: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
  };
  onParamsChange: (params: any) => void;
  includeFlights: boolean;
  includeHotels: boolean;
}

const SearchForm = ({ searchParams, onParamsChange, includeFlights, includeHotels }: SearchFormProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* From/Origin */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {includeFlights ? (
              <Plane className="h-4 w-4 text-blue-600" />
            ) : (
              <MapPin className="h-4 w-4 text-purple-600" />
            )}
            {isArabic ? 'من' : 'From'}
          </label>
          <CitySearchInput
            value={searchParams.from}
            onValueChange={(value) => onParamsChange(prev => ({ ...prev, from: value }))}
            placeholder={isArabic ? 'اختر المدينة' : 'Select city'}
            label=""
          />
        </div>

        {/* To/Destination */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {includeFlights ? (
              <Plane className="h-4 w-4 text-blue-600 rotate-90" />
            ) : (
              <MapPin className="h-4 w-4 text-purple-600" />
            )}
            {isArabic ? 'إلى' : 'To'}
          </label>
          <CitySearchInput
            value={searchParams.to}
            onValueChange={(value) => onParamsChange(prev => ({ ...prev, to: value }))}
            placeholder={isArabic ? 'اختر الوجهة' : 'Select destination'}
            label=""
          />
        </div>

        {/* Check-in/Departure Date */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600" />
            {isArabic ? (includeFlights ? 'تاريخ المغادرة' : 'تسجيل الوصول') : (includeFlights ? 'Departure' : 'Check-in')}
          </label>
          <div className="relative group">
            <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
            <Input 
              type="date" 
              value={searchParams.checkIn}
              onChange={(e) => onParamsChange(prev => ({ ...prev, checkIn: e.target.value }))}
              className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
            />
          </div>
        </div>

        {/* Check-out/Return Date */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-red-600" />
            {isArabic ? (includeFlights ? 'تاريخ العودة' : 'تسجيل المغادرة') : (includeFlights ? 'Return' : 'Check-out')}
          </label>
          <div className="relative group">
            <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
            <Input 
              type="date" 
              value={searchParams.checkOut}
              onChange={(e) => onParamsChange(prev => ({ ...prev, checkOut: e.target.value }))}
              className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-red-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
            />
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Guests/Passengers */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-600" />
            {isArabic ? (includeFlights ? 'المسافرون' : 'النزلاء') : (includeFlights ? 'Passengers' : 'Guests')}
          </label>
          <div className="relative group">
            <Users className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
            <Input 
              type="number"
              min="1"
              max="10"
              value={searchParams.guests}
              onChange={(e) => onParamsChange(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
              className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-orange-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
            />
          </div>
        </div>

        {/* Rooms (if hotels selected) */}
        {includeHotels && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Hotel className="h-4 w-4 text-purple-600" />
              {isArabic ? 'الغرف' : 'Rooms'}
            </label>
            <div className="relative group">
              <Hotel className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
              <Input 
                type="number"
                min="1"
                max="5"
                value={searchParams.rooms}
                onChange={(e) => onParamsChange(prev => ({ ...prev, rooms: parseInt(e.target.value) || 1 }))}
                className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchForm;


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BasicHotelFiltersProps {
  filters: {
    searchTerm: string;
    country: string;
    city: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    rooms: number;
  };
  onUpdateFilter: (key: string, value: any) => void;
}

const BasicHotelFilters = ({ filters, onUpdateFilter }: BasicHotelFiltersProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      {/* Main Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Location Search */}
          <div className="lg:col-span-2 space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              {isArabic ? 'الوجهة (البلد أو المدينة)' : 'Destination (Country or City)'}
            </Label>
            <div className="relative">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`} />
              <Input
                type="text"
                placeholder={isArabic ? 'ابحث عن البلد أو المدينة...' : 'Search country or city...'}
                value={filters.searchTerm}
                onChange={(e) => onUpdateFilter('searchTerm', e.target.value)}
                className={`h-12 ${isArabic ? 'pr-10' : 'pl-10'} border-gray-200 focus:border-blue-500 rounded-lg`}
              />
            </div>
          </div>

          {/* Check-in Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              {isArabic ? 'تاريخ الوصول' : 'Check-in'}
            </Label>
            <Input
              type="date"
              value={filters.checkInDate}
              onChange={(e) => onUpdateFilter('checkInDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="h-12 border-gray-200 focus:border-green-500 rounded-lg"
            />
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              {isArabic ? 'تاريخ المغادرة' : 'Check-out'}
            </Label>
            <Input
              type="date"
              value={filters.checkOutDate}
              onChange={(e) => onUpdateFilter('checkOutDate', e.target.value)}
              min={filters.checkInDate || new Date().toISOString().split('T')[0]}
              className="h-12 border-gray-200 focus:border-purple-500 rounded-lg"
            />
          </div>

          {/* Rooms & Guests */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-600" />
              {isArabic ? 'الغرف والضيوف' : 'Rooms & Guests'}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Select value={filters.rooms.toString()} onValueChange={(value) => onUpdateFilter('rooms', parseInt(value))}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-orange-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {isArabic ? (num === 1 ? 'غرفة' : 'غرف') : (num === 1 ? 'Room' : 'Rooms')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filters.guests.toString()} onValueChange={(value) => onUpdateFilter('guests', parseInt(value))}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-orange-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {isArabic ? (num === 1 ? 'ضيف' : 'ضيوف') : (num === 1 ? 'Guest' : 'Guests')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicHotelFilters;

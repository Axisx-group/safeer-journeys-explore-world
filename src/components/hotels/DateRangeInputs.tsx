
import React from 'react';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DateRangeInputsProps {
  checkInDate: string;
  checkOutDate: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

const DateRangeInputs: React.FC<DateRangeInputsProps> = ({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-green-600" />
          {isArabic ? "تاريخ الوصول" : "Check-in"}
        </label>
        <Input
          type="date"
          value={checkInDate}
          onChange={(e) => onCheckInChange(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full h-12 border-2 border-gray-200 focus:border-green-500 rounded-lg"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-purple-600" />
          {isArabic ? "تاريخ المغادرة" : "Check-out"}
        </label>
        <Input
          type="date"
          value={checkOutDate}
          onChange={(e) => onCheckOutChange(e.target.value)}
          min={checkInDate || new Date().toISOString().split('T')[0]}
          className="w-full h-12 border-2 border-gray-200 focus:border-purple-500 rounded-lg"
        />
      </div>
    </>
  );
};

export default DateRangeInputs;

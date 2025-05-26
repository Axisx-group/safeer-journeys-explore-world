
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyHotelsStateProps {
  onFetchData: () => void;
}

const EmptyHotelsState = ({ onFetchData }: EmptyHotelsStateProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <div className="text-gray-500 mb-4">
        <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold mb-2">
          {isArabic ? "لا توجد فنادق متاحة" : "No hotels available"}
        </h3>
        <p className="text-sm">
          {isArabic ? "جرب البحث عن مدينة أخرى أو اضغط على جلب المزيد من الفنادق" : "Try searching for another city or click fetch more hotels"}
        </p>
      </div>
      <Button onClick={onFetchData} className="mt-4">
        <RefreshCw className="h-4 w-4 mr-2" />
        {isArabic ? "جلب الفنادق" : "Fetch Hotels"}
      </Button>
    </div>
  );
};

export default EmptyHotelsState;

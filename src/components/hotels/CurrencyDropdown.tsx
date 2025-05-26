
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCurrencies } from '@/constants/europeanData';

interface CurrencyDropdownProps {
  value: string;
  onChange: (currency: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {isArabic ? "العملة" : "Currency"}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-2 border-gray-200 shadow-xl z-50 rounded-lg">
          {europeanCurrencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center space-x-2">
                <span>{currency.symbol}</span>
                <span>{isArabic ? currency.nameAr : currency.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencyDropdown;

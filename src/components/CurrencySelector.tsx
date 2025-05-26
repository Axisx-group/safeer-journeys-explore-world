
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCurrencies } from '@/constants/europeanData';

interface CurrencySelectorProps {
  selectedCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency = 'EUR',
  onCurrencyChange
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [currency, setCurrency] = useState(selectedCurrency);

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    onCurrencyChange?.(newCurrency);
  };

  const selectedCurrencyData = europeanCurrencies.find(c => c.code === currency);

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {isArabic ? 'اختر العملة' : 'Select Currency'}
          </h3>
          {selectedCurrencyData && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {selectedCurrencyData.symbol} {selectedCurrencyData.code}
            </Badge>
          )}
        </div>
        
        <Select value={currency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-full h-12 bg-white border-gray-200">
            <SelectValue placeholder={isArabic ? "اختر العملة" : "Select Currency"} />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-64 overflow-y-auto">
            {europeanCurrencies.map((currencyOption) => (
              <SelectItem key={currencyOption.code} value={currencyOption.code}>
                <div className="flex items-center space-x-3 w-full">
                  <span className="text-lg font-bold text-blue-600 min-w-[30px]">
                    {currencyOption.symbol}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">
                      {isArabic ? currencyOption.nameAr : currencyOption.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {currencyOption.code}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCurrencyData && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {isArabic ? 'العملة المختارة:' : 'Selected Currency:'}
              </span>
              <div className="text-right">
                <div className="font-semibold text-blue-700">
                  {isArabic ? selectedCurrencyData.nameAr : selectedCurrencyData.name}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedCurrencyData.symbol} {selectedCurrencyData.code}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencySelector;


import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCurrencies } from '@/constants/europeanData';

interface CurrencyDropdownProps {
  selectedCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  selectedCurrency = 'EUR',
  onCurrencyChange
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const selectedCurrencyData = europeanCurrencies.find(c => c.code === selectedCurrency);

  const handleCurrencyChange = (currency: string) => {
    onCurrencyChange?.(currency);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white border-gray-300 hover:bg-gray-50">
          <DollarSign className="h-4 w-4" />
          {selectedCurrencyData && (
            <Badge variant="outline" className="text-xs bg-white">
              {selectedCurrencyData.symbol} {selectedCurrencyData.code}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 max-h-80 overflow-y-auto z-[9999] bg-white border border-gray-200 shadow-xl rounded-lg" 
        align={isArabic ? "start" : "end"}
      >
        {europeanCurrencies.map((currency) => (
          <DropdownMenuItem 
            key={currency.code} 
            onClick={() => handleCurrencyChange(currency.code)}
            className="flex items-center space-x-3 cursor-pointer bg-white hover:bg-blue-50 transition-colors duration-200 px-4 py-3 border-b border-gray-100 last:border-b-0"
          >
            <span className="text-lg font-bold text-blue-600 min-w-[30px]">
              {currency.symbol}
            </span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {isArabic ? currency.nameAr : currency.name}
              </div>
              <div className="text-sm text-gray-500">
                {currency.code}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyDropdown;

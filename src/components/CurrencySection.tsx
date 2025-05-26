
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Euro, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCurrencies } from '@/constants/europeanData';
import CurrencySelector from './CurrencySelector';

const CurrencySection = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  // Mock exchange rates for demonstration
  const exchangeRates = {
    'EUR': { rate: 1.0, change: 0.0, trend: 'stable' },
    'GBP': { rate: 0.85, change: 0.15, trend: 'up' },
    'CHF': { rate: 0.95, change: -0.08, trend: 'down' },
    'NOK': { rate: 11.20, change: 0.25, trend: 'up' },
    'SEK': { rate: 11.45, change: -0.12, trend: 'down' },
    'DKK': { rate: 7.44, change: 0.05, trend: 'up' },
    'PLN': { rate: 4.35, change: 0.18, trend: 'up' },
    'CZK': { rate: 24.50, change: -0.30, trend: 'down' },
    'HUF': { rate: 385.20, change: 2.15, trend: 'up' },
    'RON': { rate: 4.95, change: -0.05, trend: 'down' },
    'TRY': { rate: 32.15, change: 0.85, trend: 'up' },
  };

  const topCurrencies = ['EUR', 'GBP', 'CHF', 'NOK', 'PLN', 'TRY'].map(code => {
    const currency = europeanCurrencies.find(c => c.code === code);
    const rate = exchangeRates[code];
    return { ...currency, ...rate };
  }).filter(Boolean);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Euro className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {isArabic ? 'أسعار الصرف الأوروبية' : 'European Exchange Rates'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isArabic 
              ? 'تابع أحدث أسعار صرف العملات الأوروبية واختر العملة المناسبة لرحلتك'
              : 'Track the latest European currency exchange rates and choose the right currency for your trip'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Currency Selector */}
          <div className="lg:col-span-1">
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>

          {/* Exchange Rates Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCurrencies.map((currency) => (
                <Card key={currency.code} className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{currency.symbol}</span>
                        <div>
                          <div className="font-bold">{currency.code}</div>
                          <div className="text-sm text-gray-500">
                            {isArabic ? currency.nameAr : currency.name}
                          </div>
                        </div>
                      </div>
                      {getTrendIcon(currency.trend)}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {currency.rate?.toFixed(currency.code === 'HUF' ? 0 : 2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isArabic ? 'مقابل اليورو' : 'vs EUR'}
                        </p>
                      </div>
                      <div className={`text-right ${getTrendColor(currency.trend)}`}>
                        <p className="text-lg font-semibold">
                          {currency.trend === 'down' ? '' : '+'}
                          {currency.change?.toFixed(2)}
                        </p>
                        <p className="text-xs">
                          {isArabic ? 'اليوم' : 'Today'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Badge 
                        variant="outline" 
                        className={`${
                          currency.trend === 'up' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : currency.trend === 'down'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {currency.trend === 'up' 
                          ? (isArabic ? 'صاعد' : 'Rising')
                          : currency.trend === 'down'
                          ? (isArabic ? 'هابط' : 'Falling')
                          : (isArabic ? 'مستقر' : 'Stable')
                        }
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 justify-center mb-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">
                  {isArabic ? 'أسعار مباشرة' : 'Live Rates'}
                </span>
              </div>
              <p className="text-sm opacity-90">
                {isArabic 
                  ? 'تحديث أسعار الصرف كل 15 دقيقة من البنك المركزي الأوروبي'
                  : 'Exchange rates updated every 15 minutes from European Central Bank'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CurrencySection;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import CitySearchInput from './CitySearchInput';

interface FlightSearchFormProps {
  searchParams: {
    departure_city: string;
    arrival_city: string;
    departure_date: string;
  };
  onSearchParamsChange: (params: any) => void;
  onSearch: () => void;
  isLoading: boolean;
  isFetching: boolean;
  dataSource: string;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  searchParams,
  onSearchParamsChange,
  onSearch,
  isLoading,
  isFetching,
  dataSource
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-xl border-0">
      <CardContent className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CitySearchInput
                value={searchParams.departure_city}
                onValueChange={(value) => 
                  onSearchParamsChange({ ...searchParams, departure_city: value })
                }
                placeholder={isArabic ? 'اختر مطار المغادرة' : 'Select departure airport'}
                label={isArabic ? 'من' : 'From'}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CitySearchInput
                value={searchParams.arrival_city}
                onValueChange={(value) => 
                  onSearchParamsChange({ ...searchParams, arrival_city: value })
                }
                placeholder={isArabic ? 'اختر مطار الوصول' : 'Select arrival airport'}
                label={isArabic ? 'إلى' : 'To'}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-gray-700">
                {isArabic ? 'تاريخ المغادرة' : 'Departure Date'}
              </Label>
              <Input
                type="date"
                value={searchParams.departure_date}
                onChange={(e) => 
                  onSearchParamsChange({ ...searchParams, departure_date: e.target.value })
                }
                className="w-full"
                min={new Date().toISOString().split('T')[0]}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-between"
          >
            <Button 
              onClick={onSearch}
              disabled={isLoading || isFetching}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {(isLoading || isFetching) ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Search className="h-5 w-5 mr-2" />
              )}
              {isArabic ? 'بحث عن الرحلات' : 'Search Flights'}
            </Button>
            
            {dataSource && (
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>
                  {isArabic ? 'شركات الطيران العالمية' : 'Global Airlines'} - {dataSource}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default FlightSearchForm;

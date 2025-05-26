
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { europeanCities } from '@/constants/europeanCities';

interface CitySearchInputProps {
  value: string;
  onChange: (city: string) => void;
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [cityInput, setCityInput] = useState(value);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCityInputChange = (inputValue: string) => {
    setCityInput(inputValue);
    
    if (inputValue.length > 0) {
      const filtered = europeanCities.filter(city =>
        city.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 10);
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setCityInput(city);
    onChange(city);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-2 relative">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-600" />
        {isArabic ? "المدينة" : "City"}
      </label>
      <div className="relative">
        <Input
          type="text"
          placeholder={isArabic ? "اختر مدينة أوروبية..." : "Choose European city..."}
          value={cityInput}
          onChange={(e) => handleCityInputChange(e.target.value)}
          onFocus={() => cityInput.length > 0 && setShowSuggestions(true)}
          className="w-full h-12 pr-4 pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        
        {showSuggestions && filteredCities.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors flex items-center gap-2"
                onClick={() => handleCitySelect(city)}
              >
                <MapPin className="h-4 w-4 text-blue-600" />
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySearchInput;

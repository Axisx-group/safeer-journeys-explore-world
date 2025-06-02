
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { worldAirports } from '@/constants/worldAirports';
import { useLanguage } from '@/contexts/LanguageContext';

interface CitySearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  label: string;
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({
  value,
  onValueChange,
  placeholder,
  label
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filteredAirports = worldAirports.filter(airport => {
    const searchTerm = searchValue.toLowerCase();
    return (
      airport.ar.toLowerCase().includes(searchTerm) ||
      airport.en.toLowerCase().includes(searchTerm) ||
      airport.code.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    );
  }).slice(0, 8); // Limit to 8 suggestions

  useEffect(() => {
    const selectedAirport = worldAirports.find(airport => airport.code === value);
    if (selectedAirport) {
      setSearchValue(`${isArabic ? selectedAirport.ar : selectedAirport.en} (${selectedAirport.code})`);
    } else if (value) {
      // Try to find by Arabic or English name
      const airportByName = worldAirports.find(airport => 
        airport.ar === value || airport.en === value
      );
      if (airportByName) {
        setSearchValue(`${isArabic ? airportByName.ar : airportByName.en} (${airportByName.code})`);
        onValueChange(airportByName.code);
      } else {
        setSearchValue(value);
      }
    } else {
      setSearchValue('');
    }
  }, [value, isArabic]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    setShowSuggestions(true);
    setSelectedIndex(-1);
    
    // If input is empty, clear the value
    if (!inputValue.trim()) {
      onValueChange('');
    }
  };

  const handleSuggestionClick = (airport: typeof worldAirports[0]) => {
    const displayValue = `${isArabic ? airport.ar : airport.en} (${airport.code})`;
    setSearchValue(displayValue);
    onValueChange(airport.code); // Pass the airport code to the parent
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredAirports.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredAirports.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredAirports.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredAirports[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    if (filteredAirports.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className="space-y-2 relative">
      <Label className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full h-14 text-base"
          autoComplete="off"
        />
        
        {showSuggestions && filteredAirports.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto mt-1"
          >
            {filteredAirports.map((airport, index) => (
              <div
                key={airport.code}
                className={`px-4 py-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                  index === selectedIndex ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleSuggestionClick(airport)}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {isArabic ? airport.ar : airport.en} ({airport.code})
                  </span>
                  <span className="text-sm text-gray-500">
                    {airport.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySearchInput;

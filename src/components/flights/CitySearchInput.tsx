
import React, { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const filteredAirports = worldAirports.filter(airport => {
    const searchTerm = searchValue.toLowerCase();
    return (
      airport.ar.toLowerCase().includes(searchTerm) ||
      airport.en.toLowerCase().includes(searchTerm) ||
      airport.code.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    );
  });

  const selectedAirport = worldAirports.find(airport => airport.ar === value || airport.en === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedAirport
              ? `${isArabic ? selectedAirport.ar : selectedAirport.en} (${selectedAirport.code})`
              : placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" style={{ width: 'var(--radix-popover-trigger-width)' }}>
          <Command>
            <CommandInput
              placeholder={isArabic ? "ابحث عن مطار..." : "Search for airport..."}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                {isArabic ? "لم يتم العثور على مطار" : "No airport found"}
              </CommandEmpty>
              <CommandGroup>
                {filteredAirports.map((airport) => (
                  <CommandItem
                    key={airport.code}
                    value={airport.ar}
                    onSelect={() => {
                      onValueChange(airport.ar);
                      setOpen(false);
                      setSearchValue('');
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === airport.ar ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {isArabic ? airport.ar : airport.en} ({airport.code})
                      </span>
                      <span className="text-sm text-gray-500">
                        {airport.country}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CitySearchInput;

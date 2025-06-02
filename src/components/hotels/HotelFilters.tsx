
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HotelFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFetchNewData: () => void;
  isFetching: boolean;
}

const HotelFilters = ({ searchTerm, onSearchChange, onFetchNewData, isFetching }: HotelFiltersProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      <div className="max-w-md">
        <Input
          type="text"
          placeholder={language === 'ar' ? 'ابحث عن فندق أو مدينة...' : 'Search for hotels or cities...'}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Button 
        onClick={onFetchNewData}
        disabled={isFetching}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
      >
        <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
        {language === 'ar' ? 'جلب فنادق جديدة' : 'Fetch New Hotels'}
      </Button>
    </div>
  );
};

export default HotelFilters;


import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchButtonProps {
  onSearch: () => void;
  isLoading: boolean;
  isFetching: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch, isLoading, isFetching }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="flex flex-col justify-end">
      <Button 
        onClick={onSearch} 
        disabled={isLoading || isFetching}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg"
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            {isArabic ? "جاري البحث..." : "Searching..."}
          </>
        ) : (
          <>
            <Search className="h-4 w-4 mr-2" />
            {isArabic ? "بحث" : "Search"}
          </>
        )}
      </Button>
    </div>
  );
};

export default SearchButton;

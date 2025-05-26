
import { Button } from "@/components/ui/button";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface SearchButtonProps {
  onSearch: () => void;
  isSearching: boolean;
}

const SearchButton = ({ onSearch, isSearching }: SearchButtonProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-12 flex justify-center"
    >
      <div className="relative group">
        {/* Button glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
        
        <Button 
          size="lg" 
          onClick={onSearch}
          disabled={isSearching}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-20 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full border-2 border-white/20 hover:border-white/30 group overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <div className="relative flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-6 w-6 animate-pulse" />
              <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <span className="font-extrabold tracking-wide">
              {isSearching 
                ? (isArabic ? 'جاري البحث...' : 'Searching...')
                : (isArabic ? 'ابحث عن أفضل العروض' : 'Find Best Deals')
              }
            </span>
            
            <ArrowRight className={`h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? 'rotate-180' : ''}`} />
          </div>
          
          {/* Button pulse effect */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchButton;

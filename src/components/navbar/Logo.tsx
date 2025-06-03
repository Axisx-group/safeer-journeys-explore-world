
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LogoProps {
  onClick: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Link to="/" className="flex items-center space-x-1 sm:space-x-2 group flex-shrink-0 min-w-0" onClick={onClick}>
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 sm:p-2 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
          <Plane className="h-4 w-4 sm:h-5 md:h-6 lg:w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-base sm:text-lg lg:text-xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-blue-600 transition-all duration-500 truncate">
          ur trvl
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wide hidden sm:block truncate">
          {isArabic ? 'اكتشف العالم معنا' : 'Discover the World'}
        </span>
      </div>
    </Link>
  );
};

export default Logo;

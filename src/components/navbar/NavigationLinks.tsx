
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationItem {
  nameEn: string;
  nameAr: string;
  href: string;
}

interface NavigationLinksProps {
  navigationItems: NavigationItem[];
  onLinkClick: () => void;
}

const NavigationLinks = ({ navigationItems, onLinkClick }: NavigationLinksProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  const isArabic = language === 'ar';

  return (
    <div className="hidden xl:flex items-center space-x-1 flex-1 justify-center max-w-4xl mx-4 overflow-hidden">
      <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`relative px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all duration-300 group whitespace-nowrap ${
                isActive 
                  ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={onLinkClick}
            >
              <span className="relative z-10">{isArabic ? item.nameAr : item.nameEn}</span>
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
              )}
              <div className={`absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-4 -translate-x-1/2' 
                  : 'w-0 group-hover:w-4 group-hover:-translate-x-1/2'
              }`}></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationLinks;

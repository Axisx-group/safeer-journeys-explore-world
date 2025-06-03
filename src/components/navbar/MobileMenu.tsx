
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import CurrencyDropdown from "@/components/CurrencyDropdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

interface NavigationItem {
  nameEn: string;
  nameAr: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navigationItems: NavigationItem[];
  onLinkClick: () => void;
}

const MobileMenu = ({ isOpen, navigationItems, onLinkClick }: MobileMenuProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const isArabic = language === 'ar';

  if (!isOpen) return null;

  return (
    <div className="xl:hidden bg-white border-t border-gray-200 shadow-lg w-full absolute top-full left-0 right-0 z-[9999]">
      <div className="px-2 sm:px-4 pt-2 pb-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white">
        {/* Mobile Navigation Links */}
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 w-full bg-white ${
                isActive 
                  ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
              }`}
              onClick={onLinkClick}
            >
              <div className={`w-1 h-5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full transition-opacity duration-300 mr-3 flex-shrink-0 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}></div>
              <span className="truncate">{isArabic ? item.nameAr : item.nameEn}</span>
            </Link>
          );
        })}
        
        {/* Mobile Controls Section */}
        <div className="pt-4 border-t border-gray-200 mt-4 space-y-3 bg-white">
          {/* Mobile Currency and Language */}
          <div className="flex items-center justify-center gap-4 bg-white">
            <CurrencyDropdown />
            <LanguageToggle />
          </div>
          
          {/* Mobile Login Button */}
          {!user && (
            <Link to="/auth" onClick={onLinkClick} className="block w-full">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>{isArabic ? 'تسجيل الدخول' : 'Login'}</span>
                </div>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

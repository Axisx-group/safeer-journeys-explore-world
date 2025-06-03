
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import CurrencyDropdown from "@/components/CurrencyDropdown";
import UserMenu from "@/components/UserMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

interface NavbarControlsProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onLinkClick: () => void;
}

const NavbarControls = ({ isMenuOpen, onMenuToggle, onLinkClick }: NavbarControlsProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isArabic = language === 'ar';

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
      {/* Desktop Controls */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
        <div className="relative">
          <CurrencyDropdown />
        </div>
        <div className="relative">
          <LanguageToggle />
        </div>
      </div>
      
      {/* Authentication Section */}
      {user ? (
        <UserMenu />
      ) : (
        <Link to="/auth" className="hidden sm:block" onClick={onLinkClick}>
          <Button 
            size="sm" 
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white font-bold px-2 lg:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-1 lg:gap-2">
              <LogIn className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="text-xs lg:text-sm">{isArabic ? 'دخول' : 'Login'}</span>
            </div>
          </Button>
        </Link>
      )}

      {/* Mobile Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuToggle}
        className="xl:hidden p-2 hover:bg-blue-50 rounded-lg transition-all duration-200"
      >
        {isMenuOpen ? (
          <X className="h-5 w-5 text-gray-700" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700" />
        )}
      </Button>
    </div>
  );
};

export default NavbarControls;

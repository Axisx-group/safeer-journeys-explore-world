
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import CurrencyDropdown from "./CurrencyDropdown";
import UserMenu from "./UserMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const isArabic = language === 'ar';

  const navigationItems = [
    { 
      nameEn: "Home", 
      nameAr: "الرئيسية", 
      href: "/" 
    },
    { 
      nameEn: "Flights", 
      nameAr: "الطيران", 
      href: "/flights" 
    },
    { 
      nameEn: "Hotels", 
      nameAr: "الفنادق", 
      href: "/hotels" 
    },
    { 
      nameEn: "Car Rental", 
      nameAr: "تأجير السيارات", 
      href: "/car-rental" 
    },
    { 
      nameEn: "Currency Exchange", 
      nameAr: "أسعار الصرف", 
      href: "/currency-exchange" 
    },
    { 
      nameEn: "Services", 
      nameAr: "الخدمات", 
      href: "/services" 
    },
    { 
      nameEn: "Offers", 
      nameAr: "العروض", 
      href: "/offers" 
    },
    { 
      nameEn: "Support", 
      nameAr: "الدعم", 
      href: "/support" 
    }
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white via-gray-50 to-white shadow-xl z-50 border-b border-gray-200/50 backdrop-blur-lg w-full">
        <div className="w-full max-w-none px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 min-w-0">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1 sm:space-x-2 group flex-shrink-0 min-w-0" onClick={handleLinkClick}>
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

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1 flex-1 justify-center max-w-4xl mx-4 overflow-hidden">
              <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
                {navigationItems.map((item, index) => {
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
                      onClick={handleLinkClick}
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

            {/* Right Side Controls */}
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
                <Link to="/auth" className="hidden sm:block" onClick={handleLinkClick}>
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
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200/50 shadow-lg w-full absolute top-full left-0 right-0 z-40">
            <div className="px-2 sm:px-4 pt-2 pb-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Mobile Navigation Links */}
              {navigationItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 w-full ${
                      isActive 
                        ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                    }`}
                    onClick={handleLinkClick}
                  >
                    <div className={`w-1 h-5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full transition-opacity duration-300 mr-3 flex-shrink-0 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    <span className="truncate">{isArabic ? item.nameAr : item.nameEn}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Controls Section */}
              <div className="pt-4 border-t border-gray-200 mt-4 space-y-3">
                {/* Mobile Currency and Language */}
                <div className="flex items-center justify-center gap-4">
                  <CurrencyDropdown />
                  <LanguageToggle />
                </div>
                
                {/* Mobile Login Button */}
                {!user && (
                  <Link to="/auth" onClick={handleLinkClick} className="block w-full">
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
        )}
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default Navbar;

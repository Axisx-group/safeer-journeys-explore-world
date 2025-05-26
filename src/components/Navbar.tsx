
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import CurrencyDropdown from "./CurrencyDropdown";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const navigationItems = [
    { 
      nameEn: "Home", 
      nameAr: "الرئيسية", 
      href: "/" 
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

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-gradient-to-r from-white via-gray-50 to-white shadow-xl sticky top-0 z-50 border-b border-gray-200/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Enhanced with better styling */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <Plane className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-md border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-blue-600 transition-all duration-500">
                  ur trvl
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  {isArabic ? 'اكتشف العالم معنا' : 'Discover the World'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{isArabic ? item.nameAr : item.nameEn}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                  <div className="absolute bottom-2 left-1/2 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Desktop Controls */}
              <div className="hidden md:flex items-center space-x-3">
                {/* Enhanced Currency Dropdown */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CurrencyDropdown />
                  </div>
                </div>
                
                {/* Enhanced Language Toggle */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1 shadow-lg hover:shadow-xl transition-all duration-300">
                    <LanguageToggle />
                  </div>
                </div>
              </div>
              
              {/* Enhanced Book Now Button */}
              <Link to="/booking" className="hidden md:block">
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative z-10">{isArabic ? 'احجز الآن' : 'Book Now'}</span>
                  <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                </Button>
              </Link>

              {/* Mobile Controls */}
              <div className="md:hidden flex items-center space-x-2">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1 shadow-lg">
                  <CurrencyDropdown />
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1 shadow-lg">
                  <LanguageToggle />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg"
                >
                  <div className="relative">
                    {isMenuOpen ? (
                      <X className="h-6 w-6 text-gray-700 transform rotate-90 transition-transform duration-300" />
                    ) : (
                      <Menu className="h-6 w-6 text-gray-700 transition-transform duration-300" />
                    )}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl">
            <div className="px-6 pt-6 pb-8 space-y-3">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2 border border-transparent hover:border-blue-200 group"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3"></div>
                  <span className="relative">
                    {isArabic ? item.nameAr : item.nameEn}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group-hover:w-full transition-all duration-300"></div>
                  </span>
                </Link>
              ))}
              
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block pt-6">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-lg">{isArabic ? 'احجز الآن' : 'Book Now'}</span>
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30"></div>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

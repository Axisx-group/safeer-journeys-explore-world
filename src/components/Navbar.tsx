
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
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
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Plane className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-all duration-300 transform group-hover:rotate-12" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-80"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ur trvl
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {isArabic ? 'اكتشف العالم معنا' : 'Discover the World'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 group"
                >
                  <span className="relative z-10">{isArabic ? item.nameAr : item.nameEn}</span>
                  <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></div>
                </Link>
              ))}
              
              {/* Enhanced Language Control */}
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <div className="transform hover:scale-110 transition-all duration-300 hover:shadow-lg rounded-lg">
                  <LanguageToggle />
                </div>
              </div>
              
              <Link to="/booking" className="ml-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {isArabic ? 'احجز الآن' : 'Book Now'}
                  <div className="absolute inset-0 bg-white opacity-20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <div className="transform hover:scale-110 transition-all duration-300 hover:shadow-lg rounded-lg">
                <LanguageToggle />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700 transform rotate-0 transition-transform duration-300" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700 transform rotate-0 transition-transform duration-300" />
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-base font-medium transition-all duration-200 transform hover:translate-x-1"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span>{isArabic ? item.nameAr : item.nameEn}</span>
                  </div>
                </Link>
              ))}
              
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block pt-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  {isArabic ? 'احجز الآن' : 'Book Now'}
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

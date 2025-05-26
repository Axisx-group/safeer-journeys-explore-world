
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import CurrencyDropdown from "./CurrencyDropdown";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
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
      {/* Contact Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@traveltours.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{isArabic ? 'خدمة عالمية 24/7' : '24/7 Global Service'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <CurrencyDropdown 
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                {isArabic ? 'رحلات السفر' : 'Travel Tours'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {isArabic ? item.nameAr : item.nameEn}
                </Link>
              ))}
              
              <Link to="/booking">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  {isArabic ? 'احجز الآن' : 'Book Now'}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <CurrencyDropdown 
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              <LanguageToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isArabic ? item.nameAr : item.nameEn}
                </Link>
              ))}
              
              <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
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

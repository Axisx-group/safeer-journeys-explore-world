
import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('brandName')}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('home')}
            </a>
            <a href="#hotels" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('hotels')}
            </a>
            <a href="#flights" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('flights')}
            </a>
            <a href="#cars" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('cars')}
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('about')}
            </a>
            <LanguageToggle />
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              {t('login')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              {t('home')}
            </a>
            <a href="#hotels" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              {t('hotels')}
            </a>
            <a href="#flights" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              {t('flights')}
            </a>
            <a href="#cars" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              {t('cars')}
            </a>
            <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              {t('about')}
            </a>
            <div className="px-4 pt-2">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                {t('login')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

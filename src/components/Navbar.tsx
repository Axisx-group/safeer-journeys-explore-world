
import { useState } from "react";
import Logo from "./navbar/Logo";
import NavigationLinks from "./navbar/NavigationLinks";
import NavbarControls from "./navbar/NavbarControls";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white via-gray-50 to-white shadow-xl z-50 border-b border-gray-200/50 backdrop-blur-lg w-full">
        <div className="w-full max-w-none px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 min-w-0">
            {/* Logo */}
            <Logo onClick={handleLinkClick} />

            {/* Desktop Navigation */}
            <NavigationLinks 
              navigationItems={navigationItems}
              onLinkClick={handleLinkClick}
            />

            {/* Right Side Controls */}
            <NavbarControls 
              isMenuOpen={isMenuOpen}
              onMenuToggle={handleMenuToggle}
              onLinkClick={handleLinkClick}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileMenu 
          isOpen={isMenuOpen}
          navigationItems={navigationItems}
          onLinkClick={handleLinkClick}
        />
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default Navbar;

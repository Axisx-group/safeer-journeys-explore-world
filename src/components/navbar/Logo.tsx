
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface LogoProps {
  onClick: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Link to="/" className="flex items-center group flex-shrink-0 min-w-0" onClick={onClick}>
      <div className="relative flex-shrink-0">
        <img 
          src="/lovable-uploads/ff36d5d5-d767-427c-b9e9-0ef00edf10d2.png" 
          alt="ur trvl"
          className="h-8 w-auto sm:h-10 md:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  );
};

export default Logo;

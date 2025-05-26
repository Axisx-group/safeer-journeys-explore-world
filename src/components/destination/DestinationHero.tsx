
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Destination } from "@/hooks/useDestinations";

interface DestinationHeroProps {
  destination: Destination;
}

const DestinationHero = ({ destination }: DestinationHeroProps) => {
  const { language } = useLanguage();

  return (
    <div className="relative h-96 rounded-lg overflow-hidden mb-8">
      <img 
        src={destination.image_urls?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
        alt={language === 'ar' ? destination.name_ar : destination.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">
            {language === 'ar' ? destination.name_ar : destination.name}
          </h1>
          <div className="flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{language === 'ar' ? destination.country_ar : destination.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationHero;

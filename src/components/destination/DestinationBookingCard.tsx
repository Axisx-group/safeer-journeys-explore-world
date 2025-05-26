
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const DestinationBookingCard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <Card>
      <CardContent className="p-6">
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          onClick={() => navigate('/booking')}
        >
          {language === 'ar' ? 'احجز رحلة إلى هذه الوجهة' : 'Book Trip to this Destination'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationBookingCard;

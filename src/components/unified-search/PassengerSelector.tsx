
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Users, Baby, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface PassengerSelectorProps {
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  onPassengersChange: (passengers: { adults: number; children: number; infants: number }) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const PassengerSelector = ({ passengers, onPassengersChange, isOpen, onToggle }: PassengerSelectorProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const updatePassengers = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    const newPassengers = { ...passengers };
    if (increment) {
      newPassengers[type] += 1;
    } else if (newPassengers[type] > 0) {
      newPassengers[type] -= 1;
    }
    
    // Ensure at least one adult
    if (type === 'adults' && newPassengers.adults < 1) {
      newPassengers.adults = 1;
    }
    
    onPassengersChange(newPassengers);
  };

  const getTotalPassengers = () => passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={onToggle}
        className="w-full h-14 justify-between text-left border-2 border-gray-200 hover:border-blue-500 rounded-xl"
      >
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <span className="font-medium">
            {getTotalPassengers()} {isArabic ? 'مسافر' : 'Passengers'}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {passengers.adults > 0 && `${passengers.adults} ${isArabic ? 'بالغ' : 'Adults'}`}
          {passengers.children > 0 && `, ${passengers.children} ${isArabic ? 'طفل' : 'Children'}`}
          {passengers.infants > 0 && `, ${passengers.infants} ${isArabic ? 'رضيع' : 'Infants'}`}
        </div>
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 z-50 mt-2"
        >
          <Card className="shadow-xl border-2">
            <CardContent className="p-6 space-y-6">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{isArabic ? 'البالغون' : 'Adults'}</div>
                    <div className="text-sm text-gray-500">
                      {isArabic ? '18 سنة فأكثر' : '18+ years'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updatePassengers('adults', false)}
                    disabled={passengers.adults <= 1}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{passengers.adults}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updatePassengers('adults', true)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">{isArabic ? 'الأطفال' : 'Children'}</div>
                    <div className="text-sm text-gray-500">
                      {isArabic ? '2-17 سنة' : '2-17 years'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updatePassengers('children', false)}
                    disabled={passengers.children <= 0}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{passengers.children}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updatePassengers('children', true)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Baby className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">{isArabic ? 'الرُضّع' : 'Infants'}</div>
                    <div className="text-sm text-gray-500">
                      {isArabic ? 'أقل من سنتين' : 'Under 2 years'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updatePassengers('infants', false)}
                    disabled={passengers.infants <= 0}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{passengers.infants}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updatePassengers('infants', true)}
                    disabled={passengers.infants >= passengers.adults}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {passengers.infants >= passengers.adults && (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                  {isArabic 
                    ? 'عدد الرُضّع لا يمكن أن يتجاوز عدد البالغين'
                    : 'Number of infants cannot exceed number of adults'
                  }
                </div>
              )}

              <Button
                type="button"
                onClick={onToggle}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isArabic ? 'تطبيق' : 'Apply'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PassengerSelector;

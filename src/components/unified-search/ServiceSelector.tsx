
import { Checkbox } from "@/components/ui/checkbox";
import { Plane, Hotel, Car, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface ServiceSelectorProps {
  includeFlights: boolean;
  includeHotels: boolean;
  includeCars: boolean;
  onFlightsChange: (checked: boolean | "indeterminate") => void;
  onHotelsChange: (checked: boolean | "indeterminate") => void;
  onCarsChange: (checked: boolean | "indeterminate") => void;
}

const ServiceSelector = ({
  includeFlights,
  includeHotels,
  includeCars,
  onFlightsChange,
  onHotelsChange,
  onCarsChange
}: ServiceSelectorProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const services = [
    {
      id: 'flights',
      checked: includeFlights,
      onChange: onFlightsChange,
      icon: Plane,
      label: isArabic ? 'طيران' : 'Flights',
      description: isArabic ? 'تذاكر طيران بأفضل الأسعار' : 'Best flight deals',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'hotels',
      checked: includeHotels,
      onChange: onHotelsChange,
      icon: Hotel,
      label: isArabic ? 'فنادق' : 'Hotels',
      description: isArabic ? 'إقامة مريحة ومميزة' : 'Comfortable stays',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 'cars',
      checked: includeCars,
      onChange: onCarsChange,
      icon: Car,
      label: isArabic ? 'سيارات' : 'Cars',
      description: isArabic ? 'استئجار سيارات سهل' : 'Easy car rentals',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100'
    }
  ];

  return (
    <div className="mb-10">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
      >
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        {isArabic ? 'اختر الخدمات المطلوبة:' : 'Select Services:'}
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                service.checked ? 'scale-105' : ''
              }`}
              onClick={() => service.onChange(!service.checked)}
            >
              {/* Selection glow effect */}
              {service.checked && (
                <div className={`absolute -inset-2 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-20 animate-pulse`}></div>
              )}
              
              <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                service.checked 
                  ? `bg-gradient-to-br ${service.bgColor} border-transparent shadow-xl` 
                  : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
              }`}>
                {/* Selection indicator */}
                {service.checked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3"
                  >
                    <CheckCircle className={`h-6 w-6 text-gradient bg-gradient-to-r ${service.color} bg-clip-text`} />
                  </motion.div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Checkbox 
                      id={service.id}
                      checked={service.checked} 
                      onCheckedChange={service.onChange}
                      className="w-5 h-5"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor={service.id} className="flex items-center gap-3 cursor-pointer">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      
                      <div>
                        <div className="text-lg font-bold text-gray-800 mb-1">
                          {service.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {service.description}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelector;

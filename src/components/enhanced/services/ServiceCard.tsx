
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Service } from "./types";

interface ServiceCardProps {
  service: Service;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServiceCard = ({ service, index, isHovered, onMouseEnter, onMouseLeave }: ServiceCardProps) => {
  const { language } = useLanguage();
  const IconComponent = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative group"
    >
      {/* Glow effect */}
      {isHovered && (
        <div className={`absolute -inset-2 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-20 animate-pulse`}></div>
      )}
      
      <Card className={`relative h-full transition-all duration-500 transform hover:-translate-y-3 border-0 overflow-hidden ${
        isHovered ? 'shadow-2xl scale-105' : 'shadow-xl hover:shadow-2xl'
      } bg-white/95 backdrop-blur-sm`}>
        
        {/* Popular badge */}
        {service.popular && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              {language === 'ar' ? 'الأكثر طلباً' : 'Popular'}
            </Badge>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
        
        <CardHeader className="relative pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-700">{service.rating}</span>
            </div>
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {language === 'ar' ? service.titleAr : service.titleEn}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative">
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {language === 'ar' ? service.descAr : service.descEn}
          </p>
          
          {/* Features */}
          <div className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex items-center text-xs text-gray-600"
              >
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Action Button */}
          <Button className={`w-full group-hover:bg-gradient-to-r group-hover:${service.color} transition-all duration-300 rounded-xl font-semibold py-2.5 shadow-lg hover:shadow-xl transform group-hover:scale-105`}>
            {language === 'ar' ? 'احجز الآن' : 'Book Now'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;

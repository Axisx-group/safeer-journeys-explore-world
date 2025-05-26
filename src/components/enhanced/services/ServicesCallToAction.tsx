
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const ServicesCallToAction = () => {
  const { language } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center mt-20"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <Card className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white border-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          
          <CardContent className="relative p-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Headphones className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'ar' ? 'لا تجد ما تبحث عنه؟' : "Can't find what you're looking for?"}
            </h3>
            
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'تواصل معنا وسنساعدك في تخصيص الخدمة المناسبة لاحتياجاتك الخاصة'
                : 'Contact us and we\'ll help you customize the right service for your specific needs'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-blue-600 font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Headphones className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Button>
              
              <Button variant="outline" size="lg" className="text-white border-white/50 hover:bg-white hover:text-blue-600 font-bold px-8 py-3 rounded-2xl transition-all duration-300">
                <Gift className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'طلب خدمة مخصصة' : 'Request Custom Service'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ServicesCallToAction;

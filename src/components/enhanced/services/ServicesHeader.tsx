
import { Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const ServicesHeader = () => {
  const { language } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 rounded-2xl shadow-2xl border-2 border-white/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Gift className="h-12 w-12 text-white" />
            </motion.div>
          </div>
        </div>
      </div>

      <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {language === 'ar' ? 'خدماتنا' : 'Our'}
        </span>
        <br />
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          {language === 'ar' ? 'الشاملة' : 'Comprehensive Services'}
        </span>
      </h2>
      
      <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
        {language === 'ar' 
          ? 'نقدم مجموعة واسعة من الخدمات المتميزة لجعل رحلتك مثالية من البداية إلى النهاية'
          : 'We offer a wide range of premium services to make your trip perfect from start to finish'
        }
      </p>
    </motion.div>
  );
};

export default ServicesHeader;

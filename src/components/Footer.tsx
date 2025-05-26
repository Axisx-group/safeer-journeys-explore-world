
import { Plane, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">{t('brandName')}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {language === 'ar' 
                ? 'شريكك المثالي في رحلات السفر والسياحة. نقدم أفضل الخدمات وأكثرها تميزاً لضمان رحلة لا تُنسى.'
                : 'Your perfect partner for travel and tourism. We provide the best and most distinguished services to ensure an unforgettable trip.'
              }
            </p>
            <div className={`flex gap-4 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
              <div className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg cursor-pointer transition-colors">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg cursor-pointer transition-colors">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="bg-pink-600 hover:bg-pink-700 p-2 rounded-lg cursor-pointer transition-colors">
                <Instagram className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'الخدمات' : 'Services'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'العروض' : 'Offers'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('hotelBooking')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('flightBooking')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('carRental')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('tours')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'التأمين' : 'Insurance'}
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">0033766555514</span>
              </div>
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Info@urtrvl.com</span>
              </div>
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">
                  {language === 'ar' ? 'باريس، فرنسا' : 'Paris, France'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {language === 'ar' 
              ? '© 2024 ur trvl. جميع الحقوق محفوظة.'
              : '© 2024 ur trvl. All rights reserved.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

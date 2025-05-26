
import { Plane, Facebook, Twitter, Instagram, Mail, Phone, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { europeanCurrencies } from "@/constants/europeanData";

const Footer = () => {
  const { t, language } = useLanguage();

  // Mock exchange rates for demonstration
  const exchangeRates = {
    'EUR': { rate: 1.0, change: 0.0, trend: 'stable' },
    'GBP': { rate: 0.85, change: 0.15, trend: 'up' },
    'CHF': { rate: 0.95, change: -0.08, trend: 'down' },
    'USD': { rate: 1.08, change: 0.02, trend: 'up' },
  };

  const topCurrencies = ['EUR', 'GBP', 'CHF', 'USD'].map(code => {
    const currency = europeanCurrencies.find(c => c.code === code) || 
      { code: 'USD', symbol: '$', name: 'US Dollar', nameAr: 'الدولار الأمريكي' };
    const rate = exchangeRates[code];
    return { ...currency, ...rate };
  }).filter(Boolean);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Currency Exchange Section */}
      <div className="bg-gray-800 py-8 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {language === 'ar' ? 'أسعار الصرف الحية' : 'Live Exchange Rates'}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === 'ar' ? 'تحديث مباشر كل 15 دقيقة' : 'Updated every 15 minutes'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topCurrencies.map((currency) => (
              <Card key={currency.code} className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-400">{currency.symbol}</span>
                      <span className="text-sm text-gray-300">{currency.code}</span>
                    </div>
                    {getTrendIcon(currency.trend)}
                  </div>
                  
                  <div className="text-lg font-bold text-white mb-1">
                    {currency.rate?.toFixed(2)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        currency.trend === 'up' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : currency.trend === 'down'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {currency.trend === 'up' ? '+' : currency.trend === 'down' ? '' : ''}
                      {currency.change?.toFixed(2)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ur trvl</span>
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
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'الخدمات' : 'Services'}
              </Link></li>
              <li><Link to="/offers" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'العروض' : 'Offers'}
              </Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'الدعم' : 'Support'}
            </h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'الأسئلة المتكررة' : 'FAQ'}
              </Link></li>
              <li><Link to="/manage-trips" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'إدارة رحلاتك' : 'Manage Trips'}
              </Link></li>
              <li><Link to="/customer-service" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
              </Link></li>
              <li><Link to="/safety-info" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'معلومات السلامة' : 'Safety Info'}
              </Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'الشروط والإعدادات' : 'Terms & Settings'}
            </h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'الخصوصية' : 'Privacy Policy'}
              </Link></li>
              <li><Link to="/cookie-settings" className="text-gray-300 hover:text-white transition-colors">
                {language === 'ar' ? 'إعدادات ملفات تعريف الارتباط' : 'Cookie Settings'}
              </Link></li>
              <li>
                <div className={`flex items-center gap-3 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">0033766555514</span>
                </div>
              </li>
              <li>
                <div className={`flex items-center gap-3 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">Info@urtrvl.com</span>
                </div>
              </li>
            </ul>
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


import { Plane, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Ur Travel</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              شريكك المثالي في رحلات السفر والسياحة. نقدم أفضل الخدمات وأكثرها تميزاً لضمان رحلة لا تُنسى.
            </p>
            <div className="flex space-x-4 space-x-reverse">
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
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">من نحن</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">الخدمات</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">العروض</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">حجز الفنادق</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">حجز الطيران</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">تأجير السيارات</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">الجولات السياحية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">التأمين</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+966 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@urtravel.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Ur Travel. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { Button } from "@/components/ui/button";
import { Bell, BarChart3, Database, User, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminPageHeader = () => {
  const { language } = useLanguage();

  const handleNotifications = () => {
    console.log('تم النقر على الإشعارات');
    // يمكن إضافة منطق الإشعارات هنا
  };

  const handleReports = () => {
    console.log('تم النقر على التقارير المتقدمة');
    // يمكن إضافة منطق التقارير هنا
  };

  const handleBackup = () => {
    console.log('تم النقر على النسخ الاحتياطي');
    // يمكن إضافة منطق النسخ الاحتياطي هنا
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-8">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold">
                {language === 'ar' ? 'نظام الإدارة المتقدم والشامل' : 'Advanced Comprehensive Management System'}
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              {language === 'ar' ? 'نظام إدارة متطور مع تحليلات متقدمة ومراقبة شاملة' : 'Advanced management system with comprehensive analytics and monitoring'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              onClick={handleNotifications}
            >
              <Bell className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              onClick={handleReports}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'التقارير المتقدمة' : 'Advanced Reports'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              onClick={handleBackup}
            >
              <Database className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'النسخ الاحتياطي' : 'Backup'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageHeader;

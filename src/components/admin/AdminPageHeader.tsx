
import { Button } from "@/components/ui/button";
import { Bell, BarChart3, Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminPageHeader = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'نظام الإدارة المتقدم والشامل' : 'Advanced Comprehensive Management System'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' ? 'نظام إدارة متطور مع تحليلات متقدمة ومراقبة شاملة' : 'Advanced management system with comprehensive analytics and monitoring'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'التقارير المتقدمة' : 'Advanced Reports'}
            </Button>
            <Button variant="outline" size="sm">
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

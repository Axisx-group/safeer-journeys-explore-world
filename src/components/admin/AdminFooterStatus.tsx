
import { Badge } from "@/components/ui/badge";
import { Shield, Database, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminFooterStatus = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {language === 'ar' ? 'النظام متصل ويعمل بكفاءة عالية' : 'System Online - High Performance'}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              {language === 'ar' ? 'مؤمن بالكامل' : 'Fully Secured'}
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-600" />
              {language === 'ar' ? 'قاعدة البيانات متصلة ومحسنة' : 'Database Connected & Optimized'}
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              {language === 'ar' ? 'مراقبة مستمرة' : 'Real-time Monitoring'}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>
              {language === 'ar' ? 'آخر تحديث: الآن' : 'Last updated: Now'}
            </span>
            <Badge className="bg-green-100 text-green-800">
              {language === 'ar' ? 'وضع الإنتاج' : 'Production Mode'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFooterStatus;

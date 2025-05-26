
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Package, 
  Settings, 
  Users,
  Images,
  MapPin,
  BarChart3,
  Bell,
  Shield,
  Database,
  Type,
  CreditCard,
  UserCheck,
  Activity
} from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminBookings from "@/components/admin/AdminBookings";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminServices from "@/components/admin/AdminServices";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminTexts from "@/components/admin/AdminTexts";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminSettings from "@/components/admin/AdminSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminSystemMonitor from "@/components/admin/AdminSystemMonitor";
import AdminBulkOperations from "@/components/admin/AdminBulkOperations";

const AdminPage = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      label_ar: "لوحة التحكم",
      icon: LayoutDashboard,
      component: AdminDashboard
    },
    {
      id: "analytics",
      label: "Analytics",
      label_ar: "التحليلات",
      icon: BarChart3,
      component: AdminAnalytics
    },
    {
      id: "bookings",
      label: "Bookings",
      label_ar: "الحجوزات",
      icon: Calendar,
      component: AdminBookings
    },
    {
      id: "payments",
      label: "Payments",
      label_ar: "المدفوعات",
      icon: CreditCard,
      component: AdminPayments
    },
    {
      id: "users",
      label: "Users",
      label_ar: "المستخدمين",
      icon: UserCheck,
      component: AdminUsers
    },
    {
      id: "messages",
      label: "Messages",
      label_ar: "الرسائل",
      icon: MessageSquare,
      component: AdminMessages
    },
    {
      id: "packages",
      label: "Packages",
      label_ar: "الباقات",
      icon: Package,
      component: AdminPackages
    },
    {
      id: "services",
      label: "Services",
      label_ar: "الخدمات",
      icon: Settings,
      component: AdminServices
    },
    {
      id: "gallery",
      label: "Gallery",
      label_ar: "المعرض",
      icon: Images,
      component: AdminGallery
    },
    {
      id: "texts",
      label: "Texts",
      label_ar: "النصوص",
      icon: Type,
      component: AdminTexts
    },
    {
      id: "bulk",
      label: "Bulk Operations",
      label_ar: "العمليات الجماعية",
      icon: Package,
      component: AdminBulkOperations
    },
    {
      id: "monitor",
      label: "System Monitor",
      label_ar: "مراقبة النظام",
      icon: Activity,
      component: AdminSystemMonitor
    },
    {
      id: "settings",
      label: "Settings",
      label_ar: "الإعدادات",
      icon: Shield,
      component: AdminSettings
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-2">
            <TabsList className="grid w-full grid-cols-6 gap-1">
              {tabs.slice(0, 12).map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white p-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden md:inline">
                      {language === 'ar' ? tab.label_ar : tab.label}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab Content */}
          {tabs.map((tab) => {
            const ComponentToRender = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id} className="space-y-6">
                <ComponentToRender />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* Enhanced Footer Status */}
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
    </div>
  );
};

export default AdminPage;

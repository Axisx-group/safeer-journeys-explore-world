
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Database
} from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminBookings from "@/components/admin/AdminBookings";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminServices from "@/components/admin/AdminServices";
import AdminGallery from "@/components/admin/AdminGallery";
import { useLanguage } from "@/contexts/LanguageContext";

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
      id: "bookings",
      label: "Bookings",
      label_ar: "الحجوزات",
      icon: Calendar,
      component: AdminBookings
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
                {language === 'ar' ? 'إدارة النظام المتقدم' : 'Advanced System Management'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'ar' ? 'نظام إدارة شامل مدعوم بالذكاء الاصطناعي' : 'AI-Powered Comprehensive Management System'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'التقارير' : 'Reports'}
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
            <TabsList className="grid w-full grid-cols-6 gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">
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

      {/* Footer Status */}
      <div className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {language === 'ar' ? 'النظام متصل' : 'System Online'}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {language === 'ar' ? 'آمن' : 'Secure'}
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                {language === 'ar' ? 'قاعدة البيانات متصلة' : 'Database Connected'}
              </div>
            </div>
            <div>
              {language === 'ar' ? 'آخر تحديث: منذ دقيقتين' : 'Last updated: 2 minutes ago'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

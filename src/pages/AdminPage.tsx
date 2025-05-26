
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminBookings from "@/components/admin/AdminBookings";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminServices from "@/components/admin/AdminServices";
import AdminGallery from "@/components/admin/AdminGallery";
import { 
  Calendar, 
  MessageSquare, 
  Package, 
  Settings, 
  Image,
  BarChart3,
  Users,
  TrendingUp
} from "lucide-react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم الإدارية</h1>
          <p className="text-gray-600">إدارة شاملة لموقع السياحة والسفر</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة المعلومات
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              الحجوزات
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              الرسائل
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              العروض
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الخدمات
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              المعرض
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الحجوزات</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">+20% من الشهر الماضي</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الرسائل الجديدة</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 اليوم</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">العروض النشطة</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">5 مميزة</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€45,231</div>
                  <p className="text-xs text-muted-foreground">+15% من الشهر الماضي</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الحجوزات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">أحمد محمد</p>
                        <p className="text-sm text-gray-500">رحلة إسطنبول - 5 أيام</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">مؤكد</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">فاطمة علي</p>
                        <p className="text-sm text-gray-500">رحلة مدريد - 7 أيام</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">في الانتظار</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">محمد حسن</p>
                        <p className="text-sm text-gray-500">رحلة روما - 4 أيام</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">مؤكد</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>معدل التحويل</span>
                      <span className="font-bold text-green-600">3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>متوسط قيمة الحجز</span>
                      <span className="font-bold">€650</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رضا العملاء</span>
                      <span className="font-bold text-blue-600">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>وقت الاستجابة</span>
                      <span className="font-bold text-orange-600">2.3 ساعة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <AdminBookings />
          </TabsContent>

          <TabsContent value="messages">
            <AdminMessages />
          </TabsContent>

          <TabsContent value="packages">
            <AdminPackages />
          </TabsContent>

          <TabsContent value="services">
            <AdminServices />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;

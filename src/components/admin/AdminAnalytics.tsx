
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar,
  Globe,
  Download,
  RefreshCw,
  Target,
  Activity,
  PieChart,
  LineChart
} from "lucide-react";

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  const analyticsData = {
    revenue: {
      current: 248500,
      previous: 198300,
      growth: 25.3,
      trend: "up"
    },
    bookings: {
      current: 1247,
      previous: 1156,
      growth: 7.9,
      trend: "up"
    },
    customers: {
      current: 3421,
      previous: 3198,
      growth: 7.0,
      trend: "up"
    },
    conversion: {
      current: 8.4,
      previous: 7.2,
      growth: 16.7,
      trend: "up"
    }
  };

  const topDestinations = [
    { name: "برشلونة", bookings: 342, revenue: 85500, growth: 23 },
    { name: "إسطنبول", bookings: 298, revenue: 71400, growth: 18 },
    { name: "مدريد", bookings: 267, revenue: 62800, growth: 15 },
    { name: "روما", bookings: 189, revenue: 45600, growth: 8 },
    { name: "أثينا", bookings: 151, revenue: 36300, growth: 12 }
  ];

  const trafficSources = [
    { source: "البحث المباشر", visitors: 2847, percentage: 42.3, conversion: 12.5 },
    { source: "وسائل التواصل", visitors: 1923, percentage: 28.6, conversion: 8.7 },
    { source: "الإعلانات المدفوعة", visitors: 1156, percentage: 17.2, conversion: 15.2 },
    { source: "المراجع", visitors: 801, percentage: 11.9, conversion: 6.8 }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التحليلات المتقدمة</h2>
          <p className="text-gray-600">رؤى تفصيلية عن أداء النظام</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="7d">آخر 7 أيام</option>
            <option value="30d">آخر 30 يوماً</option>
            <option value="90d">آخر 90 يوماً</option>
            <option value="1y">آخر سنة</option>
          </select>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
          <Button>
            <Download className="h-4 w-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(analyticsData).map(([key, data]) => (
          <Card key={key}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  key === 'revenue' ? 'bg-green-100' :
                  key === 'bookings' ? 'bg-blue-100' :
                  key === 'customers' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  {key === 'revenue' && <DollarSign className="h-6 w-6 text-green-600" />}
                  {key === 'bookings' && <Calendar className="h-6 w-6 text-blue-600" />}
                  {key === 'customers' && <Users className="h-6 w-6 text-purple-600" />}
                  {key === 'conversion' && <Target className="h-6 w-6 text-orange-600" />}
                </div>
                <Badge className={`${data.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {data.trend === 'up' ? <TrendingUp className="h-3 w-3 ml-1" /> : <TrendingDown className="h-3 w-3 ml-1" />}
                  {data.growth}%
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {key === 'revenue' ? `€${data.current.toLocaleString()}` : 
                   key === 'conversion' ? `${data.current}%` : 
                   data.current.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'revenue' ? 'إجمالي الإيرادات' :
                   key === 'bookings' ? 'إجمالي الحجوزات' :
                   key === 'customers' ? 'العملاء النشطون' : 'معدل التحويل'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="destinations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="destinations">أفضل الوجهات</TabsTrigger>
          <TabsTrigger value="traffic">مصادر الزيارات</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="forecast">التوقعات</TabsTrigger>
        </TabsList>

        <TabsContent value="destinations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                أفضل الوجهات أداءً
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDestinations.map((dest, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{dest.name}</h4>
                        <p className="text-sm text-gray-600">{dest.bookings} حجز</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{dest.revenue.toLocaleString()}</p>
                      <Badge className="bg-green-100 text-green-800">
                        +{dest.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                مصادر الزيارات وأداء التحويل
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{source.source}</h4>
                        <p className="text-sm text-gray-600">{source.visitors.toLocaleString()} زائر</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{source.percentage}%</p>
                        <p className="text-sm text-gray-600">تحويل: {source.conversion}%</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={source.percentage} className="h-2" />
                      <Progress value={source.conversion} className="h-1 opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الأداء الشهري</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <BarChart3 className="h-16 w-16 text-gray-400" />
                  <span className="ml-2 text-gray-600">مخطط الأداء الشهري</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <PieChart className="h-16 w-16 text-gray-400" />
                  <span className="ml-2 text-gray-600">مخطط دائري للإيرادات</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                التوقعات والاتجاهات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">توقعات الإيرادات</h4>
                  <p className="text-2xl font-bold text-blue-600">€325,000</p>
                  <p className="text-sm text-blue-700">الشهر القادم (+31%)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">الحجوزات المتوقعة</h4>
                  <p className="text-2xl font-bold text-green-600">1,680</p>
                  <p className="text-sm text-green-700">الشهر القادم (+35%)</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">عملاء جدد</h4>
                  <p className="text-2xl font-bold text-purple-600">420</p>
                  <p className="text-sm text-purple-700">الشهر القادم (+23%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;

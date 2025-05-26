
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin, 
  Calendar,
  Plane,
  Star,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Globe,
  Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { language } = useLanguage();

  const stats = [
    {
      title: 'إجمالي الحجوزات',
      title_en: 'Total Bookings',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'الإيرادات الشهرية',
      title_en: 'Monthly Revenue',
      value: '€184,290',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'العملاء النشطون',
      title_en: 'Active Users',
      value: '12,486',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'متوسط التقييم',
      title_en: 'Average Rating',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const aiInsights = [
    {
      title: 'أكثر الوجهات طلباً',
      title_en: 'Top Destinations',
      insight: 'برشلونة تشهد نمواً بنسبة 35% هذا الشهر',
      insight_en: 'Barcelona seeing 35% growth this month',
      type: 'trend'
    },
    {
      title: 'توقعات الذكاء الاصطناعي',
      title_en: 'AI Predictions',
      insight: 'متوقع زيادة الحجوزات بنسبة 20% الشهر القادم',
      insight_en: 'Expected 20% booking increase next month',
      type: 'prediction'
    },
    {
      title: 'تحليل المشاعر',
      title_en: 'Sentiment Analysis',
      insight: '94% من العملاء راضون عن خدماتنا',
      insight_en: '94% customer satisfaction rate',
      type: 'sentiment'
    }
  ];

  const recentBookings = [
    {
      id: 'BK-2025-001234',
      destination: 'Barcelona',
      customer: 'أحمد محمد',
      amount: '€1,250',
      status: 'confirmed',
      date: '2025-01-26'
    },
    {
      id: 'BK-2025-001235',
      destination: 'Paris',
      customer: 'فاطمة علي',
      amount: '€2,100',
      status: 'pending',
      date: '2025-01-26'
    },
    {
      id: 'BK-2025-001236',
      destination: 'Istanbul',
      customer: 'محمد أحمد',
      amount: '€890',
      status: 'confirmed',
      date: '2025-01-25'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ar' ? 'مرحباً بك في لوحة التحكم المتقدمة' : 'Welcome to Advanced Dashboard'}
            </h1>
            <p className="text-blue-100">
              {language === 'ar' ? 'إدارة شاملة مدعومة بالذكاء الاصطناعي' : 'AI-Powered Comprehensive Management'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-sm text-blue-100">{language === 'ar' ? 'وقت التشغيل' : 'Uptime'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">847</div>
              <div className="text-sm text-blue-100">{language === 'ar' ? 'حجوزات اليوم' : 'Today\'s Bookings'}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge 
                      className={`${
                        stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? stat.title : stat.title_en}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Insights & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              {language === 'ar' ? 'رؤى الذكاء الاصطناعي' : 'AI Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {language === 'ar' ? insight.title : insight.title_en}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? insight.insight : insight.insight_en}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {insight.type === 'trend' ? <TrendingUp className="h-3 w-3" /> :
                       insight.type === 'prediction' ? <Activity className="h-3 w-3" /> :
                       <Star className="h-3 w-3" />}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة عميل جديد' : 'Add New Customer'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة وجهة' : 'Add Destination'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plane className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إنشاء باقة' : 'Create Package'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'تقرير مفصل' : 'Detailed Report'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{language === 'ar' ? 'الحجوزات الأخيرة' : 'Recent Bookings'}</span>
              <Button variant="outline" size="sm">
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{booking.id}</p>
                    <p className="text-xs text-gray-600">{booking.customer} • {booking.destination}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{booking.amount}</p>
                    <Badge 
                      className={
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {booking.status === 'confirmed' ? 
                        (language === 'ar' ? 'مؤكد' : 'Confirmed') : 
                        (language === 'ar' ? 'معلق' : 'Pending')
                      }
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'حالة النظام' : 'System Status'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{language === 'ar' ? 'أداء الخادم' : 'Server Performance'}</span>
                <span className="text-sm text-green-600">98.5%</span>
              </div>
              <Progress value={98.5} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{language === 'ar' ? 'قاعدة البيانات' : 'Database'}</span>
                <span className="text-sm text-green-600">99.2%</span>
              </div>
              <Progress value={99.2} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{language === 'ar' ? 'API الذكاء الاصطناعي' : 'AI API'}</span>
                <span className="text-sm text-green-600">97.8%</span>
              </div>
              <Progress value={97.8} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {language === 'ar' ? 'جميع الأنظمة تعمل بشكل طبيعي' : 'All systems operational'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

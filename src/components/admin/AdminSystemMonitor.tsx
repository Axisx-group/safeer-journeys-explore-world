
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  Globe,
  Shield,
  Clock,
  RefreshCw
} from "lucide-react";

const AdminSystemMonitor = () => {
  const [systemStats, setSystemStats] = useState({
    server: {
      status: "online",
      uptime: "99.8%",
      responseTime: 142,
      cpu: 23,
      memory: 67,
      disk: 45
    },
    database: {
      status: "online",
      connections: 45,
      queryTime: 89,
      storage: 78
    },
    api: {
      status: "online",
      requests: 12847,
      errors: 23,
      avgResponseTime: 156
    }
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "استخدام الذاكرة مرتفع - 67%",
      timestamp: "منذ 5 دقائق",
      severity: "medium"
    },
    {
      id: 2,
      type: "info",
      message: "تم تحديث النظام بنجاح",
      timestamp: "منذ ساعة",
      severity: "low"
    }
  ]);

  const services = [
    {
      name: "خدمة الحجوزات",
      status: "online",
      responseTime: 125,
      uptime: 99.9,
      requests: 5432
    },
    {
      name: "خدمة المدفوعات",
      status: "online",
      responseTime: 89,
      uptime: 99.8,
      requests: 3241
    },
    {
      name: "خدمة الإشعارات",
      status: "maintenance",
      responseTime: 0,
      uptime: 95.2,
      requests: 1876
    },
    {
      name: "خدمة الذكاء الاصطناعي",
      status: "online",
      responseTime: 234,
      uptime: 98.7,
      requests: 987
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800">متصل</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">صيانة</Badge>;
      case "offline":
        return <Badge className="bg-red-100 text-red-800">غير متصل</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setSystemStats(prev => ({
        ...prev,
        server: {
          ...prev.server,
          responseTime: Math.floor(Math.random() * 50) + 120,
          cpu: Math.floor(Math.random() * 20) + 15,
          memory: Math.floor(Math.random() * 15) + 60
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Server className="h-5 w-5 text-blue-600" />
              الخادم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">الحالة</span>
                {getStatusBadge(systemStats.server.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">وقت الاستجابة</span>
                <span className="font-semibold">{systemStats.server.responseTime}ms</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">المعالج</span>
                  <span className="text-sm">{systemStats.server.cpu}%</span>
                </div>
                <Progress value={systemStats.server.cpu} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">الذاكرة</span>
                  <span className="text-sm">{systemStats.server.memory}%</span>
                </div>
                <Progress value={systemStats.server.memory} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-green-600" />
              قاعدة البيانات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">الحالة</span>
                {getStatusBadge(systemStats.database.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">الاتصالات</span>
                <span className="font-semibold">{systemStats.database.connections}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">زمن الاستعلام</span>
                <span className="font-semibold">{systemStats.database.queryTime}ms</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">التخزين</span>
                  <span className="text-sm">{systemStats.database.storage}%</span>
                </div>
                <Progress value={systemStats.database.storage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-purple-600" />
              واجهة برمجة التطبيقات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">الحالة</span>
                {getStatusBadge(systemStats.api.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">الطلبات اليوم</span>
                <span className="font-semibold">{systemStats.api.requests.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">الأخطاء</span>
                <span className="font-semibold text-red-600">{systemStats.api.errors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">متوسط الاستجابة</span>
                <span className="font-semibold">{systemStats.api.avgResponseTime}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              حالة الخدمات
            </span>
            <Button size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{service.name}</h4>
                  {getStatusBadge(service.status)}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">وقت التشغيل</p>
                    <p className="font-semibold">{service.uptime}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">الاستجابة</p>
                    <p className="font-semibold">{service.responseTime}ms</p>
                  </div>
                  <div>
                    <p className="text-gray-600">الطلبات</p>
                    <p className="font-semibold">{service.requests}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            تنبيهات النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={
                alert.type === 'error' ? 'border-red-200 bg-red-50' :
                alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <AlertDescription className="font-medium">
                      {alert.message}
                    </AlertDescription>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {alert.severity === 'high' ? 'عالي' :
                     alert.severity === 'medium' ? 'متوسط' : 'منخفض'}
                  </Badge>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemMonitor;

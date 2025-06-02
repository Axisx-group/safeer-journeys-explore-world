
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, AlertTriangle, Activity, RefreshCw } from "lucide-react";
import { useSecurityLogs } from "@/hooks/useSecurityLogs";
import { useActiveSessions } from "@/hooks/useActiveSessions";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

const SecurityDashboard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { logs, isLoading: logsLoading, refetch: refetchLogs } = useSecurityLogs();
  const { sessions, isLoading: sessionsLoading, refetch: refetchSessions } = useActiveSessions();

  const recentLogs = logs.slice(0, 10);
  const failedAttempts = logs.filter(log => !log.success).length;
  const activeSessions = sessions.filter(session => session.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {isArabic ? 'مراقبة الأمان' : 'Security Monitoring'}
        </h2>
        <Button onClick={() => { refetchLogs(); refetchSessions(); }} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          {isArabic ? 'تحديث' : 'Refresh'}
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {isArabic ? 'الجلسات النشطة' : 'Active Sessions'}
                </p>
                <p className="text-2xl font-bold">{activeSessions}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {isArabic ? 'محاولات فاشلة' : 'Failed Attempts'}
                </p>
                <p className="text-2xl font-bold text-red-600">{failedAttempts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {isArabic ? 'إجمالي السجلات' : 'Total Logs'}
                </p>
                <p className="text-2xl font-bold">{logs.length}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {isArabic ? 'مستوى الأمان' : 'Security Level'}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {isArabic ? 'آمن' : 'Secure'}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList>
          <TabsTrigger value="logs">
            {isArabic ? 'سجلات الأمان' : 'Security Logs'}
          </TabsTrigger>
          <TabsTrigger value="sessions">
            {isArabic ? 'الجلسات النشطة' : 'Active Sessions'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>
                {isArabic ? 'أحدث أنشطة الأمان' : 'Recent Security Activities'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <p>{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
              ) : (
                <div className="space-y-4">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Badge variant={log.success ? "default" : "destructive"}>
                          {log.success ? (isArabic ? 'نجح' : 'Success') : (isArabic ? 'فشل' : 'Failed')}
                        </Badge>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          {log.resource && <p className="text-sm text-gray-500">{log.resource}</p>}
                          {!log.success && log.failure_reason && (
                            <p className="text-sm text-red-500">{log.failure_reason}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(log.created_at), {
                          addSuffix: true,
                          locale: isArabic ? ar : undefined
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>
                {isArabic ? 'الجلسات النشطة' : 'Active Sessions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sessionsLoading ? (
                <p>{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
              ) : (
                <div className="space-y-4">
                  {sessions.filter(session => session.is_active).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {session.device_info?.browser || 'Unknown Browser'}
                        </p>
                        <p className="text-sm text-gray-500">
                          IP: {session.ip_address || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isArabic ? 'آخر نشاط:' : 'Last activity:'} {
                            formatDistanceToNow(new Date(session.last_activity), {
                              addSuffix: true,
                              locale: isArabic ? ar : undefined
                            })
                          }
                        </p>
                      </div>
                      <Badge variant="outline">
                        {isArabic ? 'نشط' : 'Active'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;

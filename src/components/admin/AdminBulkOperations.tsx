
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Package, 
  Users, 
  Mail, 
  FileText, 
  Download, 
  Upload, 
  Play, 
  Pause, 
  CheckSquare,
  AlertCircle,
  Clock,
  CheckCircle
} from "lucide-react";

const AdminBulkOperations = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [operationProgress, setOperationProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");

  const bulkOperations = [
    {
      id: "update_status",
      name: "تحديث حالة الحجوزات",
      description: "تحديث حالة مجموعة من الحجوزات",
      icon: Package,
      color: "blue"
    },
    {
      id: "send_emails",
      name: "إرسال رسائل بريد إلكتروني",
      description: "إرسال رسائل جماعية للعملاء",
      icon: Mail,
      color: "green"
    },
    {
      id: "export_data",
      name: "تصدير البيانات",
      description: "تصدير بيانات مختارة إلى ملف",
      icon: Download,
      color: "purple"
    },
    {
      id: "import_data",
      name: "استيراد البيانات",
      description: "استيراد بيانات من ملف خارجي",
      icon: Upload,
      color: "orange"
    }
  ];

  const sampleBookings = [
    {
      id: "BK-2024-001",
      customer: "أحمد محمد",
      destination: "برشلونة",
      status: "pending",
      amount: 1200,
      date: "2024-01-15"
    },
    {
      id: "BK-2024-002",
      customer: "فاطمة علي",
      destination: "مدريد",
      status: "confirmed",
      amount: 1800,
      date: "2024-01-16"
    },
    {
      id: "BK-2024-003",
      customer: "محمد حسن",
      destination: "روما",
      status: "pending",
      amount: 950,
      date: "2024-01-17"
    }
  ];

  const [emailTemplate, setEmailTemplate] = useState({
    subject: "",
    message: ""
  });

  const handleSelectAll = () => {
    if (selectedItems.length === sampleBookings.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sampleBookings.map(booking => booking.id));
    }
  };

  const handleItemSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkOperation = async (operationId: string) => {
    setIsProcessing(true);
    setOperationProgress(0);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setOperationProgress(i);
    }

    setIsProcessing(false);
    setSelectedItems([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">مؤكد</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">معلق</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Bulk Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bulkOperations.map((operation) => {
          const IconComponent = operation.icon;
          return (
            <Card key={operation.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                  operation.color === 'blue' ? 'bg-blue-100' :
                  operation.color === 'green' ? 'bg-green-100' :
                  operation.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <IconComponent className={`h-6 w-6 ${
                    operation.color === 'blue' ? 'text-blue-600' :
                    operation.color === 'green' ? 'text-green-600' :
                    operation.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
                <h3 className="font-semibold mb-2">{operation.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{operation.description}</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  disabled={selectedItems.length === 0 && operation.id !== 'import_data'}
                  onClick={() => handleBulkOperation(operation.id)}
                >
                  تنفيذ
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Indicator */}
      {isProcessing && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center gap-3">
              <span>جاري تنفيذ العملية...</span>
              <Progress value={operationProgress} className="flex-1 max-w-xs" />
              <span className="text-sm">{operationProgress}%</span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Data Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              اختيار البيانات للعمليات الجماعية
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                تم اختيار {selectedItems.length} من {sampleBookings.length}
              </span>
              <Button size="sm" variant="outline" onClick={handleSelectAll}>
                {selectedItems.length === sampleBookings.length ? "إلغاء الكل" : "اختيار الكل"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedItems.length === sampleBookings.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>رقم الحجز</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>الوجهة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(booking.id)}
                        onCheckedChange={() => handleItemSelect(booking.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono">{booking.id}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>{booking.destination}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>€{booking.amount}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Email Template Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            قالب الرسائل الإلكترونية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">موضوع الرسالة</label>
            <Input
              value={emailTemplate.subject}
              onChange={(e) => setEmailTemplate(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="أدخل موضوع الرسالة..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">محتوى الرسالة</label>
            <Textarea
              value={emailTemplate.message}
              onChange={(e) => setEmailTemplate(prev => ({ ...prev, message: e.target.value }))}
              placeholder="أدخل محتوى الرسالة..."
              rows={6}
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={selectedItems.length === 0}>
              إرسال للمحددين ({selectedItems.length})
            </Button>
            <Button variant="outline">
              معاينة
            </Button>
            <Button variant="outline">
              حفظ كقالب
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBulkOperations;

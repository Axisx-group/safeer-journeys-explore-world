
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Filter, Download, Eye, Check, X, CreditCard, DollarSign } from "lucide-react";

const AdminPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // بيانات تجريبية للمدفوعات
  const payments = [
    {
      id: "1",
      transactionId: "PAY_001_2024",
      customerName: "أحمد محمد",
      customerEmail: "ahmed@example.com",
      amount: 1200,
      currency: "EUR",
      paymentMethod: "فيزا",
      status: "completed",
      bookingId: "BK-2024-000001",
      createdAt: "2024-01-15 14:30",
      description: "حجز رحلة إسطنبول"
    },
    {
      id: "2",
      transactionId: "PAY_002_2024",
      customerName: "فاطمة علي",
      customerEmail: "fatima@example.com",
      amount: 2400,
      currency: "EUR",
      paymentMethod: "ماستركارد",
      status: "pending",
      bookingId: "BK-2024-000002",
      createdAt: "2024-01-16 10:15",
      description: "حجز رحلة مدريد"
    },
    {
      id: "3",
      transactionId: "PAY_003_2024",
      customerName: "محمد حسن",
      customerEmail: "mohamed@example.com",
      amount: 800,
      currency: "EUR",
      paymentMethod: "أمريكان إكسبريس",
      status: "failed",
      bookingId: "BK-2024-000003",
      createdAt: "2024-01-16 16:45",
      description: "حجز رحلة روما"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">فشل</Badge>;
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800">مسترد</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = payments.reduce((sum, payment) => 
    payment.status === "completed" ? sum + payment.amount : sum, 0
  );

  return (
    <div className="space-y-6">
      {/* إحصائيات المدفوعات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المدفوعات</p>
                <p className="text-2xl font-bold">€{totalAmount}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المدفوعات المكتملة</p>
                <p className="text-2xl font-bold">{payments.filter(p => p.status === "completed").length}</p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">في الانتظار</p>
                <p className="text-2xl font-bold">{payments.filter(p => p.status === "pending").length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المدفوعات الفاشلة</p>
                <p className="text-2xl font-bold">{payments.filter(p => p.status === "failed").length}</p>
              </div>
              <X className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إدارة المدفوعات</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المدفوعات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 ml-2" />
                فلترة
              </Button>
            </div>
            <Button>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم المعاملة</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>طريقة الدفع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>رقم الحجز</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="font-mono text-sm">{payment.transactionId}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.customerName}</div>
                        <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">
                        {payment.currency} {payment.amount}
                      </div>
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{payment.bookingId}</div>
                    </TableCell>
                    <TableCell>{payment.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payment.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;

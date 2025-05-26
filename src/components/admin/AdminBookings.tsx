
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
import { Search, Filter, Download, Eye, Check, X } from "lucide-react";

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // بيانات تجريبية للحجوزات
  const bookings = [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      destination: "إسطنبول، تركيا",
      departureDate: "2024-02-15",
      returnDate: "2024-02-20",
      passengers: 2,
      totalPrice: 1200,
      status: "confirmed",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+966507654321",
      destination: "مدريد، إسبانيا",
      departureDate: "2024-03-01",
      returnDate: "2024-03-08",
      passengers: 4,
      totalPrice: 2400,
      status: "pending",
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      name: "محمد حسن",
      email: "mohamed@example.com",
      phone: "+966502345678",
      destination: "روما، إيطاليا",
      departureDate: "2024-02-25",
      returnDate: "2024-02-29",
      passengers: 2,
      totalPrice: 1500,
      status: "confirmed",
      createdAt: "2024-01-18"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">مؤكد</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الحجوزات</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الحجوزات..."
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
              تصدير Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العميل</TableHead>
                  <TableHead>الوجهة</TableHead>
                  <TableHead>تاريخ السفر</TableHead>
                  <TableHead>المسافرون</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.destination}</TableCell>
                    <TableCell>
                      <div>
                        <div>من: {booking.departureDate}</div>
                        <div>إلى: {booking.returnDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.passengers} شخص</TableCell>
                    <TableCell>€{booking.totalPrice}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {booking.status === "pending" && (
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

export default AdminBookings;

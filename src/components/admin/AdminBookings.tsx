
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
import { Search, Filter, Download, Eye, Check, X, RefreshCw, Loader2 } from "lucide-react";
import { useAdminData } from "@/hooks/useAdminData";
import { useToast } from "@/hooks/use-toast";

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();
  
  const { 
    bookings, 
    loading, 
    updateBookingStatus, 
    refetchData 
  } = useAdminData();

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
    booking.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateBookingStatus = async (bookingId: string, status: 'confirmed' | 'pending' | 'cancelled') => {
    setLoadingStates(prev => ({ ...prev, [bookingId]: true }));
    
    try {
      const success = await updateBookingStatus(bookingId, status);
      if (success) {
        toast({
          title: "تم التحديث بنجاح",
          description: `تم تحديث حالة الحجز إلى ${status}`,
        });
      }
    } catch (error) {
      console.error('خطأ في تحديث الحجز:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">جاري تحميل الحجوزات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-green-50">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between text-xl">
            <span>إدارة الحجوزات ({bookings.length})</span>
            <Button 
              onClick={refetchData}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              تحديث
            </Button>
          </CardTitle>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الحجوزات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80 bg-white border-white/20"
                />
              </div>
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Filter className="h-4 w-4 ml-2" />
                فلترة
              </Button>
            </div>
            <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30" variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-lg border border-green-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50">
                  <TableHead className="font-semibold">العميل</TableHead>
                  <TableHead className="font-semibold">الوجهة</TableHead>
                  <TableHead className="font-semibold">تاريخ السفر</TableHead>
                  <TableHead className="font-semibold">المسافرون</TableHead>
                  <TableHead className="font-semibold">المبلغ</TableHead>
                  <TableHead className="font-semibold">الحالة</TableHead>
                  <TableHead className="font-semibold">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-green-25 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.user_name}</div>
                        <div className="text-sm text-gray-500">{booking.user_email}</div>
                        {booking.user_phone && (
                          <div className="text-sm text-gray-500">{booking.user_phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{booking.destination}</TableCell>
                    <TableCell>
                      <div>
                        <div>من: {booking.departure_date}</div>
                        <div>إلى: {booking.return_date}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.passengers} شخص</TableCell>
                    <TableCell>€{booking.total_price}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {booking.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                              disabled={loadingStates[booking.id]}
                            >
                              {loadingStates[booking.id] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                              disabled={loadingStates[booking.id]}
                            >
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
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg">لا توجد حجوزات مطابقة لبحثك</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBookings;

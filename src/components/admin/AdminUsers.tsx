
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
import { Search, Filter, Plus, Edit, Trash2, Shield, Users, Crown, UserCheck } from "lucide-react";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // بيانات تجريبية للمستخدمين
  const users = [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      role: "customer",
      status: "active",
      totalBookings: 5,
      totalSpent: 3200,
      joinDate: "2023-12-15",
      lastLogin: "2024-01-16 10:30"
    },
    {
      id: "2",
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+966507654321",
      role: "vip",
      status: "active",
      totalBookings: 12,
      totalSpent: 8900,
      joinDate: "2023-10-20",
      lastLogin: "2024-01-15 14:20"
    },
    {
      id: "3",
      name: "محمد حسن",
      email: "mohamed@example.com",
      phone: "+966502345678",
      role: "customer",
      status: "inactive",
      totalBookings: 2,
      totalSpent: 1500,
      joinDate: "2024-01-05",
      lastLogin: "2024-01-10 16:45"
    },
    {
      id: "4",
      name: "سارة أحمد",
      email: "sara@example.com",
      phone: "+966509876543",
      role: "admin",
      status: "active",
      totalBookings: 0,
      totalSpent: 0,
      joinDate: "2023-08-15",
      lastLogin: "2024-01-16 09:15"
    }
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800"><Shield className="h-3 w-3 ml-1" />إدارة</Badge>;
      case "vip":
        return <Badge className="bg-yellow-100 text-yellow-800"><Crown className="h-3 w-3 ml-1" />VIP</Badge>;
      case "customer":
        return <Badge className="bg-blue-100 text-blue-800"><Users className="h-3 w-3 ml-1" />عميل</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">موقوف</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* إحصائيات المستخدمين */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المستخدمين النشطين</p>
                <p className="text-2xl font-bold">{users.filter(u => u.status === "active").length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عملاء VIP</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === "vip").length}</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المديرين</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === "admin").length}</p>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إدارة المستخدمين</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المستخدمين..."
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
              <Plus className="h-4 w-4 ml-2" />
              إضافة مستخدم
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الحجوزات</TableHead>
                  <TableHead>إجمالي الإنفاق</TableHead>
                  <TableHead>تاريخ الانضمام</TableHead>
                  <TableHead>آخر دخول</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.totalBookings} حجز</TableCell>
                    <TableCell>€{user.totalSpent}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default AdminUsers;

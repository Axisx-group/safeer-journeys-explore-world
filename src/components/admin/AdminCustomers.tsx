
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingBag,
  Ban,
  CheckCircle
} from "lucide-react";

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  
  // بيانات تجريبية للعملاء
  const customers = [
    {
      id: "1",
      name: "أحمد محمد السعيد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      location: "الرياض، السعودية",
      registrationDate: "2023-06-15",
      lastLogin: "2024-01-16 14:30",
      totalBookings: 8,
      totalSpent: 12500,
      averageRating: 4.8,
      status: "active",
      loyaltyLevel: "gold",
      preferredDestinations: ["إسبانيا", "إيطاليا", "فرنسا"],
      notes: "عميل مميز، يفضل الرحلات الثقافية"
    },
    {
      id: "2",
      name: "فاطمة علي الزهراني",
      email: "fatima@example.com",
      phone: "+966507654321",
      location: "جدة، السعودية",
      registrationDate: "2023-08-20",
      lastLogin: "2024-01-15 09:15",
      totalBookings: 12,
      totalSpent: 18900,
      averageRating: 4.9,
      status: "active",
      loyaltyLevel: "platinum",
      preferredDestinations: ["تركيا", "اليونان", "المغرب"],
      notes: "عميل VIP، تفضل الفنادق الفاخرة"
    },
    {
      id: "3",
      name: "محمد حسن القحطاني",
      email: "mohamed@example.com",
      phone: "+966502345678",
      location: "الدمام، السعودية",
      registrationDate: "2024-01-05",
      lastLogin: "2024-01-10 16:45",
      totalBookings: 2,
      totalSpent: 3200,
      averageRating: 4.2,
      status: "active",
      loyaltyLevel: "silver",
      preferredDestinations: ["ماليزيا", "تايلاند"],
      notes: "عميل جديد، يفضل الرحلات الاستجمام"
    },
    {
      id: "4",
      name: "نورا عبدالله المطيري",
      email: "nora@example.com",
      phone: "+966509876543",
      location: "المدينة المنورة، السعودية",
      registrationDate: "2023-03-10",
      lastLogin: "2023-12-20 11:20",
      totalBookings: 5,
      totalSpent: 7800,
      averageRating: 4.5,
      status: "inactive",
      loyaltyLevel: "bronze",
      preferredDestinations: ["مصر", "الأردن"],
      notes: "عميل غير نشط، يحتاج إلى متابعة"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 ml-1" />نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800"><Ban className="h-3 w-3 ml-1" />موقوف</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getLoyaltyBadge = (level: string) => {
    switch (level) {
      case "platinum":
        return <Badge className="bg-purple-100 text-purple-800">بلاتيني</Badge>;
      case "gold":
        return <Badge className="bg-yellow-100 text-yellow-800">ذهبي</Badge>;
      case "silver":
        return <Badge className="bg-gray-100 text-gray-800">فضي</Badge>;
      case "bronze":
        return <Badge className="bg-orange-100 text-orange-800">برونزي</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  // احصائيات العملاء
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === "active").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageBookings: Math.round(customers.reduce((sum, c) => sum + c.totalBookings, 0) / customers.length)
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات العملاء */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي العملاء</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 ml-1" />
                  +12% من الشهر الماضي
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">العملاء النشطين</p>
                <p className="text-2xl font-bold">{stats.activeCustomers}</p>
                <p className="text-xs text-green-600">
                  {Math.round((stats.activeCustomers / stats.totalCustomers) * 100)}% من الإجمالي
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 ml-1" />
                  +8% من الشهر الماضي
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط الحجوزات</p>
                <p className="text-2xl font-bold">{stats.averageBookings}</p>
                <p className="text-xs text-gray-600">لكل عميل</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات البحث والفلترة */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة العملاء</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في العملاء..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 ml-2" />
                فلترة متقدمة
              </Button>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="outline">
                <Mail className="h-4 w-4 ml-2" />
                رسالة جماعية
              </Button>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                إضافة عميل
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العميل</TableHead>
                  <TableHead>مستوى الولاء</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الحجوزات</TableHead>
                  <TableHead>إجمالي الإنفاق</TableHead>
                  <TableHead>التقييم</TableHead>
                  <TableHead>آخر نشاط</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 ml-1" />
                          {customer.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 ml-1" />
                          {customer.phone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 ml-1" />
                          {customer.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getLoyaltyBadge(customer.loyaltyLevel)}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{customer.totalBookings}</div>
                        <div className="text-xs text-gray-500">حجز</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">€{customer.totalSpent.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">إجمالي</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="mr-1">{customer.averageRating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.lastLogin.split(' ')[0]}</div>
                        <div className="text-gray-500">{customer.lastLogin.split(' ')[1]}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
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

      {/* تفاصيل إضافية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* مستويات الولاء */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع مستويات الولاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["platinum", "gold", "silver", "bronze"].map((level) => {
                const count = customers.filter(c => c.loyaltyLevel === level).length;
                const percentage = Math.round((count / customers.length) * 100);
                return (
                  <div key={level} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getLoyaltyBadge(level)}
                      <span className="mr-2 text-sm">{count} عميل</span>
                    </div>
                    <div className="text-sm text-gray-500">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* الوجهات المفضلة */}
        <Card>
          <CardHeader>
            <CardTitle>الوجهات الأكثر شعبية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["إسبانيا", "تركيا", "إيطاليا", "فرنسا", "اليونان"].map((destination, index) => (
                <div key={destination} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="mr-3">{destination}</span>
                  </div>
                  <Badge variant="outline">{Math.floor(Math.random() * 20) + 5} عميل</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCustomers;

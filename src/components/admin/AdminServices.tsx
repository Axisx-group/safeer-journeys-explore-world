
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
import { Search, Plus, Edit, Trash2, Plane, Hotel, Car, Map, Shield, Clock } from "lucide-react";

const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const iconMap: Record<string, any> = {
    Plane, Hotel, Car, Map, Shield, Clock
  };
  
  // بيانات تجريبية للخدمات
  const services = [
    {
      id: "1",
      title: "حجز الطيران",
      icon: "Plane",
      description: "أفضل عروض الطيران مع خيارات حجز مرنة",
      priceFrom: 299,
      isActive: true,
      orders: 156
    },
    {
      id: "2",
      title: "حجز الفنادق",
      icon: "Hotel",
      description: "فنادق فاخرة واقتصادية حول العالم",
      priceFrom: 89,
      isActive: true,
      orders: 203
    },
    {
      id: "3",
      title: "تأجير السيارات",
      icon: "Car",
      description: "خدمات تأجير سيارات موثوقة في جميع الوجهات",
      priceFrom: 45,
      isActive: true,
      orders: 89
    },
    {
      id: "4",
      title: "الباقات السياحية",
      icon: "Map",
      description: "باقات سياحية مخصصة لتجارب لا تُنسى",
      priceFrom: 199,
      isActive: true,
      orders: 67
    },
    {
      id: "5",
      title: "تأمين السفر",
      icon: "Shield",
      description: "تأمين سفر شامل لراحة البال",
      priceFrom: 25,
      isActive: true,
      orders: 134
    },
    {
      id: "6",
      title: "دعم 24/7",
      icon: "Clock",
      description: "دعم العملاء على مدار الساعة",
      priceFrom: 0,
      isActive: true,
      orders: 0
    }
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الخدمات</CardTitle>
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الخدمات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-80"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة خدمة جديدة
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الخدمة</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>السعر من</TableHead>
                  <TableHead>الطلبات</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => {
                  const IconComponent = iconMap[service.icon] || Map;
                  return (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{service.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{service.description}</div>
                      </TableCell>
                      <TableCell>
                        {service.priceFrom > 0 ? `€${service.priceFrom}` : 'مجاني'}
                      </TableCell>
                      <TableCell>{service.orders} طلب</TableCell>
                      <TableCell>
                        {service.isActive ? (
                          <Badge className="bg-green-100 text-green-800">نشط</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>
                        )}
                      </TableCell>
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
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;

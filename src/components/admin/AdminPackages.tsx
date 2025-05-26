
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
import { Search, Plus, Edit, Trash2, Star } from "lucide-react";

const AdminPackages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // بيانات تجريبية للعروض
  const packages = [
    {
      id: "1",
      title: "جولة مدريد وبرشلونة",
      destination: "إسبانيا",
      duration: 7,
      price: 899,
      isFeatured: true,
      isActive: true,
      bookings: 45,
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4"
    },
    {
      id: "2",
      title: "جولة تراث إسطنبول",
      destination: "تركيا",
      duration: 5,
      price: 650,
      isFeatured: true,
      isActive: true,
      bookings: 32,
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200"
    },
    {
      id: "3",
      title: "جولة روما الكلاسيكية",
      destination: "إيطاليا",
      duration: 4,
      price: 750,
      isFeatured: false,
      isActive: true,
      bookings: 18,
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5"
    }
  ];

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة العروض والباقات</CardTitle>
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في العروض..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-80"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة عرض جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العرض</TableHead>
                  <TableHead>الوجهة</TableHead>
                  <TableHead>المدة</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>الحجوزات</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{pkg.title}</div>
                          {pkg.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              <Star className="h-3 w-3 ml-1" />
                              مميز
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>{pkg.duration} أيام</TableCell>
                    <TableCell>€{pkg.price}</TableCell>
                    <TableCell>{pkg.bookings} حجز</TableCell>
                    <TableCell>
                      {pkg.isActive ? (
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPackages;

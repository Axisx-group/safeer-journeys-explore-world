
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Star } from "lucide-react";

const AdminGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // بيانات تجريبية للمعرض
  const galleryItems = [
    {
      id: "1",
      title: "ساجرادا فاميليا برشلونة",
      destination: "برشلونة",
      category: "معمار",
      imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca",
      isFeatured: true,
      views: 1250
    },
    {
      id: "2",
      title: "عرض الفلامنكو",
      destination: "إشبيلية",
      category: "ثقافة",
      imageUrl: "https://images.unsplash.com/photo-1558642084-fd07fae5282e",
      isFeatured: false,
      views: 890
    },
    {
      id: "3",
      title: "الحلقوم التركي",
      destination: "إسطنبول",
      category: "طعام",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      isFeatured: false,
      views: 567
    },
    {
      id: "4",
      title: "المنتدى الروماني",
      destination: "روما",
      category: "تاريخ",
      imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      isFeatured: true,
      views: 1456
    },
    {
      id: "5",
      title: "باريس ليلاً",
      destination: "باريس",
      category: "مناظر طبيعية",
      imageUrl: "https://images.unsplash.com/photo-1502602898536-47ad22581b52",
      isFeatured: false,
      views: 2134
    }
  ];

  const filteredItems = galleryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة معرض الصور</CardTitle>
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في المعرض..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-80"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة صورة جديدة
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {item.isFeatured && (
                    <Badge className="absolute top-2 right-2 bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 ml-1" />
                      مميز
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{item.destination}</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{item.views} مشاهدة</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 ml-1" />
                      تعديل
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGallery;

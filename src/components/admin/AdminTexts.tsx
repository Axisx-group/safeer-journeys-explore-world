
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Plus, Edit, Save, X, Type, Globe } from "lucide-react";

const AdminTexts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ key: "", ar: "", en: "" });
  
  // بيانات تجريبية للنصوص
  const [texts, setTexts] = useState([
    {
      id: "1",
      key: "heroTitle",
      ar: "اكتشف العالم مع",
      en: "Discover the World with",
      category: "Hero Section",
      lastUpdated: "2024-01-15"
    },
    {
      id: "2", 
      key: "heroSubtitle",
      ar: "احجز رحلتك المثالية مع أفضل العروض على الفنادق والطيران والسيارات",
      en: "Book your perfect trip with the best deals on hotels, flights and cars",
      category: "Hero Section",
      lastUpdated: "2024-01-15"
    },
    {
      id: "3",
      key: "servicesTitle",
      ar: "خدماتنا المميزة",
      en: "Our Premium Services",
      category: "Services",
      lastUpdated: "2024-01-10"
    }
  ]);

  const handleEdit = (text: any) => {
    setEditingId(text.id);
    setEditData({ key: text.key, ar: text.ar, en: text.en });
  };

  const handleSave = () => {
    setTexts(texts.map(text => 
      text.id === editingId 
        ? { ...text, ...editData, lastUpdated: new Date().toISOString().split('T')[0] }
        : text
    ));
    setEditingId(null);
    setEditData({ key: "", ar: "", en: "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ key: "", ar: "", en: "" });
  };

  const filteredTexts = texts.filter(text =>
    text.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    text.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    text.en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            إدارة النصوص والترجمات
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في النصوص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-80"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة نص جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المفتاح</TableHead>
                  <TableHead>النص العربي</TableHead>
                  <TableHead>النص الإنجليزي</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>آخر تحديث</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTexts.map((text) => (
                  <TableRow key={text.id}>
                    <TableCell>
                      {editingId === text.id ? (
                        <Input
                          value={editData.key}
                          onChange={(e) => setEditData({...editData, key: e.target.value})}
                          className="w-full"
                        />
                      ) : (
                        <div className="font-mono text-sm">{text.key}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === text.id ? (
                        <Textarea
                          value={editData.ar}
                          onChange={(e) => setEditData({...editData, ar: e.target.value})}
                          className="w-full min-h-[60px]"
                        />
                      ) : (
                        <div className="max-w-xs">{text.ar}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === text.id ? (
                        <Textarea
                          value={editData.en}
                          onChange={(e) => setEditData({...editData, en: e.target.value})}
                          className="w-full min-h-[60px]"
                        />
                      ) : (
                        <div className="max-w-xs">{text.en}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{text.category}</Badge>
                    </TableCell>
                    <TableCell>{text.lastUpdated}</TableCell>
                    <TableCell>
                      {editingId === text.id ? (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEdit(text)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
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

export default AdminTexts;


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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Reply, Eye, Archive } from "lucide-react";

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState("");
  
  // بيانات تجريبية للرسائل
  const messages = [
    {
      id: "1",
      name: "سارة أحمد",
      email: "sara@example.com",
      phone: "+966501234567",
      subject: "استفسار عن رحلة إسطنبول",
      message: "مرحباً، أود الاستفسار عن العروض المتاحة لرحلة إسطنبول لشهر مارس القادم للعائلة...",
      status: "new",
      createdAt: "2024-01-25T10:30:00Z"
    },
    {
      id: "2",
      name: "محمد سعد",
      email: "mohamed@example.com",
      phone: "+966507654321",
      subject: "طلب تعديل الحجز",
      message: "أحتاج إلى تعديل تاريخ السفر في حجزي رقم #12345 من 15 فبراير إلى 20 فبراير...",
      status: "replied",
      createdAt: "2024-01-24T14:15:00Z"
    },
    {
      id: "3",
      name: "نورا حسن",
      email: "nora@example.com",
      phone: "+966502345678",
      subject: "شكر وامتنان",
      message: "أشكركم على الخدمة الممتازة في رحلة مدريد. كان كل شيء منظم بشكل رائع...",
      status: "resolved",
      createdAt: "2024-01-23T09:20:00Z"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">جديد</Badge>;
      case "replied":
        return <Badge className="bg-yellow-100 text-yellow-800">تم الرد</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">تم الحل</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الرسائل</CardTitle>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الرسائل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المرسل</TableHead>
                  <TableHead>الموضوع</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                        {message.phone && (
                          <div className="text-sm text-gray-500">{message.phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{message.subject}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {message.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(message.createdAt)}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedMessage(message)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>تفاصيل الرسالة</DialogTitle>
                            </DialogHeader>
                            {selectedMessage && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">الاسم:</label>
                                    <p>{selectedMessage.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">البريد الإلكتروني:</label>
                                    <p>{selectedMessage.email}</p>
                                  </div>
                                  {selectedMessage.phone && (
                                    <div>
                                      <label className="text-sm font-medium">الهاتف:</label>
                                      <p>{selectedMessage.phone}</p>
                                    </div>
                                  )}
                                  <div>
                                    <label className="text-sm font-medium">التاريخ:</label>
                                    <p>{formatDate(selectedMessage.createdAt)}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">الموضوع:</label>
                                  <p className="font-medium">{selectedMessage.subject}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">الرسالة:</label>
                                  <p className="bg-gray-50 p-4 rounded-lg">{selectedMessage.message}</p>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">الرد:</label>
                                  <Textarea
                                    placeholder="اكتب ردك هنا..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                  />
                                  <Button className="w-full">
                                    <Reply className="h-4 w-4 ml-2" />
                                    إرسال الرد
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button size="sm" variant="outline">
                          <Archive className="h-4 w-4" />
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

export default AdminMessages;

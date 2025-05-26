
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Reply, Eye, Archive, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();
  
  // بيانات تجريبية للرسائل
  const [messages, setMessages] = useState([
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
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">جديد</Badge>;
      case "replied":
        return <Badge className="bg-yellow-100 text-yellow-800">تم الرد</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">تم الحل</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">مؤرشف</Badge>;
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

  const handleViewMessage = (message: any) => {
    console.log('عرض تفاصيل الرسالة:', message.id);
    setSelectedMessage(message);
    setReplyText("");
    setIsDialogOpen(true);
  };

  const handleArchiveMessage = async (messageId: string) => {
    console.log('أرشفة الرسالة:', messageId);
    
    setLoadingStates(prev => ({ ...prev, [messageId]: true }));
    
    try {
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, status: 'archived' }
            : msg
        )
      );
      
      toast({
        title: "تم الأرشفة بنجاح",
        description: "تم أرشفة الرسالة بنجاح",
      });
    } catch (error) {
      console.error('خطأ في أرشفة الرسالة:', error);
      toast({
        title: "خطأ في الأرشفة",
        description: "حدث خطأ أثناء أرشفة الرسالة",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [messageId]: false }));
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast({
        title: "نص الرد مطلوب",
        description: "يرجى كتابة رد قبل الإرسال",
        variant: "destructive",
      });
      return;
    }

    if (!selectedMessage) return;

    console.log('إرسال رد للرسالة:', selectedMessage.id);
    console.log('نص الرد:', replyText);
    
    setLoadingStates(prev => ({ ...prev, reply: true }));
    
    try {
      // محاكاة API call لإرسال الرد
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === selectedMessage.id 
            ? { ...msg, status: 'replied' }
            : msg
        )
      );
      
      toast({
        title: "تم إرسال الرد بنجاح",
        description: `تم إرسال الرد إلى ${selectedMessage.email}`,
      });
      
      setReplyText("");
      setIsDialogOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error('خطأ في إرسال الرد:', error);
      toast({
        title: "خطأ في إرسال الرد",
        description: "حدث خطأ أثناء إرسال الرد",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, reply: false }));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-white/20 rounded-lg">
              <Search className="h-5 w-5" />
            </div>
            إدارة الرسائل والاستفسارات
          </CardTitle>
          <div className="flex items-center space-x-2 space-x-reverse pt-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الرسائل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-80 bg-white border-white/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-lg border border-blue-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="font-semibold">المرسل</TableHead>
                  <TableHead className="font-semibold">الموضوع</TableHead>
                  <TableHead className="font-semibold">التاريخ</TableHead>
                  <TableHead className="font-semibold">الحالة</TableHead>
                  <TableHead className="font-semibold">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id} className="hover:bg-blue-25 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                        {message.phone && (
                          <div className="text-sm text-gray-500">{message.phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{message.subject}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {message.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{formatDate(message.createdAt)}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Dialog open={isDialogOpen && selectedMessage?.id === message.id} onOpenChange={(open) => {
                          setIsDialogOpen(open);
                          if (!open) {
                            setSelectedMessage(null);
                            setReplyText("");
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewMessage(message)}
                              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl text-blue-800">تفاصيل الرسالة</DialogTitle>
                            </DialogHeader>
                            {selectedMessage && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">الاسم:</label>
                                    <p className="font-semibold text-gray-900">{selectedMessage.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">البريد الإلكتروني:</label>
                                    <p className="font-semibold text-gray-900">{selectedMessage.email}</p>
                                  </div>
                                  {selectedMessage.phone && (
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">الهاتف:</label>
                                      <p className="font-semibold text-gray-900">{selectedMessage.phone}</p>
                                    </div>
                                  )}
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">التاريخ:</label>
                                    <p className="font-semibold text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">الموضوع:</label>
                                  <p className="font-semibold text-lg text-gray-900 mt-1">{selectedMessage.subject}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">الرسالة:</label>
                                  <p className="bg-blue-50 p-4 rounded-lg mt-2 text-gray-800 leading-relaxed">
                                    {selectedMessage.message}
                                  </p>
                                </div>
                                <div className="space-y-3 border-t pt-4">
                                  <label className="text-sm font-medium text-gray-600">الرد:</label>
                                  <Textarea
                                    placeholder="اكتب ردك هنا..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                    className="resize-none"
                                  />
                                  <Button 
                                    onClick={handleSendReply}
                                    disabled={loadingStates.reply || !replyText.trim()}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                  >
                                    {loadingStates.reply ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        جاري الإرسال...
                                      </>
                                    ) : (
                                      <>
                                        <Send className="h-4 w-4 mr-2" />
                                        إرسال الرد
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={loadingStates[message.id] || message.status === 'archived'}
                              className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 disabled:opacity-50"
                            >
                              {loadingStates[message.id] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Archive className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الأرشفة</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من أرشفة هذه الرسالة؟ يمكنك العثور عليها لاحقاً في قسم الرسائل المؤرشفة.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleArchiveMessage(message.id)}
                                className="bg-orange-600 hover:bg-orange-700"
                              >
                                أرشفة
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredMessages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg">لا توجد رسائل مطابقة لبحثك</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMessages;

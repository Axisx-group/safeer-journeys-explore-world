
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminData, type AdminMessage } from "@/hooks/useAdminData";
import MessagesHeader from "./messages/MessagesHeader";
import MessagesTable from "./messages/MessagesTable";
import MessageDetailsDialog from "./messages/MessageDetailsDialog";

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();
  
  const { 
    messages, 
    loading, 
    updateMessageStatus, 
    refetchData 
  } = useAdminData();

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMessage = (message: AdminMessage) => {
    console.log('عرض تفاصيل الرسالة:', message.id);
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const handleArchiveMessage = async (messageId: string) => {
    console.log('أرشفة الرسالة:', messageId);
    
    setLoadingStates(prev => ({ ...prev, [messageId]: true }));
    
    try {
      const success = await updateMessageStatus(messageId, 'archived');
      if (success) {
        toast({
          title: "تم الأرشفة بنجاح",
          description: "تم أرشفة الرسالة بنجاح",
        });
      }
    } catch (error) {
      console.error('خطأ في أرشفة الرسالة:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [messageId]: false }));
    }
  };

  const handleReply = async (messageId: string, replyText: string) => {
    console.log('إرسال رد للرسالة:', messageId);
    console.log('نص الرد:', replyText);
    
    try {
      // محاكاة إرسال البريد الإلكتروني
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = await updateMessageStatus(messageId, 'replied');
      return success;
    } catch (error) {
      console.error('خطأ في إرسال الرد:', error);
      return false;
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">جاري تحميل الرسائل...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-blue-50">
        <MessagesHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={refetchData}
          messagesCount={messages.length}
        />
        <CardContent className="p-6">
          <MessagesTable
            messages={filteredMessages}
            onViewMessage={handleViewMessage}
            onArchiveMessage={handleArchiveMessage}
            loadingStates={loadingStates}
          />
          
          {filteredMessages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg">لا توجد رسائل مطابقة لبحثك</div>
            </div>
          )}
        </CardContent>
      </Card>

      <MessageDetailsDialog
        message={selectedMessage}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onReply={handleReply}
      />
    </div>
  );
};

export default AdminMessages;

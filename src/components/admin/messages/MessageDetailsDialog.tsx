
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AdminMessage } from "@/hooks/useAdminData";

interface MessageDetailsDialogProps {
  message: AdminMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onReply: (messageId: string, replyText: string) => Promise<boolean>;
}

const MessageDetailsDialog = ({ message, isOpen, onClose, onReply }: MessageDetailsDialogProps) => {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

    if (!message) return;

    setIsReplying(true);
    
    try {
      const success = await onReply(message.id, replyText);
      if (success) {
        toast({
          title: "تم إرسال الرد بنجاح",
          description: `تم إرسال الرد إلى ${message.email}`,
        });
        
        setReplyText("");
        onClose();
      }
    } catch (error) {
      console.error('خطأ في إرسال الرد:', error);
    } finally {
      setIsReplying(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setReplyText("");
      onClose();
    }
  };

  if (!message) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-800">تفاصيل الرسالة</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-600">الاسم:</label>
              <p className="font-semibold text-gray-900">{message.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">البريد الإلكتروني:</label>
              <p className="font-semibold text-gray-900">{message.email}</p>
            </div>
            {message.phone && (
              <div>
                <label className="text-sm font-medium text-gray-600">الهاتف:</label>
                <p className="font-semibold text-gray-900">{message.phone}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-600">التاريخ:</label>
              <p className="font-semibold text-gray-900">{formatDate(message.created_at)}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">الموضوع:</label>
            <p className="font-semibold text-lg text-gray-900 mt-1">{message.subject}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">الرسالة:</label>
            <p className="bg-blue-50 p-4 rounded-lg mt-2 text-gray-800 leading-relaxed">
              {message.message}
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
              disabled={isReplying || !replyText.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isReplying ? (
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
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsDialog;

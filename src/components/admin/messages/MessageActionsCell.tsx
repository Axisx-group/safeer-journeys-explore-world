
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Eye, Archive, Loader2 } from "lucide-react";
import type { AdminMessage } from "@/hooks/useAdminData";

interface MessageActionsCellProps {
  message: AdminMessage;
  onViewMessage: (message: AdminMessage) => void;
  onArchiveMessage: (messageId: string) => Promise<void>;
  isArchiving: boolean;
}

const MessageActionsCell = ({ 
  message, 
  onViewMessage, 
  onArchiveMessage,
  isArchiving 
}: MessageActionsCellProps) => {
  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => onViewMessage(message)}
        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            size="sm" 
            variant="outline"
            disabled={isArchiving || message.status === 'archived'}
            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 disabled:opacity-50"
          >
            {isArchiving ? (
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
              onClick={() => onArchiveMessage(message.id)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              أرشفة
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MessageActionsCell;

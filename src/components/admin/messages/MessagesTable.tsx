
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import MessageStatusBadge from "./MessageStatusBadge";
import MessageActionsCell from "./MessageActionsCell";
import type { AdminMessage } from "@/hooks/useAdminData";

interface MessagesTableProps {
  messages: AdminMessage[];
  onViewMessage: (message: AdminMessage) => void;
  onArchiveMessage: (messageId: string) => Promise<void>;
  loadingStates: { [key: string]: boolean };
}

const MessagesTable = ({ 
  messages, 
  onViewMessage, 
  onArchiveMessage, 
  loadingStates 
}: MessagesTableProps) => {
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
          {messages.map((message) => (
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
              <TableCell className="text-gray-700">{formatDate(message.created_at)}</TableCell>
              <TableCell>
                <MessageStatusBadge status={message.status} />
              </TableCell>
              <TableCell>
                <MessageActionsCell
                  message={message}
                  onViewMessage={onViewMessage}
                  onArchiveMessage={onArchiveMessage}
                  isArchiving={loadingStates[message.id]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MessagesTable;

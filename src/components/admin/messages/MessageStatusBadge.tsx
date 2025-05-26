
import { Badge } from "@/components/ui/badge";

interface MessageStatusBadgeProps {
  status: string;
}

const MessageStatusBadge = ({ status }: MessageStatusBadgeProps) => {
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

export default MessageStatusBadge;

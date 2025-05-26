
import { Badge } from "@/components/ui/badge";

interface UserStatusBadgeProps {
  status: string;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>;
    case "suspended":
      return <Badge className="bg-red-100 text-red-800">موقوف</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default UserStatusBadge;


import { Badge } from "@/components/ui/badge";
import { Shield, Crown, Users } from "lucide-react";

interface UserRoleBadgeProps {
  role: string;
}

const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  switch (role) {
    case "admin":
      return <Badge className="bg-red-100 text-red-800"><Shield className="h-3 w-3 ml-1" />إدارة</Badge>;
    case "vip":
      return <Badge className="bg-yellow-100 text-yellow-800"><Crown className="h-3 w-3 ml-1" />VIP</Badge>;
    case "customer":
      return <Badge className="bg-blue-100 text-blue-800"><Users className="h-3 w-3 ml-1" />عميل</Badge>;
    default:
      return <Badge>{role}</Badge>;
  }
};

export default UserRoleBadge;

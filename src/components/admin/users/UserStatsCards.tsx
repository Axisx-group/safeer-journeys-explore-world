
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Crown, Shield } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  totalBookings: number;
  totalSpent: number;
  joinDate: string;
  lastLogin: string;
}

interface UserStatsCardsProps {
  users: User[];
}

const UserStatsCards = ({ users }: UserStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المستخدمين النشطين</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === "active").length}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">عملاء VIP</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === "vip").length}</p>
            </div>
            <Crown className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المديرين</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === "admin").length}</p>
            </div>
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;

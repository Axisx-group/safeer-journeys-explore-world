
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserStatsCards from "./users/UserStatsCards";
import UsersHeader from "./users/UsersHeader";
import UsersTable from "./users/UsersTable";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // بيانات تجريبية للمستخدمين
  const users = [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      role: "customer",
      status: "active",
      totalBookings: 5,
      totalSpent: 3200,
      joinDate: "2023-12-15",
      lastLogin: "2024-01-16 10:30"
    },
    {
      id: "2",
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+966507654321",
      role: "vip",
      status: "active",
      totalBookings: 12,
      totalSpent: 8900,
      joinDate: "2023-10-20",
      lastLogin: "2024-01-15 14:20"
    },
    {
      id: "3",
      name: "محمد حسن",
      email: "mohamed@example.com",
      phone: "+966502345678",
      role: "customer",
      status: "inactive",
      totalBookings: 2,
      totalSpent: 1500,
      joinDate: "2024-01-05",
      lastLogin: "2024-01-10 16:45"
    },
    {
      id: "4",
      name: "سارة أحمد",
      email: "sara@example.com",
      phone: "+966509876543",
      role: "admin",
      status: "active",
      totalBookings: 0,
      totalSpent: 0,
      joinDate: "2023-08-15",
      lastLogin: "2024-01-16 09:15"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <UserStatsCards users={users} />

      <Card>
        <CardHeader>
          <UsersHeader 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </CardHeader>
        <CardContent>
          <UsersTable users={filteredUsers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;

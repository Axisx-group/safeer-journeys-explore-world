
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActionsCell from "./UserActionsCell";

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

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>المستخدم</TableHead>
            <TableHead>الدور</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الحجوزات</TableHead>
            <TableHead>إجمالي الإنفاق</TableHead>
            <TableHead>تاريخ الانضمام</TableHead>
            <TableHead>آخر دخول</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.phone}</div>
                </div>
              </TableCell>
              <TableCell><UserRoleBadge role={user.role} /></TableCell>
              <TableCell><UserStatusBadge status={user.status} /></TableCell>
              <TableCell>{user.totalBookings} حجز</TableCell>
              <TableCell>€{user.totalSpent}</TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <UserActionsCell userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;


import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface UserActionsCellProps {
  userId: string;
}

const UserActionsCell = ({ userId }: UserActionsCellProps) => {
  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <Button size="sm" variant="outline">
        <Edit className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserActionsCell;


import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";

interface UsersHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UsersHeader = ({ searchTerm, onSearchChange }: UsersHeaderProps) => {
  return (
    <>
      <CardTitle>إدارة المستخدمين</CardTitle>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في المستخدمين..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 w-80"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            فلترة
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة مستخدم
        </Button>
      </div>
    </>
  );
};

export default UsersHeader;

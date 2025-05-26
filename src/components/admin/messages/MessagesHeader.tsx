
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw } from "lucide-react";

interface MessagesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  messagesCount: number;
}

const MessagesHeader = ({ 
  searchTerm, 
  onSearchChange, 
  onRefresh, 
  messagesCount 
}: MessagesHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Search className="h-5 w-5" />
          </div>
          إدارة الرسائل والاستفسارات ({messagesCount})
        </div>
        <Button 
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
      </div>
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث في الرسائل..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 w-80 bg-white border-white/20"
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesHeader;

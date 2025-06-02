
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Shield, UserPlus, Trash2 } from 'lucide-react';
import { AppRole } from '@/hooks/useRoles';

interface UserRole {
  id: string;
  role: AppRole;
  assigned_at: string;
  is_active: boolean;
}

interface UserRoleManagerProps {
  userId: string;
  userRoles: UserRole[];
  onRolesUpdated: () => void;
}

const UserRoleManager = ({ userId, userRoles, onRolesUpdated }: UserRoleManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AppRole>('user');
  const [isAssigning, setIsAssigning] = useState(false);
  const { toast } = useToast();

  const roleLabels: Record<AppRole, string> = {
    super_admin: 'مدير عام',
    admin: 'مدير',
    moderator: 'مشرف',
    support: 'دعم فني',
    user: 'مستخدم'
  };

  const roleColors: Record<AppRole, string> = {
    super_admin: 'bg-red-100 text-red-800',
    admin: 'bg-orange-100 text-orange-800',
    moderator: 'bg-blue-100 text-blue-800',
    support: 'bg-green-100 text-green-800',
    user: 'bg-gray-100 text-gray-800'
  };

  const assignRole = async () => {
    setIsAssigning(true);
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: selectedRole,
          assigned_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "تم تعيين الدور",
        description: `تم تعيين دور ${roleLabels[selectedRole]} بنجاح`,
      });

      setIsOpen(false);
      onRolesUpdated();
    } catch (error: any) {
      console.error('Error assigning role:', error);
      toast({
        title: "خطأ في تعيين الدور",
        description: error.message || "حدث خطأ أثناء تعيين الدور",
        variant: "destructive"
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const removeRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ is_active: false })
        .eq('id', roleId);

      if (error) throw error;

      toast({
        title: "تم إزالة الدور",
        description: "تم إزالة الدور بنجاح",
      });

      onRolesUpdated();
    } catch (error: any) {
      console.error('Error removing role:', error);
      toast({
        title: "خطأ في إزالة الدور",
        description: error.message || "حدث خطأ أثناء إزالة الدور",
        variant: "destructive"
      });
    }
  };

  const activeRoles = userRoles.filter(role => role.is_active);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 space-x-reverse">
        {activeRoles.map((role) => (
          <div key={role.id} className="flex items-center space-x-1 space-x-reverse">
            <Badge className={roleColors[role.role]}>
              <Shield className="h-3 w-3 ml-1" />
              {roleLabels[role.role]}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => removeRole(role.id)}
            >
              <Trash2 className="h-3 w-3 text-red-500" />
            </Button>
          </div>
        ))}
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة دور
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعيين دور جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={selectedRole} onValueChange={(value: AppRole) => setSelectedRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([role, label]) => (
                    <SelectItem key={role} value={role}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={assignRole} disabled={isAssigning}>
                  {isAssigning ? 'جاري التعيين...' : 'تعيين الدور'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserRoleManager;


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export type AppRole = 'super_admin' | 'admin' | 'moderator' | 'support' | 'user';
export type PermissionType = 
  | 'users_view' | 'users_create' | 'users_edit' | 'users_delete'
  | 'bookings_view' | 'bookings_create' | 'bookings_edit' | 'bookings_delete'
  | 'messages_view' | 'messages_reply' | 'messages_archive'
  | 'settings_view' | 'settings_edit'
  | 'analytics_view' | 'system_logs_view'
  | 'admin_panel_access';

interface UserRole {
  id: string;
  role: AppRole;
  assigned_at: string;
  expires_at?: string;
  is_active: boolean;
}

export const useRoles = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserRoles();
    }
  }, [user]);

  const fetchUserRoles = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      
      setUserRoles(data || []);
      
      // جلب الصلاحيات المرتبطة بالأدوار
      if (data && data.length > 0) {
        const rolesList = data.map(role => role.role);
        const { data: rolePermissions, error: permError } = await supabase
          .from('role_permissions')
          .select('permission')
          .in('role', rolesList);

        if (!permError && rolePermissions) {
          const uniquePermissions = [...new Set(rolePermissions.map(rp => rp.permission))];
          setPermissions(uniquePermissions);
        }
      }
    } catch (error) {
      console.error('Error fetching user roles:', error);
      toast({
        title: "خطأ في جلب الأدوار",
        description: "حدث خطأ أثناء جلب أدوار المستخدم",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: AppRole): boolean => {
    return userRoles.some(ur => ur.role === role && ur.is_active);
  };

  const hasPermission = (permission: PermissionType): boolean => {
    return permissions.includes(permission);
  };

  const hasAnyRole = (roles: AppRole[]): boolean => {
    return roles.some(role => hasRole(role));
  };

  const isSuperAdmin = (): boolean => hasRole('super_admin');
  const isAdmin = (): boolean => hasAnyRole(['super_admin', 'admin']);
  const canAccessAdminPanel = (): boolean => hasPermission('admin_panel_access');

  return {
    userRoles,
    permissions,
    isLoading,
    hasRole,
    hasPermission,
    hasAnyRole,
    isSuperAdmin,
    isAdmin,
    canAccessAdminPanel,
    refetch: fetchUserRoles
  };
};

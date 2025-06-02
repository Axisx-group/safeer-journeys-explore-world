
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requiredRole?: string;
  requiredPermission?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  requiredRole,
  requiredPermission 
}: ProtectedRouteProps) => {
  const { user, isLoading, canAccessAdminPanel, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/auth');
        return;
      }

      if (requireAdmin && !canAccessAdminPanel) {
        navigate('/');
        return;
      }

      if (requiredRole && !hasRole(requiredRole)) {
        navigate('/');
        return;
      }
    }
  }, [user, isLoading, canAccessAdminPanel, hasRole, requireAdmin, requiredRole, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireAdmin && !canAccessAdminPanel) {
    return null;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

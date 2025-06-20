
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  userProfile: any;
  userRoles: string[];
  hasRole: (role: string) => boolean;
  canAccessAdminPanel: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile using setTimeout to avoid recursion
          setTimeout(async () => {
            try {
              // جلب الملف الشخصي
              const { data: profile } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single();
              
              setUserProfile(profile);

              // جلب أدوار المستخدم
              const { data: roles } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .eq('is_active', true);

              const rolesList = roles?.map(r => r.role) || [];
              setUserRoles(rolesList);

              // التحقق من صلاحيات الإدارة
              const isUserAdmin = session.user.email === 'admin@urtrvl.com' || 
                                 rolesList.includes('super_admin') || 
                                 rolesList.includes('admin');
              setIsAdmin(isUserAdmin);

            } catch (error) {
              console.error('Error fetching user data:', error);
              // If profile doesn't exist, create one
              if (error && typeof error === 'object' && 'code' in error && error.code === 'PGRST116') {
                try {
                  const { data: newProfile } = await supabase
                    .from('user_profiles')
                    .insert({
                      user_id: session.user.id,
                      preferred_language: 'ar'
                    })
                    .select()
                    .single();
                  
                  setUserProfile(newProfile);
                } catch (insertError) {
                  console.error('Error creating user profile:', insertError);
                }
              }
            }
          }, 0);
        } else {
          setUserProfile(null);
          setIsAdmin(false);
          setUserRoles([]);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const hasRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const canAccessAdminPanel = 
    isAdmin || 
    hasRole('super_admin') || 
    hasRole('admin') || 
    hasRole('moderator') || 
    hasRole('support');

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      signOut,
      isAdmin,
      userProfile,
      userRoles,
      hasRole,
      canAccessAdminPanel
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSetup = () => {
  const { toast } = useToast();

  useEffect(() => {
    const setupAdminAccount = async () => {
      try {
        // Create admin account
        const { data, error } = await supabase.auth.signUp({
          email: 'admin@urtrvl.com',
          password: 'Mo5933221100@',
          options: {
            data: {
              first_name: 'Admin',
              last_name: 'URTRVL',
              preferred_language: 'ar'
            }
          }
        });

        if (error) {
          // If user already exists, that's fine - we don't need to show an error
          if (error && typeof error === 'object' && 'message' in error && 
              typeof error.message === 'string' && 
              error.message.includes('User already registered')) {
            console.log('Admin account already exists');
            return;
          }
          console.error('Error creating admin account:', error);
          return;
        }

        console.log('Admin account created successfully');
        
      } catch (error) {
        console.error('Error in admin setup:', error);
      }
    };

    setupAdminAccount();
  }, []);

  return null; // This component doesn't render anything
};

export default AdminSetup;

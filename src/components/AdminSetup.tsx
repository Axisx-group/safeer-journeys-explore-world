
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSetup = () => {
  const { toast } = useToast();

  useEffect(() => {
    const setupAdminAccount = async () => {
      try {
        // Check if admin account already exists
        const { data: existingUser } = await supabase.auth.admin.listUsers();
        const adminExists = existingUser?.users?.some(user => user.email === 'admin@urtrvl.com');

        if (adminExists) {
          console.log('Admin account already exists');
          return;
        }

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

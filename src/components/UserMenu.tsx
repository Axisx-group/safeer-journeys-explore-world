
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Calendar,
  CreditCard,
  HelpCircle 
} from 'lucide-react';

const UserMenu = () => {
  const { user, signOut, isAdmin, userProfile } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  if (!user) return null;

  const getInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`;
    }
    return user.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userProfile?.first_name ? `${userProfile.first_name} ${userProfile.last_name}` : user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{isArabic ? 'الملف الشخصي' : 'Profile'}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/manage-trips" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{isArabic ? 'إدارة الرحلات' : 'Manage Trips'}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/payment" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>{isArabic ? 'الدفعات' : 'Payments'}</span>
          </Link>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin" className="flex items-center text-blue-600">
                <Shield className="mr-2 h-4 w-4" />
                <span>{isArabic ? 'لوحة الإدارة' : 'Admin Panel'}</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/support" className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>{isArabic ? 'الدعم' : 'Support'}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>{isArabic ? 'الإعدادات' : 'Settings'}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isArabic ? 'تسجيل الخروج' : 'Log out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { adminTabs } from '@/config/adminTabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminDashboard from '@/components/admin/AdminDashboard';
import SecurityDashboard from '@/components/admin/security/SecurityDashboard';

// استيراد المكونات من المجلد الصحيح
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminBookings } from '@/components/admin/AdminBookings';
import { AdminMessages } from '@/components/admin/AdminMessages';
import { AdminPackages } from '@/components/admin/AdminPackages';
import { AdminServices } from '@/components/admin/AdminServices';
import { AdminGallery } from '@/components/admin/AdminGallery';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { AdminPayments } from '@/components/admin/AdminPayments';
import { AdminTexts } from '@/components/admin/AdminTexts';

const AdminPage = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(adminTabs[0].id);
  const { canAccessAdminPanel } = useAuth();

  useEffect(() => {
    if (!canAccessAdminPanel) {
      navigate('/');
    }
  }, [canAccessAdminPanel, navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <AdminUsers />;
      case 'bookings':
        return <AdminBookings />;
      case 'messages':
        return <AdminMessages />;
      case 'packages':
        return <AdminPackages />;
      case 'services':
        return <AdminServices />;
      case 'gallery':
        return <AdminGallery />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      case 'payments':
        return <AdminPayments />;
      case 'texts':
        return <AdminTexts />;
      case 'security':
        return <SecurityDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>
            {isArabic ? 'لوحة الإدارة' : 'Admin Panel'}
          </CardTitle>
          <CardDescription>
            {isArabic ? 'إدارة محتوى الموقع والمستخدمين' : 'Manage website content and users'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} className="space-y-4">
            <TabsList>
              {adminTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} onClick={() => setActiveTab(tab.id)}>
                  {isArabic ? tab.label : tab.labelEn}
                </TabsTrigger>
              ))}
            </TabsList>
            {renderTabContent()}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;

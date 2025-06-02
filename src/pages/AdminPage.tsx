import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { adminTabs } from '@/config/adminTabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UsersPage from './admin/UsersPage';
import BookingsPage from './admin/BookingsPage';
import MessagesPage from './admin/MessagesPage';
import PackagesPage from './admin/PackagesPage';
import ServicesPage from './admin/ServicesPage';
import GalleryPage from './admin/GalleryPage';
import AnalyticsPage from './admin/AnalyticsPage';
import SettingsPage from './admin/SettingsPage';
import PaymentsPage from './admin/PaymentsPage';
import TextsPage from './admin/TextsPage';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SecurityDashboard from '@/components/admin/security/SecurityDashboard';

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
        return <UsersPage />;
      case 'bookings':
        return <BookingsPage />;
      case 'messages':
        return <MessagesPage />;
      case 'packages':
        return <PackagesPage />;
      case 'services':
        return <ServicesPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'texts':
        return <TextsPage />;
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

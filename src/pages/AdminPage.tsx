
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTabsNavigation from "@/components/admin/AdminTabsNavigation";
import AdminFooterStatus from "@/components/admin/AdminFooterStatus";
import { adminTabs } from "@/config/adminTabs";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <AdminTabsNavigation tabs={adminTabs} />

          {adminTabs.map((tab) => {
            const ComponentToRender = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id} className="space-y-6">
                <ComponentToRender />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <AdminFooterStatus />
    </div>
  );
};

export default AdminPage;

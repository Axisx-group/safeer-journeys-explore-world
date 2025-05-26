
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminTabsNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    label_ar: string;
    icon: any;
    component: any;
  }>;
}

const AdminTabsNavigation = ({ tabs }: AdminTabsNavigationProps) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm p-2">
      <TabsList className="grid w-full gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(tabs.length, 7)}, minmax(0, 1fr))` }}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white p-2"
            >
              <IconComponent className="h-4 w-4" />
              <span className="hidden md:inline">
                {language === 'ar' ? tab.label_ar : tab.label}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
};

export default AdminTabsNavigation;

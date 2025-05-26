
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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-3 border border-blue-100">
      <TabsList className="grid w-full gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-lg" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 text-xs font-semibold transition-all duration-200 
                         data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 
                         data-[state=active]:text-white data-[state=active]:shadow-lg 
                         hover:bg-blue-50 hover:text-blue-700 p-3 rounded-lg border-0
                         text-gray-600 bg-white/80"
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

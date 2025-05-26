
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Package, 
  Settings, 
  Users,
  Images,
  BarChart3,
  Type,
  CreditCard,
  UserCheck,
  Activity,
  Shield
} from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminBookings from "@/components/admin/AdminBookings";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminServices from "@/components/admin/AdminServices";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminTexts from "@/components/admin/AdminTexts";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminCustomers from "@/components/admin/AdminCustomers";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminSystemMonitor from "@/components/admin/AdminSystemMonitor";
import AdminBulkOperations from "@/components/admin/AdminBulkOperations";

export const adminTabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    label_ar: "لوحة التحكم",
    icon: LayoutDashboard,
    component: AdminDashboard
  },
  {
    id: "analytics",
    label: "Analytics",
    label_ar: "التحليلات",
    icon: BarChart3,
    component: AdminAnalytics
  },
  {
    id: "bookings",
    label: "Bookings",
    label_ar: "الحجوزات",
    icon: Calendar,
    component: AdminBookings
  },
  {
    id: "customers",
    label: "Customers",
    label_ar: "العملاء",
    icon: Users,
    component: AdminCustomers
  },
  {
    id: "payments",
    label: "Payments",
    label_ar: "المدفوعات",
    icon: CreditCard,
    component: AdminPayments
  },
  {
    id: "users",
    label: "Users",
    label_ar: "المستخدمين",
    icon: UserCheck,
    component: AdminUsers
  },
  {
    id: "messages",
    label: "Messages",
    label_ar: "الرسائل",
    icon: MessageSquare,
    component: AdminMessages
  },
  {
    id: "packages",
    label: "Packages",
    label_ar: "الباقات",
    icon: Package,
    component: AdminPackages
  },
  {
    id: "services",
    label: "Services",
    label_ar: "الخدمات",
    icon: Settings,
    component: AdminServices
  },
  {
    id: "gallery",
    label: "Gallery",
    label_ar: "المعرض",
    icon: Images,
    component: AdminGallery
  },
  {
    id: "texts",
    label: "Texts",
    label_ar: "النصوص",
    icon: Type,
    component: AdminTexts
  },
  {
    id: "bulk",
    label: "Bulk Operations",
    label_ar: "العمليات الجماعية",
    icon: Package,
    component: AdminBulkOperations
  },
  {
    id: "monitor",
    label: "System Monitor",
    label_ar: "مراقبة النظام",
    icon: Activity,
    component: AdminSystemMonitor
  },
  {
    id: "settings",
    label: "Settings",
    label_ar: "الإعدادات",
    icon: Shield,
    component: AdminSettings
  }
];

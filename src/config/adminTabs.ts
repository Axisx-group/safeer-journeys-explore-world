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
  Download
} from "lucide-react";

import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminBookings from "@/components/admin/AdminBookings";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminCustomers from "@/components/admin/AdminCustomers";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminServices from "@/components/admin/AdminServices";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminTexts from "@/components/admin/AdminTexts";
import AdminSystemMonitor from "@/components/admin/AdminSystemMonitor";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminCustomerExport from "@/components/admin/AdminCustomerExport";

export const adminTabs = [
  {
    id: "dashboard",
    label: "Dashboard", 
    label_ar: "لوحة التحكم",
    icon: LayoutDashboard,
    component: AdminDashboard
  },
  {
    id: "bookings",
    label: "Bookings",
    label_ar: "الحجوزات", 
    icon: Calendar,
    component: AdminBookings
  },
  {
    id: "users",
    label: "Users",
    label_ar: "المستخدمين",
    icon: Users,
    component: AdminUsers
  },
  {
    id: "customers",
    label: "Customers",
    label_ar: "العملاء",
    icon: UserCheck,
    component: AdminCustomers
  },
  {
    id: "export",
    label: "Export Data",
    label_ar: "تصدير البيانات",
    icon: Download,
    component: AdminCustomerExport
  },
  {
    id: "packages", 
    label: "Packages",
    label_ar: "الباقات",
    icon: Package,
    component: AdminPackages
  },
  {
    id: "gallery",
    label: "Gallery",
    label_ar: "المعرض",
    icon: Images,
    component: AdminGallery
  },
  {
    id: "services",
    label: "Services", 
    label_ar: "الخدمات",
    icon: Activity,
    component: AdminServices
  },
  {
    id: "messages",
    label: "Messages",
    label_ar: "الرسائل",
    icon: MessageSquare,
    component: AdminMessages
  },
  {
    id: "payments",
    label: "Payments",
    label_ar: "المدفوعات", 
    icon: CreditCard,
    component: AdminPayments
  },
  {
    id: "analytics",
    label: "Analytics",
    label_ar: "التحليلات",
    icon: BarChart3,
    component: AdminAnalytics
  },
  {
    id: "texts",
    label: "Content",
    label_ar: "المحتوى",
    icon: Type,
    component: AdminTexts
  },
  {
    id: "system",
    label: "System",
    label_ar: "النظام",
    icon: Activity,
    component: AdminSystemMonitor
  },
  {
    id: "settings",
    label: "Settings",
    label_ar: "الإعدادات",
    icon: Settings,
    component: AdminSettings
  }
];


import { 
  Plane, 
  Hotel, 
  Car, 
  Map, 
  Shield, 
  Globe,
  Gift,
  Utensils,
  Camera
} from "lucide-react";
import { Service, Category } from "./types";

export const services: Service[] = [
  {
    id: 'flights',
    icon: Plane,
    category: 'transport',
    titleAr: 'حجز الطيران',
    titleEn: 'Flight Booking',
    descAr: 'احجز تذاكر الطيران بأفضل الأسعار مع ضمان الجودة',
    descEn: 'Book flight tickets at the best prices with quality guarantee',
    features: ['500+ Airlines', 'Best Price Guarantee', '24/7 Support'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    popular: true,
    rating: 4.9
  },
  {
    id: 'hotels',
    icon: Hotel,
    category: 'accommodation',
    titleAr: 'حجز الفنادق',
    titleEn: 'Hotel Booking',
    descAr: 'اختر من آلاف الفنادق المميزة حول العالم',
    descEn: 'Choose from thousands of premium hotels worldwide',
    features: ['100K+ Hotels', 'Free Cancellation', 'Instant Booking'],
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-100',
    popular: true,
    rating: 4.8
  },
  {
    id: 'cars',
    icon: Car,
    category: 'transport',
    titleAr: 'تأجير السيارات',
    titleEn: 'Car Rental',
    descAr: 'استأجر السيارة المناسبة لرحلتك بأفضل الأسعار',
    descEn: 'Rent the perfect car for your trip at best prices',
    features: ['All Car Types', 'Full Insurance', 'Airport Pickup'],
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-100',
    rating: 4.7
  },
  {
    id: 'tours',
    icon: Map,
    category: 'experiences',
    titleAr: 'الجولات السياحية',
    titleEn: 'Tour Packages',
    descAr: 'اكتشف أجمل الأماكن مع مرشدين محترفين',
    descEn: 'Discover beautiful places with professional guides',
    features: ['Expert Guides', 'Small Groups', 'Unique Experiences'],
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-100',
    rating: 4.9
  },
  {
    id: 'insurance',
    icon: Shield,
    category: 'protection',
    titleAr: 'تأمين السفر',
    titleEn: 'Travel Insurance',
    descAr: 'حماية شاملة لرحلتك ضد جميع المخاطر',
    descEn: 'Comprehensive protection for your trip',
    features: ['Medical Coverage', 'Trip Cancellation', 'Lost Luggage'],
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-100',
    rating: 4.6
  },
  {
    id: 'visa',
    icon: Globe,
    category: 'documentation',
    titleAr: 'خدمات التأشيرة',
    titleEn: 'Visa Services',
    descAr: 'مساعدة احترافية في الحصول على التأشيرات',
    descEn: 'Professional assistance in obtaining visas',
    features: ['All Countries', 'Fast Processing', 'Document Support'],
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'from-indigo-50 to-blue-100',
    rating: 4.5
  },
  {
    id: 'packages',
    icon: Gift,
    category: 'packages',
    titleAr: 'الباقات السياحية',
    titleEn: 'Travel Packages',
    descAr: 'باقات شاملة مصممة خصيصاً لك بأسعار مميزة',
    descEn: 'Complete packages specially designed for you',
    features: ['All Inclusive', 'Custom Packages', 'Group Discounts'],
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-100',
    popular: true,
    rating: 4.8
  },
  {
    id: 'dining',
    icon: Utensils,
    category: 'experiences',
    titleAr: 'حجز المطاعم',
    titleEn: 'Restaurant Booking',
    descAr: 'احجز طاولتك في أفضل المطاعم العالمية',
    descEn: 'Book your table at the best restaurants',
    features: ['Premium Restaurants', 'Special Menus', 'VIP Service'],
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'from-yellow-50 to-orange-100',
    rating: 4.7
  }
];

export const categories: Category[] = [
  { id: 'all', nameAr: 'جميع الخدمات', nameEn: 'All Services', icon: Gift },
  { id: 'transport', nameAr: 'النقل', nameEn: 'Transport', icon: Plane },
  { id: 'accommodation', nameAr: 'الإقامة', nameEn: 'Accommodation', icon: Hotel },
  { id: 'experiences', nameAr: 'التجارب', nameEn: 'Experiences', icon: Camera },
  { id: 'protection', nameAr: 'الحماية', nameEn: 'Protection', icon: Shield },
  { id: 'documentation', nameAr: 'الوثائق', nameEn: 'Documentation', icon: Globe },
  { id: 'packages', nameAr: 'الباقات', nameEn: 'Packages', icon: Gift }
];


import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  category: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  features: string[];
  color: string;
  bgColor: string;
  popular?: boolean;
  rating: number;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: LucideIcon;
}

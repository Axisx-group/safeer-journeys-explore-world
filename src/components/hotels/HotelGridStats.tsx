
import { useLanguage } from "@/contexts/LanguageContext";

interface HotelGridStatsProps {
  currentCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

const HotelGridStats = ({ currentCount, totalCount, currentPage, totalPages }: HotelGridStatsProps) => {
  const { language } = useLanguage();

  return (
    <div className="mb-6 text-center">
      <p className="text-sm text-gray-600">
        {language === 'ar' 
          ? `عرض ${currentCount} من ${totalCount} فندق - الصفحة ${currentPage} من ${totalPages}`
          : `Showing ${currentCount} of ${totalCount} hotels - Page ${currentPage} of ${totalPages}`
        }
      </p>
    </div>
  );
};

export default HotelGridStats;


import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Category } from "./types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { language } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-3 mb-16"
    >
      {categories.map((category, index) => {
        const IconComponent = category.icon;
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Button
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className={`transition-all duration-300 px-6 py-3 rounded-2xl font-semibold ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <IconComponent className="h-5 w-5 mr-2" />
              {language === 'ar' ? category.nameAr : category.nameEn}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CategoryFilter;

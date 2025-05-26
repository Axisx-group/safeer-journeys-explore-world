
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Heart,
  Share,
  Download,
  Play,
  MapPin,
  Calendar,
  Eye,
  Grid3X3,
  List,
  Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGallery } from "@/hooks/useGallery";
import { motion } from "framer-motion";

const EnhancedGallery = () => {
  const { language } = useLanguage();
  const { data: galleryItems, isLoading } = useGallery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'All', label_ar: 'الكل' },
    { id: 'معمار', label: 'Architecture', label_ar: 'معمار' },
    { id: 'ثقافة', label: 'Culture', label_ar: 'ثقافة' },
    { id: 'طعام', label: 'Food', label_ar: 'طعام' },
    { id: 'تاريخ', label: 'History', label_ar: 'تاريخ' },
    { id: 'مناظر طبيعية', label: 'Nature', label_ar: 'مناظر طبيعية' }
  ];

  const filteredItems = galleryItems?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'معرض الصور المتقدم' : 'Enhanced Photo Gallery'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'استكشف أجمل الوجهات من خلال مجموعة صور مختارة بعناية'
              : 'Explore the most beautiful destinations through our carefully curated photo collection'
            }
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={language === 'ar' ? 'ابحث في المعرض...' : 'Search gallery...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {language === 'ar' ? category.label_ar : category.label}
              </Button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'masonry' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('masonry')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        }>
          {filteredItems?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={item.image_url} 
                    alt={language === 'ar' ? item.title_ar : item.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === 'grid' ? 'h-64' : 'h-auto'
                    }`}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg mb-1">
                        {language === 'ar' ? item.title_ar : item.title}
                      </h3>
                      <p className="text-sm opacity-90 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.destination}
                      </p>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Featured badge */}
                  {item.is_featured && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                      <Zap className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'مميز' : 'Featured'}
                    </Badge>
                  )}

                  {/* Category badge */}
                  <Badge className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {item.category}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full-screen Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-full">
              <img 
                src={selectedImage.image_url}
                alt={language === 'ar' ? selectedImage.title_ar : selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Image info */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'ar' ? selectedImage.title_ar : selectedImage.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedImage.destination}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      <Download className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'تحميل' : 'Download'}
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'مشاركة' : 'Share'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <Button
                className="absolute top-6 right-6 h-10 w-10 p-0"
                variant="secondary"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </Button>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            {language === 'ar' 
              ? `عرض ${filteredItems?.length || 0} صورة من أصل ${galleryItems?.length || 0}`
              : `Showing ${filteredItems?.length || 0} photos of ${galleryItems?.length || 0} total`
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedGallery;


import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGallery } from "@/hooks/useGallery";

const RealDataGallery = () => {
  const { language } = useLanguage();
  const { data: galleryItems, isLoading, error } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">حدث خطأ في تحميل معرض الصور</p>
        </div>
      </section>
    );
  }

  const categories = ['all', ...Array.from(new Set(galleryItems?.map(item => item.category) || []))];
  
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems?.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'استكشف جمال الوجهات السياحية من خلال معرض صورنا'
              : 'Explore the beauty of tourist destinations through our photo gallery'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' 
                ? (language === 'ar' ? 'الكل' : 'All')
                : category
              }
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems?.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <img 
                src={item.image_url}
                alt={language === 'ar' ? item.title_ar : item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1">
                    {language === 'ar' ? item.title_ar : item.title}
                  </h3>
                  <p className="text-sm opacity-90">{item.destination}</p>
                </div>
              </div>
              {item.is_featured && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {language === 'ar' ? 'مميز' : 'Featured'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealDataGallery;

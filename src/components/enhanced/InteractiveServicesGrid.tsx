
import { useState } from "react";
import ServicesHeader from "./services/ServicesHeader";
import CategoryFilter from "./services/CategoryFilter";
import ServiceCard from "./services/ServiceCard";
import ServicesCallToAction from "./services/ServicesCallToAction";
import { services, categories } from "./services/servicesData";

const InteractiveServicesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-indigo-300/20 to-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <ServicesHeader />

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredService === service.id}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            />
          ))}
        </div>

        <ServicesCallToAction />
      </div>
    </section>
  );
};

export default InteractiveServicesGrid;


import InteractiveServicesGrid from "@/components/enhanced/InteractiveServicesGrid";
import RealDataPackages from "@/components/RealDataPackages";
import TravelStatsSection from "@/components/enhanced/TravelStatsSection";
import TestimonialsSection from "@/components/enhanced/TestimonialsSection";
import EnhancedGallery from "@/components/advanced/EnhancedGallery";
import BlogSection from "@/components/enhanced/BlogSection";
import NewsletterSection from "@/components/enhanced/NewsletterSection";
import FeaturesSection from "@/components/FeaturesSection";

const MainContentSections = () => {
  return (
    <>
      <div className="space-y-0">
        <InteractiveServicesGrid />
        <RealDataPackages />
        <TravelStatsSection />
      </div>

      <div className="space-y-0 bg-gray-50">
        <TestimonialsSection />
        <EnhancedGallery />
        <BlogSection />
      </div>

      <div className="space-y-0">
        <NewsletterSection />
        <FeaturesSection />
      </div>
    </>
  );
};

export default MainContentSections;

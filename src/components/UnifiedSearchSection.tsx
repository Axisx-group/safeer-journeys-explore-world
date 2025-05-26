
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import UnifiedSearchHeader from "@/components/unified-search/UnifiedSearchHeader";
import ServiceSelector from "@/components/unified-search/ServiceSelector";
import SearchForm from "@/components/unified-search/SearchForm";
import PopularCombinations from "@/components/unified-search/PopularCombinations";

const UnifiedSearchSection = () => {
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeHotels, setIncludeHotels] = useState(true);
  const [includeCars, setIncludeCars] = useState(false);
  
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    checkIn: '',
    checkOut: '',
    passengers: {
      adults: 2,
      children: 0,
      infants: 0
    },
    rooms: 1
  });

  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const handleSearch = () => {
    console.log('Enhanced unified search:', { 
      searchParams, 
      includeFlights, 
      includeHotels, 
      includeCars 
    });
    
    // Here you would integrate with your booking API
    // For now, we'll show a success message
    alert(isArabic ? 'جاري البحث عن أفضل العروض...' : 'Searching for the best deals...');
  };

  const handleFlightsChange = (checked: boolean | "indeterminate") => {
    setIncludeFlights(checked === true);
  };

  const handleHotelsChange = (checked: boolean | "indeterminate") => {
    setIncludeHotels(checked === true);
  };

  const handleCarsChange = (checked: boolean | "indeterminate") => {
    setIncludeCars(checked === true);
  };

  const handleCombinationSelect = (flights: boolean, hotels: boolean, cars: boolean) => {
    setIncludeFlights(flights);
    setIncludeHotels(hotels);
    setIncludeCars(cars);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>

        <UnifiedSearchHeader />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
            <CardContent className="p-8 relative">
              
              <ServiceSelector
                includeFlights={includeFlights}
                includeHotels={includeHotels}
                includeCars={includeCars}
                onFlightsChange={handleFlightsChange}
                onHotelsChange={handleHotelsChange}
                onCarsChange={handleCarsChange}
              />

              <SearchForm
                searchParams={searchParams}
                onParamsChange={setSearchParams}
                includeFlights={includeFlights}
                includeHotels={includeHotels}
              />

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 flex justify-center"
              >
                <Button 
                  size="lg" 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-16 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Search className={`h-6 w-6 ${isArabic ? 'ml-3' : 'mr-3'} relative z-10`} />
                  <span className="relative z-10">
                    {isArabic ? 'ابحث عن أفضل العروض' : 'Find Best Deals'}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <PopularCombinations onCombinationSelect={handleCombinationSelect} />
      </div>
    </section>
  );
};

export default UnifiedSearchSection;

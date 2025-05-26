
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import UnifiedSearchHeader from "@/components/unified-search/UnifiedSearchHeader";
import ServiceSelector from "@/components/unified-search/ServiceSelector";
import SearchForm from "@/components/unified-search/SearchForm";
import PopularCombinations from "@/components/unified-search/PopularCombinations";
import { useFlightSearch } from "@/hooks/useFlights";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: searchFlights, isPending: isSearching } = useFlightSearch();

  const handleSearch = () => {
    console.log('Enhanced unified search:', { 
      searchParams, 
      includeFlights, 
      includeHotels, 
      includeCars 
    });

    // Validate required fields
    if (!searchParams.from || !searchParams.to || !searchParams.checkIn) {
      toast({
        title: isArabic ? "خطأ في البحث" : "Search Error",
        description: isArabic 
          ? "يرجى ملء جميع الحقول المطلوبة (من، إلى، تاريخ المغادرة)"
          : "Please fill in all required fields (From, To, Departure date)",
        variant: "destructive"
      });
      return;
    }

    // If flights are selected, trigger flight search
    if (includeFlights) {
      const flightSearchParams = {
        departure_city: searchParams.from,
        arrival_city: searchParams.to,
        departure_date: searchParams.checkIn
      };

      searchFlights(flightSearchParams, {
        onSuccess: (data) => {
          console.log('Flight search successful:', data);
          toast({
            title: isArabic ? "تم العثور على رحلات!" : "Flights Found!",
            description: isArabic 
              ? `تم العثور على ${data?.flights?.length || 0} رحلة`
              : `Found ${data?.flights?.length || 0} flights`,
          });
          
          // Navigate to booking page with search results
          navigate('/booking', { 
            state: { 
              searchResults: data,
              searchParams: flightSearchParams,
              includeHotels,
              includeCars
            } 
          });
        },
        onError: (error) => {
          console.error('Flight search error:', error);
          toast({
            title: isArabic ? "خطأ في البحث" : "Search Error",
            description: isArabic 
              ? "حدث خطأ أثناء البحث عن الرحلات. يرجى المحاولة مرة أخرى."
              : "An error occurred while searching for flights. Please try again.",
            variant: "destructive"
          });
        }
      });
    } else {
      // If only hotels or other services are selected
      toast({
        title: isArabic ? "جاري البحث..." : "Searching...",
        description: isArabic 
          ? "جاري البحث عن أفضل العروض للفنادق والخدمات الأخرى..."
          : "Searching for the best hotel and other service deals...",
      });
      
      // Navigate to appropriate page based on selected services
      if (includeHotels) {
        navigate('/hotels', { 
          state: { 
            searchParams,
            includeCars 
          } 
        });
      } else {
        navigate('/services');
      }
    }
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full opacity-10 animate-pulse blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-indigo-300 to-pink-300 rounded-full opacity-10 animate-pulse delay-1000 blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-5 animate-pulse delay-500 blur-3xl"></div>
          
          {/* Floating particles */}
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute top-48 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-bounce delay-300"></div>
          <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-indigo-400 rounded-full opacity-50 animate-bounce delay-700"></div>
        </div>

        <UnifiedSearchHeader />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Enhanced main search card */}
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            
            <Card className="relative shadow-2xl border-0 bg-white/98 backdrop-blur-lg overflow-hidden rounded-3xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
              
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
                  backgroundSize: '50px 50px'
                }}></div>
              </div>
              
              <CardContent className="p-10 relative">
                {/* Enhanced service selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <ServiceSelector
                    includeFlights={includeFlights}
                    includeHotels={includeHotels}
                    includeCars={includeCars}
                    onFlightsChange={handleFlightsChange}
                    onHotelsChange={handleHotelsChange}
                    onCarsChange={handleCarsChange}
                  />
                </motion.div>

                {/* Enhanced search form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <SearchForm
                    searchParams={searchParams}
                    onParamsChange={setSearchParams}
                    includeFlights={includeFlights}
                    includeHotels={includeHotels}
                  />
                </motion.div>

                {/* Enhanced search button with better styling */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-12 flex justify-center"
                >
                  <div className="relative group">
                    {/* Button glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                    
                    <Button 
                      size="lg" 
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-20 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full border-2 border-white/20 hover:border-white/30 group overflow-hidden"
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      <div className="relative flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Search className="h-6 w-6 animate-pulse" />
                          <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                        
                        <span className="font-extrabold tracking-wide">
                          {isSearching 
                            ? (isArabic ? 'جاري البحث...' : 'Searching...')
                            : (isArabic ? 'ابحث عن أفضل العروض' : 'Find Best Deals')
                          }
                        </span>
                        
                        <ArrowRight className={`h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {/* Button pulse effect */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
                    </Button>
                  </div>
                </motion.div>

                {/* Enhanced features showcase */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 flex justify-center"
                >
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">
                        {isArabic ? 'أسعار حقيقية ومباشرة' : 'Real-time Prices'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                      <span className="font-medium">
                        {isArabic ? 'حجز فوري مؤكد' : 'Instant Booking'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200/50">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-600"></div>
                      <span className="font-medium">
                        {isArabic ? 'دعم 24/7' : '24/7 Support'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Enhanced popular combinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <PopularCombinations onCombinationSelect={handleCombinationSelect} />
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedSearchSection;

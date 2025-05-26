
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import UnifiedSearchHeader from "@/components/unified-search/UnifiedSearchHeader";
import PopularCombinations from "@/components/unified-search/PopularCombinations";
import BackgroundDecorations from "@/components/unified-search/BackgroundDecorations";
import SearchCard from "@/components/unified-search/SearchCard";
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
        <BackgroundDecorations />

        <UnifiedSearchHeader />

        <SearchCard
          includeFlights={includeFlights}
          includeHotels={includeHotels}
          includeCars={includeCars}
          searchParams={searchParams}
          onFlightsChange={handleFlightsChange}
          onHotelsChange={handleHotelsChange}
          onCarsChange={handleCarsChange}
          onParamsChange={setSearchParams}
          onSearch={handleSearch}
          isSearching={isSearching}
        />

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

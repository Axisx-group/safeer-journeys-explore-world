
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import ServiceSelector from "./ServiceSelector";
import SearchForm from "./SearchForm";
import SearchButton from "./SearchButton";
import FeaturesBadges from "./FeaturesBadges";

interface SearchCardProps {
  includeFlights: boolean;
  includeHotels: boolean;
  includeCars: boolean;
  searchParams: {
    from: string;
    to: string;
    checkIn: string;
    checkOut: string;
    passengers: {
      adults: number;
      children: number;
      infants: number;
    };
    rooms: number;
  };
  onFlightsChange: (checked: boolean | "indeterminate") => void;
  onHotelsChange: (checked: boolean | "indeterminate") => void;
  onCarsChange: (checked: boolean | "indeterminate") => void;
  onParamsChange: (params: any) => void;
  onSearch: () => void;
  isSearching: boolean;
}

const SearchCard = ({
  includeFlights,
  includeHotels,
  includeCars,
  searchParams,
  onFlightsChange,
  onHotelsChange,
  onCarsChange,
  onParamsChange,
  onSearch,
  isSearching
}: SearchCardProps) => {
  return (
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
                onFlightsChange={onFlightsChange}
                onHotelsChange={onHotelsChange}
                onCarsChange={onCarsChange}
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
                onParamsChange={onParamsChange}
                includeFlights={includeFlights}
                includeHotels={includeHotels}
              />
            </motion.div>

            {/* Enhanced search button */}
            <SearchButton onSearch={onSearch} isSearching={isSearching} />

            {/* Enhanced features showcase */}
            <FeaturesBadges />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SearchCard;

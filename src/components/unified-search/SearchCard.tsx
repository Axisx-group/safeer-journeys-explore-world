
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="relative"
    >
      {/* Enhanced Floating Card with Advanced Glassmorphism */}
      <div className="relative group">
        {/* Multiple Glow Layers */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.01, 0.99, 1.01],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-20"
        />
        
        <Card className="relative shadow-2xl border-0 bg-white/95 backdrop-blur-2xl overflow-hidden rounded-3xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 2px, transparent 2px),
                  radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px, 80px 80px, 40px 40px'
              }}
            />
          </div>
          
          {/* Gradient Overlay with Motion */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)",
                "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)",
                "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
          
          <CardContent className="p-8 sm:p-12 relative">
            {/* Enhanced Service Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
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

            {/* Enhanced Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <SearchForm
                searchParams={searchParams}
                onParamsChange={onParamsChange}
                includeFlights={includeFlights}
                includeHotels={includeHotels}
              />
            </motion.div>

            {/* Enhanced Search Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <SearchButton onSearch={onSearch} isSearching={isSearching} />
            </motion.div>

            {/* Enhanced Features Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <FeaturesBadges />
            </motion.div>
          </CardContent>

          {/* Card Border Glow */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[2px] group-hover:from-blue-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40 transition-all duration-500">
            <div className="rounded-3xl bg-transparent h-full w-full" />
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default SearchCard;

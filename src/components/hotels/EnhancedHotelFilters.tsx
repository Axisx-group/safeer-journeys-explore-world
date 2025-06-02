
import { useState } from "react";
import HotelFiltersHeader from "./HotelFiltersHeader";
import BasicHotelFilters from "./BasicHotelFilters";
import AdvancedHotelFilters from "./AdvancedHotelFilters";
import HotelFiltersActions from "./HotelFiltersActions";

interface EnhancedHotelFiltersProps {
  filters: {
    searchTerm: string;
    country: string;
    city: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    rooms: number;
    minPrice: number;
    maxPrice: number;
    minRating: number;
  };
  onFiltersChange: (filters: any) => void;
  onFetchNewData: () => void;
  isFetching: boolean;
}

const EnhancedHotelFilters = ({ filters, onFiltersChange, onFetchNewData, isFetching }: EnhancedHotelFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      country: 'all',
      city: 'all',
      checkInDate: new Date().toISOString().split('T')[0],
      checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      guests: 2,
      rooms: 1,
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <HotelFiltersHeader 
        showAdvanced={showAdvanced}
        onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
      />

      <BasicHotelFilters 
        filters={filters}
        onUpdateFilter={updateFilter}
      />

      {showAdvanced && (
        <AdvancedHotelFilters 
          filters={filters}
          onUpdateFilter={updateFilter}
        />
      )}

      <HotelFiltersActions
        onClearFilters={clearFilters}
        onFetchNewData={onFetchNewData}
        isFetching={isFetching}
      />
    </div>
  );
};

export default EnhancedHotelFilters;

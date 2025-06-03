
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlightSearchForm from '@/components/flights/FlightSearchForm';
import FlightGrid from '@/components/flights/FlightGrid';
import FlightFilters from '@/components/flights/FlightFilters';
import { useSkyscannerFlights } from '@/hooks/useSkyscannerFlights';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Plane, Filter } from 'lucide-react';

const FlightsPage = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [searchParams, setSearchParams] = useState({
    departure_city: 'RUH', // Default to Riyadh airport code
    arrival_city: 'LHR',   // Default to London Heathrow airport code
    departure_date: '2025-06-15'
  });

  const [filters, setFilters] = useState({
    maxPrice: 5000,
    airline: '',
    stops: 'all',
    sortBy: 'price',
    region: 'all',
    country: 'all'
  });

  const [showFilters, setShowFilters] = useState(false);

  // Convert search params to the format expected by useSkyscannerFlights
  const apiParams = {
    origin: searchParams.departure_city,
    destination: searchParams.arrival_city,
    date: searchParams.departure_date,
    adults: 1,
    currency: 'EUR'
  };

  const { data: flights = [], isLoading, isFetching } = useSkyscannerFlights(apiParams);

  console.log('Flights data received:', flights);
  console.log('Is loading:', isLoading);
  console.log('Is fetching:', isFetching);

  const handleSearch = () => {
    console.log('Searching with params:', searchParams);
    console.log('API params:', apiParams);
    // The query will automatically refetch when searchParams change
  };

  // Apply filters to flights
  const filteredFlights = flights.filter(flight => {
    // Price filter
    if (filters.maxPrice && flight.price?.amount > filters.maxPrice) return false;
    
    // Airline filter
    if (filters.airline) {
      const airlineName = flight.segments?.[0]?.marketingCarrier?.name || '';
      if (!airlineName.toLowerCase().includes(filters.airline.toLowerCase())) return false;
    }
    
    // Stops filter - simplified logic
    if (filters.stops === 'direct') {
      const duration = flight.segments?.[0]?.durationInMinutes || 0;
      if (duration > 600) return false; // More than 10 hours is likely not direct
    }
    
    // Country filter - simplified logic
    if (filters.country && filters.country !== 'all') {
      try {
        const destinationCode = flight.segments?.[0]?.destination?.displayCode || searchParams.arrival_city;
        const { worldAirports } = require('@/constants/worldAirports');
        const destinationAirport = worldAirports.find(
          airport => airport.code === destinationCode
        );
        if (destinationAirport && destinationAirport.country !== filters.country) return false;
      } catch (error) {
        console.log('Error filtering by country:', error);
      }
    }

    // Region filter - simplified logic
    if (filters.region && filters.region !== 'all') {
      try {
        const destinationCode = flight.segments?.[0]?.destination?.displayCode || searchParams.arrival_city;
        const { worldAirports } = require('@/constants/worldAirports');
        const destinationAirport = worldAirports.find(
          airport => airport.code === destinationCode
        );
        if (destinationAirport) {
          const regionMapping = {
            'middle-east': ['Egypt', 'Jordan', 'Lebanon', 'Syria', 'Iraq', 'Turkey', 'Iran'],
            'gcc': ['UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Saudi Arabia'],
            'europe': ['UK', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Czech Republic', 'Hungary', 'Poland', 'Greece', 'Portugal', 'Sweden', 'Denmark', 'Norway', 'Finland', 'Iceland', 'Russia', 'Ukraine', 'Romania', 'Bulgaria'],
            'asia': ['Japan', 'South Korea', 'China', 'Hong Kong', 'Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'Philippines', 'India', 'Pakistan', 'Bangladesh', 'Sri Lanka'],
            'africa': ['Morocco', 'Tunisia', 'Algeria', 'Libya', 'Sudan', 'Ethiopia', 'Kenya', 'Tanzania', 'South Africa', 'Nigeria', 'Ghana'],
            'north-america': ['USA', 'Canada'],
            'oceania': ['Australia', 'New Zealand']
          };
          
          const regionCountries = regionMapping[filters.region] || [];
          if (!regionCountries.includes(destinationAirport.country)) return false;
        }
      } catch (error) {
        console.log('Error filtering by region:', error);
      }
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price') {
      const priceA = a.price?.amount || 0;
      const priceB = b.price?.amount || 0;
      return priceA - priceB;
    }
    if (filters.sortBy === 'duration') {
      const durationA = a.segments?.[0]?.durationInMinutes || 0;
      const durationB = b.segments?.[0]?.durationInMinutes || 0;
      return durationA - durationB;
    }
    return 0;
  });

  console.log('Filtered flights count:', filteredFlights.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - adjusted spacing */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-sky-600/5"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full shadow-xl">
                <Plane className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {isArabic ? 'رحلات الطيران العالمية' : 'Global Flight Search'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {isArabic 
                ? 'اكتشف أفضل العروض إلى مصر والكويت وجميع أنحاء العالم'
                : 'Discover the best deals to Egypt, Kuwait, and destinations worldwide'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FlightSearchForm
            searchParams={searchParams}
            onSearchParamsChange={setSearchParams}
            onSearch={handleSearch}
            isLoading={isLoading}
            isFetching={isFetching}
            dataSource="Sky Scrapper API"
          />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 space-y-6">
              <div className="flex items-center justify-between lg:justify-start gap-3">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {isArabic ? 'المرشحات' : 'Filters'}
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 bg-blue-600 text-white rounded-lg"
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <FlightFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  flightCount={flights.length}
                />
              </div>
            </div>

            {/* Flight Results */}
            <div className="flex-1">
              <FlightGrid
                flights={flights}
                isLoading={isLoading}
                searchParams={apiParams}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FlightsPage;

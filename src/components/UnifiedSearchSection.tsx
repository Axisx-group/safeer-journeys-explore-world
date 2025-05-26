
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search, Sparkles, Plane, Hotel, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import CitySearchInput from "@/components/flights/CitySearchInput";

const UnifiedSearchSection = () => {
  const [searchType, setSearchType] = useState("combined");
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeHotels, setIncludeHotels] = useState(true);
  const [includeCars, setIncludeCars] = useState(false);
  
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const handleSearch = () => {
    console.log('Unified search:', { 
      searchParams, 
      includeFlights, 
      includeHotels, 
      includeCars 
    });
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                <Sparkles className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {isArabic ? 'ابحث واحجز كل ما تحتاجه' : 'Search & Book Everything You Need'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isArabic ? 'طيران، فنادق، وسيارات في مكان واحد' : 'Flights, Hotels, and Cars in One Place'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
            <CardContent className="p-8 relative">
              
              {/* Service Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {isArabic ? 'اختر الخدمات المطلوبة:' : 'Select Services:'}
                </h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flights" 
                      checked={includeFlights} 
                      onCheckedChange={handleFlightsChange}
                    />
                    <label htmlFor="flights" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <Plane className="h-4 w-4 text-blue-600" />
                      {isArabic ? 'طيران' : 'Flights'}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hotels" 
                      checked={includeHotels} 
                      onCheckedChange={handleHotelsChange}
                    />
                    <label htmlFor="hotels" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <Hotel className="h-4 w-4 text-purple-600" />
                      {isArabic ? 'فنادق' : 'Hotels'}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cars" 
                      checked={includeCars} 
                      onCheckedChange={handleCarsChange}
                    />
                    <label htmlFor="cars" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <Car className="h-4 w-4 text-indigo-600" />
                      {isArabic ? 'سيارات' : 'Cars'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* From/Origin */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    {includeFlights ? (
                      <Plane className="h-4 w-4 text-blue-600" />
                    ) : (
                      <MapPin className="h-4 w-4 text-purple-600" />
                    )}
                    {isArabic ? 'من' : 'From'}
                  </label>
                  <CitySearchInput
                    value={searchParams.from}
                    onValueChange={(value) => setSearchParams(prev => ({ ...prev, from: value }))}
                    placeholder={isArabic ? 'اختر المدينة' : 'Select city'}
                    label=""
                  />
                </div>

                {/* To/Destination */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    {includeFlights ? (
                      <Plane className="h-4 w-4 text-blue-600 rotate-90" />
                    ) : (
                      <MapPin className="h-4 w-4 text-purple-600" />
                    )}
                    {isArabic ? 'إلى' : 'To'}
                  </label>
                  <CitySearchInput
                    value={searchParams.to}
                    onValueChange={(value) => setSearchParams(prev => ({ ...prev, to: value }))}
                    placeholder={isArabic ? 'اختر الوجهة' : 'Select destination'}
                    label=""
                  />
                </div>

                {/* Check-in/Departure Date */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    {isArabic ? (includeFlights ? 'تاريخ المغادرة' : 'تسجيل الوصول') : (includeFlights ? 'Departure' : 'Check-in')}
                  </label>
                  <div className="relative group">
                    <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
                    <Input 
                      type="date" 
                      value={searchParams.checkIn}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value }))}
                      className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                    />
                  </div>
                </div>

                {/* Check-out/Return Date */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    {isArabic ? (includeFlights ? 'تاريخ العودة' : 'تسجيل المغادرة') : (includeFlights ? 'Return' : 'Check-out')}
                  </label>
                  <div className="relative group">
                    <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
                    <Input 
                      type="date" 
                      value={searchParams.checkOut}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                      className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-red-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                    />
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Guests/Passengers */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    {isArabic ? (includeFlights ? 'المسافرون' : 'النزلاء') : (includeFlights ? 'Passengers' : 'Guests')}
                  </label>
                  <div className="relative group">
                    <Users className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
                    <Input 
                      type="number"
                      min="1"
                      max="10"
                      value={searchParams.guests}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                      className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-orange-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                    />
                  </div>
                </div>

                {/* Rooms (if hotels selected) */}
                {includeHotels && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Hotel className="h-4 w-4 text-purple-600" />
                      {isArabic ? 'الغرف' : 'Rooms'}
                    </label>
                    <div className="relative group">
                      <Hotel className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors ${isArabic ? 'right-4' : 'left-4'}`} />
                      <Input 
                        type="number"
                        min="1"
                        max="5"
                        value={searchParams.rooms}
                        onChange={(e) => setSearchParams(prev => ({ ...prev, rooms: parseInt(e.target.value) || 1 }))}
                        className={`h-14 ${isArabic ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                      />
                    </div>
                  </div>
                )}
              </div>

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
                    {isArabic ? 'ابحث الآن' : 'Search Now'}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular combinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {isArabic ? 'باقات شائعة' : 'Popular Combinations'}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'طيران + فندق', nameEn: 'Flight + Hotel', color: 'from-blue-500 to-purple-500', services: ['flights', 'hotels'] },
              { name: 'فندق + سيارة', nameEn: 'Hotel + Car', color: 'from-purple-500 to-indigo-500', services: ['hotels', 'cars'] },
              { name: 'باقة كاملة', nameEn: 'Complete Package', color: 'from-green-500 to-blue-500', services: ['flights', 'hotels', 'cars'] },
              { name: 'طيران فقط', nameEn: 'Flights Only', color: 'from-blue-500 to-cyan-500', services: ['flights'] }
            ].map((combo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIncludeFlights(combo.services.includes('flights'));
                  setIncludeHotels(combo.services.includes('hotels'));
                  setIncludeCars(combo.services.includes('cars'));
                }}
                className={`bg-gradient-to-r ${combo.color} text-white px-6 py-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 font-medium`}
              >
                {isArabic ? combo.name : combo.nameEn}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedSearchSection;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search, Sparkles, Plane, Hotel, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("hotels");
  const { t, language } = useLanguage();

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
            {language === 'ar' ? 'ابحث واحجز رحلتك المثالية' : 'Search & Book Your Perfect Journey'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' ? 'اكتشف العالم معنا بأفضل الأسعار وأجود الخدمات' : 'Discover the world with us at the best prices and premium services'}
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-2xl shadow-inner">
                  <TabsTrigger 
                    value="hotels" 
                    className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white rounded-xl py-4 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Hotel className="h-5 w-5" />
                    <span className="hidden sm:inline">{t('hotels')}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="flights"
                    className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white rounded-xl py-4 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Plane className="h-5 w-5" />
                    <span className="hidden sm:inline">{t('flights')}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cars"
                    className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white rounded-xl py-4 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Car className="h-5 w-5" />
                    <span className="hidden sm:inline">{t('cars')}</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="hotels" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                  >
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        {t('destination')}
                      </label>
                      <div className="relative group">
                        <MapPin className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          placeholder={t('destinationPlaceholder')} 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        {t('checkIn')}
                      </label>
                      <div className="relative group">
                        <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          type="date" 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        {t('checkOut')}
                      </label>
                      <div className="relative group">
                        <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          type="date" 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        {t('guests')}
                      </label>
                      <div className="relative group">
                        <Users className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          placeholder={t('guestsPlaceholder')} 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="flights" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                  >
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Plane className="h-4 w-4 text-purple-600" />
                        {t('from')}
                      </label>
                      <div className="relative group">
                        <MapPin className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          placeholder={language === 'ar' ? 'مدينة المغادرة' : 'Departure city'} 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Plane className="h-4 w-4 text-purple-600 rotate-90" />
                        {t('to')}
                      </label>
                      <div className="relative group">
                        <MapPin className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          placeholder={language === 'ar' ? 'مدينة الوصول' : 'Arrival city'} 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        {t('departure')}
                      </label>
                      <div className="relative group">
                        <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          type="date" 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        {t('travelers')}
                      </label>
                      <div className="relative group">
                        <Users className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          placeholder={t('travelersPlaceholder')} 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="cars" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                  >
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Car className="h-4 w-4 text-indigo-600" />
                        {t('pickupLocation')}
                      </label>
                      <div className="relative group">
                        <MapPin className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          placeholder={t('pickupPlaceholder')} 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                        {t('pickupDate')}
                      </label>
                      <div className="relative group">
                        <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          type="date" 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                        {t('returnDate')}
                      </label>
                      <div className="relative group">
                        <Calendar className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          type="date" 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Car className="h-4 w-4 text-indigo-600" />
                        {t('carType')}
                      </label>
                      <div className="relative group">
                        <Car className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                        <Input 
                          placeholder={t('carTypePlaceholder')} 
                          className={`h-14 ${language === 'ar' ? 'pr-12' : 'pl-12'} border-2 border-gray-200 focus:border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80`} 
                        />
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-10 flex justify-center"
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-16 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <Search className={`h-6 w-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} relative z-10`} />
                    <span className="relative z-10">{t('searchNow')}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Button>
                </motion.div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'ar' ? 'الوجهات الشائعة' : 'Popular Destinations'}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'باريس', nameEn: 'Paris', color: 'from-pink-500 to-rose-500' },
              { name: 'لندن', nameEn: 'London', color: 'from-blue-500 to-cyan-500' },
              { name: 'طوكيو', nameEn: 'Tokyo', color: 'from-purple-500 to-indigo-500' },
              { name: 'نيويورك', nameEn: 'New York', color: 'from-green-500 to-emerald-500' },
              { name: 'دبي', nameEn: 'Dubai', color: 'from-amber-500 to-orange-500' },
              { name: 'روما', nameEn: 'Rome', color: 'from-red-500 to-pink-500' }
            ].map((destination, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${destination.color} text-white px-6 py-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 font-medium`}
              >
                {language === 'ar' ? destination.name : destination.nameEn}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;

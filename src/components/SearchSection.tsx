
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("hotels");
  const { t, language } = useLanguage();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger 
                  value="hotels" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3 font-semibold"
                >
                  <MapPin className="h-4 w-4" />
                  {t('hotels')}
                </TabsTrigger>
                <TabsTrigger 
                  value="flights"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3 font-semibold"
                >
                  <Calendar className="h-4 w-4" />
                  {t('flights')}
                </TabsTrigger>
                <TabsTrigger 
                  value="cars"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3 font-semibold"
                >
                  <Users className="h-4 w-4" />
                  {t('cars')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotels" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('destination')}</label>
                    <div className="relative">
                      <MapPin className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input placeholder={t('destinationPlaceholder')} className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('checkIn')}</label>
                    <div className="relative">
                      <Calendar className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input type="date" className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('checkOut')}</label>
                    <div className="relative">
                      <Calendar className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input type="date" className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('guests')}</label>
                    <div className="relative">
                      <Users className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input placeholder={t('guestsPlaceholder')} className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="flights" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('from')}</label>
                    <div className="relative">
                      <MapPin className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input placeholder={language === 'ar' ? 'مدينة المغادرة' : 'Departure city'} className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('to')}</label>
                    <div className="relative">
                      <MapPin className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input placeholder={language === 'ar' ? 'مدينة الوصول' : 'Arrival city'} className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('departure')}</label>
                    <div className="relative">
                      <Calendar className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input type="date" className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('travelers')}</label>
                    <div className="relative">
                      <Users className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input placeholder={t('travelersPlaceholder')} className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cars" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('pickupLocation')}</label>
                    <div className="relative">
                      <MapPin className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input placeholder={t('pickupPlaceholder')} className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('pickupDate')}</label>
                    <div className="relative">
                      <Calendar className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input type="date" className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('returnDate')}</label>
                    <div className="relative">
                      <Calendar className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input type="date" className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('carType')}</label>
                    <div className="relative">
                      <Users className={`absolute top-3 h-4 w-4 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <Input placeholder={t('carTypePlaceholder')} className={`h-12 ${language === 'ar' ? 'pr-10' : 'pl-10'}`} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <div className="mt-8 flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Search className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t('searchNow')}
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SearchSection;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("hotels");

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
                  الفنادق
                </TabsTrigger>
                <TabsTrigger 
                  value="flights"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3 font-semibold"
                >
                  <Calendar className="h-4 w-4" />
                  الطيران
                </TabsTrigger>
                <TabsTrigger 
                  value="cars"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3 font-semibold"
                >
                  <Users className="h-4 w-4" />
                  السيارات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotels" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">الوجهة</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="أين تريد الإقامة؟" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">تاريخ الوصول</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">تاريخ المغادرة</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">الضيوف</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="عدد الضيوف" className="pl-10 h-12" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="flights" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">من</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="مدينة المغادرة" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">إلى</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="مدينة الوصول" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">تاريخ المغادرة</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">المسافرون</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="عدد المسافرين" className="pl-10 h-12" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cars" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">مكان الاستلام</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="أين تريد استلام السيارة؟" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">تاريخ الاستلام</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">تاريخ الإرجاع</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">نوع السيارة</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="اختر نوع السيارة" className="pl-10 h-12" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <div className="mt-8 flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Search className="mr-2 h-5 w-5" />
                  ابحث الآن
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

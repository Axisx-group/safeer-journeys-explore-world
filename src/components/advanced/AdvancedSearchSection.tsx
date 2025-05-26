
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Plane,
  Hotel,
  Car,
  Utensils,
  Camera,
  Music,
  Waves,
  Mountain,
  Building,
  Heart,
  Star
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const AdvancedSearchSection = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDates, setSelectedDates] = useState({ from: "", to: "" });
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [budget, setBudget] = useState([1000]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [priceLevel, setPriceLevel] = useState<number[]>([3]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const moodTags = [
    { id: 'romantic', label: 'Romantic', label_ar: 'رومانسي', icon: Heart, color: 'bg-pink-100 text-pink-800' },
    { id: 'adventurous', label: 'Adventurous', label_ar: 'مغامر', icon: Mountain, color: 'bg-green-100 text-green-800' },
    { id: 'relaxing', label: 'Relaxing', label_ar: 'مسترخٍ', icon: Waves, color: 'bg-blue-100 text-blue-800' },
    { id: 'cultural', label: 'Cultural', label_ar: 'ثقافي', icon: Building, color: 'bg-purple-100 text-purple-800' },
    { id: 'energetic', label: 'Energetic', label_ar: 'نشيط', icon: Star, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'sophisticated', label: 'Sophisticated', label_ar: 'راقي', icon: Star, color: 'bg-gray-100 text-gray-800' }
  ];

  const activityTypes = [
    { id: 'sightseeing', label: 'Sightseeing', label_ar: 'سياحة', icon: Camera },
    { id: 'beach', label: 'Beach', label_ar: 'شاطئ', icon: Waves },
    { id: 'culture', label: 'Culture', label_ar: 'ثقافة', icon: Building },
    { id: 'cuisine', label: 'Cuisine', label_ar: 'مأكولات', icon: Utensils },
    { id: 'nightlife', label: 'Nightlife', label_ar: 'حياة ليلية', icon: Music },
    { id: 'history', label: 'History', label_ar: 'تاريخ', icon: Building }
  ];

  const toggleMood = (moodId: string) => {
    setSelectedMoods(prev => 
      prev.includes(moodId) 
        ? prev.filter(id => id !== moodId)
        : [...prev, moodId]
    );
  };

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'ابحث عن رحلتك المثالية' : 'Find Your Perfect Journey'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'ar' ? 'بحث متقدم مدعوم بالذكاء الاصطناعي' : 'AI-Powered Advanced Search'}
          </p>
        </motion.div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Basic Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label className="text-sm font-medium mb-2 block">
                  {language === 'ar' ? 'إلى أين تريد أن تذهب؟' : 'Where do you want to go?'}
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={language === 'ar' ? 'ابحث عن وجهة...' : 'Search destination...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {language === 'ar' ? 'تواريخ السفر' : 'Travel Dates'}
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    value={selectedDates.from}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, from: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {language === 'ar' ? 'المسافرون' : 'Travelers'}
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={`${guests.adults + guests.children} ${language === 'ar' ? 'مسافر' : 'travelers'}`}
                    readOnly
                    className="pl-10 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex justify-center mb-6">
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {language === 'ar' ? 'فلاتر متقدمة' : 'Advanced Filters'}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 border-t pt-6"
              >
                {/* Budget Range */}
                <div>
                  <Label className="text-sm font-medium mb-4 block flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {language === 'ar' ? `الميزانية: €${budget[0]}` : `Budget: €${budget[0]}`}
                  </Label>
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={5000}
                    min={200}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>€200</span>
                    <span>€5000+</span>
                  </div>
                </div>

                {/* Price Level */}
                <div>
                  <Label className="text-sm font-medium mb-4 block">
                    {language === 'ar' ? 'مستوى الأسعار' : 'Price Level'}
                  </Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <Button
                        key={level}
                        variant={priceLevel[0] === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPriceLevel([level])}
                        className="flex-1"
                      >
                        {'€'.repeat(level)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mood Tags */}
                <div>
                  <Label className="text-sm font-medium mb-4 block">
                    {language === 'ar' ? 'ما هو مزاجك؟' : 'What\'s your mood?'}
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {moodTags.map((mood) => {
                      const IconComponent = mood.icon;
                      const isSelected = selectedMoods.includes(mood.id);
                      return (
                        <Button
                          key={mood.id}
                          variant="outline"
                          onClick={() => toggleMood(mood.id)}
                          className={`h-auto p-3 justify-start ${
                            isSelected ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {language === 'ar' ? mood.label_ar : mood.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Activity Types */}
                <div>
                  <Label className="text-sm font-medium mb-4 block">
                    {language === 'ar' ? 'الأنشطة المفضلة' : 'Preferred Activities'}
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activityTypes.map((activity) => {
                      const IconComponent = activity.icon;
                      const isSelected = selectedActivities.includes(activity.id);
                      return (
                        <Button
                          key={activity.id}
                          variant="outline"
                          onClick={() => toggleActivity(activity.id)}
                          className={`h-auto p-3 justify-start ${
                            isSelected ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {language === 'ar' ? activity.label_ar : activity.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <Label className="text-sm font-medium mb-4 block">
                    {language === 'ar' ? 'الخدمات المطلوبة' : 'Required Services'}
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'flight', icon: Plane, label: 'Flight', label_ar: 'طيران' },
                      { id: 'hotel', icon: Hotel, label: 'Hotel', label_ar: 'فندق' },
                      { id: 'car', icon: Car, label: 'Car Rental', label_ar: 'تأجير سيارة' },
                      { id: 'food', icon: Utensils, label: 'Meals', label_ar: 'وجبات' }
                    ].map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <Button
                          key={service.id}
                          variant="outline"
                          className="h-auto p-3 justify-start"
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {language === 'ar' ? service.label_ar : service.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Search Button */}
            <div className="flex justify-center mt-8">
              <Button size="lg" className="px-12 py-3 text-lg">
                <Search className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'ابحث عن الرحلات' : 'Search Trips'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">
            {language === 'ar' ? 'اقتراحات سريعة' : 'Quick Suggestions'}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Romantic Getaway', label_ar: 'إجازة رومانسية' },
              { label: 'Family Adventure', label_ar: 'مغامرة عائلية' },
              { label: 'Solo Travel', label_ar: 'سفر منفرد' },
              { label: 'City Break', label_ar: 'استراحة المدينة' },
              { label: 'Beach Holiday', label_ar: 'عطلة شاطئية' },
              { label: 'Cultural Tour', label_ar: 'جولة ثقافية' }
            ].map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 px-4 py-2"
              >
                {language === 'ar' ? suggestion.label_ar : suggestion.label}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedSearchSection;

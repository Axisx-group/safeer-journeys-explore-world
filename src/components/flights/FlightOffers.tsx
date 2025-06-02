
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import FlightOffersHeader from "./FlightOffersHeader";
import FlightTabContent from "./FlightTabContent";

const FlightOffers = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Popular European routes from Middle East with proper Sky IDs
  const flightRoutes = [
    {
      id: "london",
      name: { en: "London", ar: "لندن" },
      origin: "RUH",
      destination: "LHR",
      date: "2025-06-15"
    },
    {
      id: "paris",
      name: { en: "Paris", ar: "باريس" },
      origin: "RUH", 
      destination: "CDG",
      date: "2025-06-20"
    },
    {
      id: "rome",
      name: { en: "Rome", ar: "روما" },
      origin: "RUH",
      destination: "FCO",
      date: "2025-06-25"
    },
    {
      id: "madrid",
      name: { en: "Madrid", ar: "مدريد" },
      origin: "RUH",
      destination: "MAD",
      date: "2025-06-30"
    }
  ];

  const handleBookFlight = (flight: any) => {
    if (flight.deeplink) {
      window.open(flight.deeplink, '_blank');
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-7xl mx-auto">
        <FlightOffersHeader />

        {/* Tabs for different destinations */}
        <Tabs defaultValue="london" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm p-1 rounded-full">
            {flightRoutes.map((route) => (
              <TabsTrigger 
                key={route.id} 
                value={route.id}
                className="rounded-full px-6 py-3 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                {isArabic ? route.name.ar : route.name.en}
              </TabsTrigger>
            ))}
          </TabsList>

          {flightRoutes.map((route) => (
            <TabsContent key={route.id} value={route.id} className="mt-8">
              <FlightTabContent route={route} onBookFlight={handleBookFlight} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FlightOffers;

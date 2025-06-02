
import HomePageHotelSection from "@/components/hotels/HomePageHotelSection";
import HotelsWithOffers from "@/components/hotels/HotelsWithOffers";
import FlightOffers from "@/components/flights/FlightOffers";

const TravelOffersSections = () => {
  return (
    <>
      {/* Hotel Recommendations Section */}
      <HomePageHotelSection />

      {/* Hotels with Offers Section */}
      <HotelsWithOffers />

      {/* Flight Offers Section */}
      <FlightOffers />
    </>
  );
};

export default TravelOffersSections;

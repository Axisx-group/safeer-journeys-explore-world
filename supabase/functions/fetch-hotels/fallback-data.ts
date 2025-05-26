
import { HotelSearchParams, ProcessedHotel } from './types.ts';

interface CityData {
  name: string;
  country: string;
  currency: string;
  basePriceRange: [number, number];
}

const cities: CityData[] = [
  { name: 'مدريد', country: 'إسبانيا', currency: 'EUR', basePriceRange: [80, 250] },
  { name: 'برشلونة', country: 'إسبانيا', currency: 'EUR', basePriceRange: [90, 280] },
  { name: 'روما', country: 'إيطاليا', currency: 'EUR', basePriceRange: [85, 220] },
  { name: 'باريس', country: 'فرنسا', currency: 'EUR', basePriceRange: [120, 350] },
  { name: 'لندن', country: 'المملكة المتحدة', currency: 'GBP', basePriceRange: [100, 300] },
  { name: 'أمستردام', country: 'هولندا', currency: 'EUR', basePriceRange: [110, 280] },
  { name: 'فيينا', country: 'النمسا', currency: 'EUR', basePriceRange: [95, 240] },
  { name: 'برلين', country: 'ألمانيا', currency: 'EUR', basePriceRange: [80, 200] },
  { name: 'براغ', country: 'التشيك', currency: 'CZK', basePriceRange: [60, 150] },
  { name: 'زيوريخ', country: 'سويسرا', currency: 'CHF', basePriceRange: [150, 400] }
];

const hotelChains = [
  'Hotel Europa', 'Grand Palace', 'City Center Inn', 'Luxury Suites', 'Historic Hotel',
  'Modern Plaza', 'Royal Resort', 'Boutique Hotel', 'Business Center', 'Premium Lodge'
];

const hotelTypes = [
  'Palace', 'Central', 'Elegance', 'Luxury', 'Classic', 'Modern', 'Royal', 'Grand', 'Premium', 'Deluxe'
];

const amenitiesList = [
  ['Free WiFi', 'Restaurant', 'Room Service'],
  ['Free WiFi', 'Pool', 'Gym', 'Spa'],
  ['Free WiFi', 'Free Parking', 'Restaurant', 'Bar'],
  ['Free WiFi', 'Business Center', 'Conference Rooms', 'Concierge'],
  ['Free WiFi', 'Pool', 'Restaurant', 'City Tours'],
  ['Free WiFi', 'Spa', 'Gym', 'Fine Dining'],
  ['Free WiFi', 'Rooftop Bar', 'Restaurant', 'Valet Parking'],
  ['Free WiFi', 'Airport Shuttle', 'Business Center', 'Laundry']
];

export function generateEnhancedEuropeanHotels(
  searchParams: HotelSearchParams, 
  page: number = 1, 
  limit: number = 50
): ProcessedHotel[] {
  const hotels: ProcessedHotel[] = [];
  const startIndex = (page - 1) * limit;

  for (let i = 0; i < limit; i++) {
    const hotelIndex = startIndex + i;
    const cityData = cities[hotelIndex % cities.length];
    const chainName = hotelChains[hotelIndex % hotelChains.length];
    const hotelType = hotelTypes[hotelIndex % hotelTypes.length];
    const amenities = amenitiesList[hotelIndex % amenitiesList.length];
    
    const [minPrice, maxPrice] = cityData.basePriceRange;
    const basePrice = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
    const priceVariation = Math.floor(Math.random() * 50) - 25;
    const finalPrice = Math.max(minPrice, basePrice + priceVariation);

    const hotel: ProcessedHotel = {
      name: `${chainName} ${hotelType}`,
      city: cityData.name,
      country: cityData.country,
      address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${cityData.name}`,
      latitude: 40.4168 + (Math.random() - 0.5) * 10,
      longitude: -3.7038 + (Math.random() - 0.5) * 20,
      star_rating: Math.floor(Math.random() * 3) + 3,
      guest_rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
      price_per_night: finalPrice,
      currency: cityData.currency,
      check_in_date: searchParams.check_in_date,
      check_out_date: searchParams.check_out_date,
      room_type: ['Standard Room', 'Deluxe Room', 'Superior Room', 'Suite', 'Executive Room'][Math.floor(Math.random() * 5)],
      amenities: amenities,
      description: `فندق ${hotelType} في قلب ${cityData.name} مع خدمات متميزة وموقع استراتيجي`,
      image_urls: [
        `https://images.unsplash.com/photo-${1566073771259 + hotelIndex}?w=800`,
        `https://images.unsplash.com/photo-${1564501049412 + hotelIndex}?w=800`
      ],
      booking_url: null,
      free_wifi: amenities.includes('Free WiFi'),
      free_parking: amenities.includes('Free Parking'),
      pool: amenities.includes('Pool'),
      gym: amenities.includes('Gym'),
      spa: amenities.includes('Spa'),
      restaurant: amenities.includes('Restaurant') || Math.random() > 0.3
    };

    hotels.push(hotel);
  }

  return hotels;
}


import { HotelSearchParams, BookingComHotel, ProcessedHotel } from './types.ts';

export async function fetchFromBookingCom(
  searchParams: HotelSearchParams,
  rapidApiKey: string
): Promise<ProcessedHotel[]> {
  const page = searchParams.page || 1;
  
  const bookingUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=-782842&search_type=CITY&arrival_date=${searchParams.check_in_date}&departure_date=${searchParams.check_out_date}&adults=2&children_age=0%2C17&room_qty=1&page_number=${page}&units=metric&temperature_unit=c&languagecode=en&currency_code=EUR`;
  
  console.log('Calling Booking.com API for page:', page);
  
  const response = await fetch(bookingUrl, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
      'X-RapidAPI-Key': rapidApiKey
    }
  });

  if (!response.ok) {
    throw new Error(`Booking.com API failed with status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Booking.com API response received');
  
  if (!data || !data.data || !data.data.hotels || data.data.hotels.length === 0) {
    return [];
  }

  return data.data.hotels.map((hotel: BookingComHotel) => ({
    name: hotel.property?.name || hotel.hotel_name || 'فندق أوروبي',
    city: searchParams.city,
    country: hotel.property?.countryName || hotel.country || 'أوروبا',
    address: hotel.property?.address || hotel.address || '',
    latitude: hotel.property?.latitude || null,
    longitude: hotel.property?.longitude || null,
    star_rating: hotel.property?.starRating || hotel.star_rating || Math.floor(Math.random() * 3) + 3,
    guest_rating: hotel.property?.reviewScore || hotel.guest_rating || (Math.random() * 1.5 + 3.5),
    price_per_night: hotel.property?.priceBreakdown?.grossPrice?.value || 
                    hotel.price_per_night || 
                    Math.floor(Math.random() * 200) + 80,
    currency: hotel.property?.priceBreakdown?.grossPrice?.currency || 
             hotel.currency || 
             'EUR',
    check_in_date: searchParams.check_in_date,
    check_out_date: searchParams.check_out_date,
    room_type: hotel.property?.roomType || hotel.room_type || 'Standard Room',
    amenities: hotel.property?.facilities || hotel.amenities || ['Free WiFi', 'Restaurant'],
    description: hotel.property?.description || 
                hotel.description || 
                'فندق أوروبي متميز مع خدمات عالية الجودة',
    image_urls: hotel.property?.photoUrls || 
               hotel.image_urls || 
               ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
    booking_url: hotel.property?.url || hotel.booking_url || null,
    free_wifi: hotel.property?.facilities?.includes('Free WiFi') || true,
    free_parking: hotel.property?.facilities?.includes('Free parking') || false,
    pool: hotel.property?.facilities?.includes('Pool') || Math.random() > 0.7,
    gym: hotel.property?.facilities?.includes('Gym') || Math.random() > 0.6,
    spa: hotel.property?.facilities?.includes('Spa') || Math.random() > 0.8,
    restaurant: hotel.property?.facilities?.includes('Restaurant') || Math.random() > 0.3
  }));
}

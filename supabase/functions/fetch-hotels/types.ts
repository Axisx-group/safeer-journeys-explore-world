
export interface HotelSearchParams {
  city: string;
  check_in_date: string;
  check_out_date: string;
  page?: number;
  limit?: number;
}

export interface BookingComHotel {
  property?: {
    name?: string;
    countryName?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    starRating?: number;
    reviewScore?: number;
    priceBreakdown?: {
      grossPrice?: {
        value?: number;
        currency?: string;
      };
    };
    roomType?: string;
    facilities?: string[];
    description?: string;
    photoUrls?: string[];
    url?: string;
  };
  hotel_name?: string;
  country?: string;
  address?: string;
  star_rating?: number;
  guest_rating?: number;
  price_per_night?: number;
  currency?: string;
  room_type?: string;
  amenities?: string[];
  description?: string;
  image_urls?: string[];
  booking_url?: string;
}

export interface ProcessedHotel {
  name: string;
  city: string;
  country: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  star_rating?: number;
  guest_rating?: number;
  price_per_night: number;
  currency: string;
  check_in_date: string;
  check_out_date: string;
  room_type?: string;
  amenities?: string[];
  description?: string;
  image_urls?: string[];
  booking_url?: string;
  free_wifi: boolean;
  free_parking: boolean;
  pool: boolean;
  gym: boolean;
  spa: boolean;
  restaurant: boolean;
}

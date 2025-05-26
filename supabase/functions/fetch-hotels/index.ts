
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HotelSearchParams {
  city: string;
  check_in_date: string;
  check_out_date: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { searchParams }: { searchParams: HotelSearchParams } = body;
    
    console.log('Fetching hotels with params:', searchParams);

    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    
    // Generate realistic European hotel data based on the city
    const generateEuropeanHotels = (city: string) => {
      const basePrice = Math.floor(Math.random() * 100) + 80; // 80-180 EUR base price
      
      const europeanHotels = [
        {
          name: 'Hotel Europa Palace',
          city: city || 'مدريد',
          country: 'إسبانيا',
          address: 'Gran Via, Madrid Center',
          star_rating: 5,
          guest_rating: 4.6,
          price_per_night: basePrice + 40,
          currency: 'EUR',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Superior Room',
          amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Free Parking'],
          description: 'Luxury hotel in the heart of Madrid with stunning city views and world-class amenities',
          image_urls: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
          free_wifi: true,
          free_parking: true,
          pool: true,
          gym: true,
          spa: true,
          restaurant: true
        },
        {
          name: 'Hotel Barcelona Central',
          city: 'برشلونة',
          country: 'إسبانيا', 
          address: 'Passeig de Gracia, Barcelona',
          star_rating: 4,
          guest_rating: 4.4,
          price_per_night: basePrice + 15,
          currency: 'EUR',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Deluxe Room',
          amenities: ['Free WiFi', 'Gym', 'Restaurant', 'Business Center'],
          description: 'Modern hotel near Barcelona main attractions and shopping districts',
          image_urls: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: true,
          spa: false,
          restaurant: true
        },
        {
          name: 'Hotel Roma Elegance',
          city: 'روما',
          country: 'إيطاليا',
          address: 'Via del Corso, Roma',
          star_rating: 4,
          guest_rating: 4.3,
          price_per_night: basePrice + 30,
          currency: 'EUR',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Classic Room',
          amenities: ['Free WiFi', 'Restaurant', 'Concierge', 'City Tours'],
          description: 'Charming hotel near the Colosseum and Roman Forum with authentic Italian hospitality',
          image_urls: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: false,
          spa: false,
          restaurant: true
        },
        {
          name: 'Hotel Paris Luxury',
          city: 'باريس',
          country: 'فرنسا',
          address: 'Avenue des Champs-Élysées',
          star_rating: 5,
          guest_rating: 4.7,
          price_per_night: basePrice + 80,
          currency: 'EUR',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Executive Suite',
          amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Room Service', 'Concierge'],
          description: 'Elegant Parisian hotel with views of the Eiffel Tower and luxury amenities',
          image_urls: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: true,
          spa: true,
          restaurant: true
        },
        {
          name: 'Hotel London Bridge',
          city: 'لندن',
          country: 'المملكة المتحدة',
          address: 'Tower Bridge Road, London',
          star_rating: 4,
          guest_rating: 4.2,
          price_per_night: Math.floor(basePrice * 1.2), // Convert to GBP equivalent
          currency: 'GBP',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Standard Room',
          amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Gym'],
          description: 'Modern hotel with spectacular views of Tower Bridge and Thames River',
          image_urls: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: true,
          spa: false,
          restaurant: true
        },
        {
          name: 'Hotel Amsterdam Canal',
          city: 'أمستردام',
          country: 'هولندا',
          address: 'Herengracht Canal District',
          star_rating: 4,
          guest_rating: 4.5,
          price_per_night: basePrice + 25,
          currency: 'EUR',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Canal View Room',
          amenities: ['Free WiFi', 'Restaurant', 'Bike Rental', 'Canal Tours'],
          description: 'Boutique hotel overlooking Amsterdam famous canals with authentic Dutch charm',
          image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: false,
          spa: false,
          restaurant: true
        },
        {
          name: 'Hotel Vienna Classic',
          city: 'فيينا',
          country: 'النمسا',
          address: 'Ringstrasse, Vienna Center',
          star_rating: 4,
          guest_rating: 4.4,
          price_per_night: basePrice + 35,
          currency: 'EUR',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Classic Room',
          amenities: ['Free WiFi', 'Restaurant', 'Classical Music', 'City Center'],
          description: 'Historic hotel in Vienna center with classical Austrian architecture and culture',
          image_urls: ['https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: false,
          spa: false,
          restaurant: true
        },
        {
          name: 'Hotel Berlin Modern',
          city: 'برلين',
          country: 'ألمانيا',
          address: 'Unter den Linden, Berlin',
          star_rating: 4,
          guest_rating: 4.3,
          price_per_night: basePrice + 20,
          currency: 'EUR',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Modern Room',
          amenities: ['Free WiFi', 'Restaurant', 'Museum Tours', 'Modern Design'],
          description: 'Contemporary hotel near Brandenburg Gate with modern German hospitality',
          image_urls: ['https://images.unsplash.com/photo-1559564484-d904bf669cb0?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: true,
          spa: false,
          restaurant: true
        },
        {
          name: 'Hotel Prague Castle',
          city: 'براغ',
          country: 'التشيك',
          address: 'Old Town Square, Prague',
          star_rating: 4,
          guest_rating: 4.5,
          price_per_night: Math.floor(basePrice * 0.7), // Lower cost in CZK equivalent
          currency: 'CZK',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Historic Room',
          amenities: ['Free WiFi', 'Restaurant', 'Castle Views', 'Historic Tours'],
          description: 'Historic hotel with views of Prague Castle and charming Old Town atmosphere',
          image_urls: ['https://images.unsplash.com/photo-1541849546-216549ae216d?w=800'],
          free_wifi: true,
          free_parking: false,
          pool: false,
          gym: false,
          spa: false,
          restaurant: true
        },
        {
          name: 'Hotel Swiss Alps',
          city: 'زيوريخ',
          country: 'سويسرا',
          address: 'Bahnhofstrasse, Zurich',
          star_rating: 5,
          guest_rating: 4.6,
          price_per_night: Math.floor(basePrice * 1.8), // Higher Swiss prices in CHF
          currency: 'CHF',
          check_in_date: searchParams.check_in_date,
          check_out_date: searchParams.check_out_date,
          room_type: 'Alpine Suite',
          amenities: ['Free WiFi', 'Spa', 'Mountain Views', 'Swiss Cuisine'],
          description: 'Luxury Swiss hotel with Alpine views and traditional Swiss hospitality',
          image_urls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
          free_wifi: true,
          free_parking: true,
          pool: true,
          gym: true,
          spa: true,
          restaurant: true
        }
      ];
      
      // Add some price variation
      return europeanHotels.map(hotel => ({
        ...hotel,
        price_per_night: hotel.price_per_night + Math.floor(Math.random() * 50) - 25, // Random variation ±25
        guest_rating: Math.round((hotel.guest_rating + (Math.random() * 0.4 - 0.2)) * 10) / 10 // Small rating variation
      }));
    };

    let hotels = [];
    let dataSource = 'european-hotels';
    
    // Try to fetch from Booking.com API if available
    if (rapidApiKey) {
      try {
        const bookingUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=-782842&search_type=CITY&arrival_date=${searchParams.check_in_date}&departure_date=${searchParams.check_out_date}&adults=2&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en&currency_code=EUR`;
        
        console.log('Trying Booking.com API...');
        const response = await fetch(bookingUrl, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
            'X-RapidAPI-Key': rapidApiKey
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Booking.com API response received');
          if (data && data.data && data.data.hotels && data.data.hotels.length > 0) {
            dataSource = 'booking.com';
            // Transform booking.com data to our format
            hotels = data.data.hotels.slice(0, 8).map((hotel: any) => ({
              name: hotel.property.name || 'Hotel Name',
              city: searchParams.city,
              country: hotel.property.countryName || 'Europe',
              address: hotel.property.address || '',
              star_rating: hotel.property.starRating || 4,
              guest_rating: hotel.property.reviewScore || 4.0,
              price_per_night: hotel.property.priceBreakdown?.grossPrice?.value || 120,
              currency: hotel.property.priceBreakdown?.grossPrice?.currency || 'EUR',
              check_in_date: searchParams.check_in_date,
              check_out_date: searchParams.check_out_date,
              room_type: 'Standard Room',
              amenities: hotel.property.facilities?.slice(0, 4) || ['Free WiFi'],
              description: hotel.property.description || 'Great hotel in Europe',
              image_urls: hotel.property.photoUrls?.slice(0, 3) || [],
              free_wifi: true,
              free_parking: false,
              pool: false,
              gym: false,
              spa: false,
              restaurant: true
            }));
            console.log(`Successfully processed ${hotels.length} hotels from Booking.com`);
          }
        } else {
          console.log('Booking.com API failed with status:', response.status);
        }
      } catch (apiError) {
        console.error('Booking.com API error:', apiError);
      }
    } else {
      console.log('No RAPIDAPI_KEY found, using European hotel data directly');
    }
    
    // Use European fallback data if API failed or no API key
    if (hotels.length === 0) {
      hotels = generateEuropeanHotels(searchParams.city);
      console.log(`Generated ${hotels.length} European hotels`);
    }

    // Insert into database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // Clear existing hotels
      await supabase.from('hotels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      console.log('Cleared existing hotels');
      
      // Insert new hotels
      const { data, error } = await supabase.from('hotels').insert(hotels).select();
      
      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }
      
      console.log(`Successfully inserted ${hotels.length} hotels into database`);
      
      return new Response(
        JSON.stringify({
          success: true,
          hotels: data,
          source: dataSource,
          message: `تم جلب ${hotels.length} فندق أوروبي بنجاح من ${dataSource}`
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return data even if database fails
      return new Response(
        JSON.stringify({
          success: true,
          hotels: hotels,
          source: dataSource,
          message: `تم جلب ${hotels.length} فندق أوروبي (تحذير: مشكلة في حفظ البيانات)`
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

  } catch (error) {
    console.error('Error fetching hotels:', error);
    
    const emergencyEuropeanHotels = [
      {
        name: 'Hotel Europa Central',
        city: 'مدريد',
        country: 'إسبانيا',
        star_rating: 4,
        guest_rating: 4.3,
        price_per_night: 85,
        currency: 'EUR',
        check_in_date: '2024-03-15',
        check_out_date: '2024-03-17',
        amenities: ['Free WiFi', 'Restaurant', 'Gym'],
        description: 'Modern European hotel in city center',
        image_urls: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
        free_wifi: true,
        free_parking: false,
        pool: false,
        gym: true,
        spa: false,
        restaurant: true
      }
    ];
    
    return new Response(
      JSON.stringify({
        success: true,
        hotels: emergencyEuropeanHotels,
        source: 'emergency-fallback',
        message: 'تم استخدام بيانات احتياطية أوروبية نتيجة خطأ تقني'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HotelSearchParams } from './types.ts';
import { fetchFromBookingCom } from './booking-api.ts';
import { generateEnhancedEuropeanHotels } from './fallback-data.ts';
import { saveHotelsToDatabase } from './database.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { searchParams }: { searchParams: HotelSearchParams } = body;
    
    console.log('Fetching hotels with params:', searchParams);

    // Use your provided RapidAPI key
    const rapidApiKey = '5283cccec4mshe94884681afa7b2p1d7553jsn81838e7edc5b';
    const page = searchParams.page || 1;
    const limit = searchParams.limit || 50;
    
    let hotels = [];
    let dataSource = 'booking.com';
    let totalHotels = 0;
    
    // Try to fetch from Booking.com API with your key
    try {
      hotels = await fetchFromBookingCom(searchParams, rapidApiKey);
      totalHotels = hotels.length > 0 ? 500 : 0; // Estimate total
      
      if (hotels.length > 0) {
        console.log(`Successfully processed ${hotels.length} hotels from Booking.com page ${page}`);
      }
    } catch (apiError) {
      console.error('Booking.com API error:', apiError);
      
      // Use fallback data if API fails
      dataSource = 'enhanced-european-hotels';
      hotels = generateEnhancedEuropeanHotels(searchParams, page, limit);
      totalHotels = 500;
      console.log(`Generated ${hotels.length} enhanced European hotels for page ${page}`);
    }
    
    // Use fallback data if no API data
    if (hotels.length === 0) {
      dataSource = 'enhanced-european-hotels';
      hotels = generateEnhancedEuropeanHotels(searchParams, page, limit);
      totalHotels = 500;
      console.log(`Generated ${hotels.length} enhanced European hotels for page ${page}`);
    }

    // Save to database
    const savedHotels = await saveHotelsToDatabase(hotels, page);
      
    return new Response(
      JSON.stringify({
        success: true,
        hotels: savedHotels,
        source: dataSource,
        page: page,
        limit: limit,
        total: totalHotels,
        hasMore: hotels.length === limit,
        message: `تم جلب ${hotels.length} فندق بنجاح من ${dataSource} - الصفحة ${page}`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error fetching hotels:', error);
    
    // Emergency fallback
    const emergencyHotels = generateEnhancedEuropeanHotels({
      city: 'مدريد',
      check_in_date: '2025-06-15',
      check_out_date: '2025-06-18'
    }, 1, 20);
    
    return new Response(
      JSON.stringify({
        success: true,
        hotels: emergencyHotels,
        source: 'emergency-fallback',
        page: 1,
        limit: 20,
        total: 20,
        hasMore: false,
        message: 'تم استخدام بيانات احتياطية أوروبية نتيجة خطأ تقني'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});

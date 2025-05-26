
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { searchParams } = await req.json();
    
    console.log('Fetching hotels with params:', searchParams);

    // Replace this with actual Booking.com API call
    // For now, we'll insert sample data
    const sampleHotels = [
      {
        name: 'فندق الريتز كارلتون الرياض',
        city: 'الرياض',
        country: 'السعودية',
        address: 'حي الملك عبدالله، الرياض',
        star_rating: 5,
        guest_rating: 4.8,
        price_per_night: 800.00,
        currency: 'SAR',
        check_in_date: '2024-02-15',
        check_out_date: '2024-02-17',
        room_type: 'غرفة ديلوكس',
        amenities: ['واي فاي مجاني', 'مسبح', 'جيم', 'سبا', 'مطعم'],
        description: 'فندق فاخر في قلب الرياض مع إطلالة رائعة على المدينة',
        image_urls: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
        free_wifi: true,
        free_parking: true,
        pool: true,
        gym: true,
        spa: true,
        restaurant: true
      },
      {
        name: 'فندق هيلتون جدة',
        city: 'جدة',
        country: 'السعودية',
        address: 'كورنيش جدة، جدة',
        star_rating: 4,
        guest_rating: 4.5,
        price_per_night: 450.00,
        currency: 'SAR',
        check_in_date: '2024-02-16',
        check_out_date: '2024-02-18',
        room_type: 'غرفة بإطلالة بحرية',
        amenities: ['واي فاي مجاني', 'مسبح', 'جيم', 'مطعم'],
        description: 'فندق أنيق على الكورنيش مع إطلالة مباشرة على البحر الأحمر',
        image_urls: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
        free_wifi: true,
        free_parking: true,
        pool: true,
        gym: true,
        spa: false,
        restaurant: true
      }
    ];

    // Insert sample hotels into database
    const { data, error } = await supabaseClient
      .from('hotels')
      .upsert(sampleHotels)
      .select();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        hotels: data,
        message: 'تم جلب بيانات الفنادق بنجاح' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error fetching hotels:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: 'حدث خطأ في جلب بيانات الفنادق' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

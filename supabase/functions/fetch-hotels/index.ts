
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

    const body = await req.json();
    const { searchParams } = body;
    
    console.log('Fetching hotels with params:', searchParams);

    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!rapidApiKey) {
      console.log('RAPIDAPI_KEY not found, using sample data');
    }

    // Sample hotels data that will be inserted into the database
    const sampleHotels = [
      {
        name: 'فندق الريتز كارلتون الرياض',
        city: searchParams?.city || 'الرياض',
        country: 'السعودية',
        address: 'حي الملك عبدالله، الرياض',
        star_rating: 5,
        guest_rating: 4.8,
        price_per_night: 800.00,
        currency: 'SAR',
        check_in_date: searchParams?.check_in_date || '2024-03-15',
        check_out_date: searchParams?.check_out_date || '2024-03-17',
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
        check_in_date: searchParams?.check_in_date || '2024-03-15',
        check_out_date: searchParams?.check_out_date || '2024-03-17',
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
      },
      {
        name: 'منتجع شرم الشيخ الفاخر',
        city: 'شرم الشيخ',
        country: 'مصر',
        address: 'خليج نعمة، شرم الشيخ',
        star_rating: 5,
        guest_rating: 4.7,
        price_per_night: 650.00,
        currency: 'SAR',
        check_in_date: searchParams?.check_in_date || '2024-03-15',
        check_out_date: searchParams?.check_out_date || '2024-03-17',
        room_type: 'جناح بإطلالة بحرية',
        amenities: ['واي فاي مجاني', 'مسبح', 'شاطئ خاص', 'سبا', 'مطاعم متعددة'],
        description: 'منتجع فاخر على البحر الأحمر مع شاطئ خاص ومرافق عالمية',
        image_urls: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
        free_wifi: true,
        free_parking: true,
        pool: true,
        gym: true,
        spa: true,
        restaurant: true
      },
      {
        name: 'فندق برج العرب دبي',
        city: 'دبي',
        country: 'الإمارات العربية المتحدة',
        address: 'شاطئ جميرا، دبي',
        star_rating: 5,
        guest_rating: 4.9,
        price_per_night: 1200.00,
        currency: 'SAR',
        check_in_date: searchParams?.check_in_date || '2024-03-15',
        check_out_date: searchParams?.check_out_date || '2024-03-17',
        room_type: 'جناح ملكي',
        amenities: ['واي فاي مجاني', 'مسبح لامتناهي', 'سبا', 'مطاعم فاخرة', 'خدمة الخادم الشخصي'],
        description: 'أيقونة الفخامة في دبي مع إطلالات خلابة وخدمة استثنائية',
        image_urls: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'],
        free_wifi: true,
        free_parking: true,
        pool: true,
        gym: true,
        spa: true,
        restaurant: true
      }
    ];

    // Insert hotels into database
    const { data, error } = await supabaseClient
      .from('hotels')
      .upsert(sampleHotels, { onConflict: 'name' })
      .select();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Successfully inserted hotels:', data);

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

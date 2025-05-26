
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
    
    console.log('Fetching flights with params:', searchParams);

    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!rapidApiKey) {
      console.log('RAPIDAPI_KEY not found, using sample data');
    }

    // Sample flights data that will be inserted into the database
    const sampleFlights = [
      {
        flight_number: 'SV1234',
        departure_airport: 'RUH',
        arrival_airport: 'JED',
        departure_city: searchParams?.departure_city || 'الرياض',
        arrival_city: searchParams?.arrival_city || 'جدة',
        departure_date: searchParams?.departure_date || '2024-03-15',
        departure_time: '08:00',
        arrival_time: '09:30',
        airline: 'الخطوط السعودية',
        price: 450.00,
        currency: 'SAR',
        duration_minutes: 90,
        stops: 0,
        is_direct: true,
        class_type: 'economy',
        available_seats: 25
      },
      {
        flight_number: 'MS789',
        departure_airport: 'CAI',
        arrival_airport: 'RUH',
        departure_city: 'القاهرة',
        arrival_city: 'الرياض',
        departure_date: searchParams?.departure_date || '2024-03-15',
        departure_time: '14:00',
        arrival_time: '17:00',
        airline: 'مصر للطيران',
        price: 1200.00,
        currency: 'SAR',
        duration_minutes: 180,
        stops: 0,
        is_direct: true,
        class_type: 'economy',
        available_seats: 15
      },
      {
        flight_number: 'EK456',
        departure_airport: 'DXB',
        arrival_airport: 'RUH',
        departure_city: 'دبي',
        arrival_city: 'الرياض',
        departure_date: searchParams?.departure_date || '2024-03-15',
        departure_time: '10:30',
        arrival_time: '11:45',
        airline: 'طيران الإمارات',
        price: 850.00,
        currency: 'SAR',
        duration_minutes: 75,
        stops: 0,
        is_direct: true,
        class_type: 'economy',
        available_seats: 30
      },
      {
        flight_number: 'QR321',
        departure_airport: 'DOH',
        arrival_airport: 'JED',
        departure_city: 'الدوحة',
        arrival_city: 'جدة',
        departure_date: searchParams?.departure_date || '2024-03-15',
        departure_time: '16:15',
        arrival_time: '17:45',
        airline: 'الخطوط القطرية',
        price: 920.00,
        currency: 'SAR',
        duration_minutes: 90,
        stops: 0,
        is_direct: true,
        class_type: 'economy',
        available_seats: 20
      }
    ];

    // Insert flights into database
    const { data, error } = await supabaseClient
      .from('flights')
      .upsert(sampleFlights, { onConflict: 'flight_number' })
      .select();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Successfully inserted flights:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        flights: data,
        message: 'تم جلب بيانات الرحلات بنجاح' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error fetching flights:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: 'حدث خطأ في جلب بيانات الرحلات' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

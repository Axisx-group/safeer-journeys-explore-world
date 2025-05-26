
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
    
    console.log('Fetching flights with params:', searchParams);

    // Replace this with actual Skyscanner API call
    // For now, we'll insert sample data
    const sampleFlights = [
      {
        flight_number: 'SV123',
        departure_airport: 'RUH',
        arrival_airport: 'JED',
        departure_city: 'الرياض',
        arrival_city: 'جدة',
        departure_date: '2024-02-15',
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
        flight_number: 'MS456',
        departure_airport: 'CAI',
        arrival_airport: 'RUH',
        departure_city: 'القاهرة',
        arrival_city: 'الرياض',
        departure_date: '2024-02-16',
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
      }
    ];

    // Insert sample flights into database
    const { data, error } = await supabaseClient
      .from('flights')
      .upsert(sampleFlights)
      .select();

    if (error) {
      throw error;
    }

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

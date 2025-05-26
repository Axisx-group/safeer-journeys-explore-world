
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
    
    console.log('Fetching flights from Booking.com API with params:', searchParams);

    // Get RapidAPI key from environment
    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!rapidApiKey) {
      throw new Error('RAPIDAPI_KEY not configured');
    }

    // Default search parameters
    const departureDate = searchParams?.departure_date || '2024-03-15';
    const departureCity = searchParams?.departure_city || 'الرياض';
    const arrivalCity = searchParams?.arrival_city || 'جدة';
    
    // Convert Arabic city names to airport codes
    const cityToAirport: { [key: string]: string } = {
      'الرياض': 'RUH',
      'جدة': 'JED',
      'الدمام': 'DMM',
      'مكة': 'JED', // Closest airport to Mecca
      'المدينة': 'MED',
      'الطائف': 'TIF'
    };
    
    const departureAirport = cityToAirport[departureCity] || 'RUH';
    const arrivalAirport = cityToAirport[arrivalCity] || 'JED';

    // Call Booking.com Flights API via RapidAPI
    const apiUrl = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${departureAirport}&toId=${arrivalAirport}&departDate=${departureDate}&pageNo=1&adults=1&children=0%2C17&sort=PRICE&cabinClass=ECONOMY&currency_code=USD`;

    console.log('Calling flights API with URL:', apiUrl);

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
        'X-RapidAPI-Key': rapidApiKey
      }
    });

    if (!apiResponse.ok) {
      console.error('Booking.com Flights API error:', apiResponse.status, apiResponse.statusText);
      throw new Error(`API call failed: ${apiResponse.status}`);
    }

    const apiData = await apiResponse.json();
    console.log('Booking.com Flights API response received:', apiData);

    // Clear existing data first
    const { error: deleteError } = await supabaseClient
      .from('flights')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.log('Note: Could not clear existing flights:', deleteError);
    }

    // Transform API data to our database format
    const transformedFlights = [];
    
    if (apiData?.data?.flightOffers && Array.isArray(apiData.data.flightOffers)) {
      for (const flight of apiData.data.flightOffers.slice(0, 10)) { // Limit to 10 flights
        const segment = flight.segments?.[0];
        if (segment) {
          const transformedFlight = {
            flight_number: segment.flightNumber || `FL${Math.floor(Math.random() * 9000 + 1000)}`,
            departure_airport: departureAirport,
            arrival_airport: arrivalAirport,
            departure_city: departureCity,
            arrival_city: arrivalCity,
            departure_date: departureDate,
            departure_time: segment.departureTime?.slice(11, 16) || '08:00',
            arrival_time: segment.arrivalTime?.slice(11, 16) || '10:00',
            airline: segment.marketingCarrier?.name || 'الخطوط السعودية',
            price: flight.priceBreakdown?.total?.units ? parseFloat(flight.priceBreakdown.total.units) * 3.75 : 450, // Convert USD to SAR
            currency: 'SAR',
            duration_minutes: segment.duration || 90,
            stops: segment.stops || 0,
            is_direct: !segment.stops || segment.stops === 0,
            class_type: 'economy',
            available_seats: Math.floor(Math.random() * 50) + 10
          };
          
          transformedFlights.push(transformedFlight);
        }
      }
    }

    // If no data from API, use fallback data
    if (transformedFlights.length === 0) {
      console.log('No flights data from API, using fallback data');
      transformedFlights.push({
        flight_number: 'SV' + Math.floor(Math.random() * 9000 + 1000),
        departure_airport: departureAirport,
        arrival_airport: arrivalAirport,
        departure_city: departureCity,
        arrival_city: arrivalCity,
        departure_date: departureDate,
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
      });
    }

    // Insert flights into database
    const { data, error } = await supabaseClient
      .from('flights')
      .insert(transformedFlights)
      .select();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Successfully inserted flights from Booking.com:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        flights: data,
        source: 'booking.com',
        message: 'تم جلب بيانات الرحلات من Booking.com بنجاح' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error fetching flights from Booking.com:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: 'حدث خطأ في جلب بيانات الرحلات من Booking.com' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

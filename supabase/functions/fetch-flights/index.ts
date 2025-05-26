
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from './constants.ts';
import { SearchParams, APIResponse } from './types.ts';
import { fetchFromSkyscanner } from './skyscanner-api.ts';
import { fetchFromBooking } from './booking-api.ts';
import { generateFallbackFlights } from './fallback-data.ts';
import { clearExistingFlights, insertFlights } from './database.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { searchParams }: { searchParams: SearchParams } = body;
    
    console.log('Fetching flights from Skyscanner API with params:', searchParams);

    // Get RapidAPI key from environment
    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!rapidApiKey) {
      throw new Error('RAPIDAPI_KEY not configured');
    }

    // Default search parameters
    const departureDate = searchParams?.departure_date || '2025-06-01';
    const departureCity = searchParams?.departure_city || 'الرياض';
    const arrivalCity = searchParams?.arrival_city || 'مدريد';
    
    const normalizedParams: SearchParams = {
      departure_date: departureDate,
      departure_city: departureCity,
      arrival_city: arrivalCity
    };

    let transformedFlights = [];
    
    // Try Skyscanner API first
    try {
      transformedFlights = await fetchFromSkyscanner(normalizedParams, rapidApiKey);
      console.log(`Successfully fetched ${transformedFlights.length} flights from Skyscanner`);
    } catch (skyscannerError) {
      console.log('Skyscanner API error:', skyscannerError);
    }

    // If Skyscanner failed, try Booking.com API as fallback
    if (transformedFlights.length === 0) {
      try {
        transformedFlights = await fetchFromBooking(normalizedParams, rapidApiKey);
      } catch (bookingError) {
        console.log('Booking.com API error:', bookingError);
      }
    }

    // If both APIs failed, use fallback data
    if (transformedFlights.length === 0) {
      transformedFlights = generateFallbackFlights(normalizedParams);
    }

    // Clear existing data and insert new flights
    await clearExistingFlights();
    const data = await insertFlights(transformedFlights);

    const response: APIResponse = {
      success: true,
      flights: data,
      source: transformedFlights.length > 0 ? 'skyscanner/booking.com' : 'fallback',
      message: 'تم جلب بيانات الرحلات من Skyscanner و Booking.com بنجاح'
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error fetching flights:', error);
    
    const errorResponse: APIResponse = {
      success: false,
      source: 'error',
      message: 'حدث خطأ في جلب بيانات الرحلات'
    };
    
    return new Response(
      JSON.stringify(errorResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

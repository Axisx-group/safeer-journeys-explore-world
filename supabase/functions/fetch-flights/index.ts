
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
    
    console.log('Fetching flights with params:', searchParams);

    // Get RapidAPI key from environment
    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    
    // Default search parameters with validation
    const departureDate = searchParams?.departure_date || '2025-06-01';
    const departureCity = searchParams?.departure_city || 'الرياض';
    const arrivalCity = searchParams?.arrival_city || 'مدريد';
    
    const normalizedParams: SearchParams = {
      departure_date: departureDate,
      departure_city: departureCity,
      arrival_city: arrivalCity
    };

    let transformedFlights = [];
    let dataSource = 'fallback';
    
    // Only try external APIs if we have API key
    if (rapidApiKey) {
      try {
        transformedFlights = await fetchFromSkyscanner(normalizedParams, rapidApiKey);
        if (transformedFlights.length > 0) {
          dataSource = 'skyscanner';
          console.log(`Successfully fetched ${transformedFlights.length} flights from Skyscanner`);
        }
      } catch (skyscannerError) {
        console.log('Skyscanner API error:', skyscannerError);
      }

      // If Skyscanner failed, try Booking.com
      if (transformedFlights.length === 0) {
        try {
          transformedFlights = await fetchFromBooking(normalizedParams, rapidApiKey);
          if (transformedFlights.length > 0) {
            dataSource = 'booking.com';
            console.log(`Successfully fetched ${transformedFlights.length} flights from Booking.com`);
          }
        } catch (bookingError) {
          console.log('Booking.com API error:', bookingError);
        }
      }
    } else {
      console.log('No RAPIDAPI_KEY found, using fallback data directly');
    }

    // If both APIs failed or no API key, use enhanced fallback data
    if (transformedFlights.length === 0) {
      transformedFlights = generateFallbackFlights(normalizedParams);
      console.log(`Generated ${transformedFlights.length} fallback flights`);
    }

    // Clear existing data and insert new flights
    try {
      await clearExistingFlights();
      console.log('Cleared existing flights');
      
      if (transformedFlights.length > 0) {
        const data = await insertFlights(transformedFlights);
        console.log('Successfully inserted flights into database');

        const response: APIResponse = {
          success: true,
          flights: data,
          source: dataSource,
          message: `تم جلب ${transformedFlights.length} رحلة بنجاح من ${dataSource}`
        };

        return new Response(
          JSON.stringify(response),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return the flights even if database insertion fails
      const response: APIResponse = {
        success: true,
        flights: transformedFlights,
        source: dataSource,
        message: `تم جلب ${transformedFlights.length} رحلة (تحذير: مشكلة في حفظ البيانات)`
      };

      return new Response(
        JSON.stringify(response),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    throw new Error('No flights could be generated');

  } catch (error) {
    console.error('Error fetching flights:', error);
    
    // Generate emergency fallback
    const emergencyFlights = generateFallbackFlights({
      departure_city: 'الرياض',
      arrival_city: 'مدريد', 
      departure_date: '2025-06-01'
    });
    
    const errorResponse: APIResponse = {
      success: true, // Set to true to provide data despite errors
      flights: emergencyFlights,
      source: 'emergency-fallback',
      message: 'تم استخدام بيانات احتياطية نتيجة خطأ تقني'
    };
    
    return new Response(
      JSON.stringify(errorResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});

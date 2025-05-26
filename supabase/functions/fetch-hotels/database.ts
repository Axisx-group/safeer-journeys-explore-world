
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ProcessedHotel } from './types.ts';

export async function saveHotelsToDatabase(
  hotels: ProcessedHotel[], 
  page: number
): Promise<ProcessedHotel[]> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Clear existing hotels only on the first page
    if (page === 1) {
      await supabase.from('hotels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      console.log('Cleared existing hotels');
    }
    
    // Insert new hotels
    const { data, error } = await supabase.from('hotels').insert(hotels).select();
    
    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }
    
    console.log(`Successfully inserted ${hotels.length} hotels into database`);
    return data as ProcessedHotel[];
    
  } catch (dbError) {
    console.error('Database error:', dbError);
    // Return hotels even if database save fails
    return hotels;
  }
}

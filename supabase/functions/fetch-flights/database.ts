
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { FlightData } from './types.ts';

export async function clearExistingFlights() {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { error } = await supabaseClient
    .from('flights')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (error) {
    console.log('Note: Could not clear existing flights:', error);
  }
}

export async function insertFlights(flights: FlightData[]) {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data, error } = await supabaseClient
    .from('flights')
    .insert(flights)
    .select();

  if (error) {
    console.error('Database error:', error);
    throw error;
  }

  console.log('Successfully inserted flights:', data);
  return data;
}

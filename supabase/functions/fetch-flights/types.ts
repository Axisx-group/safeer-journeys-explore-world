
export interface SearchParams {
  departure_city: string;
  arrival_city: string;
  departure_date: string;
}

export interface FlightData {
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_city: string;
  arrival_city: string;
  departure_date: string;
  departure_time: string;
  arrival_time: string;
  airline: string;
  price: number;
  currency: string;
  duration_minutes: number;
  stops: number;
  is_direct: boolean;
  class_type: string;
  available_seats: number;
}

export interface APIResponse {
  success: boolean;
  flights?: FlightData[];
  source: string;
  message: string;
}

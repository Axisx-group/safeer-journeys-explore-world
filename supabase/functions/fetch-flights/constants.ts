
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const cityToAirport: { [key: string]: string } = {
  'الرياض': 'RUH',
  'جدة': 'JED',
  'الدمام': 'DMM',
  'مكة': 'JED',
  'المدينة': 'MED',
  'الطائف': 'TIF',
  'مدريد': 'MAD',
  'برشلونة': 'BCN',
  'باريس': 'CDG',
  'لندن': 'LHR',
  'روما': 'FCO',
  'أمستردام': 'AMS',
  'فرانكفورت': 'FRA',
  'زيورخ': 'ZUR',
  'إسطنبول': 'IST',
  'دبي': 'DXB',
  'الدوحة': 'DOH',
  'الكويت': 'KWI',
  'القاهرة': 'CAI'
};

export const airlines = ['الخطوط السعودية', 'طيران ناس', 'طيران أديل', 'فلاي دبي', 'الإمارات', 'القطرية'];

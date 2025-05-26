
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const cityToAirport: { [key: string]: string } = {
  // Saudi departure cities only
  'الرياض': 'RUH',
  'جدة': 'JED', 
  'الدمام': 'DMM',
  
  // European destinations only
  'مدريد': 'MAD',
  'برشلونة': 'BCN',
  'باريس': 'CDG',
  'لندن': 'LHR',
  'روما': 'FCO',
  'أمستردام': 'AMS',
  'فرانكفورت': 'FRA',
  'زيورخ': 'ZUR',
  'إسطنبول': 'IST',
  'براغ': 'PRG',
  'بودابست': 'BUD',
  'وارسو': 'WAW',
  'ميلان': 'MXP',
  'أثينا': 'ATH',
  'لشبونة': 'LIS',
  'ستوكهولم': 'ARN',
  'كوبنهاغن': 'CPH',
  'أوسلو': 'OSL',
  'هلسنكي': 'HEL',
  'بروكسل': 'BRU',
  'دبلن': 'DUB',
  'فيينا': 'VIE',
  'برلين': 'BER'
};

// European budget airlines only - no Gulf carriers
export const airlines = [
  'Ryanair',
  'EasyJet',
  'Wizz Air', 
  'Vueling',
  'Eurowings',
  'Norwegian Air',
  'Jet2',
  'Pegasus Airlines',
  'Transavia',
  'TUI Airways',
  'Volotea',
  'Air Europa',
  'TAP Air Portugal',
  'Lufthansa',
  'KLM',
  'Air France'
];

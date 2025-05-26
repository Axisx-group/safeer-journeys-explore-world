export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const cityToAirport: { [key: string]: string } = {
  // Saudi departure cities
  'الرياض': 'RUH',
  'جدة': 'JED', 
  'الدمام': 'DMM',
  
  // GCC
  'دبي': 'DXB',
  'أبوظبي': 'AUH',
  'الشارقة': 'SHJ',
  'الدوحة': 'DOH',
  'الكويت': 'KWI',
  'المنامة': 'BAH',
  'مسقط': 'MCT',
  
  // Middle East
  'عمان': 'AMM',
  'بيروت': 'BEY',
  'القاهرة': 'CAI',
  'إسطنبول': 'IST',
  
  // Europe
  'لندن': 'LHR',
  'باريس': 'CDG',
  'مدريد': 'MAD',
  'برشلونة': 'BCN',
  'روما': 'FCO',
  'أمستردام': 'AMS',
  'فرانكفورت': 'FRA',
  'زيورخ': 'ZUR',
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
  'برلين': 'BER',
  
  // Asia
  'طوكيو': 'NRT',
  'سيول': 'ICN',
  'بكين': 'PEK',
  'شنغهاي': 'PVG',
  'هونغ كونغ': 'HKG',
  'سنغافورة': 'SIN',
  'كوالالمبور': 'KUL',
  'بانكوك': 'BKK',
  'جاكرتا': 'CGK',
  'مانيلا': 'MNL',
  'دلهي': 'DEL',
  'مومباي': 'BOM',
  'بنغالور': 'BLR',
  'كراتشي': 'KHI',
  'إسلام آباد': 'ISB',
  'لاهور': 'LHE',
  'دكا': 'DAC',
  'كولومبو': 'CMB',
  
  // North America
  'نيويورك': 'JFK',
  'لوس أنجلوس': 'LAX',
  'شيكاغو': 'ORD',
  'ميامي': 'MIA',
  'سان فرانسيسكو': 'SFO',
  'واشنطن': 'DCA',
  'بوسطن': 'BOS',
  'تورونتو': 'YYZ',
  'فانكوفر': 'YVR',
  'مونتريال': 'YUL',
  
  // South America
  'ساو باولو': 'GRU',
  'ريو دي جانيرو': 'GIG',
  'بوينس آيرس': 'EZE',
  'ليما': 'LIM',
  'سانتياغو': 'SCL',
  'بوغوتا': 'BOG',
  
  // Africa
  'الدار البيضاء': 'CMN',
  'تونس': 'TUN',
  'الجزائر': 'ALG',
  'الخرطوم': 'KRT',
  'أديس أبابا': 'ADD',
  'نيروبي': 'NBO',
  'كيب تاون': 'CPT',
  'جوهانسبرغ': 'JNB',
  'لاجوس': 'LOS',
  
  // Oceania
  'سيدني': 'SYD',
  'ملبورن': 'MEL',
  'بيرث': 'PER',
  'أوكلاند': 'AKL',
  'ولينغتون': 'WLG'
};

// Global airlines - mix of budget and full service
export const airlines = [
  // Middle Eastern
  'Emirates',
  'Qatar Airways',
  'Etihad Airways',
  'Saudi Arabian Airlines',
  'Kuwait Airways',
  'Gulf Air',
  'Royal Jordanian',
  'Middle East Airlines',
  'Oman Air',
  'flydubai',
  'Air Arabia',
  'Jazeera Airways',
  
  // European
  'Lufthansa',
  'Air France',
  'British Airways',
  'KLM',
  'Swiss International',
  'Austrian Airlines',
  'Turkish Airlines',
  'Ryanair',
  'EasyJet',
  'Wizz Air',
  'Vueling',
  'Eurowings',
  'Norwegian Air',
  'TAP Air Portugal',
  
  // Asian
  'Singapore Airlines',
  'ANA',
  'Japan Airlines',
  'Korean Air',
  'Cathay Pacific',
  'Thai Airways',
  'Malaysia Airlines',
  'Air Asia',
  'China Eastern',
  'Air China',
  'IndiGo',
  'SpiceJet',
  'Air India',
  'Philippine Airlines',
  'Garuda Indonesia',
  
  // North American
  'American Airlines',
  'Delta Air Lines',
  'United Airlines',
  'Air Canada',
  'WestJet',
  'Southwest Airlines',
  'JetBlue Airways',
  'Alaska Airlines',
  
  // Others
  'South African Airways',
  'Ethiopian Airlines',
  'Egypt Air',
  'Royal Air Maroc',
  'Qantas',
  'Virgin Australia',
  'LATAM Airlines',
  'Avianca'
];

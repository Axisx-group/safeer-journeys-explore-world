
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    hotels: "الفنادق", 
    flights: "الطيران",
    cars: "السيارات",
    about: "من نحن",
    login: "تسجيل الدخول",
    booking: "الحجز",
    services: "الخدمات",
    
    // Hero Section
    heroTitle: "اكتشف العالم مع",
    brandName: "ur trvl",
    heroSubtitle: "احجز رحلتك المثالية مع أفضل العروض على الفنادق والطيران والسيارات",
    startJourney: "ابدأ رحلتك الآن",
    discoverOffers: "اكتشف العروض",
    
    // Stats
    hotels_count: "فندق",
    destinations_count: "وجهة", 
    happy_clients: "عميل سعيد",
    customer_support: "دعم العملاء",
    
    // Services
    servicesTitle: "خدماتنا المميزة",
    servicesSubtitle: "نقدم لك مجموعة شاملة من خدمات السفر والسياحة لضمان رحلة مثالية ولا تُنسى",
    hotelBooking: "حجز الفنادق",
    hotelDesc: "اختر من بين آلاف الفنادق المميزة حول العالم بأفضل الأسعار",
    flightBooking: "حجز الطيران",
    flightDesc: "احجز تذاكر الطيران بأسعار تنافسية مع أفضل شركات الطيران",
    carRental: "تأجير السيارات",
    carDesc: "استأجر السيارة المناسبة لرحلتك من أفضل شركات التأجير",
    tours: "الجولات السياحية",
    toursDesc: "اكتشف أجمل الأماكن السياحية مع جولاتنا المنظمة",
    security: "ضمان الأمان",
    securityDesc: "نضمن لك رحلة آمنة ومريحة مع أفضل خدمات الحماية",
    support247: "دعم 24/7",
    supportDesc: "فريق دعم العملاء متاح على مدار الساعة لمساعدتك",
    
    // Search Section
    destination: "الوجهة",
    destinationPlaceholder: "أين تريد الإقامة؟",
    checkIn: "تاريخ الوصول",
    checkOut: "تاريخ المغادرة", 
    guests: "الضيوف",
    guestsPlaceholder: "عدد الضيوف",
    from: "من",
    to: "إلى",
    departure: "تاريخ المغادرة",
    travelers: "المسافرون",
    travelersPlaceholder: "عدد المسافرين",
    pickupLocation: "مكان الاستلام",
    pickupPlaceholder: "أين تريد استلام السيارة؟",
    pickupDate: "تاريخ الاستلام",
    returnDate: "تاريخ الإرجاع",
    carType: "نوع السيارة",
    carTypePlaceholder: "اختر نوع السيارة",
    searchNow: "ابحث الآن",
    
    // Features
    whyChoose: "لماذا تختار",
    whyChooseDesc: "نحن ملتزمون بتقديم أفضل تجربة سفر ممكنة مع خدمات متميزة وأسعار تنافسية",
    bestPrices: "أفضل الأسعار مضمونة",
    freeCancellation: "إلغاء مجاني للحجوزات", 
    excellentSupport: "دعم عملاء متميز",
    instantBooking: "حجز فوري ومؤكد",
    dailyOffers: "عروض حصرية يومية",
    rewardPoints: "نقاط مكافآت للعملاء",
    customerRating: "تقييم العملاء",
    satisfaction: "رضا العملاء",
    countries: "دولة",
    happyTrips: "رحلة سعيدة",
    continuousSupport: "دعم مستمر"
  },
  en: {
    // Navigation
    home: "Home",
    hotels: "Hotels",
    flights: "Flights", 
    cars: "Cars",
    about: "About",
    login: "Login",
    booking: "Booking",
    services: "Services",
    
    // Hero Section
    heroTitle: "Discover the World with",
    brandName: "ur trvl",
    heroSubtitle: "Book your perfect trip with the best deals on hotels, flights and cars",
    startJourney: "Start Your Journey",
    discoverOffers: "Discover Offers",
    
    // Stats
    hotels_count: "Hotels",
    destinations_count: "Destinations",
    happy_clients: "Happy Clients", 
    customer_support: "Customer Support",
    
    // Services
    servicesTitle: "Our Premium Services",
    servicesSubtitle: "We provide you with a comprehensive range of travel and tourism services to ensure a perfect and unforgettable trip",
    hotelBooking: "Hotel Booking",
    hotelDesc: "Choose from thousands of premium hotels worldwide at the best prices",
    flightBooking: "Flight Booking", 
    flightDesc: "Book flight tickets at competitive prices with the best airlines",
    carRental: "Car Rental",
    carDesc: "Rent the right car for your trip from the best rental companies",
    tours: "Tours",
    toursDesc: "Discover the most beautiful tourist attractions with our organized tours",
    security: "Security Guarantee",
    securityDesc: "We guarantee you a safe and comfortable trip with the best protection services",
    support247: "24/7 Support",
    supportDesc: "Customer support team is available around the clock to help you",
    
    // Search Section
    destination: "Destination",
    destinationPlaceholder: "Where do you want to stay?",
    checkIn: "Check-in Date",
    checkOut: "Check-out Date",
    guests: "Guests", 
    guestsPlaceholder: "Number of guests",
    from: "From",
    to: "To",
    departure: "Departure Date",
    travelers: "Travelers",
    travelersPlaceholder: "Number of travelers",
    pickupLocation: "Pickup Location",
    pickupPlaceholder: "Where do you want to pickup the car?",
    pickupDate: "Pickup Date",
    returnDate: "Return Date", 
    carType: "Car Type",
    carTypePlaceholder: "Choose car type",
    searchNow: "Search Now",
    
    // Features
    whyChoose: "Why Choose",
    whyChooseDesc: "We are committed to providing the best possible travel experience with premium services and competitive prices",
    bestPrices: "Best Prices Guaranteed",
    freeCancellation: "Free Cancellation",
    excellentSupport: "Excellent Customer Support", 
    instantBooking: "Instant Booking",
    dailyOffers: "Daily Exclusive Offers",
    rewardPoints: "Customer Reward Points",
    customerRating: "Customer Rating",
    satisfaction: "Customer Satisfaction",
    countries: "Countries",
    happyTrips: "Happy Trips",
    continuousSupport: "Continuous Support"
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

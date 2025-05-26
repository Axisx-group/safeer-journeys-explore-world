
export interface TravelQuestion {
  keywords: string[];
  keywords_ar: string[];
  category: string;
  responses: {
    ar: string;
    en: string;
  };
  followUpQuestions?: {
    ar: string[];
    en: string[];
  };
}

export const travelKnowledgeBase: TravelQuestion[] = [
  // حجز الطيران
  {
    keywords: ['طيران', 'حجز طيران', 'تذكرة', 'رحلة جوية', 'مطار'],
    keywords_ar: ['flight', 'booking', 'ticket', 'airport', 'airline'],
    category: 'flights',
    responses: {
      ar: 'يمكنني مساعدتك في حجز الطيران! نحن نقدم أفضل الأسعار من جميع شركات الطيران. ما هي وجهتك المفضلة وتاريخ السفر؟',
      en: 'I can help you book flights! We offer the best prices from all airlines. What is your preferred destination and travel date?'
    },
    followUpQuestions: {
      ar: ['ما هو مطار المغادرة؟', 'كم عدد المسافرين؟', 'هل تفضل درجة معينة؟'],
      en: ['What is your departure airport?', 'How many passengers?', 'Do you prefer a specific class?']
    }
  },
  
  // حجز الفنادق
  {
    keywords: ['فندق', 'حجز فندق', 'إقامة', 'غرفة', 'منتجع'],
    keywords_ar: ['hotel', 'accommodation', 'room', 'resort', 'stay'],
    category: 'hotels',
    responses: {
      ar: 'سأساعدك في العثور على أفضل الفنادق! لدينا شراكات مع أكثر من 500,000 فندق عالمياً. في أي مدينة تريد الإقامة؟',
      en: 'I\'ll help you find the best hotels! We have partnerships with over 500,000 hotels worldwide. Which city would you like to stay in?'
    },
    followUpQuestions: {
      ar: ['ما هي ميزانيتك للليلة؟', 'كم عدد الليالي؟', 'هل تحتاج مرافق خاصة؟'],
      en: ['What is your budget per night?', 'How many nights?', 'Do you need special facilities?']
    }
  },

  // الوجهات السياحية
  {
    keywords: ['وجهة', 'سياحة', 'مكان سياحي', 'أماكن جميلة', 'معالم'],
    keywords_ar: ['destination', 'tourism', 'places', 'attractions', 'sightseeing'],
    category: 'destinations',
    responses: {
      ar: 'لدي اقتراحات رائعة للوجهات السياحية! بناءً على تفضيلاتك، يمكنني أن أنصحك بأفضل الأماكن. ما نوع السياحة التي تفضل؟',
      en: 'I have amazing destination suggestions! Based on your preferences, I can recommend the best places. What type of tourism do you prefer?'
    },
    followUpQuestions: {
      ar: ['شاطئية أم جبلية؟', 'ثقافية أم ترفيهية؟', 'ما هي ميزانيتك؟'],
      en: ['Beach or mountain?', 'Cultural or entertainment?', 'What is your budget?']
    }
  },

  // الطقس والمناخ
  {
    keywords: ['طقس', 'مناخ', 'حرارة', 'أمطار', 'فصل'],
    keywords_ar: ['weather', 'climate', 'temperature', 'rain', 'season'],
    category: 'weather',
    responses: {
      ar: 'الطقس عامل مهم جداً في التخطيط للسفر! يمكنني إخبارك بأفضل الأوقات لزيارة أي وجهة. ما هي الوجهة التي تخطط لزيارتها؟',
      en: 'Weather is a very important factor in travel planning! I can tell you the best times to visit any destination. Which destination are you planning to visit?'
    }
  },

  // التأشيرات والوثائق
  {
    keywords: ['تأشيرة', 'فيزا', 'جواز سفر', 'وثائق', 'إجراءات'],
    keywords_ar: ['visa', 'passport', 'documents', 'requirements', 'procedures'],
    category: 'visa',
    responses: {
      ar: 'متطلبات التأشيرات تختلف حسب جنسيتك والوجهة. يمكنني مساعدتك في معرفة المتطلبات والإجراءات اللازمة. ما هي جنسيتك والوجهة المقصودة؟',
      en: 'Visa requirements vary by nationality and destination. I can help you understand the requirements and procedures. What is your nationality and intended destination?'
    }
  },

  // الأسعار والعروض
  {
    keywords: ['سعر', 'تكلفة', 'عرض', 'خصم', 'ميزانية'],
    keywords_ar: ['price', 'cost', 'offer', 'discount', 'budget'],
    category: 'pricing',
    responses: {
      ar: 'نحن نقدم أفضل الأسعار والعروض الحصرية! يمكنني مساعدتك في العثور على أفضل الصفقات. ما نوع الخدمة التي تبحث عنها؟',
      en: 'We offer the best prices and exclusive deals! I can help you find the best offers. What type of service are you looking for?'
    }
  },

  // النصائح والاستشارات
  {
    keywords: ['نصيحة', 'استشارة', 'مساعدة', 'توجيه', 'اقتراح'],
    keywords_ar: ['advice', 'consultation', 'help', 'guidance', 'suggestion'],
    category: 'advice',
    responses: {
      ar: 'سأكون سعيداً لتقديم النصائح والاستشارات! بخبرتي في السفر، يمكنني مساعدتك في كل جانب من جوانب رحلتك. ما الذي تحتاج نصيحة بشأنه؟',
      en: 'I\'d be happy to provide advice and consultation! With my travel experience, I can help you with every aspect of your trip. What do you need advice about?'
    }
  },

  // خدمات إضافية
  {
    keywords: ['تأمين', 'سيارة', 'جولة', 'مرشد', 'نقل'],
    keywords_ar: ['insurance', 'car', 'tour', 'guide', 'transfer'],
    category: 'services',
    responses: {
      ar: 'نحن نقدم خدمات شاملة تتضمن تأمين السفر، تأجير السيارات، الجولات السياحية والنقل. أي خدمة تحتاجها؟',
      en: 'We offer comprehensive services including travel insurance, car rental, tours, and transfers. Which service do you need?'
    }
  },

  // حالات الطوارئ
  {
    keywords: ['طوارئ', 'مساعدة عاجلة', 'مشكلة', 'إلغاء', 'تأخير'],
    keywords_ar: ['emergency', 'urgent help', 'problem', 'cancellation', 'delay'],
    category: 'emergency',
    responses: {
      ar: 'نحن هنا لمساعدتك في أي حالة طارئة! فريق الدعم متاح على مدار الساعة. يرجى الاتصال بنا على 0033766555514 أو Info@urtrvl.com',
      en: 'We are here to help you in any emergency! Support team is available 24/7. Please contact us at 0033766555514 or Info@urtrvl.com'
    }
  }
];

export const findBestResponse = (userMessage: string, language: 'ar' | 'en'): TravelQuestion | null => {
  const message = userMessage.toLowerCase();
  
  // البحث في الكلمات المفتاحية
  for (const item of travelKnowledgeBase) {
    const keywords = language === 'ar' ? item.keywords : item.keywords_ar;
    
    for (const keyword of keywords) {
      if (message.includes(keyword.toLowerCase())) {
        return item;
      }
    }
  }
  
  return null;
};

export const getSmartResponse = (userMessage: string, language: 'ar' | 'en'): string => {
  const bestMatch = findBestResponse(userMessage, language);
  
  if (bestMatch) {
    return bestMatch.responses[language];
  }
  
  // استجابة افتراضية ذكية
  return language === 'ar' 
    ? 'شكراً لسؤالك! أنا مساعد السفر الذكي وأستطيع مساعدتك في جميع احتياجات السفر: حجز الطيران والفنادق، اختيار الوجهات، النصائح، والمزيد. كيف يمكنني مساعدتك اليوم؟'
    : 'Thank you for your question! I\'m your AI travel assistant and I can help you with all travel needs: flight and hotel bookings, destination selection, advice, and more. How can I help you today?';
};

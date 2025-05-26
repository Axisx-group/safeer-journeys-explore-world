
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  X, 
  User, 
  Bot, 
  Sparkles,
  Phone,
  Mail,
  Clock,
  Star,
  Plane,
  MapPin,
  Calendar
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { getSmartResponse, findBestResponse } from "./EnhancedAIKnowledgeBase";

interface SmartMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  category?: string;
  suggestions?: string[];
}

const SmartChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<SmartMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = language === 'ar' ? [
    'أريد حجز طيران إلى باريس',
    'ما أفضل الفنادق في دبي؟',
    'نصائح للسفر إلى تركيا',
    'كم تكلفة رحلة إلى لندن؟',
    'أحتاج مساعدة في اختيار وجهة',
    'معلومات عن التأشيرات'
  ] : [
    'I want to book a flight to Paris',
    'What are the best hotels in Dubai?',
    'Travel tips for Turkey',
    'How much does a trip to London cost?',
    'I need help choosing a destination',
    'Information about visas'
  ];

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage: SmartMessage = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    setShowSuggestions(false);

    // محاكاة تأخير الاستجابة مع ذكاء اصطناعي
    setTimeout(() => {
      const aiResponse = getSmartResponse(textToSend, language);
      const matchedQuestion = findBestResponse(textToSend, language);
      
      const aiMessage: SmartMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        category: matchedQuestion?.category,
        suggestions: matchedQuestion?.followUpQuestions?.[language]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: SmartMessage = {
        id: 'welcome',
        text: language === 'ar' 
          ? '🌟 مرحباً بك! أنا مساعدك الذكي للسفر المطور. يمكنني مساعدتك في:\n\n✈️ حجز الطيران والفنادق\n🗺️ اختيار أفضل الوجهات\n💡 النصائح والاستشارات\n💰 العثور على أفضل الأسعار\n📋 متطلبات التأشيرات\n🆘 المساعدة الفورية\n\nكيف يمكنني مساعدتك اليوم؟'
          : '🌟 Welcome! I\'m your enhanced AI travel assistant. I can help you with:\n\n✈️ Flight and hotel bookings\n🗺️ Choosing the best destinations\n💡 Tips and consultations\n💰 Finding the best prices\n📋 Visa requirements\n🆘 Instant assistance\n\nHow can I help you today?',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  return (
    <>
      {/* AI Chat Toggle Button */}
      <motion.div 
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <Bot className="h-5 w-5" />
          </div>
          <span className="ml-2 hidden sm:inline font-semibold">
            {language === 'ar' ? 'المساعد الذكي المطور' : 'Enhanced AI Assistant'}
          </span>
        </Button>
      </motion.div>

      {/* Enhanced AI Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 left-6 z-50 w-96 max-w-[90vw]"
          >
            <Card className="shadow-2xl border-0 bg-white overflow-hidden">
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-3">
                    <div className="relative">
                      <Bot className="h-6 w-6" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {language === 'ar' ? 'المساعد الذكي المطور' : 'Enhanced AI Assistant'}
                      </div>
                      <div className="text-xs text-emerald-100 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {language === 'ar' ? 'متاح 24/7' : 'Available 24/7'}
                      </div>
                    </div>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Messages Area */}
                <ScrollArea className="h-80 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl relative ${
                            message.sender === 'user'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.sender === 'ai' && (
                              <div className="flex-shrink-0">
                                <Bot className="h-4 w-4 mt-1 text-emerald-600" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-line leading-relaxed">
                                {message.text}
                              </p>
                              
                              {/* Category Badge */}
                              {message.category && (
                                <Badge 
                                  variant="outline" 
                                  className="mt-2 text-xs bg-white/10 border-white/20"
                                >
                                  {message.category}
                                </Badge>
                              )}
                              
                              {/* Follow-up Suggestions */}
                              {message.suggestions && (
                                <div className="mt-3 space-y-1">
                                  <p className="text-xs opacity-75 font-medium">
                                    {language === 'ar' ? 'أسئلة مفيدة:' : 'Helpful questions:'}
                                  </p>
                                  {message.suggestions.slice(0, 2).map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="w-full text-xs p-2 h-auto bg-white/50 hover:bg-white/80"
                                      onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                            {message.sender === 'user' && (
                              <User className="h-4 w-4 mt-1 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 p-3 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4 text-emerald-600" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Suggestions */}
                {showSuggestions && messages.length <= 1 && (
                  <div className="p-4 border-t bg-gray-50">
                    <p className="text-sm font-medium mb-3 text-gray-700">
                      {language === 'ar' ? 'اقتراحات سريعة:' : 'Quick suggestions:'}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-left justify-start h-auto p-3 text-xs hover:bg-emerald-50 hover:border-emerald-200"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center gap-2">
                            {index === 0 && <Plane className="h-3 w-3" />}
                            {index === 1 && <MapPin className="h-3 w-3" />}
                            {index === 2 && <Star className="h-3 w-3" />}
                            {suggestion}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t p-4 bg-white">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={language === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                      className="flex-1 rounded-full border-gray-200 focus:border-emerald-300"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={() => handleSendMessage()} 
                      size="sm"
                      disabled={isTyping || !inputMessage.trim()}
                      className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>0033766555514</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>Info@urtrvl.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartChatInterface;

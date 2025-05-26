
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
  Headphones,
  Phone,
  Mail,
  Clock,
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface LiveMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentName?: string;
  messageType?: 'text' | 'system' | 'typing';
}

const SmartChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [agentInfo, setAgentInfo] = useState<{name: string, status: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToLiveSupport = async () => {
    setQueuePosition(Math.floor(Math.random() * 3) + 1);
    
    // محاكاة انتظار الاتصال
    setTimeout(() => {
      setIsConnected(true);
      setQueuePosition(0);
      setAgentInfo({
        name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
        status: language === 'ar' ? 'متاح الآن' : 'Available now'
      });

      const welcomeMessage: LiveMessage = {
        id: 'welcome',
        text: language === 'ar' 
          ? 'مرحباً! أنا أحمد من فريق الدعم. كيف يمكنني مساعدتك اليوم؟'
          : 'Hello! I\'m Ahmed from the support team. How can I help you today?',
        sender: 'agent',
        timestamp: new Date(),
        agentName: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
        messageType: 'text'
      };
      setMessages([welcomeMessage]);
    }, 3000);
  };

  const getLiveResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = language === 'ar' ? {
      'حجز': 'ممتاز! يمكنني مساعدتك في عملية الحجز. هل تبحث عن حجز فندق، طيران، أم سيارة؟ دعني أتحقق من أفضل الخيارات المتاحة لك.',
      'طيران': 'بالطبع! أستطيع مساعدتك في حجز الطيران. ما هي وجهتك المفضلة وتاريخ السفر؟ سأبحث لك عن أفضل الأسعار والمواعيد.',
      'فندق': 'سأساعدك في العثور على أفضل الفنادق! في أي مدينة تريد الإقامة؟ وما هي التواريخ والمواصفات التي تفضلها؟',
      'سعر': 'نحن نضمن أفضل الأسعار! إذا وجدت سعراً أقل في أي مكان آخر، سنطابق السعر. ما الخدمة التي تسأل عن سعرها؟',
      'إلغاء': 'يمكنك إلغاء حجزك مجاناً حتى 24 ساعة قبل موعد السفر. هل تحتاج مساعدة في إلغاء حجز معين؟ أرسل لي رقم الحجز.',
      'مساعدة': 'أنا هنا لمساعدتك في جميع احتياجات السفر! يمكنني المساعدة في الحجوزات، الاستفسارات، المدفوعات، أو أي شيء آخر.',
      'شكرا': 'العفو! سعدت بمساعدتك. إذا كان لديك أي استفسار آخر، لا تتردد في السؤال. نحن هنا 24/7!'
    } : {
      'booking': 'Great! I can help you with bookings. Are you looking to book a hotel, flight, or car? Let me check the best available options for you.',
      'flight': 'Of course! I can help you book flights. What\'s your preferred destination and travel date? I\'ll search for the best prices and schedules.',
      'hotel': 'I\'ll help you find the best hotels! Which city do you want to stay in? What are your preferred dates and specifications?',
      'price': 'We guarantee the best prices! If you find a lower price anywhere else, we\'ll match it. Which service are you asking about the price for?',
      'cancel': 'You can cancel your booking for free up to 24 hours before travel date. Do you need help canceling a specific booking? Send me the booking number.',
      'help': 'I\'m here to help with all your travel needs! I can assist with bookings, inquiries, payments, or anything else.',
      'thank': 'You\'re welcome! I was happy to help you. If you have any other questions, don\'t hesitate to ask. We\'re here 24/7!'
    };

    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return language === 'ar' 
      ? 'شكراً لتواصلك معنا! سأتحقق من هذا الأمر وأعود إليك بالتفاصيل. في هذه الأثناء، يمكنك الاتصال بنا على 0033766555514 للمساعدة الفورية.'
      : 'Thank you for contacting us! I\'ll check on this matter and get back to you with details. Meanwhile, you can call us at 0033766555514 for immediate assistance.';
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage: LiveMessage = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsAgentTyping(true);

    // محاكاة وقت استجابة الوكيل الحقيقي
    setTimeout(async () => {
      const agentResponse = await getLiveResponse(textToSend);
      const agentMessage: LiveMessage = {
        id: (Date.now() + 1).toString(),
        text: agentResponse,
        sender: 'agent',
        timestamp: new Date(),
        agentName: agentInfo?.name
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsAgentTyping(false);
    }, 2000 + Math.random() * 2000); // وقت استجابة واقعي
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const endChat = () => {
    const endMessage: LiveMessage = {
      id: 'end',
      text: language === 'ar' 
        ? 'تم إنهاء جلسة الدردشة. شكراً لتواصلك معنا!'
        : 'Chat session ended. Thank you for contacting us!',
      sender: 'agent',
      timestamp: new Date(),
      messageType: 'system'
    };
    setMessages(prev => [...prev, endMessage]);
    setIsConnected(false);
    setAgentInfo(null);
  };

  return (
    <>
      {/* Live Chat Toggle Button */}
      <motion.div 
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4"
        >
          <div className="flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            <MessageCircle className="h-5 w-5" />
          </div>
          <span className="ml-2 hidden sm:inline font-semibold">
            {language === 'ar' ? 'دردشة مباشرة' : 'Live Chat'}
          </span>
          {isConnected && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </Button>
      </motion.div>

      {/* Live Chat Interface */}
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
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-3">
                    <div className="relative">
                      <Headphones className="h-6 w-6" />
                      {isConnected && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold">
                        {language === 'ar' ? 'دعم مباشر' : 'Live Support'}
                      </div>
                      {agentInfo ? (
                        <div className="text-xs text-green-100 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {agentInfo.name} - {agentInfo.status}
                        </div>
                      ) : queuePosition > 0 ? (
                        <div className="text-xs text-green-100 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {language === 'ar' ? `${queuePosition} في الطابور` : `${queuePosition} in queue`}
                        </div>
                      ) : (
                        <div className="text-xs text-green-100 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {language === 'ar' ? 'متاح 24/7' : 'Available 24/7'}
                        </div>
                      )}
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
                {!isConnected && queuePosition === 0 ? (
                  // Connection Screen
                  <div className="p-6 text-center">
                    <Headphones className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-3">
                      {language === 'ar' ? 'تواصل مع فريق الدعم' : 'Connect with Live Support'}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      {language === 'ar' 
                        ? 'فريق الدعم المتخصص متاح على مدار الساعة لمساعدتك'
                        : 'Our specialized support team is available 24/7 to help you'
                      }
                    </p>
                    <Button onClick={connectToLiveSupport} className="w-full mb-4 bg-green-600 hover:bg-green-700">
                      <Headphones className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'بدء الدردشة المباشرة' : 'Start Live Chat'}
                    </Button>
                    
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-500 mb-3">
                        {language === 'ar' ? 'أو تواصل معنا مباشرة:' : 'Or contact us directly:'}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 justify-center">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span>0033766555514</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span>Info@urtrvl.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : queuePosition > 0 ? (
                  // Queue Screen
                  <div className="p-6 text-center">
                    <Users className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-3">
                      {language === 'ar' ? 'يرجى الانتظار...' : 'Please wait...'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === 'ar' 
                        ? `موقعك في الطابور: ${queuePosition}`
                        : `Your position in queue: ${queuePosition}`
                      }
                    </p>
                    <div className="animate-pulse">
                      <Badge variant="outline" className="bg-orange-50 border-orange-200">
                        {language === 'ar' ? 'جاري الاتصال...' : 'Connecting...'}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <>
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
                                  ? 'bg-green-600 text-white'
                                  : message.messageType === 'system'
                                  ? 'bg-gray-50 text-gray-600 border'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {message.sender === 'agent' && message.messageType !== 'system' && (
                                  <div className="flex-shrink-0">
                                    <Headphones className="h-4 w-4 mt-1 text-green-600" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="text-sm leading-relaxed">
                                    {message.text}
                                  </p>
                                  {message.agentName && message.messageType !== 'system' && (
                                    <p className="text-xs opacity-75 mt-1">
                                      - {message.agentName}
                                    </p>
                                  )}
                                </div>
                                {message.sender === 'user' && (
                                  <User className="h-4 w-4 mt-1 flex-shrink-0" />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* Agent Typing Indicator */}
                        {isAgentTyping && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                          >
                            <div className="bg-gray-100 p-3 rounded-2xl">
                              <div className="flex items-center gap-2">
                                <Headphones className="h-4 w-4 text-green-600" />
                                <span className="text-xs text-gray-500">
                                  {agentInfo?.name} {language === 'ar' ? 'يكتب...' : 'is typing...'}
                                </span>
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

                    {/* Input Area */}
                    <div className="border-t p-4 bg-white">
                      <div className="flex gap-2 mb-3">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                          className="flex-1 rounded-full border-gray-200 focus:border-green-300"
                          disabled={isAgentTyping}
                        />
                        <Button 
                          onClick={() => handleSendMessage()} 
                          size="sm"
                          disabled={isAgentTyping || !inputMessage.trim()}
                          className="bg-green-600 hover:bg-green-700 rounded-full px-4"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>0033766555514</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>Info@urtrvl.com</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={endChat}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          {language === 'ar' ? 'إنهاء المحادثة' : 'End Chat'}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartChatInterface;

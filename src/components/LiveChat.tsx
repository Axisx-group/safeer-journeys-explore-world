
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, User, Headphones, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSupportResponse = async (userMessage: string): Promise<string> => {
    const responses = language === 'ar' ? {
      'مرحبا': 'مرحباً بك! أنا وكيل الدعم المباشر. كيف يمكنني مساعدتك اليوم؟',
      'حجز': 'بالطبع! يمكنني مساعدتك في عملية الحجز. هل تريد حجز فندق، طيران، أم سيارة؟',
      'دفع': 'نقبل جميع طرق الدفع الآمنة: البطاقات الائتمانية، PayPal، والتحويل البنكي.',
      'إلغاء': 'يمكنك إلغاء حجزك مجاناً حتى 24 ساعة قبل التاريخ المحدد. هل تحتاج مساعدة في الإلغاء؟',
      'سعر': 'نضمن أفضل الأسعار! إذا وجدت سعراً أقل في أي مكان آخر، سنطابق السعر.',
      'مساعدة': 'أنا هنا لمساعدتك! يمكنني المساعدة في الحجوزات، الدفع، الإلغاء، أو أي استفسار آخر.',
      'شكرا': 'على الرحب والسعة! هل تحتاج أي مساعدة أخرى؟'
    } : {
      'hello': 'Hello! I\'m a live support agent. How can I help you today?',
      'booking': 'Of course! I can help you with bookings. Would you like to book a hotel, flight, or car?',
      'payment': 'We accept all secure payment methods: credit cards, PayPal, and bank transfers.',
      'cancel': 'You can cancel your booking for free up to 24 hours before the date. Do you need help with cancellation?',
      'price': 'We guarantee the best prices! If you find a lower price elsewhere, we\'ll match it.',
      'help': 'I\'m here to help! I can assist with bookings, payments, cancellations, or any other inquiry.',
      'thank': 'You\'re welcome! Do you need any other assistance?'
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return language === 'ar' 
      ? 'شكراً لتواصلك معنا! سيقوم أحد وكلاء الدعم المتخصصين بالرد عليك قريباً. يمكنك أيضاً الاتصال بنا على 0033766555514'
      : 'Thank you for contacting us! A specialized support agent will respond to you soon. You can also call us at 0033766555514';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(async () => {
      const supportResponse = await getSupportResponse(inputMessage);
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: supportResponse,
        sender: 'support',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const connectToSupport = () => {
    setIsConnected(true);
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      text: language === 'ar' 
        ? 'مرحباً! تم توصيلك بفريق الدعم المباشر. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! You\'re connected to our live support team. How can I help you today?',
      sender: 'support',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  return (
    <>
      {/* Live Chat Toggle Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="ml-2 hidden sm:inline">
            {language === 'ar' ? 'دردشة مباشرة' : 'Live Chat'}
          </span>
        </Button>
      </div>

      {/* Live Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  {language === 'ar' ? 'دعم مباشر' : 'Live Support'}
                  {isConnected && (
                    <div className="flex items-center gap-1 ml-2">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span className="text-xs">
                        {language === 'ar' ? 'متصل' : 'Online'}
                      </span>
                    </div>
                  )}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {!isConnected ? (
                // Connection Screen
                <div className="p-6 text-center">
                  <Headphones className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-3">
                    {language === 'ar' ? 'تواصل مع فريق الدعم' : 'Connect with Support'}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {language === 'ar' 
                      ? 'فريق الدعم متاح 24/7 لمساعدتك في جميع استفساراتك'
                      : 'Our support team is available 24/7 to help with all your inquiries'
                    }
                  </p>
                  <Button onClick={connectToSupport} className="w-full mb-4">
                    {language === 'ar' ? 'بدء المحادثة' : 'Start Chat'}
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
              ) : (
                <>
                  {/* Messages Area */}
                  <div className="h-80 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.sender === 'support' && <Headphones className="h-4 w-4 mt-1 text-green-600" />}
                            <p className="text-sm">{message.text}</p>
                            {message.sender === 'user' && <User className="h-4 w-4 mt-1" />}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Headphones className="h-4 w-4 text-green-600" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default LiveChat;


import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  User, 
  Bot, 
  Plane, 
  MapPin, 
  Clock,
  DollarSign,
  Users,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  data?: any;
  type?: 'text' | 'flight-info' | 'price-alert' | 'recommendation';
}

const AdvancedAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<ChatMessage> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simulate AI processing with real travel data
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Flight search
    if (lowerMessage.includes('flight') || lowerMessage.includes('طيران') || lowerMessage.includes('رحلة')) {
      return {
        id: Date.now().toString(),
        text: language === 'ar' 
          ? 'وجدت لك أفضل الرحلات المتاحة! إليك أحدث الأسعار والمواعيد:'
          : 'Found the best available flights for you! Here are the latest prices and schedules:',
        sender: 'ai',
        timestamp: new Date(),
        type: 'flight-info',
        data: {
          flights: [
            {
              from: language === 'ar' ? 'دبي' : 'Dubai',
              to: language === 'ar' ? 'لندن' : 'London',
              price: 2850,
              currency: language === 'ar' ? 'ريال' : 'SAR',
              date: '2024-12-15',
              airline: language === 'ar' ? 'طيران الإمارات' : 'Emirates',
              passengers: 234
            },
            {
              from: language === 'ar' ? 'الرياض' : 'Riyadh',
              to: language === 'ar' ? 'باريس' : 'Paris',
              price: 3200,
              currency: language === 'ar' ? 'ريال' : 'SAR',
              date: '2024-12-16',
              airline: language === 'ar' ? 'الخطوط السعودية' : 'Saudia',
              passengers: 189
            }
          ]
        }
      };
    }

    // Price alerts
    if (lowerMessage.includes('price') || lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
      return {
        id: Date.now().toString(),
        text: language === 'ar' 
          ? '📈 تنبيه سعر! انخفضت أسعار هذه الوجهات:'
          : '📈 Price Alert! Prices have dropped for these destinations:',
        sender: 'ai',
        timestamp: new Date(),
        type: 'price-alert',
        data: {
          alerts: [
            {
              destination: language === 'ar' ? 'باريس' : 'Paris',
              oldPrice: 3500,
              newPrice: 2890,
              savings: 610,
              percentage: 17
            },
            {
              destination: language === 'ar' ? 'طوكيو' : 'Tokyo',
              oldPrice: 4200,
              newPrice: 3750,
              savings: 450,
              percentage: 11
            }
          ]
        }
      };
    }

    // Recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('اقترح') || lowerMessage.includes('أنصح')) {
      return {
        id: Date.now().toString(),
        text: language === 'ar' 
          ? '✨ بناءً على تفضيلاتك، إليك أفضل التوصيات:'
          : '✨ Based on your preferences, here are my top recommendations:',
        sender: 'ai',
        timestamp: new Date(),
        type: 'recommendation',
        data: {
          recommendations: [
            {
              destination: language === 'ar' ? 'مالديف' : 'Maldives',
              reason: language === 'ar' ? 'مثالي للاسترخاء والشواطئ الخلابة' : 'Perfect for relaxation and stunning beaches',
              price: 5200,
              rating: 4.9,
              travelers: 156
            },
            {
              destination: language === 'ar' ? 'تركيا' : 'Turkey',
              reason: language === 'ar' ? 'مزيج رائع من التاريخ والثقافة' : 'Amazing blend of history and culture',
              price: 2100,
              rating: 4.7,
              travelers: 324
            }
          ]
        }
      };
    }

    // Default AI response
    const responses = language === 'ar' ? [
      'مرحباً! أنا مساعدك الذكي للسفر. يمكنني مساعدتك في العثور على أفضل الرحلات والأسعار والوجهات.',
      'أستطيع تتبع أسعار الطيران لك وإرسال تنبيهات عند انخفاض الأسعار.',
      'هل تريد البحث عن رحلة معينة؟ اذكر لي الوجهة والتاريخ المفضل.',
      'يمكنني تقديم توصيات شخصية بناءً على ميزانيتك وتفضيلاتك.'
    ] : [
      'Hello! I\'m your AI travel assistant. I can help you find the best flights, prices, and destinations.',
      'I can track flight prices for you and send alerts when prices drop.',
      'Would you like to search for a specific flight? Tell me your destination and preferred date.',
      'I can provide personalized recommendations based on your budget and preferences.'
    ];

    return {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderMessage = (message: ChatMessage) => {
    if (message.type === 'flight-info' && message.data?.flights) {
      return (
        <div className="space-y-3">
          <p className="text-sm">{message.text}</p>
          {message.data.flights.map((flight: any, index: number) => (
            <Card key={index} className="border border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">{flight.from} → {flight.to}</span>
                  </div>
                  <Badge variant="secondary">{flight.airline}</Badge>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>{flight.price} {flight.currency}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{flight.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{flight.passengers} {language === 'ar' ? 'مسافر' : 'passengers'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (message.type === 'price-alert' && message.data?.alerts) {
      return (
        <div className="space-y-3">
          <p className="text-sm">{message.text}</p>
          {message.data.alerts.map((alert: any, index: number) => (
            <Card key={index} className="border border-green-200 bg-green-50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">{alert.destination}</span>
                  </div>
                  <Badge className="bg-green-600">-{alert.percentage}%</Badge>
                </div>
                <div className="mt-2 text-sm">
                  <span className="line-through text-gray-500">{alert.oldPrice} {language === 'ar' ? 'ريال' : 'SAR'}</span>
                  <span className="ml-2 font-bold text-green-600">{alert.newPrice} {language === 'ar' ? 'ريال' : 'SAR'}</span>
                  <span className="ml-2 text-green-600">
                    ({language === 'ar' ? 'وفر' : 'Save'} {alert.savings} {language === 'ar' ? 'ريال' : 'SAR'})
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (message.type === 'recommendation' && message.data?.recommendations) {
      return (
        <div className="space-y-3">
          <p className="text-sm">{message.text}</p>
          {message.data.recommendations.map((rec: any, index: number) => (
            <Card key={index} className="border border-purple-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold">{rec.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm">{rec.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-purple-600">{rec.price} {language === 'ar' ? 'ريال' : 'SAR'}</span>
                  <span className="text-gray-500">{rec.travelers} {language === 'ar' ? 'مسافر اليوم' : 'travelers today'}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    return <p className="text-sm">{message.text}</p>;
  };

  return (
    <>
      {/* AI Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4"
        >
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="ml-2 hidden sm:inline">
            {language === 'ar' ? 'مساعد السفر الذكي' : 'AI Travel Assistant'}
          </span>
        </Button>
      </div>

      {/* AI Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl border-0 bg-white max-h-[600px] flex flex-col">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  {language === 'ar' ? 'مساعد السفر الذكي' : 'AI Travel Assistant'}
                  <div className="flex items-center gap-1 ml-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-xs">
                      {language === 'ar' ? 'نشط' : 'Active'}
                    </span>
                  </div>
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
            
            <CardContent className="p-0 flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <p className="text-sm">
                      {language === 'ar' 
                        ? 'مرحباً! أنا مساعدك الذكي للسفر. اسألني عن الرحلات والأسعار والوجهات!'
                        : 'Hello! I\'m your AI travel assistant. Ask me about flights, prices, and destinations!'
                      }
                    </p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'ai' && <Bot className="h-4 w-4 mt-1 text-purple-600" />}
                        <div className="flex-1">
                          {renderMessage(message)}
                        </div>
                        {message.sender === 'user' && <User className="h-4 w-4 mt-1" />}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-purple-600" />
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
                    placeholder={language === 'ar' ? 'اسأل عن رحلة أو وجهة...' : 'Ask about flights or destinations...'}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    size="sm"
                    disabled={isTyping || !inputMessage.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdvancedAIChat;


import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // محاكاة استجابة الذكاء الاصطناعي
    const responses = language === 'ar' ? {
      'مرحبا': 'مرحباً بك! أنا مساعدك الذكي في ur trvl. كيف يمكنني مساعدتك اليوم؟',
      'حجز فندق': 'بالطبع! يمكنني مساعدتك في حجز فندق. أين تريد الإقامة وما هي التواريخ المفضلة لديك؟',
      'رحلة': 'ممتاز! أي نوع من الرحلات تفضل؟ رحلة شاطئية، ثقافية، أم مغامرة؟',
      'سعر': 'أسعارنا تنافسية جداً! نضمن لك أفضل الأسعار مع إمكانية الإلغاء المجاني.',
      'مساعدة': 'أنا هنا لمساعدتك في جميع احتياجات السفر: حجز الفنادق، تذاكر الطيران، تأجير السيارات، والجولات السياحية.'
    } : {
      'hello': 'Hello! I\'m your AI assistant at ur trvl. How can I help you today?',
      'hotel': 'Of course! I can help you book a hotel. Where would you like to stay and what are your preferred dates?',
      'trip': 'Great! What type of trip do you prefer? Beach, cultural, or adventure?',
      'price': 'Our prices are very competitive! We guarantee the best prices with free cancellation.',
      'help': 'I\'m here to help with all your travel needs: hotel bookings, flight tickets, car rentals, and tours.'
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return language === 'ar' 
      ? 'شكراً لسؤالك! فريق خدمة العملاء لدينا متاح على مدار الساعة لمساعدتك. يمكنك التواصل معنا على 0033766555514 أو Info@urtrvl.com'
      : 'Thank you for your question! Our customer service team is available 24/7 to help you. You can contact us at 0033766555514 or Info@urtrvl.com';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // محاكاة تأخير الاستجابة
    setTimeout(async () => {
      const aiResponse = await getAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: language === 'ar' 
          ? 'مرحباً! أنا مساعدك الذكي في ur trvl. كيف يمكنني مساعدتك في تخطيط رحلتك المثالية؟'
          : 'Hello! I\'m your AI assistant at ur trvl. How can I help you plan your perfect trip?',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="ml-2 hidden sm:inline">
            {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
          </span>
        </Button>
      </div>

      {/* AI Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
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
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'ai' && <Bot className="h-4 w-4 mt-1 text-blue-600" />}
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
                        <Bot className="h-4 w-4 text-blue-600" />
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
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIAssistant;

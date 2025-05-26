
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreateContactMessage } from "@/hooks/useContact";
import { Mail, Phone, User, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const { language } = useLanguage();
  const createContactMessage = useCreateContactMessage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContactMessage.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder={language === 'ar' ? 'اكتب اسمك الكامل' : 'Enter your full name'}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Your email address'}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone Number (Optional)'}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder={language === 'ar' ? 'رقم الهاتف' : 'Your phone number'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              {language === 'ar' ? 'موضوع الرسالة' : 'Subject'}
            </Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder={language === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {language === 'ar' ? 'الرسالة' : 'Message'}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
              rows={6}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={createContactMessage.isPending}
          >
            {createContactMessage.isPending 
              ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') 
              : (language === 'ar' ? 'إرسال الرسالة' : 'Send Message')
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;

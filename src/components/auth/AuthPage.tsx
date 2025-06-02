
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  Shield, 
  CheckCircle,
  Plane,
  MapPin
} from 'lucide-react';

const AuthPage = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const isArabic = language === 'ar';

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success(isArabic ? 'تم تسجيل الدخول بنجاح!' : 'Signed in successfully!');
        navigate(redirect);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(
        isArabic ? 'خطأ في تسجيل الدخول' : 'Sign in failed',
        { description: error.message }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error(isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (signUpData.password.length < 6) {
      toast.error(isArabic ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}${redirect}`,
          data: {
            first_name: signUpData.firstName,
            last_name: signUpData.lastName,
            phone: signUpData.phone
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast.success(
          isArabic ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!',
          { 
            description: isArabic 
              ? 'يمكنك الآن تسجيل الدخول والمتابعة مع الحجز' 
              : 'You can now sign in and continue with booking'
          }
        );
        setActiveTab('signin');
        setSignInData({ email: signUpData.email, password: '' });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(
        isArabic ? 'خطأ في إنشاء الحساب' : 'Sign up failed',
        { description: error.message }
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="text-white space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Plane className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">
                {isArabic ? 'يور ترافل' : 'UrTrvl'}
              </h1>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              {isArabic 
                ? 'اكتشف العالم معنا' 
                : 'Discover the World with Us'
              }
            </h2>
            
            <p className="text-xl text-blue-100 leading-relaxed">
              {isArabic 
                ? 'انضم إلى آلاف المسافرين الذين اختاروا خدماتنا المميزة لتجربة سفر لا تُنسى' 
                : 'Join thousands of travelers who chose our premium services for an unforgettable travel experience'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-lg mb-3">
                <CheckCircle className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-semibold mb-1">
                {isArabic ? 'حجز آمن' : 'Secure Booking'}
              </h3>
              <p className="text-sm text-blue-200">
                {isArabic ? 'حماية عالية للبيانات' : 'High data protection'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-lg mb-3">
                <MapPin className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-semibold mb-1">
                {isArabic ? 'وجهات متنوعة' : 'Diverse Destinations'}
              </h3>
              <p className="text-sm text-blue-200">
                {isArabic ? 'أجمل المدن الأوروبية' : 'Beautiful European cities'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-lg mb-3">
                <Shield className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-semibold mb-1">
                {isArabic ? 'دعم 24/7' : '24/7 Support'}
              </h3>
              <p className="text-sm text-blue-200">
                {isArabic ? 'خدمة عملاء متميزة' : 'Premium customer service'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              {isArabic ? 'مرحباً بك' : 'Welcome'}
            </CardTitle>
            <p className="text-gray-600">
              {isArabic 
                ? 'سجل دخولك أو أنشئ حساب جديد للمتابعة' 
                : 'Sign in or create an account to continue'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </TabsTrigger>
                <TabsTrigger value="signup">
                  {isArabic ? 'إنشاء حساب' : 'Sign Up'}
                </TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInData.email}
                      onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      {isArabic ? 'كلمة المرور' : 'Password'}
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                      className="h-12"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      isArabic ? 'جارٍ تسجيل الدخول...' : 'Signing in...'
                    ) : (
                      <div className="flex items-center gap-2">
                        {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {isArabic ? 'الاسم الأول' : 'First Name'}
                      </Label>
                      <Input
                        id="firstName"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder={isArabic ? 'أحمد' : 'John'}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {isArabic ? 'الاسم الأخير' : 'Last Name'}
                      </Label>
                      <Input
                        id="lastName"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder={isArabic ? 'محمد' : 'Doe'}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={isArabic ? 'ahmed@example.com' : 'john@example.com'}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+966 50 123 4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      {isArabic ? 'كلمة المرور' : 'Password'}
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder={isArabic ? '6 أحرف على الأقل' : 'At least 6 characters'}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder={isArabic ? 'أعد كتابة كلمة المرور' : 'Re-enter your password'}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      isArabic ? 'جارٍ إنشاء الحساب...' : 'Creating account...'
                    ) : (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {isArabic ? 'إنشاء حساب' : 'Create Account'}
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-gray-600">
              {isArabic 
                ? 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية'
                : 'By continuing, you agree to our Terms of Service and Privacy Policy'
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;

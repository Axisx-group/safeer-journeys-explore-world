
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Mail, Phone, Globe, Calendar, Save } from 'lucide-react';

const ProfilePage = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    nationality: '',
    date_of_birth: '',
    preferred_language: language
  });

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone: userProfile.phone || '',
        nationality: userProfile.nationality || '',
        date_of_birth: userProfile.date_of_birth || '',
        preferred_language: userProfile.preferred_language || language
      });
    }
  }, [userProfile, language]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: isArabic ? "تم حفظ البيانات" : "Profile Updated",
        description: isArabic ? "تم تحديث ملفك الشخصي بنجاح" : "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isArabic ? "خطأ في الحفظ" : "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isArabic ? 'الملف الشخصي' : 'Profile'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isArabic ? 'إدارة معلوماتك الشخصية وتفضيلاتك' : 'Manage your personal information and preferences'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isArabic ? 'الاسم الأول' : 'First Name'}</Label>
                    <Input
                      value={profileData.first_name}
                      onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                      placeholder={isArabic ? 'الاسم الأول' : 'First Name'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isArabic ? 'الاسم الأخير' : 'Last Name'}</Label>
                    <Input
                      value={profileData.last_name}
                      onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                      placeholder={isArabic ? 'الاسم الأخير' : 'Last Name'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <Input value={user?.email || ''} disabled className="bg-gray-50" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  </Label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {isArabic ? 'الجنسية' : 'Nationality'}
                  </Label>
                  <Input
                    value={profileData.nationality}
                    onChange={(e) => setProfileData({ ...profileData, nationality: e.target.value })}
                    placeholder={isArabic ? 'الجنسية' : 'Nationality'}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {isArabic ? 'تاريخ الميلاد' : 'Date of Birth'}
                  </Label>
                  <Input
                    type="date"
                    value={profileData.date_of_birth}
                    onChange={(e) => setProfileData({ ...profileData, date_of_birth: e.target.value })}
                  />
                </div>

                <Button onClick={handleSave} disabled={isLoading} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ التغييرات' : 'Save Changes')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? 'معلومات الحساب' : 'Account Information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">{isArabic ? 'تاريخ التسجيل' : 'Member Since'}</Label>
                  <p className="font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">{isArabic ? 'حالة الحساب' : 'Account Status'}</Label>
                  <p className="font-medium text-green-600">{isArabic ? 'نشط' : 'Active'}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">{isArabic ? 'اللغة المفضلة' : 'Preferred Language'}</Label>
                  <p className="font-medium">{profileData.preferred_language === 'ar' ? 'العربية' : 'English'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

interface StripeSettingsTabProps {
  settings: any;
  handleSettingChange: (key: string, value: any) => void;
}

const StripeSettingsTab = ({ settings, handleSettingChange }: StripeSettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          إعدادات Stripe للمدفوعات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stripePublishableKey">مفتاح Stripe العام</Label>
              <Input
                id="stripePublishableKey"
                type="text"
                placeholder="pk_test_..."
                value={settings.stripePublishableKey}
                onChange={(e) => handleSettingChange('stripePublishableKey', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                المفتاح العام لـ Stripe (يبدأ بـ pk_)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripeSecretKey">مفتاح Stripe السري</Label>
              <Input
                id="stripeSecretKey"
                type="password"
                placeholder="sk_test_..."
                value={settings.stripeSecretKey}
                onChange={(e) => handleSettingChange('stripeSecretKey', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                المفتاح السري لـ Stripe (يبدأ بـ sk_)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stripeWebhookSecret">سر الـ Webhook</Label>
            <Input
              id="stripeWebhookSecret"
              type="password"
              placeholder="whsec_..."
              value={settings.stripeWebhookSecret}
              onChange={(e) => handleSettingChange('stripeWebhookSecret', e.target.value)}
            />
            <p className="text-xs text-gray-500">
              مطلوب لتأكيد صحة إشعارات Stripe
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stripeCurrency">العملة الافتراضية</Label>
              <select
                id="stripeCurrency"
                value={settings.stripeCurrency}
                onChange={(e) => handleSettingChange('stripeCurrency', e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md"
              >
                <option value="EUR">يورو (EUR)</option>
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="AED">درهم إماراتي (AED)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>الوضع التجريبي</Label>
                <div className="text-sm text-gray-500">
                  تفعيل الوضع التجريبي لـ Stripe
                </div>
              </div>
              <Switch
                checked={settings.stripeTestMode}
                onCheckedChange={(checked) => handleSettingChange('stripeTestMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>الضرائب التلقائية</Label>
                <div className="text-sm text-gray-500">
                  تفعيل حساب الضرائب التلقائي
                </div>
              </div>
              <Switch
                checked={settings.stripeAutomaticTax}
                onCheckedChange={(checked) => handleSettingChange('stripeAutomaticTax', checked)}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">معلومات مهمة:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• تأكد من استخدام المفاتيح الصحيحة (تجريبية أو حقيقية)</li>
              <li>• لا تشارك المفاتيح السرية مع أي شخص</li>
              <li>• قم بتجربة النظام في الوضع التجريبي أولاً</li>
              <li>• تأكد من تكوين الـ Webhooks في لوحة تحكم Stripe</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              اختبار الاتصال
            </Button>
            <Button className="flex-1">
              حفظ إعدادات Stripe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripeSettingsTab;

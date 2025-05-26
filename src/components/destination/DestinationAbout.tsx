
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Destination } from "@/hooks/useDestinations";

interface DestinationAboutProps {
  destination: Destination;
}

const DestinationAbout = ({ destination }: DestinationAboutProps) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'نبذة عن الوجهة' : 'About this destination'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            {language === 'ar' ? destination.description_ar : destination.description}
          </p>
        </CardContent>
      </Card>

      {destination.activity_types && destination.activity_types.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'الأنشطة المتاحة' : 'Available Activities'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {destination.activity_types.map((activity, index) => (
                <Badge key={index} variant="outline">
                  {activity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {destination.mood_tags && destination.mood_tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'أجواء الوجهة' : 'Destination Mood'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {destination.mood_tags.map((mood, index) => (
                <Badge key={index} className="bg-purple-100 text-purple-800">
                  {mood}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DestinationAbout;

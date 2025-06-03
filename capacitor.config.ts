
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4f36ef31f49d4219bf7fb473bf142d55',
  appName: 'safeer-journeys-explore-world',
  webDir: 'dist',
  server: {
    url: 'https://4f36ef31-f49d-4219-bf7f-b473bf142d55.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;

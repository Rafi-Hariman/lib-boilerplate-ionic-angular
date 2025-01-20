import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.push.notif',
  appName: 'Si Cantik',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "res://drawable/splash.png",
      iconColor: "#FF00BF",
      sound: "sond.wav",
    },
  },
};


export default config;

import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const isChildApp = process.env.APP_PROFILE === 'child';

  return {
    ...config,
    name: isChildApp ? 'Seg. Filhos - Criança' : 'Seg. Filhos - Pais',
    slug: 'well-aquino',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: isChildApp ? 'segfilhoschild' : 'segfilhosparents',
    userInterfaceStyle: 'automatic',
    ios: {
      bundleIdentifier: isChildApp ? 'com.segfilhos.child' : 'com.segfilhos.parents',
      supportsTablet: true,
      icon: './assets/expo.icon',
    },
    android: {
      package: isChildApp ? 'com.segfilhos.child' : 'com.segfilhos.parents',
      adaptiveIcon: {
        backgroundColor: '#030712',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
      permissions: [
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
        'RECEIVE_BOOT_COMPLETED',
        'VIBRATE',
      ],
    },
    web: {
      output: 'single',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#030712',
          image: './assets/images/splash-icon.png',
          imageWidth: 120,
        },
      ],
      [
        'expo-notifications',
        {
          icon: './assets/images/icon.png',
          color: '#3b82f6',
        },
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Permitir que o Seg. Filhos acesse a localização do dispositivo.',
        },
      ],
      'expo-secure-store',
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  };
};

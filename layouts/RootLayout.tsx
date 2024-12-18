import '~/global.css';
import '~/lib/i18n';

import {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  useFonts,
} from '@expo-google-fonts/figtree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, Theme, ThemeProvider, DarkTheme } from '@react-navigation/native';
import { Refine, useTranslation } from '@refinedev/core';
import { PortalHost } from '@rn-primitives/portal';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import i18next from 'i18next';
import * as React from 'react';
import { Platform } from 'react-native';

import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { accessControlProvider } from '~/providers/access-control-provider';
import { authProvider } from '~/providers/auth-provider';
import { dataProvider } from '~/providers/data-provider';
import { i18nProvider } from '~/providers/i18n-provider';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: DefaultTheme.fonts,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: DarkTheme.fonts,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [loaded, error] = useFonts({
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
  });

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  React.useEffect(() => {
    const theme = colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light;
    SystemUI.setBackgroundColorAsync(theme.background);
  }, [colorScheme]);

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar
        style="auto"
        backgroundColor={isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background}
      />
      <Refine
        accessControlProvider={accessControlProvider}
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        options={{ disableTelemetry: true }}>
        <LocaleProvider>{children}</LocaleProvider>
      </Refine>
      <PortalHost />
    </ThemeProvider>
  );
}

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { getLocale } = useTranslation();

  i18next.changeLanguage(getLocale());

  return <>{children}</>;
};

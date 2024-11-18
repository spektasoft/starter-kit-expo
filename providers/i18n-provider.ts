import { I18nProvider } from '@refinedev/core';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { Platform } from 'react-native';

export const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => i18next.t(key),
  changeLocale: async (lang: string, options?: any) => {
    i18next.changeLanguage(lang);
    if (Platform.OS === 'web') {
      localStorage.setItem('lang', lang);
      window.location.reload();
    }
  },
  getLocale: () => {
    if (Platform.OS === 'web') {
      return localStorage.getItem('lang') ?? getLocales()[0].languageCode ?? i18next.language;
    } else {
      return getLocales()[0].languageCode ?? i18next.language;
    }
  },
};

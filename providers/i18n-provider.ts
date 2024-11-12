import { I18nProvider } from '@refinedev/core';
import i18next from 'i18next';

export const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => i18next.t(key),
  changeLocale: (lang: string, options?: any) => i18next.changeLanguage(lang),
  getLocale: () => i18next.language,
};

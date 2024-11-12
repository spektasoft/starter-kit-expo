import i18n from 'i18next';

import { en } from '~/lang/en';
import { id } from '~/lang/id';

i18n.init({
  debug: true,
  resources: {
    en,
    id,
  },
  supportedLngs: ['en', 'id'],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

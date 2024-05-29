import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { format as formatDate, isDate } from 'date-fns';
import { enGB, uk } from 'date-fns/locale';

const locales = { enGB, uk };
const currentLanguage = localStorage.getItem('i18nextLng');

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require('./dictionaries/en/translation.json'),
    },
    uk: {
      translation: require('./dictionaries/uk/translation.json'),
    },
  },
  fallbackLng: 'en',
  debug: false,
  returnObjects: true,
  whitelist: ['uk', 'en'],
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (isDate(value)) {
        const locale = locales[lng];

        if (format === 'dayMonth')
          return formatDate(value, 'd MMMM', { locale });
        if (format === 'monthYear')
          return formatDate(value, 'MMM, yyyy', { locale });

        return formatDate(value, format, { locale });
      }

      return value;
    },
  },
  lng: currentLanguage || 'en',
});

export default i18n;

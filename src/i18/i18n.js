import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
  },
  lng: currentLanguage || 'en',
});

export default i18n;

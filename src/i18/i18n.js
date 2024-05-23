import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({

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
  
  });

export default i18n;
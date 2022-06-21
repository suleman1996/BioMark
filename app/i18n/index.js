import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../app/locales/en.json';
import id from '../../app/locales/id.json';
import my from '../../app/locales/my.json';
import zh from '../../app/locales/zh.json';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en,
  },
  id: {
    translation: id,
  },
  my: {
    translation: my,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en',

    // keySeparator: true, // we do not use keys in form messages.welcome
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

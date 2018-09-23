import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .init({
    backend: {
      loadPath: '/i18n/{{ns}}/{{lng}}.json',
      addPath: '/i18n/{{ns}}/{{lng}}.missing.json'
    },

    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: '.', // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  });

export default i18n;

export function setLanguage(lng, flag, lngKey) {
  i18n.flag = flag;
  i18n.lngKey = lngKey;
  localStorage.setItem('i18nextExt', JSON.stringify({ lng, flag, lngKey }));
  i18n.changeLanguage(lng);
}

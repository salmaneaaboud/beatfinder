import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enHome from '/locales/en/home.json';
import esHome from '/locales/es/home.json';
import enLogin from '/locales/en/login.json';
import esLogin from '/locales/es/login.json';
import enRegister from '/locales/en/register.json';
import esRegister from '/locales/es/register.json';




i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: enHome,
        login: enLogin,
        register: enRegister

      },
      es: {
        home: esHome,
        login: esLogin,
        register: esRegister
      }
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'es', // idioma de respaldo
    interpolation: {
      escapeValue: false,
    },
    ns: ['home','login'], // Los namespaces disponibles
    defaultNS: 'home', // Namespace por defecto
  });

export default i18n;

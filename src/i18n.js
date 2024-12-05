import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "/locales/en/translation.json";
import esTranslations from "/locales/es/translation.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    es: { translation: esTranslations }
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false }
});

export default i18next;

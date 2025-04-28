import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/common.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: en,
    },
  },
});

export default i18n;

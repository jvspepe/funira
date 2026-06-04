/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { env } from "@/config/env";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: env.MODE === "development",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    ns: ["translation", "common"],
    supportedLngs: ["pt", "en"],
  });

export default i18n;

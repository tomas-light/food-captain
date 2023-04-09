import { LocaleApi } from '@food-captain/client-api';
import { use } from 'cheap-di-react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';

export function configureTranslation() {
  i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // what is language in user browser
    .init({
      debug: true,
      // lng: 'ru',
      fallbackLng: 'en',
      resources: {},
      // saveMissing: true, // add missed localization keys to locale
      /* allows some resources (or no resources) to be set on initialization
      while others can be loaded using a backend connector.
      */
      partialBundledLanguages: true,

      interpolation: {
        escapeValue: false, // react protects from XSS attacks by itself
      },
    });
}

export function useButtonsLocale() {
  const localeApi = use(LocaleApi);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const userLocale = i18next.language;

        const response = await localeApi.getButtonsAsync(userLocale);
        if (response.isOk()) {
          i18next.addResourceBundle(userLocale, 'translation', response.data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}

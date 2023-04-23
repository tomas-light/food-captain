import { use } from 'cheap-di-react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { LocaleApi, LocaleResource } from '@food-captain/client-api';

export function configureTranslation() {
  i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // what is language in user browser
    .init({
      // debug: true,
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

const loadedResources = new Set<string>();

export function useLocaleResource(resource: LocaleResource) {
  const localeApi = use(LocaleApi);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (loadedResources.has(resource)) {
        // console.log(`resource ${resource} is already loaded`);
        setLoading(true);
        return;
      }

      loadedResources.add(resource);

      setLoading(true);
      // console.log(`resource ${resource} is loading`);
      try {
        const userLocale = i18next.language;

        const response = await localeApi.getAsync(userLocale, resource);
        if (response.isOk()) {
          i18next.addResourceBundle(userLocale, 'translation', response.data);
        }
      } finally {
        setLoading(false);
        // console.log(`resource ${resource} is loaded`);
      }
    })();
  }, []);

  return { loading };
}

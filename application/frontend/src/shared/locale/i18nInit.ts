import i18n, { type Namespace } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { locales } from './Locale';

const defaultNamespace = 'translation';

export type I18nConfig<TLocale extends string> = {
  locales: readonly TLocale[];
  defaultLocale: TLocale;
  lookupLocalStorage: string;
};

export function i18nInit<TLocale extends string>() {
  return i18n
    .use(LanguageDetector)
    .use(
      resourcesToBackend(async (language: TLocale, namespace: Namespace) => {
        // we have no jsons (and don't plan to have it) for default namespace
        if (namespace.toString() === defaultNamespace) {
          return undefined;
        }

        const layerSlice = namespace;

        const imports = import.meta.glob('/src/**/i18n/*.json', {
          eager: true,
        });

        const desiredPath = `src/${layerSlice}/i18n/${language}.json`;

        for (const path in imports) {
          if (path.includes(desiredPath)) {
            return imports[path];
          }
        }

        console.warn(
          `json path (${desiredPath}) is not found in`,
          Object.keys(imports)
        );
      })
    )
    .use(initReactI18next)
    .init({
      supportedLngs: locales,
      fallbackLng: locales[0],
      // debug: true,

      react: {
        bindI18n: 'languageChanged',
        useSuspense: false,
      },

      detection: {
        order: ['path', 'localStorage'],
        lookupLocalStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        caches: [],
      },
    });
}

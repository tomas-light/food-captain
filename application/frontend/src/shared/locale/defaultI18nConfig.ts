import { type I18nConfig } from './i18nInit';
import { type Locale, locales } from './Locale';

export const defaultI18nConfig: I18nConfig<Locale> = {
  locales: locales,
  defaultLocale: locales[0],
  lookupLocalStorage: 'i18nextLng',
};

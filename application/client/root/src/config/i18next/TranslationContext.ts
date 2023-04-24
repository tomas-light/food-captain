import { createContext, useContext } from 'react';
import { useTranslation as i18useTranslation } from 'react-i18next';

export type TranslationContextType = {
  resourceLoaded: () => void;
};

export const TranslationContext = createContext<TranslationContextType>({
  resourceLoaded: () => {},
});

export function useTranslation() {
  useContext(TranslationContext);
  return i18useTranslation();
}

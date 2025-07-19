import { useMemo } from 'react';
import {
  useTranslation as useTranslationI18next,
  type UseTranslationOptions,
} from 'react-i18next';
import { createTransForNamespace } from './Translation';
import type { LocaleKeyPrefix } from './types/LocaleKeyPrefix';
import type { LocaleLayerSlice } from './types/LocaleLayerSlice';
import type { LocaleUseTranslationResponse } from './types/LocaleUseTranslationResponse';

export function useTranslation<
  TLayerSlice extends LocaleLayerSlice,
  TKeyPrefix extends LocaleKeyPrefix<TLayerSlice> = undefined,
>(
  layerSlice: TLayerSlice,
  options?: UseTranslationOptions<TKeyPrefix>
): LocaleUseTranslationResponse<TLayerSlice, TKeyPrefix> {
  const { keyPrefix } = options ?? {};

  const translationResponse = useTranslationI18next(layerSlice, {
    ...options,
    keyPrefix: keyPrefix,
  });
  const { ready } = translationResponse;

  const TransSafe = useMemo(() => {
    return createTransForNamespace<TLayerSlice, TKeyPrefix>({
      ready,
      layerSlice: layerSlice,
      keyPrefix,
    });
  }, [ready, layerSlice, keyPrefix]);

  return {
    ...translationResponse,
    /** It is the wrapper on `Trans` component in react-i18next, that shows
     * spinner while key's resource is not ready (comparing with `t`).
     * Another case to use it, when you want to use html code inside localized string
     * @example
     * // en.json
     * {
     *   "message": "Do you want to delete <strong>{{- clientName}}</strong>?"
     * }
     * */
    Trans: TransSafe,
  } as LocaleUseTranslationResponse<TLayerSlice, TKeyPrefix>;
}

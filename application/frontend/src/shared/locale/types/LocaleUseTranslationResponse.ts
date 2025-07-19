import type { i18n } from 'i18next';
import type { LocaleKeyPrefix } from './LocaleKeyPrefix';
import type { LocaleLayerSlice } from './LocaleLayerSlice';
import type { LocaleTFunction } from './LocaleTFunction';
import type { LocaleTrans } from './LocaleTrans';

export type LocaleUseTranslationResponse<
  TLayerSlice extends LocaleLayerSlice,
  TKeyPrefix extends LocaleKeyPrefix<TLayerSlice>,
> = {
  t: LocaleTFunction<TLayerSlice, TKeyPrefix>;
  i18n: i18n;
  ready: boolean;
  Trans: LocaleTrans<TLayerSlice, TKeyPrefix>;
};

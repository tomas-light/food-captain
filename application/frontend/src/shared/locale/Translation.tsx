import { Trans } from 'react-i18next';
import { joinKeys } from './keysOperations';
import type { LocaleKeyPrefix } from './types/LocaleKeyPrefix';
import type { LocaleLayerSlice } from './types/LocaleLayerSlice';
import type { LocaleTrans } from './types/LocaleTrans';

export function createTransForNamespace<
  TLayerSlice extends LocaleLayerSlice,
  TKeyPrefix extends LocaleKeyPrefix<TLayerSlice> = undefined,
>(options: {
  ready: boolean;
  layerSlice: TLayerSlice | undefined;
  keyPrefix: TKeyPrefix | undefined;
}) {
  const { ready, layerSlice, keyPrefix } = options;

  const TransWrap: LocaleTrans<TLayerSlice, TKeyPrefix> = (props) => {
    const { fallback, i18nKey, ...transProps } = props;

    if (!ready) {
      return fallback ?? null;
    }

    return (
      <Trans
        {...transProps}
        ns={layerSlice}
        i18nKey={keyPrefix ? joinKeys(keyPrefix, i18nKey) : i18nKey}
      />
    );
  };

  return TransWrap;
}

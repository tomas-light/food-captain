import type { ParseKeys, TOptions } from 'i18next';
import type { HTMLProps, ReactNode } from 'react';
import type { TransProps } from 'react-i18next/TransWithoutContext';
import type { LocaleResources } from '../__generated/LocaleResources';
import type { LocaleKey } from './LocaleKey';
import type { LocaleKeyPrefix } from './LocaleKeyPrefix';
import type { LocaleLayerSlice } from './LocaleLayerSlice';
import type { JoinKeys } from './t';

export type LocaleTrans<
  TLayerSlice extends LocaleLayerSlice,
  TKeyPrefix extends LocaleKeyPrefix<TLayerSlice> = undefined,
  TLayerSliceKeyPrefix = TKeyPrefix extends undefined
    ? TLayerSlice
    : JoinKeys<TLayerSlice, TKeyPrefix>,
> =
  // copied from i18next, changed only Key type and props
  <
    Key extends LocaleKey<TLayerSlice, TKeyPrefix>,
    TContext extends string | undefined = undefined,
    TOpt extends TOptions & { context?: TContext } = { context: TContext },
    Extra = HTMLProps<HTMLDivElement>,
  >(
    props: Pick<
      TransProps<
        ParseKeys<keyof LocaleResources & string, TOpt, TLayerSliceKeyPrefix>,
        keyof LocaleResources & string,
        TLayerSliceKeyPrefix,
        TContext,
        TOpt,
        Extra
      >,
      'components' | 'count' | 'values'
    > & {
      i18nKey: Key;
      fallback?: ReactNode;
    }
  ) => ReactNode;

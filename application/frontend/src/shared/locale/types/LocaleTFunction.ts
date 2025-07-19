import type { LocaleResources } from '../__generated/LocaleResources';
import type { $Dictionary, $NoInfer } from './helpers';
import type { LocaleKey } from './LocaleKey';
import type { LocaleKeyPrefix } from './LocaleKeyPrefix';
import type { LocaleLayerSlice } from './LocaleLayerSlice';
import type { TOptions } from './options';
import type {
  AppendKeyPrefix,
  InterpolationMap,
  JoinKeys,
  TFunctionProcessReturnValue,
  TFunctionReturn,
  TFunctionReturnOptionalDetails,
} from './t';

export interface LocaleTFunction<
  TLayerSlice extends LocaleLayerSlice,
  TKeyPrefix extends LocaleKeyPrefix<TLayerSlice> = undefined,
  TLayerSliceKeyPrefix = TKeyPrefix extends undefined
    ? TLayerSlice
    : JoinKeys<TLayerSlice, TKeyPrefix>,
> {
  // most part is copied from i18next, changed only Key type
  <
    const Key extends LocaleKey<TLayerSlice, TKeyPrefix>,
    const TOpt extends TOptions,
    Ret extends TFunctionReturn<
      keyof LocaleResources & string,
      AppendKeyPrefix<Key, TLayerSliceKeyPrefix>,
      TOpt
    >,
    const ActualOptions extends TOpt & InterpolationMap<Ret> = TOpt &
      InterpolationMap<Ret>,
    DefaultValue extends string = never,
  >(
    ...args:
      | [key: Key, options?: ActualOptions]
      | [key: Key, options: TOpt & $Dictionary & { defaultValue: DefaultValue }]
      | [key: Key, defaultValue: DefaultValue, options?: TOpt & $Dictionary]
  ): TFunctionReturnOptionalDetails<
    TFunctionProcessReturnValue<$NoInfer<Ret>, DefaultValue>,
    TOpt
  >;
}

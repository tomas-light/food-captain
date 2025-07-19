import type { LocaleResources } from '../__generated/LocaleResources';
import type { LocaleKeyPrefix } from './LocaleKeyPrefix';
import type { LocaleLayerSlice } from './LocaleLayerSlice';

/** @example
 * interface LocaleResources {
 *   'pages/login.fields.email.label': null;
 *   'pages/login.fields.email.placeholder': null;
 *   'pages/login.fields.email.validation.format': null;
 * }
 * type T1 = LocaleKey<'pages/login', 'fields'>;
 * //
 * "email.label" | "email.placeholder" | "email.validation.format"
 * */
export type LocaleKey<
  TLayerSlice extends LocaleLayerSlice,
  TKeyPrefix extends LocaleKeyPrefix<TLayerSlice> = undefined,
> = {
  [key in keyof LocaleResources]: key extends string
    ? TKeyPrefix extends undefined
      ? key extends `${TLayerSlice}.${infer RestKey}`
        ? RestKey
        : never
      : key extends `${TLayerSlice}.${TKeyPrefix}.${infer RestKey}`
        ? RestKey
        : never
    : never;
}[keyof LocaleResources];

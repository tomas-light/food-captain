import type { LocaleResources } from '../__generated/LocaleResources';
import type { LocaleLayerSlice } from './LocaleLayerSlice';

export type LocaleKeyPrefix<TLayerSlice extends LocaleLayerSlice> =
  | undefined
  | {
      [key in keyof LocaleResources]: key extends string
        ? key extends `${TLayerSlice}.${infer RestKey}`
          ? GetKeyDottedPaths<RestKey>
          : never
        : never;
    }[keyof LocaleResources];

/**
 * @example
 *  type T2 = GetKeyDottedPaths<'type.domain-name.modal.title'>;
 *  //
 *  | "type"
 *  | "type.domain-name"
 *  | "type.domain-name.modal"
 * */
type GetKeyDottedPaths<
  Key extends string,
  Prefix extends string = '',
> = Key extends `${infer part1}.${infer part2}`
  ? `${Prefix}${part1}` | GetKeyDottedPaths<part2, `${Prefix}${part1}.`>
  : never;

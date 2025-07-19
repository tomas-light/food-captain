import type { LocaleResources } from '../__generated/LocaleResources';

export type LocaleLayerSlice = FlatLayerSlices<LocaleResources>;

type FlatLayerSlices<TObject> = {
  [key in keyof TObject]: key extends string
    ? key extends 'app'
      ? key
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        key extends `${infer LayerSlice}.${infer Other}`
        ? LayerSlice
        : never
    : never;
}[keyof TObject];

import { ReactElement } from 'react';

type ClassNameMap<ClassKey extends string | number> = Partial<
  Record<ClassKey, string>
>;
type OrderVariant = 'asc' | 'desc';

type Component<Props> = (props: Props) => ReactElement;
type Without<T, PartialT> = Pick<T, Exclude<keyof T, keyof PartialT>>;

export type { ClassNameMap, OrderVariant, Component, Without };

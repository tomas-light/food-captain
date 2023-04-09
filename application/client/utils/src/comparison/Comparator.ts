import { ComparisonResult } from './ComparisonResult';

export type Comparator<TItem> = (left: TItem, right: TItem) => ComparisonResult;

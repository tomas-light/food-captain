import { ComparisonResult } from './ComparisonResult';

export function ascendingComparator<TItem>(
  left: TItem,
  right: TItem,
  orderBy: keyof TItem
): ComparisonResult {
  if (right[orderBy] < left[orderBy]) {
    return 1;
  }
  if (right[orderBy] > left[orderBy]) {
    return -1;
  }
  return 0;
}

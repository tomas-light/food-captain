import { ComparisonResult } from './ComparisonResult';
import { ascendingComparator } from './ascendingComparator';

export function descendingComparator<TItem>(
  left: TItem,
  right: TItem,
  orderBy: keyof TItem
): ComparisonResult {
  const ascendingResult = ascendingComparator(left, right, orderBy);
  if (ascendingResult === 0) {
    return 0;
  }
  return (ascendingResult * -1) as ComparisonResult;
}

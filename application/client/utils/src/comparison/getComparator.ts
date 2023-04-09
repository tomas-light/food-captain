import { OrderVariant } from '../types';
import { ascendingComparator } from './ascendingComparator';
import { Comparator } from './Comparator';
import { descendingComparator } from './descendingComparator';

export function getComparator<TItem extends Record<string, any> = any>(
  order: OrderVariant,
  orderBy: keyof TItem
): Comparator<TItem> {
  return order === 'asc'
    ? (left: TItem, right: TItem) => ascendingComparator(left, right, orderBy)
    : (left: TItem, right: TItem) => descendingComparator(left, right, orderBy);
}

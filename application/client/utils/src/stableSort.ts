import { Comparator } from './comparison/Comparator';

// description is here https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f

function stableSort<TItem>(
  array: TItem[],
  comparator: Comparator<TItem>
): TItem[] {
  if (!array || !Array.isArray(array)) {
    return array;
  }

  const stabilizedArray = array.map(
    (item: TItem, index: number) => [item, index] as [TItem, number]
  );

  stabilizedArray.sort((left, right) => {
    const order = comparator(left[0], right[0]);
    if (order !== 0) {
      return order;
    }
    // keep previous sorting result
    return left[1] - right[1];
  });

  return stabilizedArray.map((item) => item[0]);
}

export { stableSort };

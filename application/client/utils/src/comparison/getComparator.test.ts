import { ascendingComparator } from './ascendingComparator';
import { descendingComparator } from './descendingComparator';
import { getComparator } from './getComparator';

jest.mock('./ascendingComparator');

jest.mock('./descendingComparator');

describe('[function] getComparator', () => {
  class NumberItem {
    prop: number;
    prop2: number;

    constructor(prop: number) {
      this.prop = prop;
      this.prop2 = 44;
    }
  }

  test('if ascendingComparator is used', () => {
    const comparatorFn = getComparator<NumberItem>('asc', 'prop');
    const mockedFn = ascendingComparator as jest.MockedFunction<
      typeof ascendingComparator
    >;

    expect(mockedFn).toHaveBeenCalledTimes(0);
    comparatorFn(new NumberItem(1), new NumberItem(2));
    expect(mockedFn).toHaveBeenCalledTimes(1);
  });

  test('if descendingComparator is used', () => {
    const comparatorFn = getComparator<NumberItem>('desc', 'prop');
    const mockedFn = descendingComparator as jest.MockedFunction<
      typeof descendingComparator
    >;

    expect(mockedFn).toHaveBeenCalledTimes(0);
    comparatorFn(new NumberItem(1), new NumberItem(2));
    expect(mockedFn).toHaveBeenCalledTimes(1);
  });
});

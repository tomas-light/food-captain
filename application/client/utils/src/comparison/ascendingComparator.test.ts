import { ascendingComparator } from './ascendingComparator';

describe('[function] ascendingComparator', () => {
  describe('number comparisons', () => {
    function make(
      num1: number,
      num2: number
    ): [{ prop: number }, { prop: number }] {
      return [{ prop: num1 }, { prop: num2 }];
    }

    test('if returns -1 for [{ prop: 1 }, { prop: 2 }]', () => {
      const result = ascendingComparator(...make(1, 2), 'prop');
      expect(result).toBe(-1);
    });

    test('if returns 1 for [{ prop: 2 }, { prop: 1 }]', () => {
      const result = ascendingComparator(...make(2, 1), 'prop');
      expect(result).toBe(1);
    });

    test('if returns 0 for [{ prop: 3 }, { prop: 3 }]', () => {
      const result = ascendingComparator(...make(3, 3), 'prop');
      expect(result).toBe(0);
    });
  });

  describe('string comparisons', () => {
    function make(
      str1: string,
      str2: string
    ): [{ value: string }, { value: string }] {
      return [{ value: str1 }, { value: str2 }];
    }

    test('if returns -1 for [{ value: "b" }, { value: "c" }]', () => {
      const result = ascendingComparator(...make('b', 'c'), 'value');
      expect(result).toBe(-1);
    });

    test('if returns 1 for [{ value: "c" }, { value: "b" }]', () => {
      const result = ascendingComparator(...make('c', 'b'), 'value');
      expect(result).toBe(1);
    });

    test('if returns 0 for [{ value: "d" }, { value: "d" }]', () => {
      const result = ascendingComparator(...make('d', 'd'), 'value');
      expect(result).toBe(0);
    });
  });
});

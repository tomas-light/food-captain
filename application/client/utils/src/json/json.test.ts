import dayjs, { Dayjs } from 'dayjs';
import durationPlugin, { Duration } from 'dayjs/plugin/duration';
import { stringifyState } from './stringifyState';
import { parseState } from './parseState';

dayjs.extend(durationPlugin);

describe('if it can convert Map structures with primitives', () => {
  const state = {
    myMap: new Map([
      [1, '10'],
      [2, '20'],
      [3, '30'],
    ]),
  };

  const preparedState = stringifyState(state);
  const json = JSON.stringify(preparedState);
  const parsedJson = JSON.parse(json);
  const parsedState = parseState(parsedJson) as typeof state;

  test('Map key presented in parsedState object', () => {
    expect('myMap' in parsedState).toBeTruthy();
  });
  test('Map value is instance of Map', () => {
    expect(parsedState.myMap instanceof Map).toBeTruthy();
  });
  describe('converted Map contains all keys from initial structure', () => {
    test.each(Array.from(state.myMap.keys()))('key - %s', (key) => {
      expect(parsedState.myMap.has(key)).toBeTruthy();
    });
  });
  describe('converted Map contains all values from initial structure', () => {
    test.each(Array.from(state.myMap.entries()))(
      'key - %s',
      (key, initialValue) => {
        const converted = parsedState.myMap.get(key);
        expect(initialValue).toEqual(converted);
      }
    );
  });
});

describe('if it can convert Set structures with primitives', () => {
  const state = {
    mySet: new Set([1, 2, 3]),
  };

  const preparedState = stringifyState(state);
  const json = JSON.stringify(preparedState);
  const parsedJson = JSON.parse(json);
  const parsedState = parseState(parsedJson) as typeof state;

  test('Set key presented in parsedState object', () => {
    expect('mySet' in parsedState).toBeTruthy();
  });
  test('Set value is instance of Set', () => {
    expect(parsedState.mySet instanceof Set).toBeTruthy();
  });
  describe('converted Set contains all values from initial structure', () => {
    test.each(Array.from(state.mySet.values()))('key - %s', (value) => {
      expect(parsedState.mySet.has(value)).toBeTruthy();
    });
  });
});

describe('if it can complex state', () => {
  const state = {
    set: new Set([1, 2, 3]),
    map: new Map<number, any>([
      [100, { a: 1 }],
      [200, { b: true }],
      [300, dayjs()],
      [400, null],
      [500, new Date()],
      [700, dayjs.duration(5000)],
    ]),
  };

  const preparedState = stringifyState(state);
  const json = JSON.stringify(preparedState);
  const parsedJson = JSON.parse(json);
  const parsedState = parseState(parsedJson) as typeof state;

  describe('converted Set contains all values from initial structure', () => {
    test.each(Array.from(state.set.values()))('key - %s', (value) => {
      expect(parsedState.set.has(value)).toBeTruthy();
    });
  });

  test('if object inside map is converted correctly', () => {
    expect(parsedState.map.get(100)).toEqual(state.map.get(100));
  });

  test('if boolean inside map is converted correctly', () => {
    expect(parsedState.map.get(200)).toEqual(state.map.get(200));
  });

  test('if null inside map is converted correctly', () => {
    expect(parsedState.map.get(400)).toEqual(state.map.get(400));
  });

  describe('if Date inside map is converted correctly', () => {
    const parsedDate = parsedState.map.get(500) as unknown as Date;
    test('parsed date is instance of Date', () => {
      expect(parsedDate instanceof Date).toBeTruthy();
    });
    test('parsed date has same iso string as initial one', () => {
      const initialDate = state.map.get(500) as unknown as Date;
      expect(parsedDate.toISOString()).toBe(initialDate.toISOString());
    });
  });

  describe('if dayjs inside map is converted correctly', () => {
    const parsedDayjs = parsedState.map.get(300) as unknown as Dayjs;

    test('parsed dayjs is instance of dayjs', () => {
      expect(dayjs.isDayjs(parsedDayjs)).toBeTruthy();
    });
    test('parsed dayjs is the same as initial one', () => {
      const initialDayjs = state.map.get(300) as unknown as Dayjs;
      expect(initialDayjs.isSame(parsedDayjs)).toBeTruthy();
    });
  });

  describe('if dayjs.duration inside map is converted correctly', () => {
    const parsedDuration = parsedState.map.get(700) as unknown as Duration;

    test('parsed duration is instance of duration', () => {
      expect(dayjs.isDuration(parsedDuration)).toBeTruthy();
    });
    test('parsed duration has same iso string as initial one', () => {
      const initialDuration = state.map.get(700) as unknown as Duration;
      expect(initialDuration.toISOString()).toBe(parsedDuration.toISOString());
    });
  });
});

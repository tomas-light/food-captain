import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import { StoredDayjs } from './storedTypes/dayjs';
import { StoredDuration } from './storedTypes/duration';
import { StoredDate } from './storedTypes/date';
import { StoredMap } from './storedTypes/map';
import { StoredSet } from './storedTypes/set';

dayjs.extend(durationPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(utcPlugin);

export function stringifyState(value: any): any {
  if (value instanceof Map) {
    return <StoredMap>{
      fcType: 'map',
      value: stringifyState(Array.from(value.entries())),
    };
  }

  if (value instanceof Set) {
    return <StoredSet>{
      fcType: 'set',
      value: stringifyState(Array.from(value.values())),
    };
  }

  if (value instanceof Date) {
    return <StoredDate>{
      fcType: 'date',
      value: value.toISOString(),
    };
  }

  if (dayjs.isDayjs(value)) {
    return <StoredDayjs>{
      fcType: 'dayjs',
      value: value.toISOString(),
    };
  }

  if (dayjs.isDuration(value)) {
    return <StoredDuration>{
      fcType: 'duration',
      value: value.toJSON(),
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => stringifyState(item));
  }

  if (value == null) {
    return value;
  }

  if (typeof value === 'object') {
    const preparedObject: Record<string, any> = {};

    Object.entries(value).forEach(([key, value]) => {
      preparedObject[key] = stringifyState(value);
    });

    return preparedObject;
  }

  return value as string | number | boolean | symbol;
}

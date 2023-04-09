import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import { isStoredDate } from './storedTypes/date';
import { isStoredDayjs } from './storedTypes/dayjs';
import { isStoredDuration } from './storedTypes/duration';
import { isStoredMap } from './storedTypes/map';
import { isStoredSet } from './storedTypes/set';

dayjs.extend(durationPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(utcPlugin);

export function parseState(value: any): any {
  if (value == null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => parseState(item));
  }

  if (typeof value === 'object') {
    if (isStoredDayjs(value)) {
      const _dayjs = dayjs(value.value);
      return _dayjs;
    }

    if (isStoredDuration(value)) {
      const duration = dayjs.duration(value.value);
      return duration;
    }

    if (isStoredMap(value)) {
      const tuplesArray = parseState(value.value);
      return new Map(tuplesArray);
    }

    if (isStoredSet(value)) {
      const array = parseState(value.value);
      return new Set(array);
    }

    if (isStoredDate(value)) {
      const date = new Date(value.value);
      return date;
    }

    const preparedObject: Record<string, any> = {};

    Object.entries(value).forEach(([key, value]) => {
      preparedObject[key] = parseState(value);
    });

    return preparedObject;
  }

  return value;
}

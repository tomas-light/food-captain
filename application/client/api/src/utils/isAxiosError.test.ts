import { AxiosError } from 'axios';
import { isAxiosError } from './isAxiosError';

type _Error = AxiosError | Error;

test('null', () => {
  const result = isAxiosError(null);
  expect(result).toBe(false);
});

test('invalid object', () => {
  const result = isAxiosError({} as _Error);
  expect(result).toBe(false);
});

test('false', () => {
  const result = isAxiosError({
    isAxiosError: false,
  } as _Error);
  expect(result).toBe(false);
});

test('true', () => {
  const result = isAxiosError({
    isAxiosError: true,
  } as _Error);
  expect(result).toBe(true);
});

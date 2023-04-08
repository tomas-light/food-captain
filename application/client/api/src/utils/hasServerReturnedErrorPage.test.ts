import { AxiosError } from 'axios';
import { hasServerReturnedErrorPage } from './hasServerReturnedErrorPage';

test('if returns false for null', () => {
  const result = hasServerReturnedErrorPage({
    response: {
      headers: {},
    },
  });
  expect(result).toBe(false);
});

test('if returns false for error with "content-type" is NOT "text/html"', () => {
  const result = hasServerReturnedErrorPage({
    response: {
      headers: {
        // 'content-type': 'some type',
        get(headerName: string) {
          if (headerName === 'content-type') {
            return 'some type';
          }
          return null;
        },
      },
    },
  });
  expect(result).toBe(false);
});

test('if returns true for error with "content-type" is "text/html"', () => {
  const axiosError = {
    response: {
      headers: {
        get(headerName: string) {
          if (headerName === 'content-type') {
            return 'text/html';
          }
          return null;
        },
      },
    },
  } as unknown as AxiosError;
  const result = hasServerReturnedErrorPage(axiosError);
  expect(result).toBe(true);
});

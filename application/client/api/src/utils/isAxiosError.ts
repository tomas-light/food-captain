import { AxiosError } from 'axios';

export function isAxiosError(
  error: AxiosError | Error | null
): error is AxiosError {
  if (!error) {
    return false;
  }

  if (typeof error !== 'object') {
    return false;
  }

  if ('isAxiosError' in error) {
    return error.isAxiosError;
  }

  return false;
}

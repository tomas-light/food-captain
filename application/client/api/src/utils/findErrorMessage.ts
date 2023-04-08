export function findErrorMessage(error: any) {
  if (typeof error !== 'object') {
    return null;
  }

  if (typeof error.errorText === 'string') {
    return error.errorText;
  }

  if (typeof error.detail === 'string') {
    return error.detail;
  }

  if (typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error.error === 'string') {
    return error.error;
  }

  return null;
}

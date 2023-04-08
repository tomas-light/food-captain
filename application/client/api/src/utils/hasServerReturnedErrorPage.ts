export function hasServerReturnedErrorPage<
  AxiosError extends {
    response?: {
      headers?:
        | {
            get?: (headerName: string) => any;
          }
        | {
            [key: string]: any;
          };
    };
  }
>(error: AxiosError | undefined): boolean {
  const headers = error?.response?.headers;
  if (!headers || typeof headers !== 'object') {
    return false;
  }

  let contentType: any;

  if (typeof headers.get === 'function') {
    contentType = headers.get('content-type');
  } else {
    contentType = (
      headers as {
        [key: string]: any;
      }
    )['content-type'];
  }

  return contentType === 'text/html';
}

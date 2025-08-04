import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios';

export const fakeResponse = {
  ok: okResponse,
  noContent: noContentResponse,
  badRequest: badRequestResponse,
  notAuthorized: notAuthorizedResponse,
  notFound: notFoundResponse,
  conflict: conflictResponse,
  forbidden: forbiddenResponse,
};

const axiosResponseMock = {
  headers: new AxiosHeaders(),
  config: {
    headers: new AxiosHeaders(),
  },
};

/**
 * @example
 * const fakeApi = {
 *   someMethod: async () => {
 *     return fakeResponse.ok();
 *   },
 *   anotherMethod: async () => {
 *     return fakeResponse.ok({ entities: [...] });
 *   }
 * }
 * */
function okResponse(): AxiosResponse<void>;
function okResponse<Response>(data: Response): AxiosResponse<Response>;
function okResponse<Response>(data?: Response) {
  return {
    data,
    status: 200,
    statusText: 'ok',
    ...axiosResponseMock,
  };
}

/**
 * @example
 * const fakeApi = {
 *   someMethod: async () => {
 *     return fakeResponse.noContent();
 *   }
 * }
 * */
function noContentResponse(): AxiosResponse<undefined> {
  return {
    data: undefined,
    status: 201,
    statusText: 'ok',
    ...axiosResponseMock,
  };
}

/**
 * @example
 * const fakeApi = {
 *   someMethod: async () => {
 *     return fakeResponse.badRequest('my error');
 *   }
 * }
 * */
function badRequestResponse(error?: string): never {
  const axiosError = new AxiosError(error ?? 'Bad request');
  axiosError.status = 400;
  throw axiosError;
}

/**
 * @example
 * const fakeApi = {
 *   someMethod: async () => {
 *     return fakeResponse.notAuthorizedResponse();
 *   }
 * }
 * */
function notAuthorizedResponse(): never {
  const axiosError = new AxiosError('Not authorized');
  axiosError.status = 401;
  throw axiosError;
}

/**
 * @example
 * const fakeApi = {
 *   someMethod: async () => {
 *     return fakeResponse.notFound('Something not found');
 *   }
 * }
 * */
function notFoundResponse(error?: string): never {
  const axiosError = new AxiosError(error ?? 'Not found');
  axiosError.status = 404;
  throw axiosError;
}

function conflictResponse(): never {
  const axiosError = new AxiosError();
  axiosError.status = 409;
  throw axiosError;
}


/**
 * @example
 * const fakeApi = {
 *   someMethod: async () => {
 *     return fakeResponse.forbiddenResponse();
 *   }
 * }
 * */
function forbiddenResponse(): never {
  const axiosError = new AxiosError('Forbidden');
  axiosError.status = 403;
  throw axiosError;
}
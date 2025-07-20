import { AxiosError } from 'axios';
import { ApiError } from '../ApiError';
import type { ApiMiddleware } from './ApiMiddleware';

export function errorApiMiddleware<TApi extends object>(): ApiMiddleware<TApi> {
  return (callOptions) => {
    return {
      ...callOptions,
      method: tryCatch as typeof callOptions.method,
    };

    async function tryCatch(...args: unknown[]) {
      const { method } = callOptions;

      try {
        return await method(...args);
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = isBackendResponseData(error.response?.data)
            ? error.response?.data.message
            : error.message;
          const errors = error?.response?.data.errors
            ? error.response.data.errors
            : undefined;

          throw new ApiError({
            message,
            errors,
            // 401 status is in error.response?.status so use error.response?.status when error.status is not defined
            status: error.status ?? error.response?.status,
          });
        }
        throw error;
      }
    }
  };
}

function isBackendResponseData(data: unknown): data is ErrorResponseData {
  return typeof data === 'object' && data !== null && 'message' in data;
}

type ErrorResponseData = {
  message?: string;
  errors?: object;
};

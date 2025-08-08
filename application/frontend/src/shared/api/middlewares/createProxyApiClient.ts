import { type ApiBase } from '../real/ApiBase';
import { type ApiMiddleware, type ApiMiddlewareOptions } from './ApiMiddleware';

export function createProxyApiClient<TApi extends ApiBase>(
  api: TApi,
  ...middlewares: ApiMiddleware<TApi>[]
) {
  return new Proxy(api, {
    get: (target, name) => {
      const propertyName = name as string & keyof TApi;
      const value = target[propertyName];

      if (typeof value !== 'function') {
        return value;
      }

      const method = value as TApi[typeof propertyName] &
        ((...args: unknown[]) => Promise<unknown>);

      return async (...args: unknown[]) => {
        let callOptions: ApiMiddlewareOptions<TApi, typeof propertyName> = {
          methodName: propertyName,
          method,
          extra: {},
        };

        for (const middleware of middlewares) {
          callOptions = await middleware(callOptions);
        }

        return callOptions.method(...args);
      };
    },
  });
}

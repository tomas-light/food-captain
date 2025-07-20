import type { ApiBaseClient } from '../real/ApiBaseClient';
import type { ApiMiddleware } from './ApiMiddleware';

export function fakeApiMiddleware<TApi extends ApiBaseClient>(pluginOptions: {
  importFakeApi: () => Promise<Partial<TApi>>;
  shouldFake: () => boolean | undefined;
}): ApiMiddleware<TApi> {
  const { importFakeApi, shouldFake } = pluginOptions;

  return async (callOptions) => {
    const { methodName, extra } = callOptions;

    if (!shouldFake()) {
      return callOptions;
    }

    const fakeApi = await importFakeApi();
    const fakeMethod = fakeApi[methodName];
    if (fakeMethod) {
      return {
        ...callOptions,
        method: fakeMethod as typeof callOptions.method,
        extra: {
          ...extra,
          methodWasMocked: true,
        },
      };
    }

    console.error(`${methodName} is not implemented yet`);
    return callOptions;
  };
}

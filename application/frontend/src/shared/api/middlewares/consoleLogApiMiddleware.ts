import type { ApiMiddleware } from './ApiMiddleware';

export function consoleLogApiMiddleware<TApi extends object>(
  shouldLog: () => boolean | undefined
): ApiMiddleware<TApi> {
  return (callOptions) => {
    if (!shouldLog()) {
      return callOptions;
    }

    return {
      ...callOptions,
      method: log as typeof callOptions.method,
    };

    async function log(...args: unknown[]) {
      const { methodName, method, extra } = callOptions;

      const loggedName = `${extra.methodWasMocked ? 'Mocked ' : ''}${methodName}`;

      console.info(`🌐⬆️ ${loggedName}`, ...args);

      const response = method(...args);
      if (isPromise(response)) {
        try {
          const result = await response;

          console.info(`🌐✅ ${loggedName}`, result);

          return result;
        } catch (error) {
          console.info(`🌐❌ ${loggedName}`, error);
        }

        return response;
      }

      if (response) {
        console.info(`🌐✅ ${loggedName}`, response);
      }

      return response;
    }
  };
}

function isPromise(object: unknown): object is Promise<unknown> {
  return !!object && typeof (object as Promise<unknown>).then === 'function';
}

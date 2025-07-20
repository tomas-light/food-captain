import type { ApiMiddleware } from './ApiMiddleware';

export function delayApiMiddleware<TApi extends object>(
  getDelay: () => number | undefined
): ApiMiddleware<TApi> {
  return (callOptions) => {
    const delayMs = getDelay();
    if (!delayMs) {
      return callOptions;
    }

    return {
      ...callOptions,
      method: delayResponse as typeof callOptions.method,
    };

    async function delayResponse(...args: unknown[]) {
      const { method } = callOptions;

      const response = await method(...args);

      await delay(delayMs!);

      return response;
    }
  };
}

function delay(durationMs: number) {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

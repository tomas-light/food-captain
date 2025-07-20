import { useContext, useMemo } from 'react';
import { getMockApiConfig, useConfigJson } from '../config/index';
import { getShouldLogApi } from '../config/useApiLogConfig';
import { getResponsesDelay } from '../config/useResponsesDelayConfig';
import type { ApiClient } from './ApiClient';
import { ApiClientContext } from './ApiClientContext';
import { fakeApiLazyImports } from './fake/index';
import { consoleLogApiMiddleware } from './middlewares/consoleLogApiMiddleware';
import { createProxyApiClient } from './middlewares/createProxyApiClient';
import { delayApiMiddleware } from './middlewares/delayApiMiddleware';
import { errorApiMiddleware } from './middlewares/errorApiMiddleware';
import { fakeApiMiddleware } from './middlewares/fakeApiMiddleware';

export function useApiClient<ApiName extends keyof ApiClient>(
  apiName: ApiName
): ApiClient[ApiName] {
  const apiClient = useContext(ApiClientContext);
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  const configJson = useConfigJson();
  if (!configJson) {
    throw new Error('ConfigJsonContext is not found');
  }

  return useMemo(
    () =>
      createProxyApiClient(
        apiClient[apiName],
        fakeApiMiddleware({
          importFakeApi: fakeApiLazyImports[apiName],
          shouldFake: () => getMockApiConfig(apiName),
        }),
        delayApiMiddleware(getResponsesDelay),
        consoleLogApiMiddleware(getShouldLogApi),
        errorApiMiddleware()
      ),
    [apiClient, apiName]
  );
}

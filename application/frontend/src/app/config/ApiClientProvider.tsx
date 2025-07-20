import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC, type PropsWithChildren, useMemo } from 'react';
import { useConfigJson } from '~/shared/config';
import { createApiClient, ApiClientContext } from '~/shared/api';

export const ApiClientProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const queryClient = useMemo(() => new QueryClient(), []);

  const configJson = useConfigJson();

  const apiClient = useMemo(() => {
    if (!configJson) {
      return undefined;
    }

    return createApiClient(configJson.apiBaseUrl);
  }, [configJson]);

  if (!apiClient) {
    throw new Error('Api client is not initialized');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={apiClient}>
        {children}
      </ApiClientContext.Provider>
    </QueryClientProvider>
  );
};

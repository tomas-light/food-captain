import { useMemo } from 'react';
import { useApiClient } from '~/shared/api';
import { AuthApi } from './AuthApi';

export function useAuthApi() {
  const apiClient = useApiClient('auth');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return useMemo(() => new AuthApi(apiClient), [apiClient]);
}

import { useMemo } from 'react';
import { useApiClient } from '~/shared/api';
import { UserApi } from './UserApi';

export function useUserApi() {
  const apiClient = useApiClient('user');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return useMemo(() => new UserApi(apiClient), [apiClient]);
}

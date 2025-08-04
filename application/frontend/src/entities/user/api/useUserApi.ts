import { useApiClient } from '~/shared/api';

export function useUserApi() {
  const apiClient = useApiClient('user');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return apiClient;
}

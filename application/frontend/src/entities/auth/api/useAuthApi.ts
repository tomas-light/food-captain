import { useApiClient } from '~/shared/api';

export function useAuthClient() {
  const apiClient = useApiClient('auth');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return apiClient;
}

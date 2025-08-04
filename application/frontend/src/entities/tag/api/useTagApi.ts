import { useApiClient } from '~/shared/api';

export function useTagApi() {
  const apiClient = useApiClient('tag');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return apiClient;
}

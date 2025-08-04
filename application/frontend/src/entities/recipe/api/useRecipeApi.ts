import { useApiClient } from '~/shared/api';

export function useRecipeApi() {
  const apiClient = useApiClient('recipe');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return apiClient;
}

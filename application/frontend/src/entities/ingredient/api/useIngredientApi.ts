import { useApiClient } from '~/shared/api';

export function useIngredientApi() {
  const apiClient = useApiClient('ingredient');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return apiClient;
}

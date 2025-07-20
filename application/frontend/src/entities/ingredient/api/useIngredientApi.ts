import { useApiClient } from '~/shared/api/ApiClientContext';

export function useIngredientApi() {
  const apiClient = useApiClient();
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return apiClient.ingredient;
}

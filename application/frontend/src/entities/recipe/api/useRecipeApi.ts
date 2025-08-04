import { useMemo } from 'react';
import { useApiClient } from '~/shared/api';
import { RecipeApi } from './RecipeApi';

export function useRecipeApi() {
  const apiClient = useApiClient('recipe');
  if (!apiClient) {
    throw new Error('ApiClientContext is not found');
  }

  return useMemo(() => new RecipeApi(apiClient), [apiClient]);
}

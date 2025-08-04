import { useQuery } from '@tanstack/react-query';
import { useApiError } from '~/shared/api';
import { convertToMilliseconds } from '~/shared/date/';
import { getRecipesQueryKey } from './queryKeys';
import { useRecipeApi } from './useRecipeApi';

export function useRecipesQuery() {
  const api = useRecipeApi();

  const query = useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getRecipesQueryKey(),
    queryFn: async () => {
      return await api.getRecipes();
    },
  });

  useApiError(query.error);

  return query;
}

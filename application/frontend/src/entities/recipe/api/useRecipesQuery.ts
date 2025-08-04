import { useQuery } from '@tanstack/react-query';
import { convertToMilliseconds } from '~/shared/date/';
import { getRecipesQueryKey } from './queryKeys';
import { useRecipeApi } from './useRecipeApi';

export function useRecipesQuery() {
  const api = useRecipeApi();

  return useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getRecipesQueryKey(),
    queryFn: async () => {
      return await api.getRecipes();
    },
  });
}

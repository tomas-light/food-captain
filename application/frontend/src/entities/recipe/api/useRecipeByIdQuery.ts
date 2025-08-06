import { useQuery } from '@tanstack/react-query';
import { convertToMilliseconds } from '~/shared/date';
import type { Recipe } from '../model/Recipe';
import { getRecipeByIdQueryKey } from './queryKeys';
import { selectRecipe } from './selectRecipe';
import { useRecipeApi } from './useRecipeApi';

type Options = {
  recipeId: Recipe['id'] | undefined;
};

export function useRecipeByIdQuery(options: Options) {
  const { recipeId } = options;

  const api = useRecipeApi();

  return useQuery({
    enabled: recipeId != null,
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getRecipeByIdQueryKey(recipeId),
    queryFn: async () => {
      if (recipeId == null) {
        throw new Error('recipeId is not provided');
      }
      const response = await api.getRecipeById(recipeId);
      return response.data;
    },
    select: selectRecipe,
  });
}

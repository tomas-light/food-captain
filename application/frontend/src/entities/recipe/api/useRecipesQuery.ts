import { useQuery } from '@tanstack/react-query';
import type { RecipeDto } from '~/shared/api';
import { convertToMilliseconds } from '~/shared/date';
import { getRecipesQueryKey } from './queryKeys';
import { selectRecipe } from './selectRecipe';
import { useRecipeApi } from './useRecipeApi';

export function useRecipesQuery() {
  const api = useRecipeApi();

  return useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getRecipesQueryKey(),
    queryFn: async () => {
      const response = await api.getRecipes();
      return response.data;
    },
    select: selectRecipes,
  });
}

function selectRecipes(recipesDto: RecipeDto[]) {
  return recipesDto.map(selectRecipe);
}

import { useQuery } from '@tanstack/react-query';
import { convertToMilliseconds } from '~/shared/date';
import type { Recipe } from '../model/Recipe';
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
    select: (response) =>
      response.data?.map(
        (dto): Recipe => ({
          id: dto.id,
          name: dto.name,
          imageUrl: dto.image_url,
          description: dto.description,
          kcal: dto.kcal,
          portionWeightInGrams: dto.portion_weight_in_grams,
          cookingTimeInMinutes: dto.cooking_time_in_minutes,
        })
      ),
  });
}

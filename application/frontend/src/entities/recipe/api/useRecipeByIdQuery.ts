import { useQuery } from '@tanstack/react-query';
import { convertToMilliseconds } from '~/shared/date';
import type { Recipe } from '../model/Recipe';
import { getRecipeByIdQueryKey } from './queryKeys';
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
      return await api.getRecipeById(recipeId);
    },
    select: ({ data: dto }) => ({
      id: dto.id,
      name: dto.name,
      imageUrl: dto.image_url,
      description: dto.description,
      formula: dto.formula,
      kcal: dto.kcal,
      portionWeightInGrams: dto.portion_weight_in_grams,
      cookingTimeInMinutes: dto.cooking_time_in_minutes,
      tagIds: dto.tag_ids,
    }),
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invalidateRecipesQuery, useRecipeApi } from '~/entities/recipe';
import { useMyUserQuery } from '~/entities/user';
import type { NewRecipe } from '../model/NewRecipe';

type Options = {
  onSuccess?: VoidFunction;
};

export function useCreateRecipeMutation(options: Options) {
  const { onSuccess } = options;

  const queryClient = useQueryClient();
  const api = useRecipeApi();

  const { data: user } = useMyUserQuery();

  return useMutation({
    mutationKey: ['create recipe'],
    mutationFn: async (newRecipe: NewRecipe) => {
      if (!user) {
        return;
      }
      await api.addRecipe({
        name: newRecipe.name,
        image: newRecipe.imageFile,
        description: newRecipe.description,
        formula: newRecipe.formula,
        kcal: newRecipe.kcal,
        portion_weight_in_grams: newRecipe.portionWeightInGrams,
        cooking_time_in_minutes: newRecipe.cookingTimeInMinutes,
        tag_ids: newRecipe.tagIds,
        nutrition: newRecipe.nutrition,
        author_id: user.id,
      });
    },

    onSuccess: async () => {
      await invalidateRecipesQuery(queryClient);
      onSuccess?.();
    },
  });
}

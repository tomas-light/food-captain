import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invalidateRecipesQuery, useRecipeApi } from '~/entities/recipe';

type Options = {
  onSuccess?: VoidFunction;
};

export function useCreateRecipeMutation(options: Options) {
  const { onSuccess } = options;

  const queryClient = useQueryClient();
  const api = useRecipeApi();

  return useMutation({
    mutationKey: ['create recipe'],
    mutationFn: api.addRecipe,

    onSuccess: async () => {
      await invalidateRecipesQuery(queryClient);
      onSuccess?.();
    },
  });
}

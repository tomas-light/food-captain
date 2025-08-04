import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Recipe } from '~/entities/recipe';
import { useMyUserQuery, useUserApi } from '~/entities/user';
import { invalidateRecipeLikeQueryKey } from './queryKeys';

export function useUnlikeRecipeMutation() {
  const api = useUserApi();

  const queryClient = useQueryClient();
  const { data: currentUser } = useMyUserQuery();

  return useMutation({
    mutationKey: ['unlike recipe'],
    mutationFn: async (recipeId: Recipe['id']) => {
      if (currentUser) {
        await api.unlikeRecipe(currentUser.id, recipeId);
      }
    },
    onSuccess: (_, recipeId) => {
      void invalidateRecipeLikeQueryKey(queryClient, recipeId);
    },
  });
}

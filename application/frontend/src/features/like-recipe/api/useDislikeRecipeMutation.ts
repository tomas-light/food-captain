import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Recipe } from '~/entities/recipe';
import { useMyUserQuery, useUserApi } from '~/entities/user';
import { invalidateRecipeLikeQueryKey } from './queryKeys';

export function useDislikeRecipeMutation() {
  const api = useUserApi();

  const queryClient = useQueryClient();
  const { data: currentUser } = useMyUserQuery();

  return useMutation({
    mutationKey: ['dislike recipe'],
    mutationFn: async (recipeId: Recipe['id']) => {
      if (currentUser) {
        await api.dislikeRecipe(currentUser.id, recipeId);
      }
    },
    onSuccess: (_, recipeId) => {
      void invalidateRecipeLikeQueryKey(queryClient, recipeId);
    },
  });
}

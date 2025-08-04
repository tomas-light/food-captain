import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Recipe } from '~/entities/recipe';
import { useUserApi } from '~/entities/user';
import { useMyUserQuery } from '~/entities/user/api/useMyUserQuery';
import { useApiError } from '~/shared/api';
import { invalidateRecipeLikeQueryKey } from './queryKeys';

export function useDislikeRecipeMutation() {
  const api = useUserApi();

  const queryClient = useQueryClient();
  const { data: currentUser } = useMyUserQuery();

  const query = useMutation({
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

  useApiError(query.error);

  return query;
}

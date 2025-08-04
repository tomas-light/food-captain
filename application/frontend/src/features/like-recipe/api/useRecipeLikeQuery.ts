import { useQuery } from '@tanstack/react-query';
import type { Recipe } from '~/entities/recipe';
import { useMyUserQuery, useUserApi } from '~/entities/user';
import { convertToMilliseconds } from '~/shared/date';
import { getRecipeLikeQueryKey } from './queryKeys';

type Options = {
  recipeId: Recipe['id'] | undefined;
};

export function useRecipeLikeQuery(options: Options) {
  const { recipeId } = options;

  const api = useUserApi();

  const { data: currentUser } = useMyUserQuery();

  return useQuery({
    enabled: currentUser?.id != null && recipeId != null,
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getRecipeLikeQueryKey(recipeId),
    queryFn: async () => {
      if (currentUser?.id == null) {
        throw new Error('currentUser is not found');
      }
      if (recipeId == null) {
        throw new Error('recipeId is required');
      }

      const existedLike = await api.getUserRecipeLikes(currentUser.id, [
        recipeId,
      ]);
      return existedLike.data?.at(0) ?? null;
    },
  });
}

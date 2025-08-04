import { useQuery } from '@tanstack/react-query';
import type { Recipe } from '~/entities/recipe';
import { useUserApi } from '~/entities/user';
import { useMyUserQuery } from '~/entities/user/api/useMyUserQuery';
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
      if (currentUser?.id == null || recipeId == null) {
        throw new Error();
      }

      const existedLike = await api.getUserRecipeLikes(currentUser.id, [
        recipeId,
      ]);
      return existedLike.at(0) ?? null;
    },
  });
}

import type { QueryClient } from '@tanstack/react-query';
import type { Recipe } from '~/entities/recipe';

export function getRecipeLikeQueryKey(recipeId: Recipe['id'] | undefined) {
  return ['recipe-like', recipeId];
}

export function invalidateRecipeLikeQueryKey(queryClient: QueryClient, recipeId: Recipe['id'] | undefined) {
  return queryClient.invalidateQueries({
    queryKey: getRecipeLikeQueryKey(recipeId),
  })
}